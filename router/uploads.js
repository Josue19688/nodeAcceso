/*
    ruta: api/uploads/
*/
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');


const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUpload, retornaImagen,multiFileUpload} = require('../controllers/uploads');

const router = Router();

router.use( expressFileUpload() );

//router.put('/:tipo/:id', validarJWT , fileUpload );



router.put('/:tipo/:id', validarJWT , multiFileUpload );

router.get('/:tipo/:foto',validarJWT, retornaImagen );



module.exports = router;