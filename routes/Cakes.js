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

module.exports = router;