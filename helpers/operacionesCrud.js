

// CREAR REGISTRO
const crear = async (req, res, model) => {

    const modelo = new model(req.body)

    try {
        modelo.user = req.uid
        const elementoGuardado = await modelo.save()
        return res.status(200).json({
            ok: true,
            msg: 'Añadido correctamente',
            data: elementoGuardado
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Contactar con el administrador'
        })
    }
}

//LEER REGISTRO
const leer = async (req, res, consulta) => {
    const consultaLeida = consulta;

    return res.status(200).json({
        ok: true,
        msg: 'Elementos leidos',
        data: consultaLeida
    })
}


//EDITAR REGISTRO
const actualizar = async (req, res, model) => {
    const elementoId = req.params.id;

    try {

        const elemento = await model.findById(elementoId)
        const uid = req.uid

        if (!elemento) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un elemento con ese ID',
            })
        }

        const nuevoelemento = {
            ...req.body,
            user: uid
        }
        const elementoActualizado = await model.findByIdAndUpdate(elementoId, nuevoelemento, { new: true })

        return res.status(200).json({
            ok: true,
            msg: 'elemento actualizado correctamente',
            data: elementoActualizado
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contactar con el administrador'
        })
    }

}


//ELIMINAR REGISTRO
const eliminar = async (req, res, model) => {
    const elementoId = req.params.id;

    const elemento = await model.findById(elementoId);

    if (!elemento) {
        return res.status(404).json({
            ok: false,
            msg: 'No existe un elemento con ese ID',
        })
    }

    const elementoEliminado = await model.findByIdAndDelete(elementoId, { new: true })

    return res.status(200).json({
        ok: true,
        msg: 'eliminar cuado',
        data: elementoEliminado
    })
}

module.exports = {
    crear,
    leer,
    actualizar,
    eliminar
}