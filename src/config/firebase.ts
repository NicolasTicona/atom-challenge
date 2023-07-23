import admin from 'firebase-admin';
import { FIREBASE_CONFIG } from './app.config';

admin.initializeApp({
  credential: admin.credential.cert(FIREBASE_CONFIG),
});

export const db = admin.firestore();
