import React, { Component, PropTypes } from 'react';
import { Panel } from 'react-bootstrap';

// stylesheets
import '../assets/stylesheets/RefDetail.scss';



class RefDetail extends Component {
	constructor() {
		super();
		this.state = {
			fromToOpen: false,
			refDetailOpen: false,
			fromToViz: null,
			refDetailViz: null
		};
	}

	fromToClick(event) {	
		// console.log(this.toElement); // testing references to elements, works!
	
		const prevSubject = this.state.fromToViz;
		// right now fromToViz is an element because it gets the classname and the value. 
		// could change to an object with className -> category & value -> value
		// would also need to change calls involving prevSubject since that is currently an element also
		
		if (this.state.fromToOpen) {
			if (prevSubject != null && event.currentTarget !== this.state.fromToViz) {
				prevSubject.classList.toggle('outline');
			}
			if (event.currentTarget === this.state.fromToViz) {
				event.currentTarget.classList.toggle('outline');
				this.setState({
					fromToOpen: false,
				});
				return
			} else {
				// if the panel is open and we're switching to another button
				event.currentTarget.classList.toggle('outline');
				this.setState({ fromToViz: event.currentTarget }); // this.props.reference.[to, from, location] (event.currentTarget.className[0])
			} 
		} else { 
		// open the Panel
			event.currentTarget.classList.toggle('outline');
			this.setState({
				fromToOpen: true,
				fromToViz: event.currentTarget
			});
		}
	}

	refDetailClick(event) {
		const prevSubject = this.state.refDetailViz;

		if (this.state.refDetailOpen) {
			if (prevSubject != null && event.currentTarget !== this.state.refDetailViz) {
				prevSubject.classList.toggle('outline');
			}
			if (event.currentTarget === this.state.refDetailViz) {
				event.currentTarget.classList.toggle('outline');
				this.setState({
					refDetailOpen: false,
				});
				return
			} else {
				// if the panel is open and we're switching to another button
				event.currentTarget.classList.toggle('outline');
				this.setState({ refDetailViz: event.currentTarget }); // this.props.reference.[to, from, location] (event.currentTarget.className[0])
			} 
		} else { 
		// open the Panel
			event.currentTarget.classList.toggle('outline');
			this.setState({
				refDetailOpen: true,
				refDetailViz: event.currentTarget
			});
		}
	}

	editOn() {
		this.props.editOn(this.props.reference);
	}

	shareClick(e) {
		console.log(`http://gg-db.com/?season=${this.props.reference.season}&episode=${this.props.reference.episode}&id=${this.props.reference.id}`);
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
						{this.state.fromToViz == null ? '' : this.state.fromToViz.innerHTML}
						{/* <Graph data={this.state.fromToViz} /> */}
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
								{this.state.refDetailViz == null ? '' : this.state.refDetailViz.innerHTML}
								{/* <Graph data={this.state.refDetailViz} /> */}
							</Panel>

							<div className="detail-notes">
								{this.props.reference.refNotes}
							</div> 	
						</div>
					</div>
				</div> 
				{
					this.props.user ? (<div className="edit-button" onClick={this.editOn.bind(this)}>Edit</div>)
					: (<div className="edit-button" onClick={this.shareClick.bind(this)}>Share</div>)
				}
				
			</div> 
		)
	}
}

RefDetail.propTypes = {
  reference: PropTypes.object.isRequired,
};

export default RefDetail;