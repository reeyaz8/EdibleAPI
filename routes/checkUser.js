var MongoClient = require('mongodb').MongoClient;
const router = require('express').Router();

router.get('', (req, res) => MongoClient.connect(process.env.mongoDBConnector, {useNewUrlParser: true ,useUnifiedTopology: true}).then(function(db){
    db.db('Login').collection('Credentials').findOne({phone:req.query.phone}, {projection:{
        _id:0, phone:1
    }})
    .then((data) =>{
        if(!data) {
        return res.status(200).send('gfbgg')
        }else{
            return res.status(409).send('User Exists')
        }
    })
})
);
module.exports = router;