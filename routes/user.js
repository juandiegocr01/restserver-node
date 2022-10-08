const { Router } = require('express');
const { userGet, userPut, userPost, userDelete, userPatch } = require('../controllers/user');

const router = Router();

 //por lo general se manda es un objeto, es decir mandamos siempre un JSON, Y MANDO UN STATUS por si se olvidó algo ya sé que puede ser
        // this.app.get('/api', (req, res) => {
        //     res.status(403).json({
        //         ok: true,
        //         msg: 'Es una prueba de API'
        //     })
        // });

        router.get('/', userGet);

        router.put('/:id', userPut );


       router.post('/', userPost);

       router.delete('/', userDelete);

       router.patch('/', userPatch);




module.exports = router;