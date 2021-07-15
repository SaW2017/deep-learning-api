// set up express & mongoose
var express = require('express')
var app = express()

var bodyParser = require('body-parser');
var mongoose = require('mongoose')

var fs = require('fs');
var path = require('path');
require('dotenv/config');

// // DB-Models
const ConceptModel = require("./models/Concept");
const MongoClient = require('mongodb').MongoClient;
var database;

app.listen(3002, () => {
    MongoClient.connect('mongodb://localhost:27017', {
        useNewUrlParser:true
    }, (err,result) => {
        if (err)
            throw err
        database = result.db('video_search');
        console.log('Server listening on port', port)
    });
})


// connect to the database
// mongoose.connect(process.env.DB,
//     { useNewUrlParser: true, useUnifiedTopology: true }, err => {
//         console.log('connected')
//     });



// set up EJS just to clarify
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Set EJS as templating engine
app.set("view engine", "ejs");

// set up multer for storing uploaded files
var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });

// load the mongoose model for Image
var imgModel = require('./model')

// the GET request handler that provides the HTML UI

app.get('/images', (req, res) => {
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('imagesPage', { items: items });
        }
    });
});

// the POST handler for processing the uploaded file

app.post('/images', upload.single('image'), (req, res, next) => {

    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            res.redirect('/');
        }
    });
});

//configure the server's port

var port = process.env.PORT || '3002'
// app.listen(port, err => {
//     if (err)
//         throw err
//     console.log('Server listening on port', port)
// })


app.get('/concepts', async (require, response) => {
    // within Filter: eg. $where: {conceptName: "Airplane"}
    ConceptModel.find({}, (error, result) =>{
        if(error){
            response.send(error);
        }
        response.send(result);
    })
});

const ImageM = require("./models/Image");
app.get('/multimedia_storage', (req, res) => {
    ImageM.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            console.log(res.json);
            console.log("-----------------------------------------");
            console.log(items);
        }
    });
});

app.get('/test',(req, res) => {
    database.collection("multimedia_storage").find({}).toArray((error, result) => {
        if(error){
            return res.status(500).send(error);
        }
        console.log('In result');
        res.send(result);
    });
});

// // Setting up an express-server
// require('dotenv').config();
// var bodyParser = require('body-parser');
// var fs = require('fs');
// var path = require('path');
// const Grid = require('gridfs-stream');
// const mongoose = require('mongoose');
// const connection = require('./db');
// const cors = require("cors");
// const port = process.env.PORT || 3002;
// const express = require("express");
// const app = express();
//

//
// let gfs;
// connection();
//
// const conn = mongoose.connection;
//
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())


// app.get('/concepts', async (require, response) => {
//     // within Filter: eg. $where: {conceptName: "Airplane"}
//     ConceptModel.find({}, (error, result) =>{
//         if(error){
//             response.send(error);
//         }
//         response.send(result);
//     })
// });
//
// app.listen(port, ()=> {
//     console.log(`Server is running on Port ${port}...`);
// });
//
//
// // conn.once('open', function() {
// //     gfs = Grid(conn.db, mongoose.mongo);
// //     gfs.collection("multimedia_storage");
// // });
//
//
//
// // parsing JSON which is coming from the Frontend
// // app.use(express.json());
// // app.use(cors());
// // app.use("/file", upload);
//
// // app.get('/file/:filename', async (req,res) => {
// //    try {
// //        const file = await gfs.files.findOne({filename: req.params.filename});
// //        const readStream = gfs.createReadStream(file.filename);
// //        readStream.pipe(res);
// //    } catch (e) {
// //        console.log(e);
// //        res.send('not found');
// //    }
// // });
//
// // app.delete('/file/:filename', async (req,res) => {
// //     try {
// //         await gfs.files.deleteOne({filename: req.params.filename});
// //         res.send('Deleting was successfull');
// //     } catch (e) {
// //         console.log(e);
// //         res.send('Error while deleting');
// //     }
// // });
//
//
//
// // create a Route - if accessing this route,
// // we simply add something to the DB
// // app.post('/insert', async (require, response) => {
// //
// //     const conceptId = require.body.conceptId;
// //     const conceptName = require.body.conceptName;
// //
// //     // to test inserting in DB
// //     const concept = new ConceptModel({
// //         conceptId: conceptId,
// //         name: conceptName
// //     });
// //
// //     // try to save this constant into the DB-Collection
// //     try{
// //        await concept.save()
// //     }catch (e) {
// //         console.log(e);
// //     }
// // });
//
//
