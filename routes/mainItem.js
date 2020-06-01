const router = require('express').Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId; 

router.get('', (req, res) => {
    var recommendData = [];
    var hotsaleData = [];
    var recommendObject = Object();
    var hotsaleObject = Object();
    var finalData = Object();
    
    MongoClient.connect(process.env.mongoDBConnector, {useNewUrlParser: true ,useUnifiedTopology: true}).then(function(db) {
        db.db(req.query.databaseName).collection('MainPage').find({}, 
        ).toArray(async(err, result) => {
            if (err) throw res.status(400).send('Error')
            for (i =0; i< result[0]['recommend'].length; i++){
                var fruit = await  db.db('Fruit').collection('allFruit').findOne({'_id':ObjectId(result[0]['recommend'][i])},
                {projection : {
                    _id : 1, fullName:1, rating:1 , price:1
                    }
                });
                recommendData[i] = fruit;
            }
            recommendObject['recommend'] = recommendData;
            for (i =0; i< result[0]['hotsale'].length; i++){
                var fruit = await  db.db('Fruit').collection('allFruit').findOne({'_id':ObjectId(result[0]['hotsale'][i])},
                {projection : {
                    _id : 1, fullName:1, rating:1 , price:1
                    }
                });
                hotsaleData[i] = fruit;
            }
            hotsaleObject['hotsale'] = hotsaleData;
            finalData = {...recommendObject, ...hotsaleObject}
            res.status(200).send(JSON.stringify(finalData))
        })
    })

});

module.exports = router;