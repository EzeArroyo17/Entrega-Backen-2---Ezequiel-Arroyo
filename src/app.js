import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./database.js";
import viewsRouter from "./routes/views.router.js"; 
import initializePassport from "./config/passport.config.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/cart.router.js";
import exphbs from "express-handlebars";
import sessionRouter from "./routes/session.router.js";

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

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Rutas: 
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionRouter);
app.use("/", viewsRouter);

app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});