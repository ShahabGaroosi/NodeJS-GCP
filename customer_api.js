//set GOOGLE_APPLICATION_CREDENTIALS=C:\Users\sgaroosi\Downloads\API Project-664231d44bfe.json

module.exports = {
    //get one customer
    getCustomer: function (customerKey, datastore) {
        return datastore.get(customerKey);
    },

    //get all customers
    getCustomers: function (kind, datastore) {
        const query = datastore.createQuery(kind);
        return datastore.runQuery(query);
    },

    //return customers
    postCustomers: function (customers, datastore) {
        datastore.save(customers);
    }
}