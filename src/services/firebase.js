//import * as firebase from 'firebase';
//import { initializeApp } from "firebase/app";
import firebase from "firebase/app";

import "firebase/database";

const firebaseConfig = {

  apiKey: "AIzaSyCOyFe_J9aMU8F4YXmGIMSw9z1Fw6R-9Wk",
  authDomain: "app-card-d8729.firebaseapp.com",
  databaseURL: "https://app-card-d8729-default-rtdb.firebaseio.com",
  projectId: "app-card-d8729",
  storageBucket: "app-card-d8729.appspot.com",
  messagingSenderId: "1028969209417",
  appId: "1:1028969209417:web:d26c6b9e7f4cc963ec2998"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export {firebase, database};