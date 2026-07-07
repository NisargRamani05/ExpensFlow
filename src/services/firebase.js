// Firebase configuration — connect your project here (database setup is last step)
// Replace placeholder values with your Firebase project credentials

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'YOUR_API_KEY',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'YOUR_AUTH_DOMAIN',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'YOUR_PROJECT_ID',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'YOUR_STORAGE_BUCKET',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'YOUR_SENDER_ID',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || 'YOUR_APP_ID',
};

export const isFirebaseConfigured = () =>
  firebaseConfig.apiKey !== 'YOUR_API_KEY' && firebaseConfig.projectId !== 'YOUR_PROJECT_ID';

let app = null;
let auth = null;
let db = null;
let storage = null;

export async function getFirebaseApp() {
  if (!isFirebaseConfigured()) return null;
  if (!app) {
    const { initializeApp } = await import('firebase/app');
    app = initializeApp(firebaseConfig);
  }
  return app;
}

export async function getFirebaseAuth() {
  if (!isFirebaseConfigured()) return null;
  if (!auth) {
    const firebaseApp = await getFirebaseApp();
    const { getAuth } = await import('firebase/auth');
    auth = getAuth(firebaseApp);
  }
  return auth;
}

export async function getFirestore() {
  if (!isFirebaseConfigured()) return null;
  if (!db) {
    const firebaseApp = await getFirebaseApp();
    const { getFirestore: fs } = await import('firebase/firestore');
    db = fs(firebaseApp);
  }
  return db;
}

export async function getFirebaseStorage() {
  if (!isFirebaseConfigured()) return null;
  if (!storage) {
    const firebaseApp = await getFirebaseApp();
    const { getStorage } = await import('firebase/storage');
    storage = getStorage(firebaseApp);
  }
  return storage;
}
