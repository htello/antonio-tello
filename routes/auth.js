
/* 
    RUTAS DE USUARIOS Auth
    host + /api/auth
*/
const { Router } = require('express')
const { check } = require('express-validator')
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/authController')
const { validarCampos } = require('../middlewares/validarCampos')
const { validarJWT } = require('../middlewares/validarJWT')
const router = Router()

//crear nuevo usuario
router.post('/new',
    [
        check('name', 'Debe introducir el nombre').not().isEmpty(),
        check('email', 'Debe introducir un email correcto').isEmail(),
        check('password', 'El pasword debe tener 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario)

//Login usuario
router.post('/',
    [
        check('email', 'Debe introducir un email correcto').isEmail(),
        check('password', 'El password debe tener 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ]
    , loginUsuario)

//Renovar token usuario
router.get('/renew', validarJWT, revalidarToken)

module.exports = router;