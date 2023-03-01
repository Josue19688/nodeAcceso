const { response } = require("express");
const Novedad = require("../models/novedades");



const getNovedad =  async(req, res=response)=>{
    const {id} = req.params;

    try {
        
        const novedad  =  await Novedad.findById(id);

        if(!novedad){
            return res.status(400).json({
                ok:false,
                msg:'El registro no existe'
            })
        }

        res.json({
            ok:true,
            novedad
        })

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'Error al realizar el registro'
        })
    }
}

const getNovedades =  async(req, res=response)=>{
   

    try {
       
        const [total, novedad] = await Promise.all([
            Novedad.countDocuments(),
            Novedad.find()
        ]);

       

        if(!novedad){
            return res.status(400).json({
                ok:false,
                msg:'Registros inexistentes'
            })
        }

        res.json({
            ok:true,
            total,
            novedad
        })

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'Error al realizar el registro'
        })
    }
}

const crearNovedad = async(req,res=response)=>{

    try {

        const novedad = new Novedad(req.body);
       await novedad.save();
        if(!novedad){
            return res.status(401).json({
                ok:false,
                msg:'No se creo el registro'
            })
        }

        res.json({
            ok:true,
            novedad
        })
        
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'Error al realizar el registro'
        })
    }
}

const actualizarNovedad = async(req,res=response)=>{

    const {id} = req.params;
   

    try {
        const {
            tipo,
            hora,
            fecha,
            puesto,
            preliminar,
            descripcion,
            images
            } = req.body;
        
        const existeNovedad = await Novedad.findById(id);
       

        if(!existeNovedad){
            return res.status(401).json({
                ok:false,
                msg:'El registro no existe!'
            })
        }

        const novedad = await Novedad.findByIdAndUpdate(id,{
            tipo:tipo,
            hora:hora,
            fecha:fecha,
            puesto:puesto,
            preliminar:preliminar,
            descripcion:descripcion,
            images:images
        });
        novedad.save();

        res.json({
            ok:true,
            novedad
        });

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'Error al actualizar el registro'
        })
    }
}

const eliminarNovedad = async(req, res=response)=>{

    const {id} = req.params;
    try {
        
        const existeNovedad = await Novedad.findById(id);
        if(!existeNovedad){
            return res.status(401).json({
                ok:false,
                msg:'El registro no existe'
            })
        }

        const novedad = await Novedad.findByIdAndDelete(id);

        res.json({
            ok:false,
            novedad
        })

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'Error realizar la peticion'
        })
    }



}


module.exports ={
    crearNovedad,
    getNovedad,
    getNovedades,
    actualizarNovedad,
    eliminarNovedad
}
