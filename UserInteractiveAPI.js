//Script where the user input decides the API call.

//Run the script by entering the following commands:
//set GOOGLE_APPLICATION_CREDENTIALS=C:\Users\sgaroosi\Downloads\API Project-664231d44bfe.json
//node UserInteractiveAPI.js

'use strict';

var async = require('async');

// Imports the necessary libraries
const { Datastore } = require('@google-cloud/datastore');
var API0 = require('./customer_api');
const readline = require('readline');


const readlineInterface = readline.createInterface(process.stdin, process.stdout);

//User input function
function ask(questionText) {
    return new Promise((resolve, reject) => {
        readlineInterface.question(questionText, resolve);
    });
}

start();

async function start() {

    // Your Google Cloud Platform project ID
    const projectId = 'api-project-240511';

    // Creates a client
    const datastore = new Datastore({
        projectId: projectId,
    });

    var API = new API0(datastore);
    const kind = 'Customer';

    var customers;// = await API.getCustomers(kind);
    let option = "";
    let customerKey;// = "";

    while (option != "4") {

        option = await ask('Press 1 for get one customer, 2 for get all customers, 3 for return customers, 4 for exit: ');

        switch (option) {
            case "1":
                customerKey = await ask('Enter customer id: ');
                customerKey = datastore.key([kind, customerKey]);
                [customers] = await API.getCustomer(customerKey);
                if (customers == undefined) {
                    console.log("Invalid customer id.");
                }
                else {
                    console.log(customers);
                }
                break;
            case "2":
                [customers] = await API.getCustomers(kind);
                console.log(customers);
                break;
            case "3":
                if (customers != undefined) {
                    await API.postCustomers(customers);
                    console.log("Customers returned.");
                }
                else {
                    console.log("Customers undefined and not returned.")
                }
                break;
            case "4":
                console.log("Closing API.");
                break;
            default:
                console.log("Invalid option.");
        }

    }
    process.exit();
}
