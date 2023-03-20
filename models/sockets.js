const { comprobarJWT } = require('../helpers/jwt');
const { usuarioConectado, usuarioDesconectado, getUsuarios } = require('../controllers/sockets');

class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async( socket ) => {

            const [ valido, uid ] = comprobarJWT( socket.handshake.query['x-token']  );
            console.log(socket.handshake.query['x-token'])

            if ( !valido ) {
                console.log('socket no identificado');
                return socket.disconnect();
            }

            await usuarioConectado( uid );


            //Emitir todos los usuarios conectados
            this.io.emit('lista-usuarios', await getUsuarios());



           
            socket.on('disconnect', async() => {
                await usuarioDesconectado( uid );
            })
            
        
        });
    }


}


module.exports = Sockets;