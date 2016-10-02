import React, { Component, PropTypes } from 'react';
import { Panel } from 'react-bootstrap';
import classNames from 'classnames';

// styles
import '../assets/stylesheets/Season.scss';


class Season extends Component {
  constructor() {
    super();
    this.state = {
      open: false, 
    };
  }

  render() {
  	return (
  		<div className="season-wrapper">
  			<h1> Season {this.props.season} </h1>
  		</div>
  	)
  }
}

export default Season;
