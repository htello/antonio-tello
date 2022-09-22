const { crear, leer, actualizar, eliminar } = require("../helpers/operacionesCrud")
const Coleccion = require("../models/ColeccionModel")


//CREAR COLECCIONES
const aniadirColeccion = async (req, res) => {

    crear(req, res, Coleccion)

}

//GET COLECCIONES
const getColecciones = async (req, res) => {

    const consulta = await Coleccion.find().populate('user', 'name').sort({ orden: 1 })

    leer(req, res, consulta);

}





//ACTUALIZAR COLECCONES
const actualizarColeccion = async (req, res) => {
    actualizar(req, res, Coleccion)
}


//ELIMINAR COLECCIONES
const eliminarColeccion = async (req, res) => {
    eliminar(req, res, Coleccion)
}




module.exports = {
    getColecciones,
    aniadirColeccion,
    actualizarColeccion,
    eliminarColeccion,
}
