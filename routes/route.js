/**
 * Created by Maayan on 6/5/2017.
 */
var express = require('express');
var DButilsAzure = require('../utils');
var Constants = require('../Constants');
var router = express.Router();

//-------------------------------------------------------------------------------------------------------------------
router.get('/getDollarRate', function (req,res) {
    res.send("3.81");
});
//-------------------------------------------------------------------------------------------------------------------
router.get('/categories', function (req,res) {
    DButilsAzure.Select("Select * from Categories").then(function (result) {
        res.send(result);
    }).catch(function(err){ res.status(400).send(err);});
});
//-------------------------------------------------------------------------------------------------------------------
router.post('/addOrder', function (req,res) {
    var name = req.body[0].UserName;
    var shipping = req.body[0].ShipmentDate;
    var dollar = req.body[0].Dollar;
    var date =  new Date().toISOString().slice(0, 19).replace('T', ' ');

    var query = DButilsAzure.getInsertScript(Constants.insertOrder, [name, date, shipping, dollar]);
    DButilsAzure.Insert(query).then(function (result) {
        if(result == true){
            DButilsAzure.Select("Select * From Orders Where [UserName] = '"+ name + "' AND [OrderDate] ='" + date + "'")
                .then(function (result) {
                    var orderId = result[0].OrderID;
                    var cakesInOrdersQuery = Constants.insertCakesInOrders + "('";
                    var i;
                    for(i = 1; i <req.body.length-1; i++) {
                        var cakeId = req.body[i].CakeID;
                        var amount = req.body[i].Amount;
                        cakesInOrdersQuery += orderId +"','" + cakeId + "','"+amount+ "'),('";
                    }
                    var cakeId = req.body[i].CakeID;
                    var amount = req.body[i].Amount;
                    cakesInOrdersQuery += orderId +"','" + cakeId + "','"+amount+ "')";
                    DButilsAzure.Insert(cakesInOrdersQuery).then(function(result){
                        res.send(true);
                    });
                }).catch(function(err){
                res.send(err);
            });
        }
        else res.send(false);
    }).catch(function(err){ res.status(400).send(err);});
});
//-------------------------------------------------------------------------------------------------------------------
module.exports = router;
