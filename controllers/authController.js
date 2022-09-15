const { response } = require('express')
const bcrypt = require('bcrypt');
const Usuario = require('../models/UsuarioModel');
const { generarJWT } = require('../helpers/jwt')

const crearUsuario = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email: email })

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese email',
            })
        }
        usuario = new Usuario(req.body);

        // ENCRIPTAR CONTRASEÑA
        const salt = bcrypt.genSaltSync()
        usuario.password = bcrypt.hashSync(password, salt)

        await usuario.save()

        // GENERAR JWT
        const token = await generarJWT(usuario.id, usuario.name)


        return res.status(201).json({
            ok: true,
            msg: 'Registro finalizado con exito',
            uid: usuario.id,
            name: usuario.name,
            token: token
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error, por favor pongase en contacto con el administrador'
        })
    }

}



const loginUsuario = async (req, res = response) => {
    const { email, password } = req.body
    try {
        const { email, password } = req.body;
        const usuario = await Usuario.findOne({ email: email })
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'No hay usuario con ese emal'
            })
        }

        //COMPARAR PASSWORDS
        const validPasswords = bcrypt.compareSync(password, usuario.password)

        if (!validPasswords) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            })
        }

        //GENERAR JWS
        const token = await generarJWT(usuario.id, usuario.name)

        return res.json({
            ok: true,
            msg: 'Usuario logeado',
            uid: usuario.id,
            name: usuario.name,
            token
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error, por favor pongase en contacto con el administrador'
        })
    }


}

const revalidarToken = async (req, res = response) => {



    const { uid, name } = req


    //generar nuevo JWT y retornarlo en la peticion

    const token = await generarJWT(uid, name)

    return res.json({
        ok: true,
        msg: 'revalidar token',
        uid,
        name,
        token
    })
}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}