const mongo = require('mongoose');

const customerDetail = mongo.Schema({
    name:{
        type:String,
        required:true,
    },

    email:{
            type:String,
            required:true,
        },

    phone:{
        type:String,
        required:true,
    },
});

const customerCredentials = mongo.Schema({
    username:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required : true,
    }
})

module.exports = customerCredentials;
module.exports = customerDetail;