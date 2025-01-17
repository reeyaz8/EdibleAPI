const router = require('express').Router();
var MongoClient = require('mongodb').MongoClient;

router.get('', (req, res) => {
    var softBeveragesData = [];

    MongoClient.connect(process.env.mongoDBConnector, {useNewUrlParser: true ,useUnifiedTopology: true}).then((db) => {
        db.db('Beverage').collection('softBeverages').find({
            name: {$regex: req.query.searchq, $options: "$i"}
        }).toArray((function(err, result){
            if (err) throw res.status(400).send('Error')
            for (i =0; i< result.length; i++) {
                softBeveragesData[i] = result[i]
            }
        res.status(200).send(softBeveragesData)
        }))
    })
});

module.exports = router;