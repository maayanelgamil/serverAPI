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

module.exports = router;