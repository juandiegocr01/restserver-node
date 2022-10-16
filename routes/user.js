const { Router } = require('express');
const { check } = require('express-validator');
const { userGet, userPut, userPost, userDelete, userPatch } = require('../controllers/user');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');

const router = Router();


//por lo general se manda es un objeto, es decir mandamos siempre un JSON, Y MANDO UN STATUS por si se olvidó algo ya sé que puede ser
// this.app.get('/api', (req, res) => {
//     res.status(403).json({
//         ok: true,
//         msg: 'Es una prueba de API'
//     })
// });

router.get('/', userGet);

router.put('/:id',[
       check('id', 'No es un ID válido').isMongoId(),
       check('id').custom(existeUsuarioPorId),
       check('rol').custom(esRoleValido),
       validarCampos
], userPut);

//acá debe ponerse los middlewares

router.post('/', [
       check('correo').custom(emailExiste).isEmail(),
       check('nombre', 'El nombre es obligatorio').not().isEmpty(),
       check('password', 'El password es obligatorio y/o debe de ser mayor a 6 caracteres').isLength({ min: 6 }),
       //check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
       check('rol').custom(esRoleValido),
       validarCampos
], userPost);

router.delete('/:id',[
       validarJWT,
      // esAdminRole,
       tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
       check('id', 'No es un ID válido').isMongoId(),
       check('id').custom(existeUsuarioPorId),
       validarCampos
], userDelete);

router.patch('/', userPatch);




module.exports = router;