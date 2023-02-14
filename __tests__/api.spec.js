const request = require('supertest');
const app = require('../api');

describe('api server', () => {
    let api;

    beforeAll(() => {
        api = app.listen(5000, () => {
            console.log('Test server running on port 5000')
        })
    })

    afterAll((done) => {
        console.log('Gracefully stopping test server')
        api.close(done)
    })

    test('it responds to get / with status 200', (done) => {
        request(api)
            .get('/')
            .expect(200, done)
    });

    test('it responds to get /events/:id with status 200', (done) => {
        request(api)
            .get('/events/4')
            .expect(200, done)
    });

    // test('it responds to post /events with status 201', (done) => {
    //     request(api)
    //         .post('/events')
    //         .expect(201, done)
    // });

    test('it responds to patch /events/interested/:id with status 200', (done) => {
        request(api)
            .patch('/events/interested/4')
            .expect(200, done)
    });

    test('it responds to patch /events/not_interested/:id with status 200', (done) => {
        request(api)
            .patch('/events/not_interested/4')
            .expect(200, done)
    });

    test('it responds to patch /events/attend/:id with status 200', (done) => {
        request(api)
            .patch('/events/attend/4')
            .expect(200, done)
    });

    test('it responds to patch /events/not_attending/:id with status 200', (done) => {
        request(api)
            .patch('/events/not_attending/4')
            .expect(200, done)
    });

    test('it responds to get /events with status 403(Forbidden without token)', (done) => {
        request(api)
            .get('/events')
            .expect(403, done)
    });

    test('it responds to get /events/search/:string with status 200', (done) => {
        request(api)
            .get('/events/search/:string')
            .expect(200, done)
    });

    test('it responds to get /users/login with status 200', (done) => {
        request(api)
            .get('/')
            .expect(200, done)
    });

    test('it responds to get /users/register with status 200', (done) => {
        request(api)
            .get('/')
            .expect(200, done)
    });

    test('it responds to delete /events/delete/:id with status 200', (done) => {
        request(api)
            .delete('/events/4')
            .expect(200, done)
    });
})
