const { Schema, model } = require('mongoose');

const ColeccionSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    comentario: {
        type: String,

    },
    order: {
        type: String,
        require: true
    }
})

module.exports = model('Coleccion', ColeccionSchema);