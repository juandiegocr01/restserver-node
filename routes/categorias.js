const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, eliminarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//localhost:8080/api/categorias


//Obtener todas las categorias - publico
router.get('/', [validarJWT], obtenerCategorias)

//Obtener una categoría por id - público

router.get('/:id', [
    validarJWT,
    check('id').custom(existeCategoriaPorId),
    validarCampos
], obtenerCategoria)

//Crear una categoría con cualquier rol pero con un token válido - privado

router.post('/',
    [validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ]
    , crearCategoria)

// Actualizar cualquiera pero con token válido - privado
router.put('/:id', [
    validarJWT,
    check('id').custom(existeCategoriaPorId),
    validarCampos
], actualizarCategoria)

//Borrar pero siempre y cuando sea un ADMIN
router.delete('/:id', [
    validarJWT,
    check('id').custom(existeCategoriaPorId),
    validarCampos
], eliminarCategoria)

module.exports = router;