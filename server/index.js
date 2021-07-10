// Setting up an express-server
require('dotenv').config();
const upload = require('./routes/upload');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const connection = require('./db');
const cors = require("cors");
const port = process.env.PORT || 3002;
const express = require("express");
const app = express();

// DB-Models
const ConceptModel = require("./models/Concept");

let gfs;
connection();

const conn = mongoose.connection;
conn.once('open', function() {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("photos");
});

// parsing JSON which is coming from the Frontend
// app.use(express.json());
// app.use(cors());
app.use("/file", upload);

app.get('/file/:filename', async (req,res) => {
   try {
       const file = await gfs.files.findOne({filename: req.params.filename});
       const readStream = gfs.createReadStream(file.filename);
       readStream.pipe(res);
   } catch (e) {
       console.log(e);
       res.send('not found');
   }
})

app.delete('/file/:filename', async (req,res) => {
    try {
        await gfs.files.deleteOne({filename: req.params.filename});
        res.send('Deleting was successfull');
    } catch (e) {
        console.log(e);
        res.send('Error while deleting');
    }
})

app.listen(port, ()=> {
    console.log(`Server is running on Port ${port}...`);
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

app.get('/concepts', async (require, response) => {
    // within Filter: eg. $where: {conceptName: "Airplane"}
    ConceptModel.find({}, (error, result) =>{
       if(error){
           response.send(error);
       }
        response.send(result);
    })
});