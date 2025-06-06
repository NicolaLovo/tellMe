import { credential } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import { config } from '../config/config';

export const firebaseCredentials: object = {
  type: 'service_account',
  project_id: 'tellme-4ea95',
  private_key_id: '77555647a3479456cdb41e743ce8941c0379733c',
  private_key: config.firebasePrivateKey,
  client_email: 'firebase-adminsdk-fbsvc@tellme-4ea95.iam.gserviceaccount.com',
  client_id: '100106439492812774365',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40tellme-4ea95.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com',
};

export const firebaseApp = initializeApp({
  credential: credential.cert(firebaseCredentials),
});

export const initFirebase = async () => {
  return firebaseApp;
};
