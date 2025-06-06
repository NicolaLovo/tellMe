// tests/utils/loginTestUser.ts
import request from 'supertest';
import app from '../../../app';
import { getTestUserFirebaseToken } from './getUsersFirebaseTokens';

interface LoginTestUserOptions {
  email: string;
  password: string;
}

/**
 * Logs in a test user using Firebase token and returns a custom app token
 */
export const loginTestUser = async ({
  email,
  password,
}: LoginTestUserOptions): Promise<string> => {
  const { firebaseToken } = await getTestUserFirebaseToken({ email, password });

  const res = await request(app)
    .post('/api/v1/auth/login')
    .send({ firebaseToken });

  if (res.status !== 200 || !res.body?.data?.token) {
    throw new Error(`Failed to log in user ${email}. Status: ${res.status}`);
  }

  return res.body.data.token;
};
