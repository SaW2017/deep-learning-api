const mongoose = require('mongoose');

// MongoDB isn't really using schema,
// but for better readability we define them
const ConceptSchema = new mongoose.Schema({
    conceptId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

// create Schema if it doesn't already exist
// --> need to pass it to a model in mongoose
const Concept = mongoose.model("concept", ConceptSchema);

// use to acces Concept-Object for CRUD operations
module.exports = Concept;