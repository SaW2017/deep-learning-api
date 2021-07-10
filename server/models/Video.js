const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    videoId: {
        type: String,
        required: true
    },
    filepath: {
        type: String,
        required: true
    }
});

const Video = mongoose.model("Video", VideoSchema);

module.exports = Video;