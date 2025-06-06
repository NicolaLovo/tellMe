import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { getFirebaseClientAuth } from '../database/testFirebaseClient';
import { getFirebaseServerAuth } from '../database/testFirebaseServer';

/**
 * This function retrieves or creates a Firebase user based on the provided credentials.
 */
export const getTestUserFirebaseToken = async (credentials: {
  email: string;
  password: string;
}) => {
  const firebaseServerAuth = getFirebaseServerAuth();
  const firebaseClientAuth = getFirebaseClientAuth();

  try {
    const userRecord = await firebaseServerAuth.getUserByEmail(
      credentials.email,
    );

    if (userRecord.uid) {
      const agencyFirebaseCredentials = await signInWithEmailAndPassword(
        firebaseClientAuth,
        credentials.email,
        credentials.password,
      );

      const firebaseToken = await agencyFirebaseCredentials.user.getIdToken();
      return {
        firebaseToken,
      };
    }
  } catch (error) {
    // console.error('Error retrieving user:', credentials, error);
  }

  const agencyFirebaseCredentials = await createUserWithEmailAndPassword(
    firebaseClientAuth,
    credentials.email,
    credentials.password,
  );

  const firebaseToken = await agencyFirebaseCredentials.user.getIdToken();

  return {
    firebaseToken,
  };
};
