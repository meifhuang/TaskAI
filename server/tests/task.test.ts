import request from 'supertest';
import app from '../src/app';
import * as jwtUtils from '../src/utils/jwt';

describe('Task API', () => {
    let authToken: string;
    let userId: number; 
    beforeAll(async () => {

    const loginResponse = await request(app)
        .post('/login')
        .send({username: 'testuser12345', password: 'testpass12345'});
        authToken = loginResponse.body.token;
        userId = loginResponse.body.user_id;
    })

    test('should retrieve all tasks', async () => {
        if (!userId) {
            throw new Error('userId not found');
        }
        const response = await request(app)
            .get(`/tasks/${userId}`)
            .set('Authorization', `Bearer ${authToken}`);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    })

    test('should add a task', async () => {
        const taskData = ({
            taskName: 'testing',
            completed: false, 
            userid: userId,
        })
        const response = await request(app)
            .post('/task/add')
            .set('Authorization', `Bearer ${authToken}`)
            .send(taskData)
        expect(response.status).toBe(201);
        expect(response.body.taskName).toBe(taskData.taskName);
        expect(response.body.completed).toBe(taskData.completed);
        expect(response.body.userid).toBe(taskData.userid);
     })

     test('should edit a check', async () => {
        const response = await request(app)
            .put('/task/updatecheck/60')
            .set('Authorization', `Bearer ${authToken}`)
        expect(response.status).toBe(200);
     })

     test('should edit taskname', async () => {
        const taskData = {value: 'sweep'}
        const response = await request(app)
            .put('/task/update/60')
            .set('Authorization', `Bearer ${authToken}`)
            .send(taskData)
        expect(response.status).toBe(200);
     })

     test('should delete a task', async () => {
        const response = await request(app)
            .delete('/task/58')
            .set('Authorization', `Bearer ${authToken}`)
        expect(response.status).toBe(200);
     })
})