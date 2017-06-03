/**
 * Created by Maayan on 6/3/2017.
 */
var express = require('express');
var DButilsAzure = require('../utils');
var Constants = require('../Constants');
var router = express.Router();

router.post('/register', function (req,res) {
    //Need to check if the user name exists !
    var username = req.body[0].UseName;
    var password = req.body[0].Password;
    var firstName = req.body[0].FirstName;
    var lastName = req.body[0].LastName;
    var adress = req.body[0].Adress;
    var city = req.body[0].City;
    var country = req.body[0].Country;
    var phone = req.body[0].Phone;
    var mail = req.body[0].Mail;
    var creditCard = req.body[0].CreditCardNumber;
    var isAdmin = req.body[0].isAdmin ? req.body[0].isAdmin : 0 ;
    var date = new Date();
    var currDate = date.getHours();

    query = DButilsAzure.getInsertScript(Constants.usersInsert, [username, password, firstName, lastName, adress,city, country, phone, mail, creditCard, currDate, isAdmin]);
    DButilsAzure.Insert(connection, query).then( function (result) {
        res.send(result);
    });
});

module.exports = router;
