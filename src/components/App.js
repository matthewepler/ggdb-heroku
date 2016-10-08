import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
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
      showButton: true,
      season: "1",
      episode: "1",
      currRefs: [],
      editData: null,
    };
  }

  componentDidMount() {
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
       <Reference key={f.id} reference={f} />
    ));
  } else {
    return plugs.map( p => (
      <Reference key={p.id} reference={p} />
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
        return (<Reference key={s.id} reference={s} editOn={this.editOn.bind(this)}/>)
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
                <a href="#"> API</a>
              </span>
            </p>
          </div>
          <div className="nav-selectors">
            <Panel className="nav-panel" header={selector} collapsible expanded={this.state.selectorOpen} >
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
            </Panel>
          </div>
          {this.state.showButton ? <Toolbar formOpen={this.state.formOpen} 
                                      closeForm={this.closeForm.bind(this)} 
                                      editData={this.state.editData} 
                                      editSubmit={this.editSubmit.bind(this)}
                                      /> : ""}
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
