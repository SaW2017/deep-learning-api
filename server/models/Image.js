const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    keyframeId: {
        type: String,
        required: true
    },
    filepath: {
        type: String,
        required: true
    },
    videoId: {
        type: String,
        required: true
    }
});

const Imagem = mongoose.model("imagem", ImageSchema);

module.exports = Imagem;