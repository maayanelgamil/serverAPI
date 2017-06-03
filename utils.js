/**
 * Created by Maayan on 5/31/2017.
 */
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

var config = {
    userName: 'maayankeren',
    password: 'Aa123456',
    server: 'maayankeren.database.windows.net',
    requestTimeout: 15000,
    options: {encrypt: true, database: 'mk_db'}
};

var connection;

exports.Select = function(query) {
  return new Promise(function(resolve,reject) {

      var req = new Request(query, function (err, rowCount) {
          if (err) {
              console.log(err);
              reject(err.message);
          }
      });
      var ans = [];
      var properties = [];
      connection = new Connection(config);
      connection.on('connect', function(err) {
          if (err) {
              console.error('error connecting: ' + err.message);
              reject(err);
          }
          console.log('connection on');
          var dbReq = new Request(query, function (err, rowCount) {
              if (err) {
                  console.log(err);
                  reject(err);
              }
          });

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
          connection.close();
          resolve(ans);
      });
      connection.execSql(req);
        });
    });
}

exports.Insert= function(query) {
    return new Promise(function(resolve,reject) {
        var req = new Request(query, function (err) {
            if (err) {
                console.log(err);
                reject(err.message);
            }
        });
        connection = new Connection(config);
        connection.on('connect', function(err) {
            if (err) {
                console.error('error connecting: ' + err.message);
                reject(err);
            }
            console.log('connection on');
            var dbReq = new Request(query, function (err, rowCount) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
            });
        req.on('requestCompleted', function () {
            console.log("request completed to insert: " + query);
            connection.close();
            if(reject)
                resolve(true);
            else
                resolve(false);
        });
        try{
            connection.execSql(req);
        }catch(err) {
            reject(err.message);
            console.log(err);
           }
         });
    });
}

exports.Delete= function(query) {
    return new Promise(function(resolve,reject) {
        var req = new Request(query, function (err) {
            if (err) {
                console.log(err);
                reject(err.message);
            }
        });
        connection = new Connection(config);
        connection.on('connect', function(err) {
            if (err) {
                console.error('error connecting: ' + err.message);
                reject(err);
            }
            console.log('connection on');
            var dbReq = new Request(query, function (err, rowCount) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
            });

        req.on('requestCompleted', function () {
            console.log("request completed");
            connection.close();
        });
        connection.execSql(req);
    });
});
}

exports.getInsertScript = function(sql, values) {
    sql += " VALUES ( '"
    for(var i = 0; i < values.length -1 ; i++) {
        sql += values[i] + "' , '";
    }
    sql +=values[i] + "')";
    return sql;
}