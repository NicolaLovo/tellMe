import request from 'supertest';
import app, { sum } from '../app';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);

  expect(app).toBeDefined();
});

test('GET / should return 200', () => {
  return request(app).get('/').expect(200);
});
