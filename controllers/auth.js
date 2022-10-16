const { response, request, json } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');
const { DefaultTransporter } = require('google-auth-library');


const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try {

        //verificar si el email existe

        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'El correo/contraseña son incorrectos'
            })
        }


        //si el usuario está activo

        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'El usuario se encuentra inactivo hable con el administrador para activarlo'
            })
        }

        //verificar la contraseña

        const validPassword = bcryptjs.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'Contraseña incorrecta'
            })
        }

        //generar el JWT

        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }



}


const googleSignIn = async (req = request, res = response) => {

    const { id_token } = req.body;

    try {


        const { correo, nombre, img } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ correo });

        //creando el usuario
        if (!usuario) {
            const data = {
                nombre,
                correo,
                rol: 'USER_ROLE',
                password: ':P',
                img,
                google: true
            }

            usuario = new Usuario(data);
            await usuario.save();
        }

        //si el usuario está bloqueado en la bd

        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Habla con el administrador el usuario está bloqueado'
            })
        }

        //generar el jwt

        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })
    } catch (error) {

        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })

    }



}

module.exports = {
    login,
    googleSignIn
}