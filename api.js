 var express = require('express');
 var path = require('path');
 var favicon = require('serve-favicon');
 var logger = require('morgan');
 var cookieParser = require('cookie-parser');
 var Connection = require('tedious').Connection;
 var bodyParser = require('body-parser');
 var http = require('http');         // protocol
 var app = express();
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

//----------------------------------------------------------------------------------------------------------------------

exports.Select = function(connection, query, callback) {
    var req = new Request(query, function (err, rowCount) {
        if (err) {
            console.log(err);
			return;
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
        for (i=0; i<row.length; i++) {
            item[properties[i]] = row[i].value;
        }
        ans.push(item);
    });

    req.on('requestCompleted', function () {
        //don't forget handle your errors
        console.log('request Completed: '+ req.rowCount + ' row(s) returned');
        console.log(ans);
        callback(ans);
    });



    connection.execSql(req);

};