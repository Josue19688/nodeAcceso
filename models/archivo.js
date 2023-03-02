
const { Schema, model } = require('mongoose');


const ArchivoSchema = Schema({
    tipo:{
        type:String,
        required:true
    },
    numero: {
        type: String,
        required: true
    },
    fechaDocumento: {
        type: String,
        required: true
    },
    origen: {
        type: String,
        required: true,
    },
    descripcion:{
        type:String,
        required:true
    },
    images:[{
        type:String
    }],
},{
    timestamps: true
});


ArchivoSchema.method('toJSON', function() {
    const { __v, _id,  ...object } = this.toObject();
    object.uid = _id;
    return object;
});


module.exports = model('Archivo', ArchivoSchema );
