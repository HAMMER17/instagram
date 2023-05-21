import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAeHvxe9_klZF1F4XjA-LNG0IljYW7ueoc",
  authDomain: "instagram-8a92d.firebaseapp.com",
  projectId: "instagram-8a92d",
  storageBucket: "instagram-8a92d.appspot.com",
  messagingSenderId: "810290819391",
  appId: "1:810290819391:web:bc6141671a9886a282238a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);