import { useAuthStore } from '@/app/store/authStore';
import { isFirebaseConfigured, getFirebaseAuth } from './firebase';

export const authService = {
  async signInWithEmail(email, password) {
    if (isFirebaseConfigured()) {
      const auth = await getFirebaseAuth();
      const { signInWithEmailAndPassword } = await import('firebase/auth');
      const cred = await signInWithEmailAndPassword(auth, email, password);
      return cred.user;
    }
    return useAuthStore.getState().login(email, password);
  },

  async signUpWithEmail(name, email, password) {
    if (isFirebaseConfigured()) {
      const auth = await getFirebaseAuth();
      const { createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth');
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: name });
      return cred.user;
    }
    return useAuthStore.getState().signup(name, email, password);
  },

  async signInWithGoogle() {
    if (isFirebaseConfigured()) {
      const auth = await getFirebaseAuth();
      const { GoogleAuthProvider, signInWithPopup } = await import('firebase/auth');
      const provider = new GoogleAuthProvider();
      const cred = await signInWithPopup(auth, provider);
      return cred.user;
    }
    return useAuthStore.getState().loginWithGoogle();
  },

  async signOut() {
    if (isFirebaseConfigured()) {
      const auth = await getFirebaseAuth();
      const { signOut } = await import('firebase/auth');
      await signOut(auth);
    }
    useAuthStore.getState().logout();
  },

  onAuthStateChanged(callback) {
    if (isFirebaseConfigured()) {
      return getFirebaseAuth().then(async (auth) => {
        const { onAuthStateChanged } = await import('firebase/auth');
        return onAuthStateChanged(auth, callback);
      });
    }
    const { user, isAuthenticated } = useAuthStore.getState();
    callback(isAuthenticated ? user : null);
    return () => {};
  },
};
