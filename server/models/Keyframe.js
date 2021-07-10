const mongoose = require('mongoose');

const KeyframeSchema = new mongoose.Schema({
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

const Keyframe = mongoose.model("Keyframe", KeyframeSchema);

module.exports = Keyframe;