import React, { Component } from 'react';
import { Button, Modal, Panel } from 'react-bootstrap';
import _ from 'underscore';
import classNames from 'classnames';
import firebase from 'firebase';


// components
import Reference from './Reference.js';
import Toolbar from './Toolbar.js';

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
      allRefs: [],
      currRefs: [],
      editData: null,
      showSignIn: false,
      user: false,
      userError: false,
      focusId: null,
      totalRefNum: null,
      currRefNum: 0,
    };    
  }

  componentDidMount() {
    if (this.props.location.query.id) {
       const self = this;
       const dbRef = firebase.database().ref('refs/' + this.props.params.season + '/' + this.props.params.episode + '/');
       dbRef.orderByKey().equalTo(String(this.props.params.id)).on('value', (snap) => {
         const thisRef = snap.val();
         self.setState({
                        season:  this.props.location.query.season, 
                        episode: this.props.location.query.episode,
                        focusId: this.props.location.query.id.replace('#', ''),
                      });
       });
    } else if (this.props.location.query.season && this.props.location.query.episode) {
       this.setState({season: this.props.location.query.season, episode: this.props.location.query.episode});
    }

    this.getFirebaseData(this.state.season, this.state.episode);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.season != this.state.season || 
      nextState.episode != this.state.episode) {
      this.getFirebaseData(nextState.season, nextState.episode);
    }

    if (this.state.totalRefNum !== null && this.state.focusId) {
      var focusRef = document.getElementById(this.state.focusId);
      window.scrollTo(0, focusRef.getBoundingClientRect().top);
    }
  }

  getDummyData(filtered) {
    if (filtered) {
      return filtered.map( f => (
         <Reference key={f.id} reference={f} user={this.state.user} focusId={this.state.focusId} />
      ));
    } else {
      return plugs.map( p => (
        <Reference key={p.id} reference={p} user={this.state.user} focusId={this.state.focusId} />
      ));
    }
  }

  refMounted() {
    let num = parseInt(this.state.currRefNum) + 1;
    this.setState({currRefNum: num});
  }

  getFirebaseData(season, episode) {
    const dbRef = firebase.database().ref('refs/' + season + '/' + episode + '/');
    dbRef.once('value').then((snapshot) => {
      const refs = snapshot.val();
      let currRefs = [];
      for (let obj in refs) {
        currRefs.push(refs[obj]);
      }
      if (refs) {
        this.setState({
          currRefs,
          totalRefNum: Object.keys(refs).length,
        });
      } else {
        this.setState({
          currRefs,
          totalRefNum: 0,
        });
      }
      
    });

    dbRef.on('child_added', data => {
      if (this.state.totalRefNum !== null) {
        const currRefs = this.state.currRefs;
        currRefs.push(data.val());
        this.setState({
          currRefs,
          totalRefNum: this.state.totalRefNum + 1,
          currRefNum: this.state.currRefNum + 1
        });
      }        
    });

    dbRef.on('child_changed', data => {
            // not sure if this is necessary
        });
  }

  getRefComponents(sorted) {
    if (sorted) {
      return sorted.map( s => {
        return (<Reference key={s.id} reference={s} editOn={this.editOn.bind(this)} 
                            user={this.state.user} focusId={this.state.focusId}
                            refMounted={this.refMounted.bind(this)} 
                            allRefs={this.state.currRefs}/>)
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
    window.location = `http://localhost:5000/?season=${this.season.value}&episode=${this.episode.value}`
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
      const timeAsNum = obj.timecode.split(':').join('');
      return parseInt(timeAsNum);
    }));

    const selector = (<h1 onClick={this.handleNavClick.bind(this)}>s{this.state.season}e{this.state.episode}</h1>);
   
  
    return (
      <div className="app-container">
        <div className="title-wrapper">
          <a className="title" href="/"> ggdb </a>
          <p className="subtitle">
            <span>
              <a href="/about">About </a>
              |
              <a href="/api"> API </a>
              |
              <a href="#" onClick={this.openSignIn.bind(this)}> LogIn </a>
              |
              <a href="https://twitter.com/ggdb_com"><i className="fa fa-twitter" aria-hidden="true"></i></a>
            </span>
          </p>
           {this.state.user ? (<div id="user-info"><p>{firebase.auth().currentUser.email}</p><a href="#" onClick={this.signOut.bind(this)}> Log Out </a></div>) 
            : ''}
          <br/>
          <br/>
          <br/>
          <p className="subtitle">A crowd-sourced database of every pop-culture reference in the Gilmore Girls. <br/>
          <a href="https://goo.gl/forms/IRXHNmZOkOAGExEu2"> GET AN INVITE TO BE AN EDITOR </a> </p>

         
          <Modal id="signin" show={this.state.showSignIn} onHide={this.closeSignIn.bind(this)}>
            <Modal.Header className="signin-header">
              <h2>Sign in with your email and the password we sent you.</h2> 
              <p>Editing access is available by invite only.</p>
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
                  <h2><a href="https://goo.gl/forms/IRXHNmZOkOAGExEu2">Get an invite</a></h2>
                  </div>)
              }

            </Panel>
          </div>

          <i className="fa fa-angle-down down-arrow" aria-hidden="true"></i>

          {
            this.state.totalRefNum === 0 ? <p id="nothing-here">Nothing here yet...</p> : <ul className="refs-wrapper">{refs}</ul>
          }
        </div>
    );
  }
}

export default App;
