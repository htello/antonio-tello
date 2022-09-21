const getColecciones = async (req, res) => {
    return res.status(200).json({
        ok: true,
        msg: 'leer colecciones'
    })
}

const aniadirColeccion = async (req, res) => {

    return res.status(200).json({
        ok: true,
        msg: 'Añadir coleccion'
    })
}

const actualizarColeccion = async (req, res) => {
    return res.status(200).json({
        ok: true,
        msg: 'Actualizar colecciones'
    })
}

const eliminarColeccion = async (req, res) => {
    return res.status(200).json({
        ok: true,
        msg: 'Eliminar colecciones'
    })
}




module.exports = {
    getColecciones,
    aniadirColeccion,
    actualizarColeccion,
    eliminarColeccion,
}
