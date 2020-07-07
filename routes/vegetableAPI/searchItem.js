const router = require('express').Router();
var MongoClient = require('mongodb').MongoClient;

router.get('', (req, res) => {
    MongoClient.connect(process.env.mongoDBConnector, {useNewUrlParser: true ,useUnifiedTopology: true}).then(function(db) {
        db.db('Vegetable').collection('allVegetable').find({
            name: {$regex: req.query.searchq, $options: "$i"}
        }, {projection: {
            _id:1, name:1, price:1
        }}).toArray((function(err, result){
            if (err) throw res.status(400).send('Error')
            return res.status(200).send(result)
        }))
    })

});

module.exports = router;