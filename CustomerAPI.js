//Run the script by entering the following commands:
//set GOOGLE_APPLICATION_CREDENTIALS=C:\Users\sgaroosi\Downloads\API Project-664231d44bfe.json
//node CustomerAPI.js

'use strict';

// Imports the necessary libraries
const { Datastore } = require('@google-cloud/datastore');
const bodyParser = require('body-parser')
var express = require('express');
var app = express();


const url = "http://localhost:500/";

// Your Google Cloud Platform project ID
const projectId = 'api-project-240511';

// Creates a client
const datastore = new Datastore({
    projectId: projectId,
});

const kind = 'Customer';
app.use(bodyParser.json());

app
    .get('/Customer', async function (req, res) {
        try {
            var query = await datastore.createQuery(kind)
            var [customers] = await datastore.runQuery(query)
            res.send(customers)
            console.log(customers)
        } catch (err) {
            res.send(JSON.stringify(err))
        }
        
    })
    .get('/Customer/:id', async function (req, res) {
        try {
            const customerKey = await datastore.key([kind, req.params.id]);
            const [customer] = await datastore.get(customerKey);
            res.send(customer)
            console.log(customer)
        }
        catch (err) {
            res.send(JSON.stringify(err))
        }
        
    })
    .post('/Customer', async function (req, res) {
        try {
            await datastore.save(req.body);
            res.send(JSON.stringify(req.body));
            console.log(req.body);
        } catch (err) {
            res.send(JSON.stringify(err))
        }
    })
    .post('/Customer/:id', async function (req, res) {
        console.log(req.body);
        try {
            await datastore.save(req.body);
            res.send(JSON.stringify(req.body));
            console.log(req.body);
        } catch (err) {
            res.send(JSON.stringify(err))
        }
    })

const server = app.listen(3000);