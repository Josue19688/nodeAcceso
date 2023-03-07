const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');

// const multiFileUpload =  (req,res=response)=>{

//     const tipo = req.params.tipo;
//     const id   = req.params.id;

//     try {

//         const tiposValidos = ['novedades','archivo','usuario','visitas'];
//         if ( !tiposValidos.includes(tipo) ){
//             return res.status(400).json({
//                 ok: false,
//                 msg: 'No es un tipo valido!'
//             });
//         }

//         if (!req.files || Object.keys(req.files).length === 0) {
//             return res.status(400).json({
//                 ok: false,
//                 msg: 'No hay ningún archivo'
//             });
//         }

//         const files = req.files.images;
       
//         const archivoGuardado=''
       
//         for(let i = 0 ; i < files.length; i++){
            
//             const nombreCortado = files[i].name.split('.');
//             const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ];

            
//             // Validar extension
//             const extensionesValidas = ['png','JPG','jpg','jpeg','gif','pdf'];
//             if ( !extensionesValidas.includes( extensionArchivo ) ) {
//                 return res.status(400).json({
//                     ok: false,
//                     msg: 'No es una extensión permitida'
//                 });
//             }

//               // Generar el nombre del archivo
//             const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

           
//             // Path para guardar la imagen
//             const path = `./uploads/${ tipo }/${ nombreArchivo }`;
           
//             // Mover la imagen
//             files[i].mv( path , (err) => {
//                 if (err){
//                     console.log(err)
//                     return res.status(500).json({
//                         ok: false,
//                         msg: 'Error al mover la imagen'
//                     });
//                 }

//                 // Actualizar base de datos
//                 actualizarImagen( tipo, id, nombreArchivo );

                
               
//             });


            
//         }
//         res.json({
//             ok: true,
//             msg: 'Archivo subido'
//         });
        
//     } catch (error) {
//         return res.status(500).json({
//             ok:false,
//             msg:'Error al realizar la petición'
//         })
//     }
// }

const fileUpload = ( req, res = response ) => {

    const tipo = req.params.tipo;
    const id   = req.params.id;

   
    const tiposValidos = ['novedades','archivo','usuario','visitas'];
    if ( !tiposValidos.includes(tipo) ){
        return res.status(400).json({
            ok: false,
            msg: 'No es un tipo valido!'
        });
    }

    
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo'
        });
    }

   
    const file = req.files.images;

    const nombreCortado = file.name.split('.'); 
    const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ];
    
    
    const extensionesValidas = ['png','jpg','jpeg','gif','pdf'];
    if ( !extensionesValidas.includes( extensionArchivo ) ) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión permitida'
        });
    }

    
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

    
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;

  
    file.mv( path , (err) => {
        if (err){
            console.log(err)
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

       
        actualizarImagen( tipo, id, nombreArchivo );

        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });
    });

}


const retornaImagen = ( req, res = response ) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ foto }` );

    // imagen por defecto
    if ( fs.existsSync( pathImg ) ) {
        res.sendFile( pathImg );
    } else {
        const pathImg = path.join( __dirname, `../uploads/no-img.jpg` );
        res.sendFile( pathImg );
    }

}


module.exports = {
    fileUpload,
    retornaImagen
}