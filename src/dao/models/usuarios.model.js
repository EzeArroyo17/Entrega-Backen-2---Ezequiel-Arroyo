import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({ 
    first_name: {
        type: String, 
        required: true,
        trim: true 
    },
    last_name: {
        type: String, 
        required: true,
        trim: true 
    }, 
    email: {
        type: String, 
        required: true,
        unique: true,
        index: true,
        lowercase: true,
        validate: {
            validator: function(value) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
            },
            message: 'El correo no es válido.'
        }
    }, 
    password: {
        type: String, 
        required: true
    }, 
    age: {
        type: Number, 
        required: true,
        min: 0
    },
    cart:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "cart"
    },
    rol: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
})

const UsuarioModel = mongoose.model("usuarios", usuarioSchema);

export default UsuarioModel; 