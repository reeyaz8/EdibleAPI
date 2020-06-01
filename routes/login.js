const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var MongoClient = require('mongodb').MongoClient;
router.post('', (req, res)=> 
    MongoClient.connect(process.env.mongoDBConnector, {useNewUrlParser: true ,useUnifiedTopology: true}).then(function(db){
        db.db('Login').collection('Credentials').findOne({phone:req.body.phone})
        .then((data) =>{
            if(!data) res.status(404).send('No User');
            return data;
        })
        .then(async(data)=> {
            const validPass = await bcrypt.compare(req.body.password, data.password)
            if(!validPass) res.status(401).send('Invalid Authorization')
            return data;
        })
        .then((data) => {
            var token = jwt.sign({phone:req.body.phone, random: Math.random() * (100000000000 - 1000) + 1000}, process.env.JWT_SECRET_KEY, {algorithm:'HS256'})
            res.status(200).send({uid: data._id, token:token})
            return;
        })
        .catch(function(error) {
            res.status(500).send('Invalid')
        })
    })
);
module.exports = router;