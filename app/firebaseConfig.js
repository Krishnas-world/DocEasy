// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCewHVdy36hn3ffUqcMDMeuZUVcTKbpCjo",
    authDomain: "doceasy-69c9b.firebaseapp.com",
    projectId: "doceasy-69c9b",
    storageBucket: "doceasy-69c9b.appspot.com",
    messagingSenderId: "64689185982",
    appId: "1:64689185982:web:c6e9ba4d7474b51ed6aaef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
