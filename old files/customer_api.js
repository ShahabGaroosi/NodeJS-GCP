'use strict';
//set GOOGLE_APPLICATION_CREDENTIALS=C:\Users\sgaroosi\Downloads\API Project-664231d44bfe.json

module.exports = function(datastore) {

    //get one customer from cloud
    this.getCustomer = function(customerKey) {
        return datastore.get(customerKey);
    },

    //get all customers from cloud
    this.getCustomers = function(kind) {
        const query = datastore.createQuery(kind);
        return datastore.runQuery(query);
    },

    //return customers to cloud
    this.postCustomers = function(customers) {
        datastore.save(customers);
    }
}
