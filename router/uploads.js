/*
    ruta: api/uploads/
*/
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');


const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUpload, retornaImagen} = require('../controllers/uploads');

const router = Router();

router.use( expressFileUpload() );

//subidad solo de un archivo 
router.put('/:tipo/:id', validarJWT , fileUpload );


//metodo para subir un array de datos o archivos
//router.put('/:tipo/:id', validarJWT , multiFileUpload );


//Ruta para obtener la imagen o archivo del servidor
router.get('/:tipo/:foto',validarJWT, retornaImagen );



module.exports = router;