import request from 'supertest';
import app from '../app';
import { UserModel } from '../database/auth/UserSchema';
import { connectToDatabase } from '../database/connectToDatabase';
import { getTestUserFirebaseToken } from './utils/auth/getUsersFirebaseTokens';
import { TEST_USERS } from './utils/constants/TEST_USERS';
import { initFirebaseClient } from './utils/database/testFirebaseClient';
import { initFirebaseServer } from './utils/database/testFirebaseServer';

describe('Authentication Tests', () => {
  // register a random citizen
  // login townCouncil
  // register agency using townCouncil token
  // login the citizen
  // login the agency

  let townCouncilToken = '';
  let citizenToken = '';
  let agencyToken = '';

  let citizenFirebaseToken = '';
  let agencyFirebaseToken = '';
  let townCouncilFirebaseToken = '';

  beforeAll(async () => {
    // register citizen with firebase SDK

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

    // console.log({
    //   citizenFirebaseToken,
    //   agencyFirebaseToken,
    //   townCouncilFirebaseToken,
    // });
  });

  /**
   * ? How to add a header in the request?
   */
  test('GET / should return 200', () => {
    return request(app).get('/').expect(200);
  });
});
