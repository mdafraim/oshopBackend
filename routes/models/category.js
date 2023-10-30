const mongoose = require('mongoose');
const Joi = require('joi');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const Category = mongoose.model('Category', categorySchema);

function validareCategory(category){
    const schema = {
        name: Joi.string().min(6),
    }
    return Joi.validate(category, schema)
}

exports.Category = Category;
exports.validate = validareCategory;

