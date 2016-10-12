import React, { Component } from 'react';
import { Button, Modal, Panel } from 'react-bootstrap';
import _ from 'underscore';
import classNames from 'classnames';
import firebase from 'firebase';


// components
import Reference from './Reference.js';
import Toolbar from './Toolbar.js';
import Season from './Season.js'
import Dot from './Dot.js'

// api
import { plugs } from '../api/dummyData';

// styles
import '../assets/stylesheets/App.scss';


class App extends Component {
  constructor() {
    super();
    this.state = {
      formOpen: false,
      selectorOpen: false,
      season: "1",
      episode: "1",
      currRefs: [],
      editData: null,
      showSignIn: false,
      user: false,
      userError: false,
    };    
  }

  componentDidMount() {
    if (this.props.params.id) {
      
    }

    this.getFirebaseData(this.state.season, this.state.episode);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.season != this.state.season || 
      nextState.episode != this.state.episode) {
      this.getFirebaseData(nextState.season, nextState.episode);
    }
  }

  getDummyData(filtered) {
  if (filtered) {
    return filtered.map( f => (
       <Reference key={f.id} reference={f} user={this.state.user} />
    ));
  } else {
    return plugs.map( p => (
      <Reference key={p.id} reference={p} user={this.state.user} />
    ));
  }
}

  getFirebaseData(season, episode) {
    const dbRef = firebase.database().ref('refs/' + season + '/' + episode + '/');
    dbRef.once('value').then((snapshot) => {
      const refs = snapshot.val();
      let currRefs = [];
      for (let obj in refs) {
        currRefs.push(refs[obj]);
      }
      this.setState({currRefs});
    });

    dbRef.on('child_added', data => {
            const currRefs = this.state.currRefs;
            currRefs.push(data.val());
            this.setState({currRefs});
        });

    dbRef.on('child_changed', data => {
            // not sure if this is necessary
        });
  }

  getRefComponents(sorted) {
    if (sorted) {
      return sorted.map( s => {
        return (<Reference key={s.id} reference={s} editOn={this.editOn.bind(this)} user={this.state.user}/>)
      });
    } else {
      return (<h2>Nothing here :(</h2>);
    }
  }

  handleNavClick() {
    this.setState({selectorOpen: !this.state.selectorOpen});
  }

  handleSeasonClick(e) {
    if (e.target.tagName == 'P') {
      this.setState({season: e.target.innerHTML});  
    }
  }

  handleEpisodeClick(e) {
    if (e.target.tagName == 'P') {
      this.setState({episode: e.target.innerHTML});
    }
  }

  closeForm(season, episode) {
    this.setState({
      formOpen: false,
      season: season,
      episode: episode,
      editData: null,
    });
  }

  handleGoClick(e) {
    this.setState({
      season: this.season.value,
      episode: this.episode.value,
      selectorOpen: false,
    });
  }

  editOn(data) {
    this.setState({
      editData: data,
      formOpen: true,
    });
    window.scrollTo(0,300);
  }

  editSubmit(update) {
    //console.log("update Data:", update);
    // if the season and episode match
    if (update.season === this.state.season && 
        update.episode === this.state.episode) {
     // console.log("this.state.currRefs", this.state.currRefs)
      let currRefs = this.state.currRefs;
      const refIndex = _.indexOf(currRefs, _.findWhere(currRefs, {id: update.id}));
      //console.log('refIndex', refIndex);
      currRefs[refIndex] = update;
      //console.log('update', update);
     // console.log('currRefs', currRefs);
      this.state.currRefs = currRefs;
     // console.log("this.state.currRefs NEW", this.state.currRefs)
    } else {
     // if not, take me to that season and episode
      this.setState({season: update.season, episode: update.episode});
    }
  }

  closeSignIn() {
    this.setState({showSignIn: false});
  }

  openSignIn() {
    this.setState({showSignIn: true});
  }

  handleSignIn() {
    if (firebase.auth().currentUser) {
      firebase.auth().signOut();
    }

    var self = this;
    firebase.auth().signInWithEmailAndPassword(this.signin_email.value, 
    this.signin_pswd.value).then(function() {
      self.setState({
        user: true,
        showSignIn: false,
        userError: false,
        selectorOpen: true,
      });
    }
    ,function(error) {
      if (error) {
        console.log(error.message);
        if(error.message.includes('password is invalid')) {
          self.updateSignIn('Password is incorrect');
        } else if (error.message.includes('user record') || error.message.includes('email address')) {
          self.updateSignIn('Email is incorrect');
        } else {
          self.updateSignIn('Eek! Something looks weird. Try again, please.');
        }
      } 
    });
  }

  updateSignIn(update) {
    this.setState({userError: update});
  }

  signOut() {
    firebase.auth().signOut().then( () => {
      this.setState({
        user: false,
        showSignIn: false,
        userError: false,
      });
    }, function(error) {
      // an error happened
    });
  }


  render() {
    //const refs = this.getDummyData();
    // const filtered = _.where(plugs, {season: this.state.season, episode: this.state.episode});
    // const refs = this.getDummyData(_.sortBy(filtered, 'timecode'));

    const refs = this.getRefComponents(_.sortBy(this.state.currRefs, function(obj) {
      // can also just use the id value since it's a timestamp
      const timeAsNum = obj.timecode.split(':').join('');
      return parseInt(timeAsNum);
    }));

    const selector = (<h1 onClick={this.handleNavClick.bind(this)}>s{this.state.season}e{this.state.episode}</h1>);
    const episodeMatch = [21,22,22,22,22,22,22,4];

   
    return (
      <div className="app-container">
        <div className="app-left-col"></div>
        <div className="app-mid-col">
        <div className="title-wrapper">
          <h1 className="title"> ggdb </h1>
          <p className="subtitle">A crowd-sourced database of every pop-culture reference in the Gilmore Girls.</p>
          <p className="subtitle">
            <span>
              <a href="#">About </a>
              |
              <a href="#"> API </a>
              |
              <a href="#" onClick={this.openSignIn.bind(this)}> LogIn </a>
            </span>
          </p>
          {this.state.user ? (<div id="user-info"><p>{firebase.auth().currentUser.email}</p><a href="#" onClick={this.signOut.bind(this)}> Log Out </a></div>) 
            : ''}
          <Modal id="signin" show={this.state.showSignIn} onHide={this.closeSignIn.bind(this)}>
            <Modal.Header className="signin-header">
              <h2>Sign in with your email and the password we sent you.</h2> 
              <p>If you do not have a password, you can request one by sending an email to ggdb.info@gmail.com</p>
            </Modal.Header>
            <Modal.Body className="signin-body">
              <input type="text" id="email" placeholder="you@email.com" ref={c => this.signin_email = c}/>
              <input type="text" id="pswd" placeholder="abc123" ref={c => this.signin_pswd = c}/>
              {this.state.userError ? <p id="signin-error">{this.state.userError}</p> : ''}
            </Modal.Body>
            <Modal.Footer>
              <Button id="signin-button" onClick={this.handleSignIn.bind(this)}>Sign In</Button>
              <Button onClick={this.closeSignIn.bind(this)}>Close</Button>
            </Modal.Footer>
          </Modal>
          {this.state.user ? <Toolbar formOpen={this.state.formOpen} 
                                      closeForm={this.closeForm.bind(this)} 
                                      editData={this.state.editData} 
                                      editSubmit={this.editSubmit.bind(this)}
                                      /> : ""}
        </div>
          <div className="nav-selectors">
            <Panel className="nav-panel" header={selector} collapsible expanded={this.state.selectorOpen} >
            {
              this.state.user ? 
                (<div>
                  <span className="season-episode">
                    <div className="season">
                      <p>Season</p>
                      <div className="select-wrap">
                        <select className="season-select rf-button-link" ref={c => this.season = c}>
                          {_.range(7).map( (s, index) => {
                            return <option value={s+1} key={index}> {s + 1} </option>
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="episode">
                      <p>Episode</p>
                      <div className="select-wrap">
                        <select className="episode-select rf-button-link" ref={c => this.episode = c}>
                          {_.range(23).map( (e, index) => {
                            return <option value={e+1} key={index}> {e + 1} </option>
                          })}
                        </select>
                      </div>
                    </div>
                  </span>
                  <div className="go-button" onClick={this.handleGoClick.bind(this)}>go</div>
                </div>)
                : 
                (<div id="more-coming">
                  <h2>More coming...</h2>
                  <p>Launching Nov. 1, 2016</p>
                  </div>)
              }

            </Panel>
          </div>
          <ul>
            {refs}
          </ul>
        </div>
        <div className="app-right-col"></div>
      </div>
    );
  }
}

export default App;
