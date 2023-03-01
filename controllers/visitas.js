const { response } = require("express");
const Visita = require("../models/visitas");



const getVisita =  async(req, res=response)=>{
    const {id} = req.params;

    try {
        
        const visita  =  await Visita.findById(id);

        if(!visita){
            return res.status(400).json({
                ok:false,
                msg:'El registro no existe'
            })
        }

        res.json({
            ok:true,
            visita
        })

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'Error al realizar el registro'
        })
    }
}

const getVisitas =  async(req, res=response)=>{
   

    try {
       
        const [total, visita] = await Promise.all([
            Visita.countDocuments(),
            Visita.find()
        ]);

       

        if(!visita){
            return res.status(400).json({
                ok:false,
                msg:'Registros inexistentes'
            })
        }

        res.json({
            ok:true,
            total,
            visita
        })

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'Error al realizar el registro'
        })
    }
}

const crearVisita = async(req,res=response)=>{

    try {

        const visita = new Visita(req.body);
       await visita.save();
        if(!visita){
            return res.status(401).json({
                ok:false,
                msg:'No se creo el registro'
            })
        }

        res.json({
            ok:true,
            visita
        })
        
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'Error al realizar el registro'
        })
    }
}

const actualizarVisita = async(req,res=response)=>{

    const {id} = req.params;
   

    try {
        const {
            tipo,
            nombre, 
            dpi,
            colaborador,
            proveniente,
            horaEntrada,
            horaSalida,
            placa,
            vehiculo
            } = req.body;
        
        const existeVisita = await Visita.findById(id);
       

        if(!existeVisita){
            return res.status(401).json({
                ok:false,
                msg:'El registro no existe!'
            })
        }

        const visita = await Visita.findByIdAndUpdate(id,{
            tipo:tipo,
            nombre:nombre, 
            dpi:dpi,
            colaborador:colaborador,
            proveniente:proveniente,
            horaEntrada:horaEntrada,
            horaSalida:horaSalida,
            placa:placa,
            vehiculo:vehiculo
        });
        visita.save();

        res.json({
            ok:true,
            visita
        });

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'Error al actualizar el registro'
        })
    }
}

const eliminarVisita = async(req, res=response)=>{

    const {id} = req.params;
    try {
        
        const existeVisita = await Visita.findById(id);
        if(!existeVisita){
            return res.status(401).json({
                ok:false,
                msg:'El registro no existe'
            })
        }

        const visita = await Visita.findByIdAndDelete(id);

        res.json({
            ok:true,
            visita
        })

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'Error realizar la peticion'
        })
    }



}


module.exports ={
    crearVisita,
    getVisita,
    getVisitas,
    actualizarVisita,
    eliminarVisita
}
