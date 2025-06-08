import request from 'supertest';
import app from '../app';
import { connectToDatabase } from '../database/connectToDatabase';
import { loginTestUser } from './utils/auth/loginUser';
import { TEST_USERS } from './utils/constants/TEST_USERS';
import { initFirebaseClient } from './utils/database/testFirebaseClient';
import { initFirebaseServer } from './utils/database/testFirebaseServer';

describe('Quizzes Tests', () => {
  let agencyToken: string;
  let agencyId: string;
  let citizenToken: string;
  let citizenId: string;
  const quizId = '684548f34850426da2c8acf4';

  beforeAll(async () => {
    await connectToDatabase();
    await initFirebaseServer();
    await initFirebaseClient();

    const citizenres = await loginTestUser({
      email: TEST_USERS.citizen.email,
      password: TEST_USERS.citizen.password,
    });

    citizenId = citizenres.uid;
    citizenToken = citizenres.token;

    const agencyres = await loginTestUser({
      email: TEST_USERS.agency.email,
      password: TEST_USERS.agency.password,
    });

    agencyToken = agencyres.token;
    agencyId = agencyres.uid;
  });

  test('POST /api/v1/:agencyId/quizzes should return 200 with valid quiz', async () => {
    const res = await request(app)
      .post(`/api/v1/${agencyId}/quizzes`)
      .set('Authorization', `Bearer ${agencyId}`)
      .send({
        quiz: {
          title: 'my quiz',
          questions: [
            {
              id: 'q1',
              question: 'Would you recommend us to a friend?',
              type: 'rating',
            },
          ],
        },
      });

    expect(res.status).toBe(200);
    expect(res.body.data.quizId).toBeDefined();
  });

  test('POST /api/v1/:agencyId/quizzes should fail with 400 if title is empty', async () => {
    const res = await request(app)
      .post(`/api/v1/${agencyId}/quizzes`)
      .set('Authorization', `Bearer ${agencyId}`)
      .send({
        quiz: {
          title: '', // Empty tile
          questions: [
            {
              id: 'q1',
              question: 'How was the service?',
              type: 'rating',
            },
          ],
        },
      });

    expect(res.status).toBe(400);
    expect(res.body.status).toBe('error');
    expect(res.body.data.message).toBe('Missing or invalid required fields');
  });

  test('POST /api/v1/:agencyId/quizzes should fail with 400 if there are no questions', async () => {
    const res = await request(app)
      .post(`/api/v1/${agencyId}/quizzes`)
      .set('Authorization', `Bearer ${agencyId}`)
      .send({
        quiz: {
          title: 'my quiz',
          questions: [], // No questions
        },
      });

    expect(res.status).toBe(400);
    expect(res.body.status).toBe('error');
    expect(res.body.data.message).toBe('Missing or invalid required fields');
  });

  test('POST /api/v1/:agencyId/quizzes should fail with 400 if a question is empty', async () => {
    const res = await request(app)
      .post(`/api/v1/${agencyId}/quizzes`)
      .set('Authorization', `Bearer ${agencyId}`)
      .send({
        quiz: {
          title: 'my quiz',
          questions: [
            {
              id: 'q1',
              question: '', // Empty question
              type: 'rating',
            },
          ],
        },
      });

    expect(res.status).toBe(400);
    expect(res.body.status).toBe('error');
    expect(res.body.data.message).toBe(
      'Each question must have a non-empty question text',
    );
  });

  test('POST /api/v1/agencies/:agencyId/quizzes/:quizId/answers/:uid should create a quiz answer', async () => {
    const payload = {
      quizAnswer: {
        _id: '',
        status: 'pending',
        quizId,
        agencyId,
        creationDate: new Date().toISOString(),
        citizenId,
      },
    };

    const res = await request(app)
      .post(
        `/api/v1/agencies/${agencyId}/quizzes/${quizId}/answers/${citizenId}`,
      )
      .send(payload);

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data.quizAnswerId).toBeDefined();
  });

  test('POST /api/v1/agencies/:agencyId/quizzes/:quizId/answers/ without UID should return 404', async () => {
    const payload = {
      quizAnswer: {
        _id: '',
        status: 'pending',
        quizId,
        agencyId,
        creationDate: new Date().toISOString(),
        uid: '', // empty citizen id
      },
    };

    const res = await request(app)
      .post(
        `/api/v1/agencies/${agencyId}/quizzes/${quizId}/answers/${citizenId}`,
      )
      .send(payload);

    expect(res.status).toBe(400);
  });
});
