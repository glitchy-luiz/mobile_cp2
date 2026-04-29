import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

//favor não estragar meu firebase  : (
const firebaseConfig = {
  apiKey: "AIzaSyAOXUT3oglyiN6i1f_a0ULAvJw2c9wZdEA",
  authDomain: "fiap-auth-app-16214.firebaseapp.com",
  databaseURL: "https://fiap-auth-app-16214-default-rtdb.firebaseio.com",
  projectId: "fiap-auth-app-16214",
  storageBucket: "fiap-auth-app-16214.firebasestorage.app",
  messagingSenderId: "270305561441",
  appId: "1:270305561441:web:0ba4de8bc70e4cab075320"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
