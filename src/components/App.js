import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import _ from 'underscore';
import classNames from 'classnames';


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
      selectorOpen: true,
      showButton: false,
      season: "1",
      episode: "1",
    };
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

  handleNavClick() {
    this.setState({selectorOpen: !this.state.selectorOpen});
  }

  handleSeasonClick(e) {
    this.setState({season: e.target.innerHTML});
  }

  handleEpisodeClick(e) {
    this.setState({episode: e.target.innerHTML});
  }


  render() {
    //const refs = this.getDummyData();
    const filtered = _.where(plugs, {season: this.state.season, episode: this.state.episode});
    const refs = this.getDummyData(_.sortBy(filtered, 'timecode'));
    

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
              <h2>season</h2>
              <div className="season-dots" onClick={this.handleSeasonClick.bind(this)}>
                {
                  _.range(8).map( (s, index) => {
                    return <Dot key={index} val={s+1} selected={this.state.season}/>
                  })
                }
              </div>
              <h2>episode</h2>
              <div className="episode-dots" onClick={this.handleEpisodeClick.bind(this)}>
                {
                  _.range(episodeMatch[this.state.season - 1]).map( (s, index) => {
                    return <Dot key={index} val={s+1} selected={this.state.episode}/>
                  })
                }
              </div>
            </Panel>
          </div>
          {this.state.showButton ? <Toolbar /> : ""}
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
