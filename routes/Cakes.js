
var express = require('express');
var DButilsAzure = require('../utils');
var Constants = require('../Constants');
var router = express.Router();

router.get('/', function (req,res,next) {
    DButilsAzure.Select('Select * from Cakes').then(function (result) {
        res.send(result).catch(function(err){ res.status(400).send(err);});
    });
});
//-------------------------------------------------------------------------------------------------------------------
router.get('/available/:id/:amount', function (req,res,next) {
    var id = req.params.id;
    var amount = req.params.amount;
    DButilsAzure.Select("Select * from Cakes Where [CakeID] = '" + id + "' AND [StockAmount] >= '"+ amount + "'")
    .then(function (result) {
        if(result.length > 0)
            res.send(true);
        else
            res.send(false);
    }).catch(function(err){ res.status(400).send(err);});
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
        }).catch(function(err){
            res.status(400).send(err);});
});
//-------------------------------------------------------------------------------------------------------------------
router.delete('/deleteCake', function (req,res) {
    var cakeId = req.body.CakeID;
    DButilsAzure.Delete("DELETE from [Cakes] WHERE [CakeID] = '" + cakeId + "'").then(function (result) {
        res.status(200).send('Delete succeeded');
        //The result doenn't seem to be sent to the user
    }).catch(function(err){ res.status(400).send(err);});
});
//-------------------------------------------------------------------------------------------------------------------
router.get('/getNewCakes', function (req,res) {
    DButilsAzure.Select("SELECT TOP 5 * from [Cakes] ORDER BY CakeID DESC").then(function (result) {
        res.send(result);
    }).catch(function(err){ res.status(400).send(err);});
});
//-------------------------------------------------------------------------------------------------------------------
router.get('/top5', function (req,res) {
    DButilsAzure.Select("SELECT TOP 5 CakeID FROM (SELECT CakeID, SUM(Amount) AS Total FROM CakesInOrders GROUP BY CakeID) totals ORDER BY Total DESC")
        .then(function (result) {
            var c1 = result[0].CakeID;
            var c2 = result[1].CakeID;
            var c3 = result[2].CakeID;
            var c4 = result[3].CakeID;
            var c5 = result[4].CakeID;
            DButilsAzure.Select("Select * From Cakes Where CakeID = '" + c1 + "' OR CakeID = '" + c2  + "' OR CakeID = '" + c3 +
                                "' OR CakeID ='" + c4 + "' OR CakeID = '" + c5 +"'").then(function(resolve){
                    res.send(resolve);
                }).catch(function(){
                console.log("Promise Rejected");
                res.send("Rejected");
            });
    }).catch(function(err){ res.status(400).send(err);});
});
//-------------------------------------------------------------------------------------------------------------------
router.get('/byCategory/:categoryId', function (req,res,next) {
    var category = req.params.categoryId;
    var query = Constants.cakesCategories(category);
    DButilsAzure.Select(query)
        .then(function (result) {
                res.send(result);
        }).catch(function(err){ res.status(400).send(err);});
});
//-------------------------------------------------------------------------------------------------------------------
router.get('/byID/:cakeId', function (req,res,next) {
    var cake = req.params.cakeId;
    DButilsAzure.Select("Select * From Cakes Where CakeId = " + cake)
        .then(function (result) {
            res.send(result);
        }).catch(function(err){ res.status(400).send(err);});
});
//-------------------------------------------------------------------------------------------------------------------
router.get('/cakesInOrder/:orderID', function (req,res,next) {
    var orderID = req.params.orderID;
    DButilsAzure.Select("Select * from CakesInOrders Where [OrderID] = '" + orderID + "'").then(function (result) {
        res.send(result);
    }).catch(function(err){ res.status(400).send(err);});
});
//-------------------------------------------------------------------------------------------------------------------
router.get('/byName/:name', function (req,res,next) {
    var cake = req.params.name;
    DButilsAzure.Select("Select * from Cakes where [CakeName] = '" + cake + "'").then(function (result) {
        res.send(result);
    }).catch(function(err){ res.status(400).send(err);});
});

module.exports = router;