// Setting up an express-server
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const app = express();

const ConceptModel = require("./models/ Concept");

// parsing JSON which is coming from the Frontend
app.use(express.json());
app.use(cors());

// String for connecting to mongoDB and passing an object
mongoose.connect("mongodb+srv://adminuser:deeplearning1234@deep-learning.5fdov.mongodb.net/videosearchDB?retryWrites=true&w=majority", {
    useNewUrlParser: true,
});

// create a Route - if accessing this route,
// we simply add something to the DB
app.post('/insert', async (require, response) => {

    const conceptId = require.body.conceptId;
    const conceptName = require.body.conceptName;

    // to test inserting in DB
    const concept = new ConceptModel({
        conceptId: conceptId,
        name: conceptName
    });

    // try to save this constant into the DB-Collection
    try{
       await concept.save()
    }catch (e) {
        console.log(e);
    }
});

// setup Port on which app is listening
app.listen(3002, ()=> {
    console.log("Server is running on Port 3002...");
});