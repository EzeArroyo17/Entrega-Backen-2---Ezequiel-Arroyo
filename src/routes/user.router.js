import { Router } from "express";
const router = Router();
import UsuarioModel from "../models/usuarios.model.js";
import jwt from "jsonwebtoken";
import passport from "passport";
import { createHash, isValidPassword } from "../utils/util.js";
import CartModel from "../dao/models/cart.model.js"

router.post("/register", async (req, res) => {
    let { first_name, last_name, email, password, age } = req.body; 

    try { 
        const existeUsuario = await UsuarioModel.findOne({ email });
        if (existeUsuario) {
            return res.status(400).send("El usuario ya existe");
        }
        
        const nuevoCarrito = new CartModel();
        await nuevoCarrito.save()

        const nuevoUsuario = new UsuarioModel({
            first_name,
            last_name,
            email,
            password: createHash(password),
            age,
            cart: nuevoCarrito._id
        });

        await nuevoUsuario.save(); 
        
        const token = jwt.sign({ email: nuevoUsuario.email }, "coderhouse", { expiresIn: "1h" });


        res.cookie("coderCookieToken", token, {
            maxAge: 3600000,
            httpOnly: true
        })

        res.redirect("/api/sessions/current");  

    } catch (error) {
        res.status(500).send("Error interno del servidor");
    }
}) 



router.post("/login", async (req, res) => {
    let { email, password } = req.body; 

    try {

        const usuarioEncontrado = await UsuarioModel.findOne({ email });  

        if (!usuarioEncontrado) { 
            return res.status(401).send("Usuario no identificado");
        }

        if (!isValidPassword(password, usuarioEncontrado)) {
            return res.status(401).send("Datos erroneos");
        }

        const token = jwt.sign({ email: usuarioEncontrado.email,
            first_name: usuarioEncontrado.first_name,
            last_name: usuarioEncontrado.last_name,  
            age: usuarioEncontrado.age,
            rol: usuarioEncontrado.rol 
            }, "coderhouse",
            { expiresIn: "1h" });

        res.cookie("coderCookieToken", token, {
            maxAge: 3600000,
            httpOnly: true
        })

        res.redirect("/api/sessions/current");


    } catch (error) {
        res.status(500).send("Error interno del servidor");
    }
})

router.get("/current", passport.authenticate("current", { session: false }), (req, res) => {

    res.render("home", { email: req.user.email });
})


router.post("/logout", (req, res) => {
    res.clearCookie("coderCookieToken"); 
    res.redirect("/login"); 
})



router.get("/admin", passport.authenticate("current", { session: false }), (req, res) => {

    if (req.user.rol !== "admin") {
        return res.status(403).send("Acceso denegado, no posees autorizacion");
    }

    res.render("admin");
})


export default router; 