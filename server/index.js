// set up express & mongoose
var express = require('express')
var app = express()
const cors = require('cors')

require('dotenv/config');

// // DB-Models
const MongoClient = require('mongodb').MongoClient;
var database;
var port = process.env.PORT || '3002'

app.use(cors())
app.use(express.json())

// Start server
app.listen(port, () => {
    MongoClient.connect('mongodb://localhost:27017', {
        useNewUrlParser: true
    }, (err, result) => {
        if (err)
            throw err
        database = result.db('video_search');
        console.log('Server listening on port', port)
    });
})

// Routes
app.get('/concepts', async (require, response) => {
    try { // within Filter: eg. $where: {conceptName: "Airplane"}
        await database.collection("concepts").find({}).toArray((error, result) => {
            if (error) {
                return res.status(500).send(error);
            }
            response.send(result);
        })
    } catch (e) {
        console.log(e)
    }
});

app.get('/testDB', async (req, res) => {
    try {
        conf = req.query.confidence.split`,`.map(x=>+x);
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
    }});