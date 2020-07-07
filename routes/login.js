const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var MongoClient = require('mongodb').MongoClient;

router.post('', (req, res)=> 
    MongoClient.connect(process.env.mongoDBConnector, {useNewUrlParser: true ,useUnifiedTopology: true}).then(function(db){
        db.db('Login').collection('Credentials').findOne({phone:req.body.phone})
        .then((data) =>{
            if(!data) {
                let err = new Error("Invalid Username");
                err.status = 404;
                throw err;
            }
            return data;
        })
        .then(async(data)=> {
            const validPass = await bcrypt.compare(req.body.password, data.password)
            if(!validPass) {
                let err = new Error("Invalid Password");
                err.status = 401;
                throw err;
            }
            return data;
        })
        .then((data) => {
            db.db('Login').collection('CustomerDetail').findOne({_id:data._id}).then((data)=> {
            res.status(200).send({name: data.name, gender:data.gender})
            })
            return;
        })
        .catch(function(error) {
            res.status(error.status).send(error.Error)
        })
    })
);
module.exports = router;