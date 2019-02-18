const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoClient = require('mongodb').MongoClient
const url = 'mongodb://admin:a123456@ds127655.mlab.com:27655/testregister'
const dbName = 'testregister';
const app = express()
const port = 4001

app.use(bodyParser.json())
app.use(cors())

app.post('/register', (req, res) => {
    mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        const db = client.db(dbName)
        db.collection('users').findOne({ username: req.body.username }, (err, result) => {
            if (err) throw err
            if (result === null) {
                const newUser = {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    sex: req.body.sex,
                    country: req.body.country,
                    education: req.body.education,
                };
                db.collection('users').insertOne(newUser, (err, result) => {
                    if (err) throw err
                    client.close()
                    res.json({ status: true })
                })
            } else {
                res.json({ status: false })
                client.close()
            }
        })
    })
})

app.get('/education', (req, res) => {
    var arr 
    mongoClient.connect(url, (err, client) => {
        console.log('Connected successfully to server');
        const db = client.db(dbName)
        db.collection('education').find({}, { projection: { _id: 0, educationLevel: 1 }}).toArray(function (err, result) {
            if (err) throw err;
            res.send(result)
            console.log(result);
            client.close();
        });
    })
})

app.listen(port, () => {
    console.log(`App listening on ${port}`)
})