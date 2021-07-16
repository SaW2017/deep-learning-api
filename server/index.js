// set up express & mongoose
var express = require('express')
var app = express()

require('dotenv/config');

// // DB-Models
const MongoClient = require('mongodb').MongoClient;
var database;
var port = process.env.PORT || '3002'

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
        await database.collection("multimedia_storage").find({}).toArray((error, result) => {
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
    }
});