module.exports = (io) => {
    var express = require('express');
    var router = express.Router();
    var app = require('express')();
    var http = require('http').Server(app);
    var io = require('socket.io')(http);



    router.get('/', function (req, res, next) {


        io.on('connection', function (socket) {
            console.log('ok je suis co')
          /*  socket.nickname = cpt;
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
            });*/
        });

        res.render('chat/chat', {
            title: 'Vidéconf',
            slogan: 'votre site web de vidéo conférence'
        });


    });





    return router;
}