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
    ",[LastLogin]"+
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