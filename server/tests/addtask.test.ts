import request from 'supertest';
import app from '../src/app';

describe('Task API', () => {
    let authToken: string;
    beforeAll(async () => {
    const loginResponse = await request(app)
        .post('/login')
        .send({username: 'jacky', password: 'jacky'});
    authToken = loginResponse.body.token
    })

    test('should add a task', async () => {
        const taskData = {
            taskName: 'mop',
            completed: false, 
        }
        const response = await request(app)
            .post('/addtask')
            .set('Authorization', `Bearer ${authToken}`)
            .send(taskData)
        expect(response.status).toBe(201);
     })
})