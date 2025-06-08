import request from 'supertest';
import app from '../app';
import { UserModel } from '../database/auth/UserSchema';
import { connectToDatabase } from '../database/connectToDatabase';
import { getTestUserFirebaseToken } from './utils/auth/getUsersFirebaseTokens';
import { TEST_USERS } from './utils/constants/TEST_USERS';
import { initFirebaseClient } from './utils/database/testFirebaseClient';
import { initFirebaseServer } from './utils/database/testFirebaseServer';

describe('Quizzes Tests', () => {
  let townCouncilToken = '';
  let agencyToken = '';
  let agencyId = '';

  let agencyFirebaseToken = '';
  let townCouncilFirebaseToken = '';

  beforeAll(async () => {
    await connectToDatabase();
    await initFirebaseServer();
    await initFirebaseClient();

    // Login town council
    const townCouncilLoginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({ firebaseToken: townCouncilFirebaseToken });


    // Token Firebase
    const agencyCredentials = await getTestUserFirebaseToken({
      email: TEST_USERS.agency.email,
      password: TEST_USERS.agency.password,
    });
    const townCouncilCredentials = await getTestUserFirebaseToken({
      email: TEST_USERS.townCouncil.email,
      password: TEST_USERS.townCouncil.password,
    });


    // Register agency
    await request(app)
      .post('/api/v1/auth/agencies')
      .send({
        email: TEST_USERS.agency.email,
        firebaseToken: agencyFirebaseToken,
      })
      .set('Authorization', `Bearer ${townCouncilToken}`);

    // Login agency
    const agencyLoginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({ firebaseToken: agencyFirebaseToken });
  });

  test('POST /api/v1/:agencyId/quizzes should return 200 with valid quiz', async () => {
    const res = await request(app)
      .post(`/api/v1/${agencyId}/quizzes`)
      .set('Authorization', `Bearer ${agencyToken}`)
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
});
