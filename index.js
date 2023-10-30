const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/users')
const auth = require('./routes/auth')
const config = require('config');
const cors = require('cors');
const category = require('./routes/category');
const products = require('./routes/products');


if(!config.get("jwtPrivateKey")){
    console.error("Fatal Error: jwtPrivateKey is not define..!");
    process.exit(1);
  }
  
mongoose.connect('mongodb://localhost/oshop')
.then(() => console.log('mongoDB is successfully connected..!'))
.catch(err => console.error('Could not connected mongoDB..!', err));



const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/users', users)
app.use('/api/auth', auth);
app.use('/api/category', category);
app.use('/api/products', products)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`The listening port is ${port}`));

