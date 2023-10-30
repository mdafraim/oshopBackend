const express = require('express');
const mongoose = require('mongoose');
const { Category, validate } = require('./models/category');
const send = require('send');
const router = express.Router();

router.get('/', async (req, res) => {
    const category = await Category.find().sort('name');
    res.send(category);
});

router.get('/:id', async (req, res) => {
    const category = await Category.findById(req.params.id);
    if(!category) return res.status(400).send('The given id does not exists');
    send(category);
});

router.post('/', async (req, res) => {
    let category = new Category({
        name: req.body.name
    });
    category = await category.save();
    res.send(category);
});

module.exports = router;