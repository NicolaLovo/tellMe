import request from 'supertest';
import app from '../app';
import { connectToDatabase } from '../database/connectToDatabase';
import { SurveyAnswer } from '../types/survey/answer/SurveyAnswer';
import { loginTestUser } from './utils/auth/loginTestUser';
import { TEST_USERS } from './utils/constants/TEST_USERS';
import { initFirebaseClient } from './utils/database/testFirebaseClient';
import { initFirebaseServer } from './utils/database/testFirebaseServer';

// This file contains tests for the Surveys API endpoints
describe('Surveys Tests', () => {
  let townCouncilToken = '';
  let createdSurveyId = '';
  let citizenToken = '';
  let citizenUid = '';

  beforeAll(async () => {
    await connectToDatabase();
    await initFirebaseServer();
    await initFirebaseClient();

    const townCouncilLogin = await loginTestUser({
      email: TEST_USERS.townCouncil.email,
      password: TEST_USERS.townCouncil.password,
      roles: ['townCouncil'],
    });

    townCouncilToken = townCouncilLogin.token;

    const citizenLogin = await loginTestUser({
      email: TEST_USERS.citizen.email,
      password: TEST_USERS.citizen.password,
      roles: ['citizen'],
    });

    citizenToken = citizenLogin.token;
    citizenUid = citizenLogin.uid;
  });

  // Survey creation
  // Successfully create a survey
  test('POST /api/v1/surveys should return 200', async () => {
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
            {
              id: 'q2',
              question: 'Any suggestions?',
              type: 'multiple-choice',
              options: [
                { id: 'opt1', text: 'Better service' },
                { id: 'opt2', text: 'Better food' },
              ],
            },
          ],
        },
      })
      .set('Authorization', `Bearer ${townCouncilToken}`)
      .set('Accept', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data.surveyId).toBeDefined();
    createdSurveyId = res.body.data.surveyId;
    return res;
  });

  // Attempts to create a survey with missing/invalid fields
  // Missing title
  test('POST /api/v1/surveys should return 400 for missing title', async () => {
    const res = await request(app)
      .post('/api/v1/surveys')
      .send({
        survey: {
          title: '', // Empty title
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

    expect(res.status).toBe(400);
    expect(res.body.status).toBe('error');
    expect(res.body.data.message).toBe('Missing or invalid required fields');
    return res;
  });

  // Missing question text
  test('POST /api/v1/surveys should return 400 for missing question text', async () => {
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
              question: '', // Empty question text
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

    expect(res.status).toBe(400);
    expect(res.body.status).toBe('error');
    expect(res.body.data.message).toBe(
      'Each question must have a non-empty question text',
    );
    return res;
  });

  // Points less than 1
  test('POST /api/v1/surveys should return 400 for reward points less than 1', async () => {
    const res = await request(app)
      .post('/api/v1/surveys')
      .send({
        survey: {
          title: 'My survey',
          status: 'created',
          creationDate: new Date(),
          rewardPoints: 0, // Invalid reward points
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

    expect(res.status).toBe(400);
    expect(res.body.status).toBe('error');
    expect(res.body.data.message).toBe('Missing or invalid required fields');
    return res;
  });

  // No questions
  test('POST /api/v1/surveys should return 400 for missing questions', async () => {
    const res = await request(app)
      .post('/api/v1/surveys')
      .send({
        survey: {
          title: 'My survey',
          status: 'created',
          creationDate: new Date(),
          rewardPoints: 5,
          questions: [], // No questions provided
        },
      })
      .set('Authorization', `Bearer ${townCouncilToken}`)
      .set('Accept', 'application/json');

    expect(res.status).toBe(400);
    expect(res.body.status).toBe('error');
    expect(res.body.data.message).toBe('Missing or invalid required fields');
    return res;
  });

  // At least one question with less than 2 options
  test('POST /api/v1/surveys should return 400 for question with less than 2 options', async () => {
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
                { id: 'opt1', text: 'Excellent' }, // Only one option provided
              ],
            },
          ],
        },
      })
      .set('Authorization', `Bearer ${townCouncilToken}`)
      .set('Accept', 'application/json');

    expect(res.status).toBe(400);
    expect(res.body.status).toBe('error');
    expect(res.body.data.message).toBe(
      'Multiple-choice questions must have at least two options',
    );
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
    // console.log('Read survey response:', createdSurveyId, res.body);

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

  // Test on survey answers
  // All questions answered
  test('POST /api/v1/citizens/:uid/surveys/:surveyId/answer should return 201 for the creation of a complete survey answer', async () => {
    const answer: SurveyAnswer = {
      _id: {
        surveyId: createdSurveyId,
        uid: citizenUid,
      },
      creationDate: new Date(),
      answers: [
        {
          questionId: 'q1',
          optionId: 'opt1',
          type: 'multiple-choice',
        },
        {
          questionId: 'q2',
          optionId: 'opt2',
          type: 'multiple-choice',
        },
      ],
    };
    const res = await request(app)
      .post(`/api/v1/citizens/${citizenUid}/surveys/${createdSurveyId}/answer`)
      .send({ surveyAnswer: answer })
      .set('Authorization', `Bearer ${citizenToken}`)
      .set('Accept', 'application/json');

    expect(res.status).toBe(201);
    expect(res.body.status).toBe('success');
    return res;
  });

  // If already answered
  test('POST /api/v1/citizens/:uid/surveys/:surveyId/answer should return 409 if user already answered survey', async () => {
    const answer: SurveyAnswer = {
      _id: {
        surveyId: createdSurveyId,
        uid: citizenUid,
      },
      creationDate: new Date(),
      answers: [
        {
          questionId: 'q1',
          optionId: 'opt2',
          type: 'multiple-choice',
        },
        {
          questionId: 'q2',
          optionId: 'opt2',
          type: 'multiple-choice',
        },
      ],
    };
    const res = await request(app)
      .post(`/api/v1/citizens/${citizenUid}/surveys/${createdSurveyId}/answer`)
      .send({ surveyAnswer: answer })
      .set('Authorization', `Bearer ${citizenToken}`)
      .set('Accept', 'application/json');
    console.log(res.body);
    expect(res.status).toBe(409);
    expect(res.body.status).toBe('error');
    return res;
  });
});
