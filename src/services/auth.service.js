import { useAuthStore } from '@/app/store/authStore';
import { isFirebaseConfigured, getFirebaseAuth } from './firebase';

function syncFirebaseUserToStore(firebaseUser) {
  if (!firebaseUser) return;
  const store = useAuthStore.getState();
  store.updateProfile({
    uid: firebaseUser.uid,
    name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
    email: firebaseUser.email,
    photoURL: firebaseUser.photoURL || null,
  });
  // Ensure isAuthenticated is set
  if (!useAuthStore.getState().isAuthenticated) {
    useAuthStore.setState({
      isAuthenticated: true,
      isLoading: false,
      user: {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL || null,
        currency: useAuthStore.getState().user?.currency || 'INR',
        notifications: useAuthStore.getState().user?.notifications || { email: true, push: true, budgetAlerts: true },
        createdAt: firebaseUser.metadata?.creationTime || new Date().toISOString(),
      },
    });
  }
}

export const authService = {
  async signInWithEmail(email, password) {
    if (isFirebaseConfigured()) {
      const auth = await getFirebaseAuth();
      const { signInWithEmailAndPassword } = await import('firebase/auth');
      const cred = await signInWithEmailAndPassword(auth, email, password);
      syncFirebaseUserToStore(cred.user);
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
      syncFirebaseUserToStore({ ...cred.user, displayName: name });
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
      syncFirebaseUserToStore(cred.user);
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
        return onAuthStateChanged(auth, (firebaseUser) => {
          if (firebaseUser) {
            syncFirebaseUserToStore(firebaseUser);
          } else {
            useAuthStore.getState().logout();
          }
          callback(firebaseUser);
        });
      });
    }
    const { user, isAuthenticated } = useAuthStore.getState();
    callback(isAuthenticated ? user : null);
    return () => {};
  },
};
