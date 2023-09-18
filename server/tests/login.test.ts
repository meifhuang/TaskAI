import request from 'supertest';
import app from '../src/app';


describe('POST /login', () => {
    test('should log in a user', async () => {
        const user = {
            username: 'testuser12345', 
            password: 'testpass12345',
        }
        const response = await request(app)
        .post('/login')
        .send(user);
    expect(response.status).toBe(200);
    // expect(response.body).toMatchObject(user);
    // expect(response.body).toEqual({message: 'Success'});
    });

    test('should handle login errs', async () => {
        const invalidUser = {
            username: 'testing',
            password: 'testing'
        }
        const response = await request(app)
            .post('/login')
            .send(invalidUser);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', 'Invalid credentials');
    })

    test('should handle username does not exist', async () => {
        const invalidUser = {
            username: 'username',
            password: 'testing'
        }
        const response = await request(app)
            .post('/login')
            .send(invalidUser);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', 'Invalid credentials');
    })
})