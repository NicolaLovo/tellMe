import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { FIREBASE_CONFIG } from './FIREBASE_CONFIG';

export const initFirebaseClient = async () => {
  await initializeApp(FIREBASE_CONFIG);
};

export const getFirebaseClientAuth = () => {
  return getAuth();
};
