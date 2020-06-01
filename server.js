var express = require('express');
const dotenv = require('dotenv');
const parser = require('body-parser');

app = express();
app.use(express.json());
app.use(parser.json());
dotenv.config();
const login_route = require('./routes/login');
const register_route = require('./routes/register');
const allItem_route = require('./routes/allItem');
const mainItem_route = require('./routes/mainItem');
const Overhead_route = require('./routes/overhead');
const Search_route = require('./routes/searchItem');
const Sample_route = require('./routes/sample');

app.use('/edible/login', login_route);
app.use('/edible/register', register_route);
app.use('/edible/allItem', allItem_route);
app.use('/edible/mainItem', mainItem_route);
app.use('/edible/overhead', Overhead_route);
app.use('/edible/search', Search_route);
app.use('/edible/sample', Sample_route);


app.listen(3000, '192.168.254.8' ,()=>{
    console.log('app is running')
});
