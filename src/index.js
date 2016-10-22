import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router';

import App from './components/App'
import About from './components/About'
import API from './components/API'
import Guide from './components/Guide'

// Firebase DB
import firebase from "firebase";

const config = {
	    apiKey: "AIzaSyAVirRMeYf01ez2zd8tpUJ4yS1xgtjZkU8",
	    authDomain: "ggdb-af77a.firebaseapp.com",
	    databaseURL: "https://ggdb-af77a.firebaseio.com",
	    storageBucket: "gs://ggdb-af77a.appspot.com",
	  };
firebase.initializeApp(config);



const root = document.getElementById('app');
ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App} />
        <Route path="/about" component={About} />
        <Route path="/api" component={API} />
        <Route path="/guide" component={Guide} />
    </Router>
), root);