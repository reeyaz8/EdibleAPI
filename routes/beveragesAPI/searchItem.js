const router = require('express').Router();
var MongoClient = require('mongodb').MongoClient;

router.get('', (req, res) => {
    var col;
    if(req.query.type == 'soft'){
        col = 'softBeverages';
    }else{
        col = 'hardBeverages';
    }
    MongoClient.connect(process.env.mongoDBConnector, {useNewUrlParser: true ,useUnifiedTopology: true}).then(function(db) {
        db.db('Beverage').collection(col).find({
            name: {$regex: req.query.searchq, $options: "$i"}
        }, {projection: {
            _id:1, name:1, price:1,  amt: 1, unit: 1
        }}).toArray((function(err, result){
            if (err) throw res.status(400).send('Error')
            return res.status(200).send(result)
        }))
    })

});

module.exports = router;