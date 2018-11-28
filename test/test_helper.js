const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
    // mongoose.connect('mongodb://localhost/users_test');
    mongoose.connect('mongodb://Admin:Admin123@ds119374.mlab.com:19374/studdit_db');
    mongoose.connection
        .once('open', () => { done(); })
        .on('error', (error) => {
            console.warn('Warning', error);
        });
});

beforeEach((done) => {
    const { users } = mongoose.connection.collections;
    users.drop(() => {
        done();
    });
});