const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var MongoClient = require('mongodb').MongoClient;

router.post('', (req, res, next) => {
    MongoClient.connect(process.env.mongoDBConnector, {useNewUrlParser: true ,useUnifiedTopology: true}).then((db) => {
        db.db('Login').collection('Credentials').findOne({phone:req.body.phone},{projection:{_id:0, phone:1}}).then((data)=> {
            if(data != null){
                let err = new Error("Already Exists");
                err.status = 409;
                throw err;
            }
            return;
        })
        .then(async () => {
            const salting = await bcrypt.genSalt(8);
            const hashpassword = await bcrypt.hash(req.body.password, salting);
            return hashpassword;
        })
        .then((hashpassword) => {
            const newUserCredentials = {
                phone: req.body.phone,
                password: hashpassword,
                c_code: req.body.c_code
            }
            db.db('Login').collection('Credentials').insertOne(newUserCredentials).then((data)=>{
            })
            return newUserCredentials._id;
        })
        .then((ID) => {
            const newUserDetail = {
                _id: ID,
                name: req.body.name,
                gender: req.body.gender
            }
            db.db('Login').collection('CustomerDetail').insertOne(newUserDetail).then(()=> {
                res.status(201).send('User Created')
            })
        })
    }).catch(function(error) {
        res.status(error.status).send(error.Error)
    })
})

module.exports = router;