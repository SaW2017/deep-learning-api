// set up express & mongoose
var express = require('express')
var app = express()
const cors = require('cors')

require('dotenv/config');

let keyframe = require('./model');

// // DB-Models
const MongoClient = require('mongodb').MongoClient;
var database;
const PORT = process.env.PORT || '3002'

const router = express.Router();

app.use(cors())
app.use(express.json())

app.use("/", router);

const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/video_search", {
    useNewUrlParser: true
}).then((mong) => {
    // console.log(mong);
});

const connection = mongoose.connection;

connection.once("open", function () {
    console.log("Connection with MongoDB was successful");
});

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});


// Start server
// app.listen(port, () => {
//     MongoClient.connect('mongodb://127.0.0.1:27017', {
//         useNewUrlParser: true
//     }, (err, result) => {
//         if (err)
//             throw err
//
//         database = result.db('video_search');
//         console.log('Server listening on port:', port);
//     });
// });

// router.route('/').get((request, response) => {
//     console.log(request);
//     return 'Hello World';
// });

router.route('/getData').get((request, response) => {
    keyframe.find({keyframe_id: /^everest/}, (error, result) => {
        if (error) {
            response.send(error);
            console.error('error', error);
        } else {
            response.send(result);
            console.log('result:', result);
        }
    })
});


// Routes
app.get('/concepts', async (require, response) => {
    try { // within Filter: eg. $where: {conceptName: "Airplane"}
        await database.video_search("key_frame_mongo_document").find({}).toArray((error, result) => {
            if (error) {
                return response.status(500).send(error);
            }
            response.send(result);
        })
    } catch (e) {
        console.log(e)
    }
});

app.get('/testDB', async (req, res) => {
    try {
        req.query.confidence === "undefined" ? conf = [0, 1] : conf = req.query.confidence.split`,`.map(x => +x);

        if (req.query.concept === "") {
            await database.collection("multimedia_storage").find({
                confidence: {
                    $gte: conf[0],
                    $lte: conf[1]
                }
            }).toArray((error, result) => {
                if (error) {
                    return res.status(500).send(error);
                }
                res.send(result);
            });
        } else {
            await database.collection("multimedia_storage").find({
                conceptName: req.query.concept,
                confidence: {
                    $gte: conf[0],
                    $lte: conf[1]
                }
            }).toArray((error, result) => {
                if (error) {
                    return res.status(500).send(error);
                }
                res.send(result);
            });
        }
    } catch (e) {
        console.log(e)
    }
});

app.get('/jsonAPI', async (req, res) => {
    try {
        await database.collection("jsonAPI").find({}).toArray((error, result) => {
            if (error) {
                return res.status(500).send(error);
            }
            res.send(result);
        });
    } catch (e) {
        console.log(e)
    }
});