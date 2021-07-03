// Setting up an express-server
const express = require('express');

// importing mongoose library
const mongoose = require('mongoose');
const app = express();

const ConceptModel = require("./models/ Concept");

app.use(express.json());

// String for connecting to mongoDB and passing an object
mongoose.connect("mongodb+srv://adminuser:deeplearning1234@deep-learning.5fdov.mongodb.net/videosearchDB?retryWrites=true&w=majority", {
    useNewUrlParser: true,
});

// create a Route - if accessing this route,
// we simply add something to the DB
app.get('/', async (require, response) => {

    // to test create variable
    const concept = new ConceptModel({
        conceptId: 1,
        name: "Airplane"
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