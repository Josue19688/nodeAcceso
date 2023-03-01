// Servidor de Express
const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');
const path     = require('path');
const cors     = require('cors');

const Sockets  = require('../models/sockets');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {

        this.app  = express();
        this.port = process.env.PORT;

       
        dbConnection();
        this.server = http.createServer( this.app );
        this.io = socketio( this.server, { /* configuraciones */ } );
    }

    middlewares() {
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );

        /**
         * Falta configurar los host para delimitar dominios 
         * que nos hagan solicitudes a nuestro servicio
         */
        this.app.use( cors() );

        this.app.use( express.json() );
        this.app.use('/api/login', require('../router/auth') );
        this.app.use('/api/mensajes', require('../router/mensajes'));
        this.app.use('/api/novedades',require('../router/novedades'));
        this.app.use('/api/visitas',require('../router/visitas'));
    }

    configurarSockets() {
        new Sockets( this.io );
    }

    execute() {
        this.middlewares();
        this.configurarSockets();
        this.server.listen( this.port, () => {
            console.log('Server corriendo en puerto:', this.port );
        });
    }

}


module.exports = Server;