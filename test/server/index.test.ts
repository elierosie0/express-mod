import app from '../../example'
import { agent as request } from 'supertest'

// A test case.
describe('Start up the server.', () => {
    it('Path: (/api/v1/ex), It should return a 200 status code.', (done) => {
        request(app).get('/api/v1/ex2').expect(200, done)
    })
})
