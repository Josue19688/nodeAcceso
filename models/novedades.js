const { Schema, model } = require('mongoose');


const NovedadesSchema = Schema({
    tipo:{
        type:String,
        required:true
    },
    hora: {
        type: String,
        required: true
    },
    fecha: {
        type: String,
        required: true
    },
    puesto: {
        type: String,
        required: true,
    },
    preliminar: {
        type: String,
        required:true
    },
    descripcion:{
        type:String
    },
    images:[{
        type:String
    }],
});


NovedadesSchema.method('toJSON', function() {
    const { __v, _id,  ...object } = this.toObject();
    object.uid = _id;
    return object;
});


module.exports = model('Novedad', NovedadesSchema );
