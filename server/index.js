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

const conceptStringHelper = (concept) => {
    if (concept === undefined || concept === "" || !concept instanceof String) {
        return "";
    }
    return concept.toLowerCase();
}

const confidenceStringHelper = (confidence) => {
    if (confidence === undefined || confidence === "") {
        return [0, 1];
    }
    let conf_split = confidence.split(',')

    if (conf_split.length !== 2) {
        return [0, 1];
    }
    return [conf_split[0], conf_split[1]];
};

router.route("/filter").get(function (request, response) {
    try {
        let filter = {}
        console.log("in API find")
        let concept = conceptStringHelper(request.query.concept);
        let confidence = confidenceStringHelper(request.query.confidence);
        let lower_confidence = confidence[0];
        let upper_confidence = confidence[1];
        // console.log('concept: ' + concept);
        // console.log('confidence: ' + lower_confidence);
        // console.log('confidence: ' + upper_confidence);
        let regexString = `^.*${concept}.*$`;
        //if (req.query.concept === "") {
        filter = {
            'concept_confidence': {$elemMatch: {$elemMatch: {$regex: regexString, $options: 'i'}}}
        }

        // }else{

        //}


        KeyframeModel.find(filter, function (err, result) {
            if (err) {
                response.send(err);
            } else {
                console.log('no error');
                response.json(result);
                console.log(result)
            }
        });
    } catch (e) {

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