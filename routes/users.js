
const _ = require('lodash');
const mongoose = require('mongoose');
const express = require('express');
const { User, validate } = require('./models/users');
const bcrypt = require('bcrypt');


const router = express.Router();


router.get('/me', async (req, res) => {
    const user = await User.findById(req.user._id);
    res.send(user);
});

router.post('/', async (req, res) => {
    // const { error } = validate(req.body);
    // if(error) return res.status(400).send(error.details[0].message);
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email});
    if(user) return res.status(400).send('User is alredy register..!')

     user = new User(_.pick(req.body, ['name', 'email', 'password']));
     const salt = await bcrypt.genSalt(10);
     user.password = await bcrypt.hash(user.password, salt);
    user = await user.save();


    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id','name', 'email']));
});



module.exports = router;