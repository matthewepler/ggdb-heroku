import React, { Component, PropTypes } from 'react';
import { Panel } from 'react-bootstrap';

// stylesheets
import '../assets/stylesheets/RefDetail.scss';

import timeline from './helpers/timeline';
let fromToTimeline = {};

class RefDetail extends Component {
	constructor(props) {
		super();
		this.state = {
			fromToOpen: true,
			refDetailOpen: true,
			fromToViz: null,
			fromToVizId: null,
			refDetailViz: null,
			vizLabel: props.reference.from,
		};
	}

	componentDidMount() {
		this.createChart(this.fromElement);
	}

	fromToClick(event) {		
		const prevSubject = this.state.fromToViz;	
		if (this.state.fromToOpen) {
			if (event.currentTarget === this.state.fromToViz) {
				event.currentTarget.classList.toggle('outline');
				// this.setState({
				// 	fromToOpen: false,
				// });
				// return
			} else {
				// if the panel is open and we're switching to another button
				event.currentTarget.classList.toggle('outline');
				this.createChart(event.currentTarget);
			} 
		} else { 
		// open the Panel
			// event.currentTarget.classList.toggle('outline');
			// this.setState({
			// 	fromToOpen: true,
			// 	fromToViz: event.currentTarget,
			// 	vizLabel: event.currentTarget.innerHTML, 
			// 	fromToVizId: elementId,
			// }, this.renderChart(elementId));
		}
	}

	refDetailClick(event) {
		const prevSubject = this.state.refDetailViz;

		if (this.state.refDetailOpen) {
			if (prevSubject != null && event.currentTarget !== this.state.refDetailViz) {
				prevSubject.classList.toggle('outline');
			}
			if (event.currentTarget === this.state.refDetailViz) {
				//event.currentTarget.classList.toggle('outline');
				this.setState({
					refDetailOpen: false,
				});
				return
			} else {
				// if the panel is open and we're switching to another button
				//event.currentTarget.classList.toggle('outline');
				this.setState({ refDetailViz: event.currentTarget }); // this.props.reference.[to, from, location] (event.currentTarget.className[0])
			} 
		} else { 
		// open the Panel
			//event.currentTarget.classList.toggle('outline');
			this.setState({
				refDetailOpen: true,
				refDetailViz: event.currentTarget
			});
		}
	}

	editOn() {
		this.props.editOn(this.props.reference);
	}

	createElementId(str) {
		const elementId = String(str.replace(' ', '').toLowerCase() + this.props.reference.id);
		return elementId;
	}

	removeChart() {
		if (document.getElementById(this.state.fromToVizId)) {
      		d3.select(document.getElementById(this.state.fromToVizId).remove());
    	}
	}

	createChart(target) {
		this.removeChart();
		const newID = this.createElementId(target.innerHTML);
		this.setState({ 
				fromToViz: target,
				vizLabel:target.innerHTML, 
				fromToVizId: newID,
			}, this.renderChart(newID)); 

	}
				
	renderChart(elementId) {
		// this is going to load a chart for every reference for this episode. 
		// it should be changed to only render a chart if the parent component is open.
		
		// first argument is the element to which the graph will be appended
		fromToTimeline = new timeline(this.fromToGraph, elementId, name);
	}



	render() {
		return (
			<div className="ref-detail-wrapper">
				<div className="screengrab">
					<img src={this.props.reference.screengrab} alt="screengrab" />
					
					<div className="image-descrip">
						<p>{this.props.reference.description} </p>
					</div>
					
					<div className="screengrab-detail"> 
						<span 
							className="button-link from" 
							ref={c=> this.fromElement = c}
							onClick={this.fromToClick.bind(this)}
							dangerouslySetInnerHTML={{__html: this.props.reference.from}}
							> 
						</span>
					  <span>
					  	<i className="fa fa-long-arrow-right" aria-hidden="true"></i>
				  	</span>
						<span 
							className="button-link to" 
							onClick={this.fromToClick.bind(this)}
							dangerouslySetInnerHTML={{__html: this.props.reference.to}}
							> 
						</span> 
						<span>
							<i className="fa fa-at" aria-hidden="true"> </i>
						</span>
						<span 
							className="button-link location" 
							onClick={this.fromToClick.bind(this)} 
							>{this.props.reference.location} 
						</span>
					</div>
					
					<Panel collapsible expanded={this.state.fromToOpen}>
						<div className="graph-wrapper" ref={ c => this.fromToGraph = c } ></div>
						<p className="from-to-graph-info">{this.state.vizLabel}</p>
					</Panel>
				</div>

				<hr className="hr-line"/>

				
				<div className="ref-detail">
					<div className="ref-thumb">
						<img src={this.props.reference.refThumb} alt="reference thumbnail" />
					</div>
					<div>
						<div className="ref-descrip">
							<p><span className="button-link ref-descrip-strong"
											 onClick={this.refDetailClick.bind(this)}
											 dangerouslySetInnerHTML={{__html: this.props.reference.refName}}>
								 </span> {this.props.reference.refIs}
						  </p>
						</div>
						<div className="ref-tags">
							<ul>
								<li className="button-link" 
									onClick={this.refDetailClick.bind(this)}
									dangerouslySetInnerHTML={{__html: this.props.reference.refCategory}}>
								</li>
								{ 
									this.props.reference.refYear2.length >= 3 ? 
									<li className="button-link" 
										onClick={this.refDetailClick.bind(this)} 
										dangerouslySetInnerHTML={{__html: `${this.props.reference.refYear1} - ${this.props.reference.refYear2}`}}>
									</li> 
									: <li className="button-link" 
											onClick={this.refDetailClick.bind(this)} 
											dangerouslySetInnerHTML={{__html: this.props.reference.refYear1}}>
										</li> 
								}
								<li>
									<a href="http://en.wikipedia.org/wiki/RuPaul" className="button-link" target="_blank">									 
									  <i className="fa fa-wikipedia-w" aria-hidden="true"></i>
									</a>
								</li>
								<li>
									<a href="https://www.google.com/search?q=rupaul&tbm=isch" className="button-link" target="_blank">
									  <i className="fa fa-camera" aria-hidden="true"></i>
									</a>
								</li>
								<li>
									<a href="https://www.youtube.com/results?search_query=rupaul" className="button-link" target="_blank">
									  <i className="fa fa-video-camera" aria-hidden="true"></i>
									</a>
								</li>
							</ul>

							<Panel collapsible expanded={this.state.refDetailOpen}>
								{/* graph goes here */}
							</Panel>

							<div className="detail-notes">
								{this.props.reference.refNotes}
							</div> 	
						</div>
					</div>
				</div> 
				{
					this.props.user ? (<div className="edit-button" onClick={this.editOn.bind(this)}>Edit</div>)
					: ''
				}
				
			</div> 
		)
	}
}


export default RefDetail;