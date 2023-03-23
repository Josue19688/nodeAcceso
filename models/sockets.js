const { comprobarJWT } = require('../helpers/jwt');

const { usuarioConectado, usuarioDesconectado, getUsuarios, guardarMensajes } = require('../controllers/sockets');

class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async( socket ) => {

            const [ valido, uid ] = comprobarJWT( socket.handshake.query['x-token']  );

           


            if ( !valido ) {
              
                return socket.disconnect();
            }

            await usuarioConectado( uid );

            //Unir al usuario a una sala de socket chat
            socket.join(uid);


            //Emitir todos los usuarios conectados
            this.io.emit('lista-usuarios', await getUsuarios());


            //Escuchar cuando el cliente manda un mensaje personal y asi mismo escucharlo 
            //en el frontend
            socket.on('mensaje-personal',async (payload)=>{
                const mensaje = await  guardarMensajes(payload);
                this.io.to(payload.para).emit('mensaje-personal',mensaje);
                this.io.to(payload.de).emit('mensaje-personal',mensaje);
            })



            //Emitir todos los usuarios conectados
            this.io.emit('lista-usuarios', await getUsuarios());



           
            socket.on('disconnect', async() => {
                await usuarioDesconectado( uid );
                this.io.emit('lista-usuarios', await getUsuarios());
            })
            
        
        });
    }


}


module.exports = Sockets;