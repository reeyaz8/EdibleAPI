var express = require('express');
const dotenv = require('dotenv');
const parser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

app = express();
app.use(express.json());
app.use(parser.json());
dotenv.config();

const login_route = require('./routes/login');
const register_route = require('./routes/register');

const Fruit_allItem_route = require('./routes/fruitAPI/allItem');
const Fruit_mainItem_route = require('./routes/fruitAPI/mainItem');
const Fruit_Overhead_route = require('./routes/fruitAPI/overhead');
const Fruit_Search_route = require('./routes/fruitAPI/searchItem');

const Vegetable_allItem_route = require('./routes/vegetableAPI/allItem');
const Vegetable_mainItem_route = require('./routes/vegetableAPI/mainItem');
const Vegetable_Search_route = require('./routes/vegetableAPI/searchItem');

const Sample_route = require('./routes/sample');

app.use('/edible/login', login_route);
app.use('/edible/register', register_route);

app.use('/edible/fruit/allItem', Fruit_allItem_route);
app.use('/edible/fruit/mainItem', Fruit_mainItem_route);
app.use('/edible/fruit/overhead', Fruit_Overhead_route);
app.use('/edible/fruit/search', Fruit_Search_route);

app.use('/edible/vegetable/allItem', Vegetable_allItem_route);
app.use('/edible/vegetable/mainItem', Vegetable_mainItem_route);
app.use('/edible/vegetable/search', Vegetable_Search_route);


app.listen(3000, '192.168.254.8' ,()=>{
    console.log('app is running')
});