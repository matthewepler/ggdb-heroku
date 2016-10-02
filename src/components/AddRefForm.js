import React, { Component, PropTypes } from 'react';
import validate from './helpers/validate.js'; 
import _ from 'underscore'; 

// api
const characters = ["Lorelai Gilmore","Rory Gilmore","Luke Danes","Lane Kim","Michel Gerard","Emily Gilmore","Richard Gilmore","Sookie St. James","Kirk Gleason","Paris Geller","Miss Patty","Dean Forester","Logan Huntzberger","Jackson Belleville","Taylor Doose","Babette Dell","Mrs. Kim","Zack Van Gerbig","Jess Mariano","Christopher Hayden","Louise Grant","Madeline Lynn","Brian Fuller","Gypsy","Doyle McMaster","Caesar","Andrew","Morey Dell","Grant","Liz Danes","Colin McCrae","Lulu","Finn","Jason Stiles","T.J.","Gil","April Nardini","Tom","Max Medina","Glenn Babble","Tristin Dugray","Hanlin Charleston","Marty","Anna Nardini","Dave Rygalski","Mitchum Huntzberger","Lindsay Forester","Bill", "Janet Billings","Drella","Tana Schrick","Nicole Leahy","Lucy","Reverend Archie Skinner","Olivia","A.K.","Brad Langford","Lorelai 'Trix' Gilmore","Rob","Rachel","Bootsy","Kyle","Mrs. O'Malley","Kyon","Henry Cho","Asher Fleming","Francie Jarvis","Honor Huntzberger","Robert Grimaldi","Rabbi David Barans","Shane","Clara Forester","Raj","Mrs. Cassini","Fred","Robert the Valet","Customer","Ed","Bob Merriam","Sherry Tinsdale","Alex Lesman","Rune","Sophie Bloom","Davey","Harry","Dereck","Jamie","Jimmy","Tobin","Joe Mastoni","Straub Hayden","Mayor Harry Porter","Burt","Beau Belleville","Francine Hayden","Sy","Nick","Simon McLane","T.J.'s Brother","Dr. Schultz","Floyd Stiles","Anson","Rich Bloomenfeld","Josh","Patel Chandrasekhar","Mrs. Slutsky","Manny","Russell Bynes","Meena","Grandpa Huntzberger","Marilyn","Marty (Singer)","Helen Thompson","Fred Larson","Western Shirt Man","Young Lorelai","Fencing Instructor","Judy Garland","Douglas Swope","The Proprietor","Mr. Hunter","Young Christopher","Bill Borden","May","Mae West","Carl","Marilyn Monroe","John Mattern","Bette Davis","Name Calling Woman","Chief Baker","Marjorie Rogers","Gwen Stefani","Iris Medlock","Uma Thurman","Fred Larson Jr.","Charlie","Janet Jackson","Jim Hatlestad","Waiter","Friar Lawerence","Chad","Stars Hollow Resident","Terence","Work Furlough Gang","Elton John", "other", "Mrs. Traister"].sort();
const locations = ["Lorelai's House", "The Gilmore House", "Town Square", "Chilton", "Luke's Diner", "Kim's Antiques", "Miss Patty's School of Ballet", "Independence Inn", "Doose's Market", "Dragonfly Inn", "Weston's Bakery", "Stars Hollow High School", "Stars Hollow History Museum", "Yale", "other"].sort();
const refCategories = ["TV", "Music", "Film", "Literature", "Sports", "Institution", "Person", "Comedy/Comic", "History", "Brand", "Theatre", "Fashion", "News", "Science", "Religion", "Geography/Place"].sort();

// stylesheets
import '../assets/stylesheets/AddRefForm.scss';


class AddRefForm extends Component {
	
	constructor() {
		super();
		this.state = {
			currScreengrab: null,
			currRefThumb: null,
		};
	}

	componentDidMount() {
		const screengrabBox = this.screengrabElement.getBoundingClientRect();
		this.screengrabUploadElement.style.top = ((screengrabBox.height/2) * -1) - 30 + "px";
		this.screengrabUploadElement.style.left= (screengrabBox.width/2) - 35 + "px";
		
		const refThumbBox = this.refThumbElement.getBoundingClientRect();
		this.refThumbUploadElement.style.top = ((refThumbBox.height/2) * -1) - 25 + "px";
		this.refThumbUploadElement.style.left= (refThumbBox.width/2) - 85 + "px";
	}

