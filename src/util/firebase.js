import { initializeApp } from "firebase/app";

const firebaseConfig = {

  apiKey: "AIzaSyCOyFe_J9aMU8F4YXmGIMSw9z1Fw6R-9Wk",

  authDomain: "app-card-d8729.firebaseapp.com",

  databaseURL: "https://app-card-d8729-default-rtdb.firebaseio.com",

  projectId: "app-card-d8729",

  storageBucket: "app-card-d8729.appspot.com",

  messagingSenderId: "1028969209417",

  appId: "1:1028969209417:web:d26c6b9e7f4cc963ec2998"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

export default app();