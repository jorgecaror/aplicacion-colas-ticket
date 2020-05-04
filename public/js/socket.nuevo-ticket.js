//Comando para establecer la comunicación

var socket = io();

var label = $('#lblNuevoTicket');




socket.on('connect', function() {

    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {

    console.log('Desconectado del servidor');

});

socket.on('estadoActual', function(estadoActual) {

    label.text(estadoActual.actual);
});

//listener al boton de generar nuevo ticket con jquery
$('button').on('click', function() {

    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);

    });

});