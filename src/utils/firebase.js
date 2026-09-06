// src/utils/firebase.js
// Firebase initialization for the dominioncityy project.
// Config comes from .env (REACT_APP_FIREBASE_*). Never commit Admin SDK
// credentials here — the web apiKey below is public by design (it ships in
// the browser bundle). Restrict it to your domains in
// Google Cloud Console > APIs & Services > Credentials.
import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported as isAnalyticsSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

let app = null;
let analytics = null;

if (!firebaseConfig.apiKey) {
  // eslint-disable-next-line no-console
  console.warn('[Firebase] REACT_APP_FIREBASE_API_KEY is missing. Skipping Firebase init.');
} else {
  app = initializeApp(firebaseConfig);

  // Analytics only runs in the browser and throws on unsupported
  // environments (e.g. blocked cookies), so guard it.
  if (typeof window !== 'undefined' && firebaseConfig.measurementId) {
    isAnalyticsSupported()
      .then((supported) => {
        if (supported) {
          try {
            analytics = getAnalytics(app);
          } catch (err) {
            // eslint-disable-next-line no-console
            console.warn('[Firebase] Analytics init failed:', err);
          }
        }
      })
      .catch(() => {
        // Analytics unsupported — app works fine without it.
      });
  }
}

export { app, analytics };
export default app;
