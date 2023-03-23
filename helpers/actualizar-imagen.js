
const fs = require('fs');

const Usuario = require('../models/usuario');
const Archivo = require('../models/archivo');

const borrarImagen = ( path ) => {
    if ( fs.existsSync( path ) ) {
        // borrar la imagen anterior
        fs.unlinkSync( path );
    }
}


const actualizarImagen = async(tipo, id, nombreArchivo) => {

    let pathViejo = '';
    
    switch( tipo ) {
        case 'usuario':

            const usuario = await Usuario.findById(id);
            if ( !usuario ) {
                console.log('No es un usuario por id');
                return false;
            }

            pathViejo = `./uploads/usuario/${ usuario.imagen }`;
            borrarImagen( pathViejo );

            usuario.imagen = nombreArchivo;
            await usuario.save();
            return true;

            break;
        case 'archivo':

            const archivo = await Archivo.findById(id);
            if ( !archivo ) {
                console.log('No es un archivo por id');
                return false;
            }

            console.log(nombreArchivo);
            pathViejo = `./uploads/archivo/${archivo.images }`;
            borrarImagen( pathViejo );

            archivo.images = nombreArchivo;
            await archivo.save();
            //console.log(archivo);
            return true;

            break;
    }


}



module.exports = { 
    actualizarImagen
}