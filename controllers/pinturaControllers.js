
// {
//     ok: true,
//        msg: 'obteber pinturas',
// }

const Pintura = require("../models/PinturaModel")

//get cuadros
const getCuadros = async (req, res) => {
    const cuadros = await Pintura.find().populate('user', 'name email').sort({ orden: 1 })

    return res.status(200).json({
        ok: true,
        msg: 'getCuadros ok',
        data: cuadros
    })
}

// añadir cuadro
const aniadirCuadro = async (req, res) => {
    //verificar que tenda el evento
    console.log(req.body)

    const pintura = new Pintura(req.body)
    try {
        pintura.user = req.uid
        const cuadroGuardado = await pintura.save()
        return res.status(200).json({
            ok: true,
            msg: 'Añadido correctamente',
            data: cuadroGuardado
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Contactar con el administrador'
        })
    }
}

//actualizar cuadro
const actualizarCuadro = async (req, res) => {
    const cuadroId = req.params.id;


    try {

        const cuadro = await Pintura.findById(cuadroId)
        const uid = req.uid

        if (!cuadro) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un cuadro con ese ID',
            })
        }

        /* if (cuadro.user.toString() !== uid) {
            return res.status(200).json({
                ok: true,
                msg: 'El usuario que edita no es el mismo que el que creo el cuadro',
                data: { ...req.body, user: uid },

            })

        } */
        const nuevoCuadro = {
            ...req.body,
            user: uid
        }
        const cuadroActualizado = await Pintura.findByIdAndUpdate(cuadroId, nuevoCuadro, { new: true })

        return res.status(200).json({
            ok: true,
            msg: 'Cuadro actualizado correctamente',
            data: cuadroActualizado
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contactar con el administrador'
        })
    }



}

//eliminar cuadro
const eliminarCuadro = async (req, res) => {

    const cuadroId = req.params.id;

    const cuadro = await Pintura.findById(cuadroId);

    if (!cuadro) {
        return res.status(404).json({
            ok: false,
            msg: 'No existe un cuadro con ese ID',
        })
    }

    const cuadroEliminado = await Pintura.findByIdAndDelete(cuadroId, { new: true })

    return res.status(200).json({
        ok: true,
        msg: 'eliminar cuado',
        data: cuadroEliminado
    })
}

module.exports = {
    getCuadros,
    aniadirCuadro,
    actualizarCuadro,
    eliminarCuadro
}
