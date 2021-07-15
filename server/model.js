const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;


const imageSchema = new Schema({
    name: String,
    desc: String,
    img:
        {
            data: Buffer,
            contentType: String
        }
});

//Image is a model which has a schema imageSchema

module.exports =
    mongoose.model.Image || mongoose.model('Image', imageSchema);