/**
 * Created by Maayan on 6/3/2017.
 */
var express = require('express');
var DButilsAzure = require('../utils');
var Constants = require('../Constants');
var router = express.Router();

router.post('/register', function (req,res) {     //Add User
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
    var isAdmin = req.body[0].isAdmin ? req.body[0].isAdmin : 0;
    var q1 = req.body[1].Question1;
    var q2 = req.body[1].Question2;
    var a1 = req.body[1].Answer1;
    var a2 = req.body[1].Answer2;

    query = DButilsAzure.getInsertScript(Constants.usersInsert, [username, password, firstName, lastName, adress, city,
                                                            country, phone, mail, creditCard, isAdmin, q1, q2, a1, a2]);
    DButilsAzure.Insert(query).then(function (result) { //insert user's questions and answers
         if (result == true) {
                var c1 = req.body[2].category1;
                var c2 = req.body[2].category2;
                var c3 = req.body[2].category3;
                categoryQuery = DButilsAzure.getInsertScript(Constants.userCategoryInsert, [username, c1, c2, c3]);
                DButilsAzure.Insert(categoryQuery).then(function (result)
                    {
                             res.send(result);
                     }).catch(function(err){ res.status(400).send(err);});
                }
            else  res.send(false);
        }).catch(function(err){
            res.status(400).send(err);});
    });
//-------------------------------------------------------------------------------------------------------------------
router.delete('/deleteUser', function (req,res) {
        var userId = req.body.UserName;
        if(userId){
        DButilsAzure.Delete("DELETE from [Users] WHERE [UserName] = '" + userId + "'").then(function (result) {
            res.status(200).send('Delete succeeded');
        }).catch(function(err){ res.status(400).send(err);});
    }else{
            res.status(400).send('Delete User faild: Since the user name is invalid ');
    }
});
//-------------------------------------------------------------------------------------------------------------------
router.get('/getAll', function (req,res,next) {
    DButilsAzure.Select('Select * from Users').then(function (result) {
        res.send(result);
    }).catch(function(err){ res.status(400).send(err);});
});
//-------------------------------------------------------------------------------------------------------------------
router.put('/login', function (req,res,next) {
    var name = req.body.UserName;
    var password = req.body.Password;
    DButilsAzure.Select("Select * from Users Where UserName = '" + name + "' AND Password = '" + password + "'").then(function (result) {
        if(result.length >0)
            res.send(true);
        else
            res.send(false);
    }).catch(function(err){ res.status(400).send(err);});
});
//-------------------------------------------------------------------------------------------------------------------
router.get('/questions/:name', function (req,res,next) {
    var name = req.params.name;
    DButilsAzure.Select("Select [Question1],[Question2] from Users Where UserName = '" + name + "'").then(function (result) {
        res.send(result[0]);
    }).catch(function(err){ res.status(400).send(err);});
});
//-------------------------------------------------------------------------------------------------------------------
router.put('/restorePassword', function (req,res,next) {
    var name = req.body.UserName;
    var a1 = req.body.Answer1;
    var a2 = req.body.Answer2;
    DButilsAzure.Select("Select [Password] from Users Where UserName = '" + name + "' AND Answer1 = '"+ a1 + "' AND Answer2 = '"+ a2 + "'")
        .then(function (result) {
            if(result[0] == string.empty())
                res.status(400).send();
            else
                res.send(result[0]);
    }).catch(function(err){ res.status(400).send(err);});
});
//-------------------------------------------------------------------------------------------------------------------
router.get('/orders/:name', function (req,res,next) {
    var name = req.params.name;
    DButilsAzure.Select("Select * from Orders Where [UserName] = '" + name + "'").then(function (result) {
        res.send(result);
    }).catch(function(err){ res.status(400).send(err);});
});
//-------------------------------------------------------------------------------------------------------------------
router.post('/addToCart', function (req,res,next) {
    var name = req.body.UserName;
    var cake = req.body.CakeID;
    var amount = req.body.Amount;
    var query = DButilsAzure.getInsertScript(Constants.insertToCart, [name, cake, amount]);
    DButilsAzure.Insert(query).then(function (result) {
        if(result == true)
            res.send(result);
        else
            res.send(false);
    }).catch(function(err){ res.status(400).send(err);});
});
//-------------------------------------------------------------------------------------------------------------------
router.delete('/deleteFromCart', function (req,res) {
    var name = req.body.UserName;
    var cake = req.body.CakeID;
    DButilsAzure.Delete("DELETE from [CakesInCarts] WHERE [UserName] = '" + name + "' AND [CakeID] = '" + cake + "'").then(function (result) {
        res.status(200).send('Delete succeeded');
    }).catch(function(err){ res.status(400).send(err);});
});
//-------------------------------------------------------------------------------------------------------------------
router.get('/recommandation/:name', function (req,res) {
    var name = req.params.name;
    var query = Constants.recommendedCakesScript(name);
    DButilsAzure.Select(query).then(function (result) {
        if(result.length == 0)
            DButilsAzure.Select(Constants.recommendedCakesCategory(name)).then (function (result) {
                res.send(result);
            });
        else
            res.send(result);
    }).catch(function(err){ res.status(400).send(err);});
});

module.exports = router;
