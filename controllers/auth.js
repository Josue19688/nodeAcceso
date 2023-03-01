const { response } = require('express');
const bcrypt       = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');



/**
 * 
 * @param {Correo, Contraseña} req 
 * @param {Usuario, token} res 
 * @returns usuario, token
 */
const crearUsuario = async(req, res = response) => {
    
    try {
        
        const { email, password } = req.body;

        const existeEmail = await Usuario.findOne({ email });
        if ( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya existe'
            });
        }

        const usuario = new Usuario( req.body );

       
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        
        await usuario.save();
        
        
        const token = await generarJWT( usuario.id );
        

        res.json({
            ok: true,
            usuario,
            token
        });



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear el usuario'
        });
    }

    
}

/**
 * 
 * @param {Correo, contraseña} req 
 * @param {Token, usuario} res 
 * @returns Token, usuario 
 */

const login = async(req, res) => {

    const {  email, password } = req.body;

    try {
        
       
        const usuarioDB = await Usuario.findOne({ email });
        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Credenciales invalidas!!'
            });
        }

        
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if ( !validPassword ) {
            return res.status(404).json({
                ok: false,
                msg: 'Credenciales invalidas!!'
            });
        }

       
        const token = await generarJWT( usuarioDB.id );


        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al realizar la peticion.'
        });
    }

}


/**
 * 
 * @param {id} req 
 * @param {usuario, token} res 
 */
const renewToken = async(req, res) => {

    const uid = req.uid;

    
    const token = await generarJWT( uid );

  
    const usuario = await Usuario.findById( uid );

    res.json({
        ok: true,
        usuario,
        token,
    })
}

module.exports = {
    crearUsuario,
    login,
    renewToken
}
