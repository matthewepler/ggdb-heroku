import React, { Component, PropTypes } from 'react';
import { Panel } from 'react-bootstrap';

import Timeline from './Timeline';
import StackedBar from './StackedBar';

// stylesheets
import '../assets/stylesheets/RefDetail.scss';



class RefDetail extends Component {
	constructor(props) {
		super();
		this.state = {
			refDetailOpen: true,
			fromToViz: null,
			refDetailViz: null,
			prevFromToVizElement: null,
			prevRefDetailVizElement: null,
			refDetailType: 'category',
		};
	}

	componentDidMount() {
		this.setState({
			prevFromToVizElement: this.fromElement,
			fromToViz: this.props.reference.from,
			prevRefDetailVizElement: this.categoryElement,
			refDetailViz: this.props.reference.category,
		});
	}


	fromToClick(event) {		
		const prevSubject = this.state.prevFromToVizElement;	
		prevSubject.classList.toggle('outline');
		event.currentTarget.classList.toggle('outline');

		this.setState({
			fromToViz: event.currentTarget.innerHTML,  // full name string
			prevFromToVizElement: event.currentTarget, // element surrounding string
		});
		
	}

	refDetailClick(event) {
		const prevSubject = this.state.prevRefDetailVizElement;
		prevSubject.classList.toggle('outline');
		event.currentTarget.classList.toggle('outline');

		let viz, type = '';
		if (event.currentTarget.classList.value.includes('category') === true) {
			viz = this.props.reference.category;
			type = 'category';
		} else if (event.currentTarget.classList.value.includes('year') === true ) {
			viz = this.props.reference.refYear1;
			type = 'year';
		}

		this.setState({
			refDetailViz: viz,
			refDetailType: type,
			prevRefDetailVizElement: event.currentTarget,
		});
	}

	editOn() {
		this.props.editOn(this.props.reference);
	}



	render() {
		return (
			<div className="ref-detail-wrapper">
				<div className="screengrab" id={this.props.reference.id+1} ref={c => this.screengrabElement = c}>
					<img src={this.props.reference.screengrab} alt="screengrab" />
					
					<div className="image-descrip" >
						<p>{this.props.reference.description} </p>
					</div>
					
					<div className="screengrab-detail"> 
						<span 
							className="button-link from outline" 
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
							className="location" 
							onClick={this.fromToClick.bind(this)} 
							>{this.props.reference.location} 
						</span>
					</div>
					
					{
						this.props.open ? (<div>
											<Timeline type="timecode" subject={this.state.fromToViz} reference={this.props.reference} 
												default={this.props.reference.from} allRefs={this.props.allRefs} res={window.devicePixelRatio}/>
											<p className="from-to-graph-info">{`${this.state.fromToViz} - season ${this.props.reference.season}, episode ${this.props.reference.episode}`}</p>
										  </div>)
										: ''
					}
					
					
				</div>

				<hr className="hr-line"/>

				
				<div className="ref-detail">
					<div className="ref-thumb">
						<img src={this.props.reference.refThumb} alt="reference thumbnail" />
					</div>
					<div>
						<div className="ref-descrip">
							<p><span className="ref-descrip-strong"
											 onClick={this.refDetailClick.bind(this)}
											 dangerouslySetInnerHTML={{__html: this.props.reference.refName}}>
								 </span> {this.props.reference.refIs}
						  </p>
						</div>
						<div className="detail-notes">
							{this.props.reference.refNotes}
						</div> 	
						<div className="ref-tags">
							<ul>
								<li className="button-link category outline" 
									ref={c=> this.categoryElement = c}
									onClick={this.refDetailClick.bind(this)}
									dangerouslySetInnerHTML={{__html: this.props.reference.refCategory}}>
								</li>
								{ 
									this.props.reference.refYear2.length >= 3 ? 
									<li className="button-link year" 
										ref={c=> this.yearElement = c}
										onClick={this.refDetailClick.bind(this)} 
										dangerouslySetInnerHTML={{__html: `${this.props.reference.refYear1} - ${this.props.reference.refYear2}`}}>
									</li> 
									: <li className="button-link year" 
										    ref={c=> this.yearElement = c}
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
						</div>
					</div>
				</div> 
				{
					this.props.open ? this.state.refDetailType === 'category' ?
					 					(<div>
					 						<StackedBar allRefs={this.props.allRefs} subject={this.categoryElement.innerHTML}/>
					 						<p className="from-to-graph-info">Categories - {`season ${this.props.reference.season}, episode ${this.props.reference.episode}`}</p>
					 					</div>)
										: (<div className="ref-detail-viz-wrapper">
											<Timeline type={this.state.refDetailType} subject={this.state.refDetailViz} reference={this.props.reference} 
												allRefs={this.props.allRefs} default={this.props.reference.refYear1} />
											<p className="from-to-graph-info">{`season ${this.props.reference.season}, episode ${this.props.reference.episode}`}</p>
										  </div>)
									: ''
				}

				{
					this.props.user ? (<div className="edit-button" onClick={this.editOn.bind(this)}>Edit</div>)
					: ''
				}
				
			</div> 
		)
	}
}


export default RefDetail;