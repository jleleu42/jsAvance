//module.exports = (io) => {
    var express = require('express');
    var router = express.Router();
    var app = require('express')();
    var http = require('http').Server(app);
    var io = require('socket.io')(http);

    var nickname = "";
    var cpt = 0
    var online = [];

    app.get('/', function (req, res) {
        //res.sendFile(__dirname + '/index.html');
        res.render('chat/chat', {
            title: 'Vidéconf',
            slogan: 'votre site web de vidéo conférence'
        });
    });

    function isOnline() {
        retour = "";
        online.forEach(function (element) {
            retour += " user " + element;
        });
        retour += " connected";
        return retour;
    }
    isOnline();

    io.on('connection', function (socket) {
        socket.nickname = cpt;
        cpt++
        online.push(cpt);
        io.emit('info co', 'Utilisateur connecté : user ' + socket.nickname);
        io.emit('online', isOnline());

        socket.on('disconnect', function () {
            io.emit('info co', 'Utilisateur déconnecté : user ' + socket.nickname);
            online.splice(online.indexOf(socket.nickname), 1);
            io.emit('online', isOnline());
        });
        socket.on('chat message', function (msg) {
            socket.broadcast.emit('chat message', msg);
        });

        socket.on('typing', function (msg) {
            socket.broadcast.emit('typing', socket.nickname + " is writing...");
        });
        socket.on('stopTyping', function (msg) {
            socket.broadcast.emit('stopTyping', ".");
        });
    });



    // envoi a tous le monde
    //io.emit('some event' , { for: 'everyone' });     

    // envoi a tous le monde sauf notre socket
    /*io.on('connection', function (socket) {
        socket.broadcast.emit('hi');
    });*/
    
    module.exports = router

//    return router;
//}