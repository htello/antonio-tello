const jwt = require('jsonwebtoken');

// (este es el payload)
const generarJWT = (uid, name) => {

    return new Promise((resolve, reject) => {
        const payload = { uid, name }

        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '24h'
        }, (error, token) => {
            if (error) {
                console.log(error)
                reject('no se pudo generar el token')
            }

            resolve(token)
        })
    })

}

module.exports = {
    generarJWT
}