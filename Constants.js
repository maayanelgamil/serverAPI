/**
 * Created by Maayan on 6/1/2017.
 */


exports.usersInsert = "INSERT INTO [Users]"+
    "([UserName]"+
    ",[Password]"+
    ",[FirstName]"+
    ",[LastName]"+
    ",[Adress]"+
    ",[City]"+
    ",[Country]"+
    ",[Phone]"+
    ",[Mail]"+
    ",[CreditCardNumber]"+
    ",[isADmin]" +
    ",[Question1]"+
   " ,[Question2]"+
    ",[Answer1]"+
    ",[Answer2])";

exports.userCategoryInsert = "INSERT INTO [dbo].[UsersCategories]"+
    "([UserName]"+
    ",[Category1]"+
    ",[Category2]"+
    ",[Category3])";

exports.insertOrder = "INSERT INTO [dbo].[Orders]"+
    "([UserName]" +
    ",[OrderDate]" +
    ",[ShipmentDate]" +
    ",[Dollar])" ;

exports.insertCakesInOrders = "INSERT INTO [dbo].[CakesInOrders]"+
            "([OrderID]"+
            ",[CakeID]"+
            ",[Amount])"+
            "VALUES ";
exports.insertCake = "INSERT INTO [dbo].[Cakes]"+
    "([CakeName]"+
    ",[SuplierID]"+
    ",[Description]"+
    ",[price]"+
    ",[StockAmount])";

exports.insertToCart = "INSERT INTO [dbo].[CakesInCarts]"+
    "([UserName]"+
    ",[CakeID]"+
    ",[Amount])";

exports.CurrentTime = function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}
