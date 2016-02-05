(function () {
    'use strict';

    var express = require('express');
    var app = express();
    var http = require('http').Server(app);
    var io = require('socket.io')(http);

    app.use(express.static('./public/'));

    io.on('connection', function (socket) {
        socket.on('chat message', function(msg){
            io.emit('chat message', msg);
        });
    });

    io.on('connection', function (socket) {
        socket.on('chat message', function (msg) {
            console.log('message: ' + msg);
        });
    });

    http.listen(8080, function () {
        console.log('listening on *:3000');
    });

})();