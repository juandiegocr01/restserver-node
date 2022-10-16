const { response } = require('express');
const { Categoria } = require('../models');



const obtenerCategorias = async (req, res = response) => {

    //para obtener los "query" se debe hacer lo siguiente lo ideal aquí también es usar destructuración

    // const params = req.query;
    const query = { estado: true }
    const { limite = 5, desde = 0 } = req.query;

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        ok: true,
        msg: 'Controlador para obtener todas la categorías',
        total,
        categorias
    })

}



const obtenerCategoria = async (req, res = response) => {

    const { id } = req.params;

    const categoria = await Categoria.findById(id);

    res.json({
        msg: 'Categoría devuelta con exito',
        categoria
    })

}

const crearCategoria = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if (categoriaDB) {
        return res.status(400).json({
            msg: `Ya existe una categoría con el nombre ${nombre}`
        })
    }
    //genero la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    //Creo la categoría con la data a guardar
    const categoria = new Categoria(data);

    //guardo la categoría en la base de datos
    await categoria.save();

    res.status(201).json(categoria);


}


const actualizarCategoria = async (req, res = res) => {

    //obtener datos mediante la URL y en tal caso que tenga más parametros destructuro

    const { id } = req.params;
    const { _id, __v, estado, ...resto } = req.body;


    const categoria = await Categoria.findByIdAndUpdate(id, resto);

    res.json({
        ok: true,
        msg: 'Actualizó categoría',
        categoria
    })

}



const eliminarCategoria = async (req, res = response) => {
    const { id } = req.params;

    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false });
    res.json({
        categoria
    })

}




module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    eliminarCategoria
}