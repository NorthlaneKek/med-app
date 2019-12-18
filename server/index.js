const express = require('express');
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require('mongodb').ObjectID;

const url = "mongodb://localhost:27017";
const mongoClient = new MongoClient(url, {useNewUrlParser: true});
let db;

const app = express();
let collection;

const PORT = 8080;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/getMeds', (req, res) => {
    if (!req.query.text) return;
    getMeds(req.query.text, function (data) {
        res.send(data);
    });
});

app.get('/getAnalogs', (req, res) => {
    if (!req.query._id) return;
    getAnalogs(req.query._id, function (data) {
        res.send(data);
    })
});

app.get('/getAllCustomers', (req, res) => {
    if (!req.query.name) return;
    getAllCustomers(req.query.name, function (data) {
        res.send(data);
    })
});

app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
    connect();
});

function connect() {
    mongoClient.connect(function (err, client) {
        db = client.db("medicines");
        collection = db.collection('med_list');
        console.log('Connect to db');
    });
}

function getAllCustomers(str, callback) {
    db.collection("med_list").find({"mainName": str}).toArray(function (err, result) {
        if (err) throw err;
        callback(result);
    });
}

function getAnalogs(id, callback) {
    db.collection("med_list").find({_id: id}).toArray(function (err, res) {
        if (err) throw err;
        if (!res.length) callback([]);
        getSuitableMedicines(res[0], callback)
    })
}

function getSuitableMedicines(medicine, callback) {
    const start = Date.now();
    let search = {internationalName: medicine['internationalName'], farmGroup: medicine['farmGroup']};
    collection.aggregate([
        {$match: search},
        {
            $group: {
                _id: "$mainName",
                numberRegistr: {$first: "$numberRegistr"},
                dateRegistr: {$first: "$dateRegistr"},
                dateEndRegistr: {$first: "$dateEndRegistr"},
                dateNull: {$first: "$dateNull"},
                faceMainCompany: {$first: "$faceMainCompany"},
                faceMainCountry: {$first: "$faceMainCountry"},
                internationalName: {$first: "$internationalName"},
                form: {$first: "$form"},
                stepsManufacturing: {$first: "$stepsManufacturing"},
                codePack: {$first: "$codePack"},
                documentationL: {$first: "$documentationL"},
                farmGroup: {$first: "$farmGroup"},
                docId: {$first: "$_id"},
            }
        },
        {
            $project: {
                mainName: "$_id",
                _id: "$docId",
                numberRegistr: "$numberRegistr",
                dateRegistr: "$dateRegistr",
                dateEndRegistr: "$dateEndRegistr",
                dateNull: "$dateNull",
                faceMainCompany: "$faceMainCompany",
                internationalName: "$internationalName",
                form: "$form",
                stepsManufacturing: "$stepsManufacturing",
                codePack: "$codePack",
                documentationL: "$documentationL",
                farmGroup: "$farmGroup",
            }
        }
    ]).toArray(function (err, result) {
        if (err) throw err;
        callback(result);
    });
}

function getMeds(str, callback) {
    collection.aggregate([
        {$match: {mainName: {'$regex': str}}},
        {
            $group: {
                _id: "$mainName",
                numberRegistr: {$first: "$numberRegistr"},
                dateRegistr: {$first: "$dateRegistr"},
                dateEndRegistr: {$first: "$dateEndRegistr"},
                dateNull: {$first: "$dateNull"},
                faceMainCompany: {$first: "$faceMainCompany"},
                faceMainCountry: {$first: "$faceMainCountry"},
                internationalName: {$first: "$internationalName"},
                form: {$first: "$form"},
                stepsManufacturing: {$first: "$stepsManufacturing"},
                codePack: {$first: "$codePack"},
                documentationL: {$first: "$documentationL"},
                farmGroup: {$first: "$farmGroup"},
                docId: {$first: "$_id"},
            }
        },
        {
            $project: {
                mainName: "$_id",
                _id: "$docId",
                numberRegistr: "$numberRegistr",
                dateRegistr: "$dateRegistr",
                dateEndRegistr: "$dateEndRegistr",
                dateNull: "$dateNull",
                faceMainCompany: "$faceMainCompany",
                internationalName: "$internationalName",
                form: "$form",
                stepsManufacturing: "$stepsManufacturing",
                codePack: "$codePack",
                documentationL: "$documentationL",
                farmGroup: "$farmGroup",
            }
        }
    ]).toArray(function (err, result) {
        if (err) throw err;
        callback(result);
    });
}


