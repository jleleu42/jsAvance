$(function () {
    
    var socket = io();
    $('form').submit(function (e) {
        alert("tt");
        e.preventDefault();
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });
    $('#m').on('input', function () {
        socket.emit('typing');
    });
    $('#m').on('blur', function () {
        socket.emit('stopTyping');
    });
    socket.on('chat message', function (msg) {
        $('#messages').append($('<li>').text(msg));
    });
    socket.on('online', function (msg) {
        $('#online').replaceWith($('<p style="color:aliceblue">').text(msg));
    });
    socket.on('info co', function (msg) {
        $('#messages').append($('<h4>').text(msg));
    });
    socket.on('typing', function (msg) {
        $('#typing').replaceWith($('<p style="color:aliceblue">').text(msg));
    });
    socket.on('stopTyping', function (msg) {
        $('#typing').replaceWith($('<p style="color:aliceblue">').text(msg));
    });
});