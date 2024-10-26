import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema ({
    code:{
        type: String,
        unique: true,
        required: true,
        trim: true 
    },

    purchase_datetime: {
        type: Date,
        default: Date.now,
        required: true
    },

    amount: {
        type:Number,
        required: true,
        min: 0  
    },

    purchaser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }

});

const TicketModel = mongoose.model ("Ticket", ticketSchema)
export default TicketModel