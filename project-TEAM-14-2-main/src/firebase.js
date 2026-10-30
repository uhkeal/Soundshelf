import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCi5vIFU8pzht35csybj1qpaPUAgv4n-xI",
  authDomain: "soundshelf-cc00b.firebaseapp.com",
  databaseURL: "https://soundshelf-cc00b-default-rtdb.firebaseio.com",
  projectId: "soundshelf-cc00b",
  storageBucket: "soundshelf-cc00b.firebasestorage.app",
  messagingSenderId: "964104432376",
  appId: "1:964104432376:web:e4ae02a8c0398e6b8da90d"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
