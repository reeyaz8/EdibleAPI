const mongoose = require('mongoose');

const loginModel = new mongoose.Schema({
    phone:{
        type:String,
        required:true,
    },

    password:{
            type:String,
            required:true,
    },
});

module.exports = mongoose.model('Login',loginModel, 'Credentials');