const request = require('supertest');

const app = require('../app');

//Fill this with many many tests YAY!! 😜😩
describe('Get all facsters route', () => {
    test('GET Route /facster, status 200, json header, all facsters data in json', (done) => {
        request(app)
        .get('/facsters')
        .expect(404)
        .expect('Content-Type', /json/)
        .end((err, res) => {
            if (err) return done(err);
            expect(Array.isArray(res.body)).toBe(true)
            done();
        })
    })
})

describe('Get specific facster route', () => {
    test('GET Route /facster/:name, status 200, json header, specific facster data in json', (done) => {
        request(app)
        .get('/facsters/Abdullah')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
            if (err) return done(err);
            expect(res.body).toEqual({
                "id": 1,
                "firstname": "Abdullah",
                "surname": "Chaudry",
                "cohort": 11,
                "hobby": "late night sql",
                "superpower": "linting wizard"
              })
            done()
        })
    })

    test('GET Route /facster/:name nonexistence, status 200, json header, specific facster data in json', (done) => {
        request(app)
        .get('/facsters/Ibrahim')
        .expect(404)
        .end((err, res) => {
            if (err) return done(err);
            expect(res.body).toEqual({message: 'The user doesnt exist'})
            done()
        })
    })
})

test('POST /facster/new, status 201, json header', (done) => {
    expect.assertions(2);
    request(app)
    .post('/facster/new')
    .send({firstname: 'Malek', surname: 'Zd', cohort: 'G11'})
    .expect(201)
    .expect('Content-Type', /json/)
    .end((err, res) => {
        if (err) return done(err);
        expect(typeof res.body).toBe('object');
        expect(res.body.firstname).toBe('Malek');
        done();
    })
})
