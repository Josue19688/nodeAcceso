const { Schema, model } = require('mongoose');


const VisitaSchema = Schema({
    tipo:{
        type:String,
        required:true
    },
    nombre: {
        type: String,
        required: true
    },
    dpi: {
        type: String,
        required: true
    },
    colaborador: {
        type: String,
        required: true,
    },
    proveniente: {
        type: String,
        required:true
    },
    horaEntrada:{
        type:String
    },
    horaSalida:{
        type:String
    },
    placa:{
        type:String
    },
    vehiculo:{
        type:String
    }
});


VisitaSchema.method('toJSON', function() {
    const { __v, _id,  ...object } = this.toObject();
    object.uid = _id;
    return object;
});


module.exports = model('Visita', VisitaSchema );
