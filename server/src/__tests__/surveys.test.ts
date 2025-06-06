import request from 'supertest';
import app from '../app';
import { connectToDatabase } from '../database/connectToDatabase';
import { loginTestUser } from './utils/auth/loginUser';
import { TEST_USERS } from './utils/constants/TEST_USERS';
import { initFirebaseClient } from './utils/database/testFirebaseClient';
import { initFirebaseServer } from './utils/database/testFirebaseServer';

describe('Surveys Tests', () => {
  let townCouncilToken = '';
  let createdSurveyId = '';

  beforeAll(async () => {
    await connectToDatabase();
    await initFirebaseServer();
    await initFirebaseClient();

    townCouncilToken = await loginTestUser({
      email: TEST_USERS.townCouncil.email,
      password: TEST_USERS.townCouncil.password,
    });
  });

  // Survey creation
  test('POST /api/v1/surveys should return 201', async () => {
    const res = await request(app)
      .post('/api/v1/surveys')
      .send({
        survey: {
          title: 'My survey',
          status: 'created',
          creationDate: new Date(),
          rewardPoints: 5,
          questions: [
            {
              id: 'q1',
              question: 'How do you rate our service?',
              type: 'multiple-choice',
              options: [
                { id: 'opt1', text: 'Excellent' },
                { id: 'opt2', text: 'Good' },
              ],
            },
          ],
        },
      })
      .set('Authorization', `Bearer ${townCouncilToken}`)
      .set('Accept', 'application/json');

    expect(res.status).toBe(201);
    expect(res.body.status).toBe('success');
    expect(res.body.data.surveyId).toBeDefined();
    createdSurveyId = res.body.data.surveyId;
    return res;
  });

  // List all surveys
  test('GET /api/v1/surveys should return 200', async () => {
    const res = await request(app)
      .get('/api/v1/surveys')
      .set('Authorization', `Bearer ${townCouncilToken}`)
      .set('Accept', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(Array.isArray(res.body.data.surveys)).toBe(true);
    return res;
  });

  // Read survey by ID
  test('GET /api/v1/surveys/:surveyId should return 200', async () => {
    const res = await request(app)
      .get(`/api/v1/surveys/${createdSurveyId}`)
      .set('Authorization', `Bearer ${townCouncilToken}`)
      .set('Accept', 'application/json');
    console.log('Read survey response:', createdSurveyId, res.body);

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data.survey).toBeDefined();
    return res;
  });

  // Update survey
  test('PUT /api/v1/surveys/:surveyId should return 200', async () => {
    const res = await request(app)
      .put(`/api/v1/surveys/${createdSurveyId}`)
      .send({
        survey: {
          status: 'published',
        },
      })
      .set('Authorization', `Bearer ${townCouncilToken}`)
      .set('Accept', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data.surveyId).toBeDefined();
    return res;
  });
});
