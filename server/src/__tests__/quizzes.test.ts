import request from 'supertest';
import app from '../app';
import { connectToDatabase } from '../database/connectToDatabase';
import { loginTestUser } from './utils/auth/loginUser';
import { TEST_USERS } from './utils/constants/TEST_USERS';
import { initFirebaseClient } from './utils/database/testFirebaseClient';
import { initFirebaseServer } from './utils/database/testFirebaseServer';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  uid: string;
  email: string;
  roles: string[];
}

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

    agencyToken = await loginTestUser({
      email: TEST_USERS.agency.email,
      password: TEST_USERS.agency.password,
    });

    const decoded = jwtDecode<TokenPayload>(agencyToken);
    agencyId = decoded.uid;
    console.log('agency id --> ' , agencyId);
    
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
