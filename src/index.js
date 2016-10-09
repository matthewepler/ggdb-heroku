import React from 'react'
import ReactDOM from 'react-dom'

// Firebase DB
import firebase from "firebase";

const config = {
	    apiKey: process.env.FIREBASE_API_KEY,
	    authDomain: "ggdb-af77a.firebaseapp.com",
	    databaseURL: "https://ggdb-af77a.firebaseio.com",
	    storageBucket: "gs://ggdb-af77a.appspot.com",
        messagingSenderId: process.env.SENDER_ID
	  };
firebase.initializeApp(config);

const uiConfig = {
    'signInSuccessUrl': '/',
    'signInOptions': [
      //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
}
var ui = new firebaseui.auth.AuthUI(firebase.auth()); // <-- this throws the error
ui.start('#firebaseui-auth-container', uiConfig);

import App from './components/App'

const root = document.getElementById('app');
ReactDOM.render(<App/>, root)