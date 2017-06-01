/**
 * Created by Maayan on 5/31/2017.
 */
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

exports.Select = function(connection, query) {
  return new Promise(function(resolve,reject) {
      var req = new Request(query, function (err, rowCount) {
          if (err) {
              console.log(err);
              reject(err.message);
          }
      });
      var ans = [];
      var properties = [];
      req.on('columnMetadata', function (columns) {
          columns.forEach(function (column) {
              if (column.colName != null)
                  properties.push(column.colName);
          });
      });
      req.on('row', function (row) {
          var item = {};
          for (i = 0; i < row.length; i++) {
              item[properties[i]] = row[i].value;
          }
          ans.push(item);
      });

      req.on('requestCompleted', function () {
          //don't forget handle your errors
          console.log('request Completed: ' + req.rowCount + ' row(s) returned');
          console.log(ans);
          resolve(ans);
      });

      connection.execSql(req);
  });
};

exports.Insert= function(connection, query) {
    return new Promise(function(resolve,reject) {
        var req = new Request(query, function (err) {
            if (err) {
                console.log(err);
                reject(err.message);
            }
        });
        req.on('requestCompleted', function () {
            console.log("request completed with: " + req.rowsAffected + "rows");
        });
        connection.execSql(req);
        resolve(true);
    });
};

exports.getInsertScript = function(sql, values) {
    sql += " VALUES ( '"
    for(var i = 0; i < values.length -1 ; i++) {
        sql += values[i] + "' , '";
    }
    sql +=values[i] + "')";
    return sql;
}