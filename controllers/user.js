const { request, response } = require('express');

const userGet = (req = request, res = response) => {

    //para obtener los "query" se debe hacer lo siguiente lo ideal aquí también es usar destructuración
    
    const params = req.query;

    res.json({
        ok: true,
        msg: 'Es una prueba de get API - Controlador',
        params
    })};


const userPut = (req, res = response) => {

    //obtener datos mediante la URL y en tal caso que tenga más parametros destructuro

    const {id} = req.params;

    res.json({
        ok: true,
        msg: 'Es una prueba de put API  Controlador',
        id
    })};

const userPost =  (req, res = response) => {

    //es comun destructurar el body dependiendo de lo que yo requiera

    const body = req.body;

    res.json({
        ok: true,
        msg: 'Es una prueba de post API - Controlador',
        body
    })};

const userDelete = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Es una prueba de delete API - Controlador'
    })};

const userPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Es una prueba de patch API - Controlador'
    })
}



module.exports = {userGet, userDelete, userPost, userPut, userPatch}