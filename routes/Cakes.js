/**
 * Created by Maayan on 6/3/2017.
 */
/**
 * Created by Maayan on 6/3/2017.
 */
var express = require('express');
var DButilsAzure = require('../utils');
var Constants = require('../Constants');
var router = express.Router();


router.get('/', function (req,res,next) {
    DButilsAzure.Select('Select * from Cakes').then(function (result) {
        res.send(result);
    });
});
//-------------------------------------------------------------------------------------------------------------------
router.put('/available', function (req,res,next) {
    var id = req.body.CakeID;
    var amount = req.body.Amount;
    DButilsAzure.Select("Select * from Cakes Where [CakeID] = '" + id + "' AND [StockAmount] >= '"+ amount + "'")
    .then(function (result) {
        if(result.length > 0)
            res.send(true);
        else
            res.send(false);
    });
});
//-------------------------------------------------------------------------------------------------------------------
router.post('/addCake', function (req,res,next) {
    var name = req.body.CakeName;
    var suplierId = req.body.SuplierID;
    var description = req.body.Description;
    var price = req.body.Price;
    var amount = req.body.StockAmount;

    var query = DButilsAzure.getInsertScript(Constants.insertCake, [name, suplierId, description, price, amount]);
    DButilsAzure.Insert(query).then(function (result) {
            res.send(result);
        });
});
//-------------------------------------------------------------------------------------------------------------------
router.delete('/deleteCake', function (req,res) {
    var cakeId = req.body.CakeID;
    DButilsAzure.Delete("DELETE from [Cakes] WHERE [CakeID] = '" + cakeId + "'").then(function (result) {
       // res.status(200).send('Delete succeeded');
        //The result doenn't seem to be sent to the user
    });
});

module.exports = router;