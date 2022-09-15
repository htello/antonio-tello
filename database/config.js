const mongoose = require('mongoose')

const dbConection = async () => {
    try {
        await mongoose.connect(process.env.DB_CONECTION)
        console.log('conexión a la base de datos ok')

    } catch (error) {
        console.log(error)
        throw new Error('Error al inicializar la base de datos')
    }
}

module.exports = {
    dbConection
}