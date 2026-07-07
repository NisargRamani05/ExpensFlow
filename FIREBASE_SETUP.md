# Firebase Database Setup (Final Step)

ExpenseFlow is currently running in **local mode** with Zustand + localStorage.
When you're ready to connect Firebase, follow these steps:

## 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project named `expenseflow`
3. Enable **Authentication** → Email/Password + Google
4. Create **Firestore Database** (production mode)
5. Enable **Storage** (optional, for profile photos)

## 2. Environment Variables

Create a `.env` file in the project root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 3. Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /transactions/{docId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.uid;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.uid;
    }
    match /budgets/{docId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.uid;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.uid;
    }
    match /goals/{docId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.uid;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.uid;
    }
  }
}
```

## 4. Firestore Collections

| Collection     | Fields                                              |
|----------------|-----------------------------------------------------|
| `users`        | uid, name, email, photoURL, currency, createdAt     |
| `transactions` | uid, type, amount, category, note, date, createdAt  |
| `budgets`      | uid, month, categories (map), createdAt             |
| `goals`        | uid, title, targetAmount, savedAmount, deadline     |

## 5. Firestore Indexes

Create composite indexes for:
- `transactions`: `uid` ASC + `date` DESC
- `budgets`: `uid` ASC + `month` DESC
- `goals`: `uid` ASC + `deadline` ASC

Once `.env` is configured, restart the dev server. The app automatically switches from local mode to Firebase.
