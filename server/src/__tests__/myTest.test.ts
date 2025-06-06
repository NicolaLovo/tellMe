import request from 'supertest';
import app from '../app';

test('GET / should return 200', () => {
  return request(app).get('/').expect(200);
});
