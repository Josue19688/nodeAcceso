/*
    path: api/login
*/
const { Router } = require('express');
const { check }  = require('express-validator');

const { crearUsuario, login, renewToken, authTwo, verifyAuthTwo } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

// Crear nuevos usuarios
router.post( '/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos
], crearUsuario );


// Login
router.post('/',[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login );

// Revalidar Token
router.get('/renew', validarJWT, renewToken );

/**
 * 2FA
 */

router.get('/fa',authTwo);
router.get('/verifica/:token/:secret',verifyAuthTwo);


module.exports = router;