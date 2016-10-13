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

  componentDidMount() {
    this.props.refMounted();

    if (this.props.focusId === String(this.props.reference.id)) {
      this.setState({open: true});
    }
  }

  handleClick(e) {
    this.setState({ open: !this.state.open });
  }

  renderHeader() {
    const panelClasses = classNames({
      'ref-quote' : true,
      'open' : this.state.open,
    });

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
                {quote.length > 1 ? quote[0] : ''}
                  <strong>{ref}</strong>
                {quote.length > 1 ? quote[1] : ''}
            </span>
          </div>
      </div>
      </div> 
    );

  	return (headline)
  }

  editOn(data) {
    this.props.editOn(data);
  }

  linkClick(e) {
    e.preventDefault();
    console.log('link click');
  }



  render() {
  	const header = this.renderHeader();
  	return (
      <div id={this.props.reference.id}>
        <Panel className="ref-panel" header={header} collapsible expanded={this.state.open}>
          <RefDetail reference={this.props.reference} 
                      key={this.props.reference.id} 
                      editOn={this.editOn.bind(this)}
                      user={this.props.user}
                      />
        </Panel>
      </div>
    )
  }
}
 
Reference.propTypes = {
  reference: PropTypes.object.isRequired,
};

export default Reference;
