const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3002;
const mongoose = require("mongoose");
app.use(cors());

let KeyframeModel = require('./model');

const router = express.Router();

mongoose.connect("mongodb://127.0.0.1:27017/keyframe_small", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.once("open", function () {
    console.log("Connection with MongoDB was successful");
});

app.use('/', router);

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});


router.route('/getHelloWorld').get((request, response) => {
    response.send('Hello World');
});

router.route("/filter").get(function (req, res) {
    try{
        let filter = {}
        regexString = `^.*${req.query.concept}.*$`;
        console.log("in API find")
        req.query.confidence === "" ? conf = [0, 1] : conf = req.query.confidence.split`,`.map(x => +x);
        //if (req.query.concept === "") {
            filter = {
                'concept_confidence':{$elemMatch:{$elemMatch:{$regex: regexString , $options: 'i'}}}
                }

       // }else{

        //}


        KeyframeModel.find(filter, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                console.log('no error');
                res.json(result);
                console.log(result)
            }
        });
    }catch (e) {

    }
});


router.route("/find").get(function (req, res) {
    let filter = {}
    KeyframeModel.find(filter, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            console.log('no error');
            res.json(result);
        }
    });
});

router.route('/save').get((request, response) => {

    KeyframeModel.findOne({}, (err, result) => {
        if (err) {
            response.send(err);
        } else {
            console.log('no error');
            response.json(result);
        }
    });
});