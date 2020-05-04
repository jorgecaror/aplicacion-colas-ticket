const fs = require("fs");


class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require("../data/data.json");


        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;

        } else {
            this.reiniciarConteo();
        }
    }

    siguiente() {

        this.ultimo += 1; //aumenta el contador

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${ this.ultimo}`;

    }

    getUltimoTicket() {
        return `Ticket ${ this.ultimo}`;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket(escritorio) {

        if (this.tickets.length === 0) {
            return 'no hay tickets';
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift(); //elimino la primera posición del arreglo

        //creo un nuevo ticket, el que se atenderá
        let atenderTicket = new Ticket(numeroTicket, escritorio);

        //agregar el ticket al inicio del arreglo
        this.ultimos4.unshift(atenderTicket);

        //verificar que solo existan 4 tickets en el arreglo
        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); //borra el ultimo
        }

        console.log('Ultimos 4');
        console.log(this.ultimos4);

        this.grabarArchivo();

        return atenderTicket;
    }


    reiniciarConteo() {

        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];

        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();

    }

    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };

        //transformar el jsonData en string 
        let jsonDataString = JSON.stringify(jsonData);

        //path donde se guarda el archivo | el dato a guardar en el archivo
        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }


}

module.exports = {
    TicketControl
}