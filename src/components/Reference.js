import React, { Component, PropTypes } from 'react';
import { Button, Modal, Panel } from 'react-bootstrap';
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
      showModal: false,
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

    const showLink = classNames({
      'fa fa-link' : true,
      'show' : this.state.open,
    });

    const ref = this.props.reference.refName;
    const quote = this.props.reference.quote.split(ref);
    const name = this.props.reference.from.replace(/^\s+|\s+$|\s|\./g, '').toLowerCase();
    const personThumb =  "assets/img/people/" + name + ".png";
    
    const headline = (
      <div className="headline">
        <div className="headline-wrapper" onClick={this.handleClick.bind(this)}>
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
        <i id="link" className={showLink} aria-hidden="true" onClick={this.openModal.bind(this)}></i>
      </div> 
    );

  	return (headline)
  }

  editOn(data) {
    this.props.editOn(data);
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  openModal() {
    this.setState({ showModal: true });
  }



  render() {
  	const header = this.renderHeader();
  	return (
      <div>
        <div id={this.props.reference.id}>
          <Panel className="ref-panel" header={header} collapsible expanded={this.state.open}>
            <RefDetail reference={this.props.reference} 
                        key={this.props.reference.id} 
                        editOn={this.editOn.bind(this)}
                        user={this.props.user}
                        open={this.state.open}
                        />
          </Panel>
        </div>
         <Modal id="link-modal" show={this.state.showModal} onHide={this.close}>
          <Modal.Header>
            <Modal.Title>Copy/paste this link wherever your heart desires.</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{`http://gg-db.com/?season=${this.props.reference.season}&episode=${this.props.reference.episode}&id=${this.props.reference.id}`}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
 
Reference.propTypes = {
  reference: PropTypes.object.isRequired,
};

export default Reference;
