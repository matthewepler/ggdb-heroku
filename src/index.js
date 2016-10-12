import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router';

// Firebase DB
import firebase from "firebase";

const config = {
	    apiKey: "AIzaSyAVirRMeYf01ez2zd8tpUJ4yS1xgtjZkU8",
	    authDomain: "ggdb-af77a.firebaseapp.com",
	    databaseURL: "https://ggdb-af77a.firebaseio.com",
	    storageBucket: "gs://ggdb-af77a.appspot.com",
	  };
firebase.initializeApp(config);

import App from './components/App'

const root = document.getElementById('app');
ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App} />
        <Route path="/:id" component={App} />
    </Router>
), root);