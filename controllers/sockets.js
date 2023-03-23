const Usuario = require('../models/usuario');
const Mensaje = require('../models/mensajes');

const usuarioConectado = async( uid ) => {

    const usuario = await Usuario.findById(uid);
    usuario.online = true;
    await usuario.save();


    
    return usuario;
}

const usuarioDesconectado = async( uid ) => {
    const usuario = await Usuario.findById(uid);
    usuario.online = false;
    await usuario.save();
    
    return usuario;
}


const getUsuarios = async()=>{
    const usuarios = await Usuario
        .find()
        .sort('-online');
        console.log(usuarios)
    return usuarios;
}

<<<<<<< HEAD
const guardarMensajes = async (payload)=>{
   try {
    const mensaje = new Mensaje(payload);
    await mensaje.save();

    return mensaje;
   } catch (error) {
    return false;
   }
}
=======

>>>>>>> 531b4a6ce59c919317d9378dee1c0a5603af72ef

module.exports = {
    usuarioConectado,
    usuarioDesconectado,
<<<<<<< HEAD
    getUsuarios,
    guardarMensajes
=======
    getUsuarios
>>>>>>> 531b4a6ce59c919317d9378dee1c0a5603af72ef
}
