const mongoose = require('mongoose');

const Schema = mongoose.Schema;


let keyframe = new Schema({

    keyframe_id: {
        type: String
    },
    file_path: {
        type: String
    },
    classifier: {
        type: String
    },
    concept_confidence: {
        type: Array
    }
});

module.exports = mongoose.model('keyframe_document', keyframe);