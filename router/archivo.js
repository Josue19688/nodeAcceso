

/*
    path: api/login
*/
const { Router } = require('express');
const { check }  = require('express-validator');
const { crearArchivo } = require('../controllers/archivos.js');
const { eliminarArchivo } = require('../controllers/archivos.js');
const { actualizarArchivo } = require('../controllers/archivos.js');
const { obtenerArchivos } = require('../controllers/archivos.js');
const { obtenerArchivo } = require('../controllers/archivos.js');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/:id',[
    validarJWT,
    check('id', 'El id es obligatorio').not().isEmpty().isMongoId(),
    validarCampos
],obtenerArchivo);
router.get('/',validarJWT,obtenerArchivos);
router.post('/new',[
    validarJWT,
    check('tipo', 'El tipo es obligatorio').not().isEmpty(),
    check('numero', 'El numero es obligatorio').not().isEmpty(),
    check('fechaDocumento', 'La fecha es obligatorio').not().isEmpty(),
    check('origen', 'El el origen es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatorio').not().isEmpty(),
    validarCampos
],crearArchivo);
router.put('/:id',[
    validarJWT,
    check('id', 'El id es obligatorio').not().isEmpty().isMongoId(),
    check('tipo', 'El tipo es obligatorio').not().isEmpty(),
    check('numero', 'El numero es obligatorio').not().isEmpty(),
    check('fechaDocumento', 'La fecha es obligatorio').not().isEmpty(),
    check('origen', 'El el origen es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatorio').not().isEmpty(),
    validarCampos
],actualizarArchivo);
router.delete('/:id',[
    validarJWT,
    check('id', 'El id es obligatorio').not().isEmpty().isMongoId(),
    validarCampos
],eliminarArchivo);


module.exports = router;