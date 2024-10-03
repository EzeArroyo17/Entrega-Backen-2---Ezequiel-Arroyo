import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./database.js";
import viewsRouter from "./routes/views.router.js"; 
import usersRouter from "./routes/user.router.js";
import initializePassport from "./config/passport.config.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/cart.router.js";
import ProductManager from "./dao/db/product-manager-db.js"
const manager = new ProductManager()
import ProductModel from "./dao/models/product.model.js";
const app = express(); 
const PUERTO = 8080;

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("./src/public"));
app.use(cookieParser());
app.use(passport.initialize()); 
initializePassport(); 

//Express-Handlebars
app.engine("handlebars", engine({
        runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true 
    }}));
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Rutas
app.use("/", viewsRouter);
app.use("/api/sessions", usersRouter); 
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);



app.get("/", async (req, res) => {
    let page = parseInt(req.query.page) || 1; 
    let limit = 8;

    try {
        const listProducts = await ProductModel.paginate({}, { limit, page });

        res.render("homeProduct", {
            products: listProducts.docs,
            hasPrevPage: listProducts.hasPrevPage,
            hasNextPage: listProducts.hasNextPage,
            prevPage: listProducts.prevPage,
            nextPage: listProducts.nextPage,
            currentPage: listProducts.page,
            totalPages: listProducts.totalPages
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener productos");
    }
});


const httpServer = app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`);
});


const io = new Server(httpServer);



io.on("connection", async (socket) => {
    console.log("Un cliente se conecto conmigo");


    socket.emit("product", await manager.getProducts());

    socket.on("deleteProduct", async (id) => {
        await manager.deleteProduct(id)

        io.sockets.emit("product", await manager.getProducts())
    })

})
