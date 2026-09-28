
import mongoose from 'mongoose'
const ProductSchema = new mongoose.Schema({

     category: {
        type: String,
        required: true
    },

    Image: {
        type: String,
        required: false
    },
    Title: {
        type: String,
        required: true
    },

    SubTitle: {
        type: String,
        required: true
    },

    Price: {
        type: Number,
        required: true
    },

    Description: {
        type: String,
        required: true
    },

    Stock: {
        type: Number,
        required: true
    },

   
})

export default mongoose.model("productModel", ProductSchema);