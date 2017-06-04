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

