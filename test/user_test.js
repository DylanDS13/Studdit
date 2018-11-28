const assert = require('assert');
const User = require('../models/User');

describe('Creating records', () => {
    it('saves a user', (done) => {
        const joe = new User({ username: 'Joe', password: 'TestPassword123' });

        joe.save()
            .then(() => {
                assert(!joe.isNew);
                done();
            });
    });
});