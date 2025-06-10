// tests/utils/loginTestUser.ts
import request from 'supertest';
import app from '../../../app';
import { UserModel } from '../../../database/auth/UserSchema';
import { UserRole } from '../../../types/auth/UserRole';
import { getTestUserFirebaseToken } from './getUsersFirebaseTokens';

interface LoginTestUserOptions {
  email: string;
  password: string;
  roles: UserRole[];
}

/**
 * Logs in a test user
 * If not already registered, it creates a new user in the database.
 */
export const loginTestUser = async ({
  email,
  password,
  roles,
}: LoginTestUserOptions): Promise<{
  token: string;
  uid: string;
}> => {
  const { firebaseToken, uid } = await getTestUserFirebaseToken({
    email,
    password,
  });

  /**
   * Check if the user exists in the database.
   */
  const userModel = await UserModel.findOne({ email });

  if (!userModel) {
    await UserModel.create({
      email,
      uid,
      roles,
    });
  }

  const res = await request(app)
    .post('/api/v1/auth/login')
    .send({ firebaseToken });

  if (res.status !== 200 || !res.body?.data?.token) {
    console.log(res.body.data);

    throw new Error(`Failed to log in user ${email}. Status: ${res.status}`);
  }

  return {
    token: res.body.data.token,
    uid,
  };
};
