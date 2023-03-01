
const {Router} = require('express');
const {check} = require('express-validator');
const { getVisita, getVisitas, crearVisita, actualizarVisita, eliminarVisita } = require('../controllers/visitas');

const {validarCampos} = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');


const router= Router();

router.get('/:id',[
    validarJWT,
    check('id', 'El id es obligatoria').not().isEmpty().isMongoId(),
    validarCampos
],getVisita);
router.get('/',[
    validarJWT
],getVisitas);

router.post('/new',[
    validarJWT,
    check('tipo', 'El tipo es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('dpi', 'El dpi es obligatorio').not().isEmpty(),
    check('colaborador', 'El colaborador es obligatorio').not().isEmpty(),
    check('proveniente', 'El proveniente es obligatorio').not().isEmpty(),
    validarCampos
],crearVisita);

router.put('/:id',[
    validarJWT,
    check('id', 'El id es obligatorio').not().isEmpty().isMongoId(),
    validarCampos
],actualizarVisita);

router.delete('/:id',[
    validarJWT,
    check('id', 'El id es obligatorio').not().isEmpty().isMongoId(),
    validarCampos
],eliminarVisita);


module.exports=router;