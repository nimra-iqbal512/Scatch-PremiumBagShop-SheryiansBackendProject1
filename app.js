const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');

const db = require('./config/mongoose-connection');
const defaultRouter = require('./routes/index');
const ownersRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');

require('dotenv').config(); // With this we can use all the variables stored inside '.env' file. Syntax: process.env.VARIABLE_NAME

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', defaultRouter);
app.use('/owners', ownersRouter); //owners k related sari requests ownerRouter py bhej di jaye.
app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.listen(3000, () => {
  console.log('Ya ALi a.s Madad');
});