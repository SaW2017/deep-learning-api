const mongoose = require('mongoose');

const Schema = mongoose.Schema;


let keyframe = new Schema({

    keyframe_id: {
        type: String
    },
    file_path: {
        type: String
    },
    // concept_name: {
    //     type: String
    // },
    // concept_confidence: {
    //     type: Array // TODO should be more specific
    // }

});

module.exports = mongoose.model('keyframe_document', keyframe);