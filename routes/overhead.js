const router = require('express').Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId; 

router.get('', (req, res) => {
    
    MongoClient.connect(process.env.mongoDBConnector, {useNewUrlParser: true ,useUnifiedTopology: true}).then(function(db) {
        db.db('Fruit').collection('allFruit').findOne({'_id': ObjectId(req.query.id)}, {projection: {
            _id:0, nutrition:1, description:1
        }}
        ).then((data) => {
            if(!data) return res.status(404).send('No Overhead');
            var finalData = [];
            finalData.push(data)
            res.status(200).send(finalData)
        });
    })

});

module.exports = router;