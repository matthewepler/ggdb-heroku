import React from 'react'
import ReactDOM from 'react-dom'

// Firebase DB
import firebase from "firebase";

const config = {
	    apiKey: process.env.FIREBASE_API_KEY,
	    authDomain: "ggdb-af77a.firebaseapp.com",
	    databaseURL: "https://ggdb-af77a.firebaseio.com",
	    storageBucket: "",
	  };
firebase.initializeApp(config);

import App from './components/App'

const root = document.getElementById('app');
ReactDOM.render(<App/>, root)