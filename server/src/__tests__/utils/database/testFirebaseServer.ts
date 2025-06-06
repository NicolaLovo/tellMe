import { getAuth } from 'firebase-admin/auth';
import { initFirebase } from '../../../database/firebaseConnection';

export const initFirebaseServer = async () => {
  // const firebaseApp = initializeApp({
  //   credential: credential.cert(firebaseCredentials),
  // });
  await initFirebase();
};

export const getFirebaseServerAuth = () => {
  return getAuth();
};
