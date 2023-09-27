import request from 'supertest';
import app from '../src/app';

describe('Task API', () => {
    let authToken: string;
    let userId: number; 
    beforeAll(async () => {
    const loginResponse = await request(app)
        .post('/login')
        .send({username: 'testuser12345', password: 'testpass12345'});
    authToken = loginResponse.body.token
    userId = loginResponse.body.user.id
    })

    test('should add a task', async () => {
        console.log(userId)
        const taskData = {
            taskName: 'mop',
            completed: false, 
            userid: userId,
        }
        const response = await request(app)
            .post('/addtask')
            .set('Authorization', `Bearer ${authToken}`)
            .send(taskData)
        expect(response.status).toBe(201);
        expect(response.body.taskName).toBe(taskData.taskName);
        expect(response.body.completed).toBe(taskData.completed);
        expect(response.body.userid).toBe(taskData.userid);
     })
})