	uploadChange(e) {
		const id = e.target.id;
		const file = e.target.files[0];
		if (file.type.match('image.*')) {
			let reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = e => {
				if (id.includes('ref')) { 
					this.setState({ currRefThumb: e.target.result });
					this.refThumbElement.src = e.target.result;
				} else if (id.includes('screengrab')) {
					this.setState({ currScreengrab: e.target.result });
					this.screengrabElement.src = e.target.result;
				}
			}
		}
	}

	fromChange(e) {
		const name = e.target.value.replace(/^\s+|\s+$|\s|\./g, '').toLowerCase();
		this.currPersonThumb.src = "assets/img/people/" + name + ".png";

		// check filenames for match
		// set ref URL for 'this.currPersonThum'
		// if not match, keep smiley face
	}

	formSubmit(e) {
		e.preventDefault();
		let formData = {};
		formData.season = this.season.value;
		formData.episode = this.episode.value;
		formData.quote =  this.quote.value;
		formData.timecode =  this.timecode.value;
		formData.screengrab =  this.screengrab.value;
		formData.from =  this.from.value;
		formData.to =  this.to.value;
		formData.location =  this.location.value;
		formData.description = this.description.value;
		formData.refThumb =  this.refThumb.value;
		formData.refName =  this.refName.value;
		formData.refIs =  this.refIs.value;
		formData.refCategory =  this.refCategory.value;
		formData.refYear1 =  this.refYear1.value;
		formData.refYear2 =  this.refYear2.value;
		formData.wikipedia =  this.wikipedia.value;
		formData.images =  this.images.value;
		formData.video =  this.video.value;
		formData.refNotes =  this.refNotes.value;

		const validData = validate(formData);
		for (let obj in validData) {
			console.log(obj, validData[obj]);
		}
		
		// if any object has a value == 'false', clear any error objects in state add classes to the elements with bad values and add their object names to an array in state
		// if true, clear all error objects in state and submit to firebase
	}


