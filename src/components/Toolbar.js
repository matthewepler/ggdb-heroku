import React, { Component, PropTypes } from 'react';
import { Button, Panel } from 'react-bootstrap';

// components
import AddRefForm from './AddRefForm.js';

// styles
import '../assets/stylesheets/Toolbar.scss';


class Toolbar extends Component {
	constructor() {
		super();
		this.state = {
			open: false,
		};
	}

	handleClick(event) {
		this.setState({ open: !this.state.open });
	}

	formClose(season, episode) {
		this.setState({open: false});
		this.props.closeForm(season, episode);
	}

	render() {
		return (
			<div className="toolbar-wrapper">
      	<Button className="addButton" bsSize="large" onClick={this.handleClick.bind(this)}>+</Button>
      	<Panel collapsible expanded={this.state.open}>
						<AddRefForm formOpen={this.state.formOpen} formClose={this.formClose.bind(this)}/>
				</Panel>
    	</div>
		);
	}
}

export default Toolbar;