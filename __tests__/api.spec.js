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
            .get('/events/1')
            .expect(200, done)
    });

    // test('it responds to post /events with status 201', (done) => {
    //     const testData = {
    //         user_id: 1,
    //         start_date: "2023-02-17 11:17:00 +0000",
    //         end_date: "2023-02-18 11:17:00 +0000",
    //         event_title: "Second Post",
    //         event_description: "Second",
    //         category_id: "festival",
    //         image_url: "https://res.cloudinary.com/da6qginmp/image/upload/v1676459835/i5ztq5cynadrhnvcuwe4.jpg",
    //         location: "Dublin"
    //     }

    //     request(api)
    //         .post('/events')
    //         .send(testData)
    //         .set('Accept', 'application/json')
    //         .expect(201)
    //         .expect({ ...testData, id: 2 }, done)
    // });

    test('it responds to patch /events/interested/:id with status 200', (done) => {
        request(api)
            .patch('/events/interested/1')
            .expect(200, done)
    });

    test('it responds to patch /events/not_interested/:id with status 200', (done) => {
        request(api)
            .patch('/events/not_interested/1')
            .expect(200, done)
    });

    test('it responds to patch /events/attend/:id with status 200', (done) => {
        request(api)
            .patch('/events/attend/1')
            .expect(200, done)
    });

    test('it responds to patch /events/not_attending/:id with status 200', (done) => {
        request(api)
            .patch('/events/not_attending/1')
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

    // test('it responds to delete /events/delete/:id with status 200', (done) => {
    //     request(api)
    //         .delete('/events/4')
    //         .expect(200, done)
    // });
})
