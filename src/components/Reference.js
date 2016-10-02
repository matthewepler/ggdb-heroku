import React, { Component, PropTypes } from 'react';
import { Panel } from 'react-bootstrap';
import classNames from 'classnames';

// components
import RefDetail from './RefDetail';

// styles
import '../assets/stylesheets/Reference.scss';


class Reference extends Component {
  constructor() {
    super();
    this.state = {
      open: false, // TO-DO - duplicate of state value in App.js <!>
    };
  }

  handleClick() {
    this.setState({ open: !this.state.open });
  }

  renderHeader() {
    const panelClasses = classNames({
      'ref-quote' : true,
      'open' : this.state.open,
    });

    // TO DO - throw error? avoid in data validation if possible
    const ref = this.props.reference.refName;
    const quote = this.props.reference.quote.split(ref);

    const name = this.props.reference.from.replace(/^\s+|\s+$|\s|\./g, '').toLowerCase();
    const personThumb =  "assets/img/people/" + name + ".png";
    
    const headline = (
      <div className="headline" onClick={this.handleClick.bind(this)}>
      <div className="headline-wrapper">
        <p className="ref-marker">{this.props.reference.timecode}</p>
        <div className="person-thumb">
          <img className="clip-circle" alt="ref image" src={personThumb}/>
        </div>
          <i className="left-arrow fa fa-caret-left" aria-hidden="true"></i>
          <div className={panelClasses}>
            <span>
                {quote[0]}
                <strong>{ref}</strong>
                {quote[1]}
            </span>
          </div>
        </div>
      </div> 
    );

  	return (headline)
  }

  render() {
  	const header = this.renderHeader();

  	return (
      <Panel className="ref-panel" header={header} collapsible expanded={this.state.open}>
        <RefDetail reference={this.props.reference} key={this.props.reference.id}/>
      </Panel>
    )
  }
}
 
Reference.propTypes = {
  reference: PropTypes.object.isRequired,
};

export default Reference;
