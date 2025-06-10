import request from 'supertest';
import app from '../app';
import { connectToDatabase } from '../database/connectToDatabase';
import { QuizAnswerModel } from '../database/quiz/QuizAnswerSchema';
import { QuizAnswer } from '../types/quiz/answer/QuizAnswer';
import { loginTestUser } from './utils/auth/loginTestUser';
import { TEST_USERS } from './utils/constants/TEST_USERS';
import { initFirebaseClient } from './utils/database/testFirebaseClient';
import { initFirebaseServer } from './utils/database/testFirebaseServer';

describe('Quizzes Tests', () => {
  let agencyToken: string;
  let agencyId: string;
  let citizenToken: string;
  let citizenId: string;
  let quizId = '';

  jest.setTimeout(30000);

  beforeAll(async () => {
    await connectToDatabase();
    await initFirebaseServer();
    await initFirebaseClient();

    const citizenres = await loginTestUser({
      email: TEST_USERS.citizen.email,
      password: TEST_USERS.citizen.password,
      roles: ['citizen'],
    });

    citizenId = citizenres.uid;
    citizenToken = citizenres.token;

    const agencyres = await loginTestUser({
      email: TEST_USERS.agency.email,
      password: TEST_USERS.agency.password,
      roles: ['agency'],
    });

    agencyToken = agencyres.token;
    agencyId = agencyres.uid;
  });

  //Quiz creation
  test('POST /api/v1/agencies/:agencyId/quizzes should return 200 with valid quiz', async () => {
    const res = await request(app)
      .post(`/api/v1/agencies/${agencyId}/quizzes`)
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
    quizId = res.body.data.quizId; // Store the quizId for later tests
  });

  //Create Quiz with empty title
  test('POST /api/v1/agencies/:agencyId/quizzes should fail with 400 if title is empty', async () => {
    const res = await request(app)
      .post(`/api/v1/agencies/${agencyId}/quizzes`)
      .set('Authorization', `Bearer ${agencyToken}`)
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

  //Create Quiz without questions
  test('POST /api/v1/agencies/:agencyId/quizzes should fail with 400 if there are no questions', async () => {
    const res = await request(app)
      .post(`/api/v1/agencies/${agencyId}/quizzes`)
      .set('Authorization', `Bearer ${agencyToken}`)
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

  //Create Quiz with an empty question
  test('POST /api/v1/agencies/:agencyId/quizzes should fail with 400 if a question is empty', async () => {
    const res = await request(app)
      .post(`/api/v1/agencies/${agencyId}/quizzes`)
      .set('Authorization', `Bearer ${agencyToken}`)
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

  //Create a QuizAnswer
  test('POST /api/v1/agencies/:agencyId/quizzes/:quizId/answers should create a quiz answer', async () => {
    const payload = {
      quizAnswer: {
        _id: '',
        status: 'pending',
        quizId,
        agencyId,
        creationDate: new Date().toISOString(),
        uid: citizenId,
      },
    };

    const res = await request(app)
      .post(`/api/v1/agencies/${agencyId}/quizzes/${quizId}/answers`)
      .set('Authorization', `Bearer ${agencyToken}`)
      .send(payload);

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data.answerId).toBeDefined();
  });

  //Create a QuizAnswer without sending the citizen id
  test('POST /api/v1/agencies/:agencyId/quizzes/:quizId/answers where the answer has UID empty should return 500', async () => {
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
      .post(`/api/v1/agencies/${agencyId}/quizzes/${quizId}/answers`)
      .set('Authorization', `Bearer ${agencyToken}`)
      .send(payload);

    expect(res.status).toBe(500);
  });

  //Compile a QuizAnswer
  test('PUT /api/v1/agencies/:agencyId/quizzes/:quizId/answers/:quizAnswerId with all questions answered should succeed', async () => {
    const quizRes = await request(app)
      .get(`/api/v1/agencies/${agencyId}/quizzes/${quizId}`)
      .set('Authorization', `Bearer ${agencyToken}`);

    expect(quizRes.status).toBe(200);

    const quizData = quizRes.body.data.quiz;
    expect(quizData.questions.length).toBeGreaterThan(0);

    const createPayload: {
      quizAnswer: QuizAnswer;
    } = {
      quizAnswer: {
        _id: '',
        status: 'pending',
        quizId,
        agencyId,
        creationDate: new Date(),
        uid: citizenId,
      },
    };

    const createRes = await request(app)
      .post(`/api/v1/agencies/${agencyId}/quizzes/${quizId}/answers`)
      .set('Authorization', `Bearer ${agencyToken}`)
      .send(createPayload);

    expect(createRes.status).toBe(200);

    const quizAnswerId = createRes.body.data.answerId;

    expect(typeof quizAnswerId).toBe('string');
    expect(quizAnswerId.length).toBeGreaterThan(10);

    const answers = quizData.questions.map((q: any) => ({
      questionId: q.id,
      optionId: q.options?.[0]?.id ?? 'invalid-option-id',
      type: q.type,
    }));

    const updatePayload = {
      quizAnswer: {
        status: 'completed',
        answers,
      },
    };

    const updateRes = await request(app)
      .put(
        `/api/v1/agencies/${agencyId}/quizzes/${quizId}/answers/${quizAnswerId}`,
      )
      .send(updatePayload);

    expect(updateRes.status).toBe(200);
    expect(updateRes.body.status).toBe('success');
    expect(updateRes.body.data.quizAnswerId).toBeDefined();
  });

  //Try to respond without giving the answers
  test('PUT /answers/:quizAnswerId with completed status but no answers does not update anything', async () => {
    const quizRes = await request(app)
      .get(`/api/v1/agencies/${agencyId}/quizzes/${quizId}`)
      .set('Authorization', `Bearer ${agencyToken}`);

    expect(quizRes.status).toBe(200);
    const quizData = quizRes.body.data.quiz;

    const createPayload = {
      quizAnswer: {
        status: 'pending',
        quizId,
        agencyId,
        creationDate: new Date().toISOString(),
        uid: citizenId,
      },
    };

    const createRes = await request(app)
      .post(`/api/v1/agencies/${agencyId}/quizzes/${quizId}/answers`)
      .set('Authorization', `Bearer ${agencyToken}`)
      .send(createPayload);

    expect(createRes.status).toBe(200);
    const quizAnswerId = createRes.body.data.answerId;

    const updatePayload = {
      quizAnswer: {
        status: 'completed',
      },
    };

    const updateRes = await request(app)
      .put(
        `/api/v1/agencies/${agencyId}/quizzes/${quizId}/answers/${quizAnswerId}`,
      )
      .send(updatePayload);

    expect(updateRes.status).toBe(200);
    expect(updateRes.body.status).toBe('success');
    expect(updateRes.body.data.quizAnswerId).toBe(quizAnswerId);

    const updatedQuizAnswer = await QuizAnswerModel.findById(quizAnswerId);
    expect(updatedQuizAnswer?.status).toBe('pending');
    expect(updatedQuizAnswer?.answers).toEqual([]);
  });
});
