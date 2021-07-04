// Setting up an express-server
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const url = 'mongodb://localhost:27017/video_search';
const app = express();

const ConceptModel = require("./models/ Concept");

// parsing JSON which is coming from the Frontend
app.use(express.json());
app.use(cors());

// String for connecting to mongoDB and passing an object
// mongoose.connect("mongodb+srv://adminuser:deeplearning1234@deep-learning.5fdov.mongodb.net/videosearchDB?retryWrites=true&w=majority", {
// mongoose.connect("mongodb://127.0.0.1:27017/video_search", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

mongoose.connect(url, {useNewUrlParser: true});

// check if connection works
const db = mongoose.connection
db.once('open', _ => {
    console.log('Database connected:', url)
})

db.on('error', err => {
    console.error('connection error:', err)
})

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

app.get('/concepts', async (require, response) => {
    // within Filter: eg. $where: {conceptName: "Airplane"}
    ConceptModel.find({}, (error, result) =>{
       if(error){
           response.send(error);
       }

        response.send(result);
    })
});


// setup Port on which app is listening
app.listen(3002, ()=> {
    console.log("Server is running on Port 3002...");
});