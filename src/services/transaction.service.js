import { useTransactionStore } from '@/app/store/transactionStore';
import { isFirebaseConfigured, getFirestore } from './firebase';

export const transactionService = {
  async getAll(uid) {
    if (isFirebaseConfigured()) {
      const db = await getFirestore();
      const { collection, query, where, getDocs, orderBy } = await import('firebase/firestore');
      const q = query(
        collection(db, 'transactions'),
        where('uid', '==', uid),
        orderBy('date', 'desc')
      );
      const snap = await getDocs(q);
      return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    }
    await useTransactionStore.getState().fetchTransactions();
    return useTransactionStore.getState().transactions;
  },

  async create(uid, data) {
    if (isFirebaseConfigured()) {
      const db = await getFirestore();
      const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
      const docRef = await addDoc(collection(db, 'transactions'), {
        uid,
        ...data,
        createdAt: serverTimestamp(),
      });
      return { id: docRef.id, uid, ...data };
    }
    return useTransactionStore.getState().addTransaction(data);
  },

  async update(id, data) {
    if (isFirebaseConfigured()) {
      const db = await getFirestore();
      const { doc, updateDoc } = await import('firebase/firestore');
      await updateDoc(doc(db, 'transactions', id), data);
    }
    useTransactionStore.getState().updateTransaction(id, data);
  },

  async remove(id) {
    if (isFirebaseConfigured()) {
      const db = await getFirestore();
      const { doc, deleteDoc } = await import('firebase/firestore');
      await deleteDoc(doc(db, 'transactions', id));
    }
    useTransactionStore.getState().deleteTransaction(id);
  },
};
