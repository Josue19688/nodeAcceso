
const {response} = require('express');
const Archivo = require('../models/archivo');

const obtenerArchivo =  async(req, res=response)=>{
    const {id} = req.params;
    try {
        const archivo =  await Archivo.findById(id);

        if(!archivo){
            res.status(401).json({
                ok:false,
                msg:'El archivo no existe.'
            })
        }

        res.json({
            ok:true,
            archivo
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Error al  realizar la petición.'
        })
    }
}

const obtenerArchivos = async(req, res=response)=>{
    try {
        const [total, archivos] = new Promise.all([
            Archivo.countDocuments(),
            Archivo.find()
        ]);

        if(!total){
            return res.status(401).json({
                ok:false,
                msg:'No hay datos'
            })
        }

        res.json({
            ok:true,
            total,
            archivos
        })

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Error al  realizar la petición.'
        })
    }
}

const crearArchivo = async(req, res=response)=>{

   
    try {
        const archivo = new Archivo(req.body);
        await archivo.save();

        console.log(archivo);
        if(!archivo){
            res.status(401).json({
                ok:false,
                msg:'No se creo el registro.'
            })
        }

        res.json({
            ok:true,
            archivo
        })

        
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Error al  realizar la petición.'
        })
    }
}

const actualizarArchivo = async(req, res=response)=>{
    const {id} =  req.params;

    const {
        tipo,
        numero,
        fechaDocumento,
        origen,
        descripcion,
        images
    } = req.body;
    try {

        if(!id){
            return res.status(401).json({
                ok:false,
                msg:'No existe el registro.'
            })
        }

        const existeArchivo = await Archivo.findById(id);
        if(!existeArchivo){
            return res.status(401).json({
                ok:false,
                msg:'No existe el registro.'
            })
        }

        const archivo = await Archivo.findByIdAndUpdate(id,{
            tipo:tipo,
            numero:numero,
            fechaDocumento:fechaDocumento,
            origen:origen,
            descripcion:descripcion,
            images:images
        });
        archivo.save();
        res.json({
            ok:true,
            archivo
        })

        
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'Error al realizar la petición.'
        })
    }
}

const eliminarArchivo =  async(req, res=response)=>{
    const {id} = req.params;
    try {
        if(!id){
            return res.status(401).json({
                ok:false,
                msg:'No existe el registro.'
            })
        }

        const existeArchivo = await Archivo.findById(id);
        if(!existeArchivo){
            return res.status(401).json({
                ok:false,
                msg:'No existe el registro.'
            })
        }

        const archivo = await Archivo.findByIdAndDelete(id);

        res.status(200).json({
            ok:true,
            archivo
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Error al  realizar la petición.'
        })
    }
}


module.exports = {
    obtenerArchivo,
    obtenerArchivos,
    crearArchivo,
    actualizarArchivo,
    eliminarArchivo
}
