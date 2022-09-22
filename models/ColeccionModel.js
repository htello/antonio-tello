const { Schema, model } = require('mongoose')

const ColeccionSchema = new Schema({

    titulo: {
        type: String,
        required: true
    },
    comentario: {
        type: String
    },
    orden: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
})

ColeccionSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Coleccion', ColeccionSchema)