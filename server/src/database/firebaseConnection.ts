import { credential } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';

const credentials: object = {
  type: 'service_account',
  project_id: 'tellme-4ea95',
  private_key_id: '77555647a3479456cdb41e743ce8941c0379733c',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCi7WF/z9/OovML\nF5KEKAXUaZT1gmyNsauPHScCSEWuupkrNk+Jgp+ZiuP+3cF2SMo6s5+aB6nxBeXn\nyB2jYpZl75VdrOc0+lKQP+6sMMwh9QE9fq0j1PN/h/9sBxhqb6aj8XQIa/+mUrhm\nFu/LY7C2UuD9VS7mzb6CM/I84ELpMUgSgHcI1OBPArJhBuigVbuQgI5qQ1HrwIh8\nMRkExk5orIFoJ1gL592vJezx95rkdtNavkOtp1sTfmCH66Wk36Sob6TrCYYwwK2I\n6Dmy9OH6vFE6n0CxuvMYW6JTypgJ+6WX01EYGDyHSsrPR5h6U+gntzeByvv/qVm+\nMahBbF/bAgMBAAECggEAAeGwVl5oJZ1gR7elpCE2uzjNMt0vmklzVH+4jpv9mPW5\nQNrWULcaEwXxRmU9XGZIATY2x7d6Rlst0Jr7xbV6O5OKsCB23PfVPxEYnc8AD7hV\nPURe62LRVvQsqIRCmCAV1qfLZ1MYggB+seHM/0mXpdvtcJcB/Q6m09sNUu0wo0yl\neSRJ/4zgS3qlro+lRE0szMr5NpqnO8sbhay80jDpcOCJbtwvFbBtm071+1s8RGZ7\nOfpJlTzSCpbwoVSniOpV0NC3nsD24DddDKUq18FCy39cNGE+eCB2a9uq4Lsl+T4z\nStZfeT8tBhF9fKNO8U0I8tdYSvZmMFQDVx/QMdxQKQKBgQDbBFl/p34dg/srORNZ\nSLnls8Ee4cjKYRiUBqaWZmb3ZhVFYMoUw2/txDqY9x4sebrfi3xhibzABXDWX/YC\nTu///9UFQwpNWMkAbEOtj1wL3UyNXZx+YwIMrr7QU0cs6B42ftXIqCaaoH/4bMM5\nTy6T0kLrPLNVefV3LcJxdJR4bwKBgQC+cGONs6m/uBAKy4CHCh2pUO4FIaeda8ii\ndDxM0Wx5pjbvYqjvCZYCAD036WP3DWu8dEF33oJVn27sLPtdq05OG/znOcJ2+RQt\nuqOAwWfaqVLprQhKG6vt5zQfurFFQLLK/ribnrGoyV9M35N2tOfpVciQTy+Rqpen\nJV1K2AlNVQKBgQCkXtpQbMLAognBwZ8c1fD2THa2l5sbD83jYi5qF8ZVDB8Qp3hi\nJt784dVccbIKjP1LwiKCDV5D+pFZwkEeMGH8jeMwhMTZkbWghKAyRLI/EUHfoo7N\nZ77lB8ybCrUTJc1u9re5VUFLsQL5zZ6ihyOcuyOP6klo8BPh8szIW0cGLwKBgG+8\nGW0moM4v/JmY1QxmTwjsxvqTyHiAqPNIJ6kapv6pG0pRJLU7dpwt771CXrixUyj7\nPP5Lu0Tpindf3QwUWplRqo0wQnzzn3dFLnF5CKou9srMDzUMD1BCez6ylxf+4ehg\nk4gbEDnsDNJZy3e2pOsuvcKN82cQJHKZZadoIe0RAoGAMoOMT+LGmU2CjpATBWHv\nuFbB6dRdPmgqldSOsSgVus2S1iRVRVyIGZn3nFWUuyN67eEQsOUCIDzoCTt9MHkC\nDCHvJqc8cWLBHkSOfQKjGajf4G6iPQ//1dhkmPKnLjb6acDt29czEP6JaCJALuhc\n0XNqfwc11IeJgPRkN4qw4pw=\n-----END PRIVATE KEY-----\n',
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
  credential: credential.cert(credentials),
});

export const initFirebase = async () => {
  return firebaseApp;
};
