const express = require('express');
const mongoose = require('mongoose');
const { Product, validate } = require('./models/products');
const router = express.Router();

router.get('/', async (req, res) => {
    const product = await Product.find().sort('name');
    res.send(product);
});

router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(!product) return res.status(404).send('The given id does not exists');
    res.send(product);
});

router.post('/', async (req, res) => {
    let product = new Product({
        title: req.body.title,
        price: req.body.price,
        category: req.body.category,
        imageUrl: req.body.imageUrl
    });
    product = await product.save();
    res.send(product);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    const product = await Product.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        price: req.body.price,
        category: req.body.category,
        imageUrl: req.body.imageUrl
    }, {new: true });

    if(!product) return res.status(400).send('The given id does not exists..!');
    res.send(product);
});

router.delete('/:id', async (req, res) => {
    const product = await Product.findByIdAndRemove(req.params.id);
    if(!product) return res.status(400).send('The given id does not exists..!');
    res.send(product);
});


module.exports = router;