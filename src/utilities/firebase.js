// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import React, { useState, useEffect } from 'react';
import { getDatabase, onValue, ref } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmvmt3rQGtX_OkuwcrTh90BI2s7ZDlxcM",
  authDomain: "cs394-scheduler-15041.firebaseapp.com",
  databaseURL: "https://cs394-scheduler-15041-default-rtdb.firebaseio.com",
  projectId: "cs394-scheduler-15041",
  storageBucket: "cs394-scheduler-15041.appspot.com",
  messagingSenderId: "193228061697",
  appId: "1:193228061697:web:e49b69c86e403ab8f85400",
  measurementId: "G-E44QZVQ50L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);


export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
  };