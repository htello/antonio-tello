const { Schema, model } = require('mongoose')

const PinturaSchema = new Schema({
    coleccion: {
        type: String,
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    tecnica: {
        type: String,
        required: true
    },
    dimensiones: {
        type: String,
        required: true
    },
    url: {
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

PinturaSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Pintura', PinturaSchema)