	render() {
		return (
			<div className="add-ref-form-wrapper">
			<form onSubmit={this.formSubmit.bind(this)}>
				<div className="rf-headline-wrapper" >
	        <div className="rf-person-thumb">
          	<img className="rf-clip-circle" src="assets/img/people/smiley.png" alt="face" ref={c => this.currPersonThumb = c}/>
	        </div>
	        <div className="rf-quote-box">
	        	<i className="rf-left-arrow fa fa-caret-left" aria-hidden="true"></i>
        		<span className="rf-ref-quote"><textarea placeholder="quote" ref={c => this.quote = c}/></span>
      		</div>
	      </div> 

				<div className="rf-ref-detail-wrapper">
					<div className="rf-screengrab">
						<div className="rf-screengrab-input">
							<img className={this.state.currScreengrab === null ? 'empty-screengrab' : 'user-screengrab'} src="" ref={c => this.screengrabElement = c}/>
							{
								this.state.currScreengrab === null ? 
								<label htmlFor="screengrab-input" ref={c => this.screengrabUploadElement = c}><i className="fa fa-arrow-circle-up" aria-hidden="true"></i><br/>screengrab</label>
								: ''
							}
							<input type="file" id="screengrab-input" ref={c => this.screengrab = c} onChange={this.uploadChange.bind(this)}/>
						</div>
						<div className="rf-time">
							<span className="season-episode">
								<p>Season:</p>
								<div className="select-wrap">
									<select className="season-select rf-button-link" ref={c => this.season = c}>
										{_.range(7).map( (s, index) => {
											return <option value={s} key={index}> {s + 1} </option>
										})}
									</select>
								</div>
								<p>Episode:</p>
								<div className="select-wrap">
									<select className="episode-select rf-button-link" ref={c => this.episode = c}>
										{_.range(23).map( (e, index) => {
											return <option value={e} key={index}> {e + 1} </option>
										})}
									</select>
								</div>
							</span>
							<i className="fa fa-clock-o" aria-hidden="true"></i>
							<span className="rf-button-link rf-ref-marker"><input type="text" placeholder="00:00" ref={c => this.timecode = c}/></span>
						</div>
						<div className="rf-screengrab-detail"> 
							<div className="select-wrap">
								<span className="rf-button-link from">
									<select className="rf-from-input" ref={c => this.from = c} onChange={this.fromChange.bind(this)} >
							  		{characters.map( (c, index) => {
							  					return <option value={c} key={index}> {c} </option> 
							  			})}
									</select>
								</span>
							</div>

						  	<span><i className="fa fa-long-arrow-right" aria-hidden="true"></i></span>
		
							<div className="select-wrap">
								<span className="rf-button-link to">
									<select className="rf-to-input" ref={c => this.to = c}>
							  		{characters.map( (c, index) => {
							  			if (c === "Lorelai Gilmore") { 
						  					return <option value={c} key={index} selected> {c} </option> 
						  				} else {
						  					return <option value={c} key={index}> {c} </option> 
						  				}
							  		})}
									</select>
								</span> 
							</div>

							<br/>

							<div className="rf-location">
								<i className="fa fa-at" aria-hidden="true"> </i>
								<div className="select-wrap">
									<span className="rf-button-link location" >
										<select className="rf-location-input" ref={c => this.location = c}>
											{locations.map( (l, index) => {
												if (l === "Lorelai's House") { 
								  					return <option value={l} key={index} selected> {l} </option> 
								  				} else {
								  					return <option value={l} key={index}> {l} </option> 
								  				}
											})}
										</select>
									</span>
								</div>
							</div>
						</div>
						
						<div className="rf-image-descrip">
							<textarea placeholder="scene description" ref={c => this.description = c}/>
						</div>
					</div>

					<div className="rf-ref-detail">
						<div className="rf-ref-thumb">
							<img className={this.state.currRefThumb === null ? 'empty-refThumb' : ''} src="" ref={c => this.refThumbElement = c}/>
							{
								this.state.currRefThumb === null ? 
								<label htmlFor="ref-thumb-input" ref={c => this.refThumbUploadElement = c}><i className="fa fa-arrow-circle-up" aria-hidden="true"></i><br/>image</label>
								: ''
							}
							<input type="file" id="ref-thumb-input" ref={c => this.refThumb = c}onChange={this.uploadChange.bind(this)}/>
						</div>
						<div className="rf-ref-items">
							<div className="rf-ref-descrip">
								<input className="rf-ref-descrip-refbox" type="text" placeholder="Person, place, thing (RuPaul)" ref={c => this.refName = c}/>
								<input className="rf-ref-descrip-isa" type="text" placeholder=" is a ... (drag performer)" ref={c => this.refIs = c}/>
							</div>
							<div className="rf-ref-tags">
								<ul>

									<li className="rf-button-link rf-button-select">
										<div className="select-wrap">
											<select ref={c => this.refCategory = c}>
												{refCategories.map( (rc, index) => {
													return <option value={rc} key={index}> {rc} </option>
												})}
											</select>
										</div>
									</li>
									<li className="years">
										<input className="rf-ref-tags-year" type="text" placeholder="year" ref={c => this.refYear1 = c}/>
										-
										<input className="rf-ref-tags-year" type="text" placeholder="year" ref={c => this.refYear2 = c}/>
									</li> 
									
									<li className="rf-ref-tags-link">
										<i className="fa fa-wikipedia-w" aria-hidden="true"></i>
										<input className="rf-ref-tags-media" type="text" placeholder="wikipedia direct link" ref={c => this.wikipedia = c}/>
									</li>
									
									<li className="rf-ref-tags-link">
										<i className="fa fa-camera" aria-hidden="true"></i>
										<input className="rf-ref-tags-media" type="text" placeholder="google image search results link" ref={c => this.images = c}/>
									</li>

									<li className="rf-ref-tags-link">
										<i className="fa fa-video-camera" aria-hidden="true"></i>
										<input className="rf-ref-tags-media" type="text" placeholder="video link (search results or direct link)" ref={c => this.video = c}/>
									</li>
								</ul>

								<div className="detail-notes">
									<textarea placeholder="reference notes" ref={c => this.refNotes = c}/>
								</div> 	
							</div>
						</div>
					</div> 
					<input className="submit-button" type="submit" value="Submit"/>
				</div> 
			</form>
			</div> 
		)
	}
}


export default AddRefForm;