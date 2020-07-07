const router = require('express').Router();
var MongoClient = require('mongodb').MongoClient;

router.get('', (req, res) => {
    MongoClient.connect(process.env.mongoDBConnector, {useNewUrlParser: true ,useUnifiedTopology: true}).then(async(db) => {
        var data = await db.db('Fruit').collection('allFruit').aggregate(
            [
                {
                    $sample: {size:6}
                },
            ]
        ).toArray();
    })
});

module.exports = router;