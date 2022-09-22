/* 
    RUTAS DE PINTURAS Pintura
    host + /api/pintura

    RUTA DE COLECCIONES
    host + /api/pintura/colecciones
*/

const { Router } = require('express')
const { check } = require('express-validator');
const { validarJWT } = require("../middlewares/validarJWT");
const { validarCampos } = require('../middlewares/validarCampos')
const { getCuadros, aniadirCuadro, actualizarCuadro, eliminarCuadro } = require('../controllers/pinturaControllers');
const { getColecciones, aniadirColeccion, actualizarColeccion, eliminarColeccion, } = require('../controllers/coleccionesPinturaController');

const router = Router();

//VALIDAR JWT
router.use(validarJWT)


//get cuadros
router.get('/', getCuadros)

// añadir cuadro
router.post('/',
    [
        check('coleccion', 'Introduce la colección').not().isEmpty(),
        check('titulo', 'Introduce El titulo del cuadro').not().isEmpty(),
        check('tecnica', 'Introduce la técnica').not().isEmpty(),
        check('dimensiones', 'Introduce las dimensiones del cuadro').not().isEmpty(),
        check('url', 'Introduce la imagen').not().isEmpty(),
        check('orden', 'Elige la posición').not().isEmpty(),
        validarCampos

    ],
    aniadirCuadro)

//actualizar cuadro
router.put('/:id',
    [
        check('coleccion', 'Introduce la colección').not().isEmpty(),
        check('titulo', 'Introduce El titulo del cuadro').not().isEmpty(),
        check('tecnica', 'Introduce la técnica').not().isEmpty(),
        check('dimensiones', 'Introduce las dimensiones del cuadro').not().isEmpty(),
        check('url', 'Introduce la imagen').not().isEmpty(),
        check('orden', 'Elige la posición').not().isEmpty(),
        validarCampos

    ], actualizarCuadro)

//borrar cuadro
router.delete('/:id', eliminarCuadro)


/*=================
    COLECCIONES
====================*/

//leer coleccion
router.get('/colecciones', getColecciones)


//Grear coleccion
router.post('/colecciones',
    [
        check('titulo', 'Introduce El titulo del cuadro').not().isEmpty(),
        check('orden', 'Elige la posición').not().isEmpty(),
        validarCampos

    ],
    aniadirColeccion)


//Editar coleccion
router.put('/colecciones/:id',
    [
        check('titulo', 'Introduce El titulo del cuadro').not().isEmpty(),
        check('orden', 'Elige la posición').not().isEmpty(),
        validarCampos

    ], actualizarColeccion)

//Eliminar coleccion
router.delete('/colecciones/:id', eliminarColeccion)



module.exports = router
