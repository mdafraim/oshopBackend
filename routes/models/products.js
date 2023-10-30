const mongoose = require('mongoose');
const Joi = require('joi');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);

function validareProduct(product){
    const schema = {
        title: Joi.string().required(),
        price: Joi.number().required(),
        category: Joi.string().required(),
        imageUrl: Joi.string().required()
    }
    return Joi.validate(product, schema)
}

exports.Product = Product;
exports.validate = validareProduct;

