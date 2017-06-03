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
    var date = new Date();
    var currDate = date.getHours();
    var q1 = req.body[1].question1;
    var q2 = req.body[1].question2;
    var a1 = req.body[1].answer1;
    var a2 = req.body[1].answer2;

    query = DButilsAzure.getInsertScript(Constants.usersInsert, [username, password, firstName, lastName, adress, city,
                                                            country, phone, mail, creditCard, currDate, isAdmin, q1, q2, a1, a2]);
    DButilsAzure.Insert(query).then(function (result) { //insert user's questions and answers
         if (result == true) {
                var c1 = req.body[2].category1;
                var c2 = req.body[2].category2;
                var c3 = req.body[2].category3;
                categoryQuery = DButilsAzure.getInsertScript(Constants.userCategoryInsert, [username, c1, c2, c3]);
                DButilsAzure.Insert(categoryQuery).then(function (result)
                    {
                             res.send(result);
                     });
                }
            else  res.send(false);
        });
    });
//-------------------------------------------------------------------------------------------------------------------
router.delete('/deleteUser', function (req,res) {
        var userId = req.body.UserName;
        if(userId){
        DButilsAzure.Delete("DELETE from [Users] WHERE [UserName] = '" + userId + "'").then(function (result) {
            res.send(result);
        });
    }else{
        throw new Error('Delete User Faild: Since the user name is invalid ');
    }
});
//-------------------------------------------------------------------------------------------------------------------
router.get('/getAllUsers', function (req,res,next) {
    DButilsAzure.Select('Select * from Users').then(function (result) {
        res.send(result);
    });
});

module.exports = router;