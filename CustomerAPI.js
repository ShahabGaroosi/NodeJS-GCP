//Run the script by entering the following commands:
//set GOOGLE_APPLICATION_CREDENTIALS=C:\Users\sgaroosi\Downloads\API Project-664231d44bfe.json
//node CustomerAPI.js

'use strict';

// Imports the necessary libraries
const { Datastore } = require('@google-cloud/datastore');
const bodyParser = require('body-parser')
var express = require('express');
var app = express();


const url = "http://localhost:3000/";

// Your Google Cloud Platform project ID
const projectId = 'api-project-240511';

// Creates a client
const datastore = new Datastore({
    projectId: projectId,
});

const kind = 'Customer';
app.use(bodyParser.json());

var customers;

app
    .get('/Customer', async function (req, res) {
        try {
            var query = await datastore.createQuery(kind);
            [customers] = await datastore.runQuery(query);
            res.send(customers)
            console.log(customers)
        } catch (err) {
            res.send(JSON.stringify(err))
        }
        
    })
    .get('/Customer/:id', async function (req, res) {
        try {
            const customerKey = await datastore.key([kind, req.params.id]);
            const customer = await datastore.get(customerKey)
            res.send(customer)
            console.log(customer)
        }
        catch (err) {
            res.send(JSON.stringify(err))
        }
        
    })
    .post('/Customer', async function (req, res) {
        try {
            var customers = [];
            var i;
            for (i = 0; i < req.body.length; i++) {
                customers.push({
                    key: datastore.key([kind, req.body[i].id]),
                    data: req.body[i],
                });
            }
            await datastore.save(customers);
            res.send(JSON.stringify(req.body));
            console.log(JSON.stringify(req.body));
        } catch (err) {
            res.send(JSON.stringify(err))
        }
    })
    .post('/Customer/:id', async function (req, res) {
        try {
            var customer = {
                key: datastore.key([kind, req.params.id]),
                data: req.body,
            };
            await datastore.save(customer);
            res.send(JSON.stringify(req.body));
            console.log(req.body);
        } catch (err) {
            res.send(JSON.stringify(err))
        }
    })

const server = app.listen(3000);