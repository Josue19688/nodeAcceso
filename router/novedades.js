
const {Router} = require('express');
const {check} = require('express-validator');
const { getNovedad, getNovedades, crearNovedad, actualizarNovedad, eliminarNovedad } = require('../controllers/novedades');

const {validarCampos} = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');


const router= Router();

router.get('/:id',[
    validarJWT,
    check('id', 'El id es obligatoria').not().isEmpty().isMongoId(),
    validarCampos
],getNovedad);
router.get('/',[
    validarJWT
],getNovedades);

router.post('/new',[
    validarJWT,
    check('tipo', 'El tipo es obligatorio').not().isEmpty(),
    check('hora', 'El horario es obligatorio').not().isEmpty(),
    check('fecha', 'La fecha es obligatorio').not().isEmpty(),
    check('puesto', 'El puesto es obligatorio').not().isEmpty(),
    check('preliminar', 'La preliminar es obligatorio').not().isEmpty(),
    validarCampos
],crearNovedad);

router.put('/:id',[
    validarJWT,
    check('id', 'El id es obligatorio').not().isEmpty().isMongoId(),
    validarCampos
],actualizarNovedad);

router.delete('/:id',[
    validarJWT,
    check('id', 'El id es obligatorio').not().isEmpty().isMongoId(),
    validarCampos
],eliminarNovedad);


module.exports=router;