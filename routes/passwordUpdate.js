const router= require('express').Router();
const bcrypt = require('bcryptjs');
var MongoClient = require('mongodb').MongoClient;

router.post('', (req,res) => {
    MongoClient.connect(process.env.mongoDBConnector, {useNewUrlParser: true ,useUnifiedTopology: true}).then((db) =>{

        db.db('Login').collection('Credentials').findOne({phone:req.body.phone})
        .then((data) =>{
            if (!data) {
                throw Error;
            }
            return data;
        }).then(async (data) =>{
            const validPass = await bcrypt.compare(req.body.oldpassword, data.password)
            return validPass;
        }).then((validPass) =>{
            if(!validPass) {
                throw Error;
            }
        }).then( async () => {
            const salt = await bcrypt.genSalt(8);
            const password = await bcrypt.hash(req.body.newpassword, salt);
            const update = await db.db('Login').collection("Credentials").updateOne({"phone":req.body.phone}, {"$set": {"password":password}});
            return res.status(200).send("Password Changed Successfully");
        }).catch(function(error) {
            return res.status(409).send('Invalid');
        })
    })
})

module.exports = router;