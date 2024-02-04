const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },

    productImage: {
        type: String, // Assuming storing image as base64 string
        required: true
    }, 
    
    userLocation: {
        type: String, // Assuming storing image as base64 string
        required: true
    }
    // Add other fields as needed
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
