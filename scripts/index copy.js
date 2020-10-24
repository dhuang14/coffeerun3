var http = require('http');
var fs = require('fs');
var path = require('path');
var extract = require('./extract');
const extractFilePath = require('./extract');
var wss = require('./websockets-server');
var handleError =  function(err, res) { 
    console.log("handling error");
    res.writeHead(404);
    res.write("404 File not found");
    res.end();
};
var server = http.createServer(function (req, res) {
    console.log('Responding to a request.');
    var filepath = extractFilePath(req.url);
    fs.readFile(filepath, function (err, data) { 
        if (err) {  
            handleError(err, res);   
            return;
        } else { res.end(data); }
    });
});
server.listen(3000);