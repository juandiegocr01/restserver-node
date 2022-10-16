const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const userGet = async (req = request, res = response) => {

    //para obtener los "query" se debe hacer lo siguiente lo ideal aquí también es usar destructuración

    // const params = req.query;
    const query = {estado: true}
    const { limite = 5, desde = 0 } = req.query;

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ])

    res.json({
        ok: true,
        msg: 'Es una prueba de get API - Controlador',
        total,
        usuarios
    })
};


const userPut = async (req, res = response) => {

    //obtener datos mediante la URL y en tal caso que tenga más parametros destructuro

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //validar contra la base de datos

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);
  
    res.json({
        ok: true,
        msg: 'Es una prueba de put API  Controlador',
        usuario
    })
};

const userPost = async (req, res = response) => {

    //es comun destructurar el body dependiendo de lo que yo requiera
    // si tuviera mil campos y quiero omitir uno en especifico pongo google, ... resto y uso el resto


    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //verificar que correo existe

    // const existeEmail = await Usuario.findOne({ correo });

    // if (existeEmail) {
    //     return res.status(400).json({
    //         msg: 'El correo ya está registrado'
    //     });
    // }

    //encriptar la contraseña

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //guardar en la bd
    await usuario.save();

    res.json({
        ok: true,
        msg: 'Es una prueba de post API - Controlador',
        usuario
    })
};

const userDelete = async (req, res = response) => {

    const {id} = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});
    const usuarioAuth = req.usuario;
    res.json({
       usuario,
       usuarioAuth
    })
};

const userPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Es una prueba de patch API - Controlador'
    })
}



module.exports = { userGet, userDelete, userPost, userPut, userPatch }