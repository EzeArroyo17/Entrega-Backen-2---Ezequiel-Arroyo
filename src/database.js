import mongoose from "mongoose";
//En database me conecto a la base de datos.
mongoose.connect("mongodb+srv://ezearroyo00:ezeArroyoCoder@cluster0.yym5g.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
    .then ( ()=> console.log("Conexion establecida"))
    .catch ( ( error )=> console.log("Conexion fallida ", error))