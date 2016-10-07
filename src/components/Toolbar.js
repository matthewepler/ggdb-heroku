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
			editData: null,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.formOpen && !this.state.open) {
			this.setState({
				open: true,
				editData: nextProps.editData,
			});
		}
		if (!nextProps.formOpen && this.state.open) {
			this.setState({open: false});
		}
	}

	handleClick(event) {
		if (this.state.open) {
			this.setState({
				open: false,
				editData: null,
			})
		} else {
			this.setState({open: !this.state.open});	
		}
	}

	formClose(season, episode) {
		this.setState({
			open: false,
			editData: null,
		});
		this.props.closeForm(season, episode);
	}



	render() {
		return (
			<div className="toolbar-wrapper">
      	<Button className="addButton" bsSize="large" onClick={this.handleClick.bind(this)}>+</Button>
      	<Panel collapsible expanded={this.state.open}>
			<AddRefForm formOpen={this.state.formOpen} 
						formClose={this.formClose.bind(this)} 
						editData={this.state.editData}
						editSubmit={this.props.editSubmit}
						/>
		</Panel>
    	</div>
		);
	}
}

export default Toolbar;