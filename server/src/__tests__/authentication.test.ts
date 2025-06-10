import request from 'supertest';
import app from '../app';
import { UserModel } from '../database/auth/UserSchema';
import { connectToDatabase } from '../database/connectToDatabase';
import { getTestUserFirebaseToken } from './utils/auth/getUsersFirebaseTokens';
import { TEST_USERS } from './utils/constants/TEST_USERS';
import { initFirebaseClient } from './utils/database/testFirebaseClient';
import { initFirebaseServer } from './utils/database/testFirebaseServer';

describe('Authentication Tests', () => {
  let townCouncilToken = '';
  let citizenToken = '';
  let agencyToken = '';

  let citizenFirebaseToken = '';
  let agencyFirebaseToken = '';
  let townCouncilFirebaseToken = '';

  jest.setTimeout(30000);

  beforeAll(async () => {
    await connectToDatabase();
    await initFirebaseServer();
    await initFirebaseClient();

    await UserModel.deleteOne({ email: TEST_USERS.citizen.email });
    await UserModel.deleteOne({ email: TEST_USERS.agency.email });

    const citizenCredentials = await getTestUserFirebaseToken({
      email: TEST_USERS.citizen.email,
      password: TEST_USERS.citizen.password,
    });

    const agencyCredentials = await getTestUserFirebaseToken({
      email: TEST_USERS.agency.email,
      password: TEST_USERS.agency.password,
    });

    const townCouncilCredentials = await getTestUserFirebaseToken({
      email: TEST_USERS.townCouncil.email,
      password: TEST_USERS.townCouncil.password,
    });

    citizenFirebaseToken = citizenCredentials.firebaseToken;
    agencyFirebaseToken = agencyCredentials.firebaseToken;
    townCouncilFirebaseToken = townCouncilCredentials.firebaseToken;
  });

  test('GET / should return 200', () => {
    return request(app).get('/').expect(200);
  });

  // Register a citizen
  test('POST /api/v1/auth/citizens should return 200', async () => {
    const res = await request(app)
      .post('/api/v1/auth/citizens')
      .send({
        email: TEST_USERS.citizen.email,
        firebaseToken: citizenFirebaseToken,
      })
      .set('Accept', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data.token).toBeDefined();
    return res;
  });

  // login townCouncil
  test('POST /api/v1/auth/login for townCouncil should return 200', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        firebaseToken: townCouncilFirebaseToken,
      })
      .set('Accept', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data.token).toBeDefined();
    townCouncilToken = res.body.data.token;
    return res;
  });

  // Registera agency using townCouncil token
  test('POST /api/v1/auth/agencies should return 200', async () => {
    const res = await request(app)
      .post('/api/v1/auth/agencies')
      .send({
        email: TEST_USERS.agency.email,
        firebaseToken: agencyFirebaseToken,
      })
      .set('Authorization', `Bearer ${townCouncilToken}`)
      .set('Accept', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data.token).toBeDefined();
    return res;
  });

  // login citizen
  test('POST /api/v1/auth/login for citizen should return 200', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        firebaseToken: citizenFirebaseToken,
      })
      .set('Accept', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data.token).toBeDefined();
    return res;
  });

  // login agency
  test('POST /api/v1/auth/login for agency should return 200', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        firebaseToken: agencyFirebaseToken,
      })
      .set('Accept', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data.token).toBeDefined();
    return res;
  });
});
