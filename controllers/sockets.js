const Usuario = require('../models/usuario');
const Mensaje = require('../models/mensajes');
const Novedad = require('../models/novedades');
const Visita = require('../models/visitas');

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
    return usuarios;
}

const getNovedades =  async()=>{
    const novedad = await Novedad.find();
    return novedad;
}

const guardarNovedad= async(payload)=>{
    try {
        const novedad = new Novedad(payload);
        await novedad.save();

        return novedad;
    } catch (error) {
        return false;
    }
}

const getVisitas=async()=>{
    const visita = await Visita.find();
    return visita;
}

const guardarVisita = async(payload)=>{
    try {
        const visita = new Visita(payload);
        await visita.save();
       
        return visita;
    } catch (error) {
        return false;
    }
}


const guardarMensajes = async (payload)=>{
   try {
    const mensaje = new Mensaje(payload);
    await mensaje.save();

    return mensaje;
   } catch (error) {
    return false;
   }
}


module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    getUsuarios,
    guardarMensajes,
    guardarNovedad,
    getNovedades,
    getVisitas,
    guardarVisita
}
