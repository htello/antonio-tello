

const { crear, leer, actualizar, eliminar } = require("../helpers/operacionesCrud")
const Pintura = require("../models/PinturaModel")

// añadir cuadro
const aniadirCuadro = async (req, res) => {
    crear(req, res, Pintura)
}

//get cuadros
const getCuadros = async (req, res) => {
    const consulta = await Pintura.find().populate('user', 'name').sort({ orden: 1 })
    leer(req, res, consulta);
}

//actualizar cuadro
const actualizarCuadro = async (req, res) => {


    actualizar(req, res, Pintura)


}

//eliminar cuadro
const eliminarCuadro = async (req, res) => {



}

module.exports = {
    getCuadros,
    aniadirCuadro,
    actualizarCuadro,
    eliminarCuadro
}
