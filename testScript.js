//Before running the script run the following command:
//set GOOGLE_APPLICATION_CREDENTIALS=C:\Users\sgaroosi\Downloads\API Project-664231d44bfe.json
//node testScript.js
'use strict';

// Imports the Google Cloud client and API library
const { Datastore } = require('@google-cloud/datastore');
var API0 = require('./customer_api');


async function testApi() {
    // Your Google Cloud Platform project ID
    const projectId = 'api-project-240511';

    // Creates a client
    const datastore = new Datastore({
        projectId: projectId,
    });
    
    var API = new API0(datastore);

    // The kind for the new entity
    const kind = 'Customer';
    // The name/ID for the new entity
    const name = 'customer2';
    // The Cloud Datastore key for the new entity
    const customerKey = datastore.key([kind, name]);

    // Prepares the new entities
    const customers0 = [{
        key: datastore.key([kind, 'customer1']),
        data: {
            description: 'Adult',
        },
    }, {
        key: datastore.key([kind, 'customer2']),
        data: {
            description: 'Adult',
        },
    }, {
        key: datastore.key([kind, 'customer3']),
        data: {
            description: 'Adult',
        },
    }];

    await API.postCustomers(customers0, datastore);

    const [customer] = await API.getCustomer(customerKey);
    console.log(customer);

    const [customers] = await API.getCustomers(kind);
    console.log('Customers:');
    customers.forEach(customer => console.log(customer));

    customers[0].description = 'Child';
    console.log(customers);
    await API.postCustomers(customers)

}
testApi().catch(console.error);
