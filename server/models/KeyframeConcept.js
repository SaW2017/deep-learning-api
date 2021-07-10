const mongoose = require('mongoose');

const KeyframeConceptSchema = new mongoose.Schema({
    videoId: {
        type: String,
        required: true
    },
    keyframeId: {
        type: String,
        required: true
    },
    conceptId: {
        type: Number,
        required: true
    },
    confidence: {
        type: Number,
        required: false
    }
});

const KeyframeConcept = mongoose.model("KeyframeConcept", KeyframeConceptSchema);

module.exports = KeyframeConcept;