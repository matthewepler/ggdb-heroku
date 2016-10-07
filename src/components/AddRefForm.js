import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import validate from './helpers/validate.js'; 
import firebase from 'firebase';
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
			errors: null,
			storageRef: firebase.storage().ref(),
			validData: null,
			uploading: false,
			showModal: false,
			screengrabURL: null,
			refThumbURL: null,
			editing: false,
			counter: 0,
		};
	}

	componentDidMount() {
		console.log(this.props.closeForm);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.editData != null) {

			this.season.value = nextProps.editData.season;
			this.episode.value = nextProps.editData.episode;
			this.quote.value = nextProps.editData.quote;
			this.timecode.value = nextProps.editData.timecode;
			this.screengrabElement.src = nextProps.editData.screengrab;
			this.from.value = nextProps.editData.from;
			this.to.value = nextProps.editData.to;
			this.location.value = nextProps.editData.location;
			this.description.value = nextProps.editData.description;
			this.refThumbElement.src = nextProps.editData.refThumb;
			this.refName.value = nextProps.editData.refName;
			this.refIs.value = nextProps.editData.refIs;
			this.refCategory.value = nextProps.editData.refCategory;
			this.refYear1.value = nextProps.editData.refYear1;
			this.refYear2.value = nextProps.editData.refYear2;
			this.wikipedia.value = nextProps.editData.wikipedia;
			this.images.value = nextProps.editData.images;
			this.video.value = nextProps.editData.video;
			this.refNotes.value		 = nextProps.editData.refNotes;

			this.setState({
				currScreengrab: null,
				currRefThumb: null,
				errors: null,
				storageRef: firebase.storage().ref(),
				validData: null,
				uploading: false,
				showModal: false,
				screengrabURL: nextProps.editData.screengrab,
				refThumbURL: nextProps.editData.refThumb,
				editing: true,
				counter: 0,
			});
		} else {
			this.clearForm();
		}
	}

	uploadChange(e) {
		const id = e.target.id;
		const file = e.target.files[0];
		if (file.type.match('image.*')) {
			let reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = e => {
				if (id.includes('ref')) { 
					this.refThumbElement.src = e.target.result;
					this.setState({ 
						currRefThumb: e.target.result,
						refThumbURL: null, 
					});
				} else if (id.includes('screengrab')) {
					this.screengrabElement.src = e.target.result;
					this.setState({ 
						currScreengrab: e.target.result,
						screengrabURL: null,
						});
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
		this.setState({erros: null});


		let formData = {};


		if (this.state.screengrabURL) {
			formData.screengrab = this.state.screengrabURL;
		} else {
			formData.screengrab = this.screengrabInput.value;
		}

		if (this.state.refThumbURL) {
			formData.refThumb = this.state.refThumbURL;
		} else {
			formData.refThumb = this.refThumb.value;
		}

		formData.season = this.season.value;
		formData.episode = this.episode.value;
		formData.quote =  this.quote.value;
		formData.timecode =  this.timecode.value;
		formData.from =  this.from.value;
		formData.to =  this.to.value;
		formData.location =  this.location.value;
		formData.description = this.description.value;
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

		let errors = [];
		for (let obj in validData) {
			if (validData[obj].value === false) {
				// console.log(validData[obj].msg);
				if (obj === 'screengrab') {
					if (this.state.editing) {
						this.setState({currScreengrab: screengrabURL});
					} else {
						this.setState({currScreengrab: null});
					}
					this.screengrabElement.src = "";
				}

				if (obj === 'refThumb') {
					if (this.state.editing) {
						this.setState({currRefThumb: refThumbURL});
					} else {
						this.setState({currRefThumb: null});
					}
					this.refThumbElement.src = "";
				}

				errors.push(validData[obj].msg);
			}
		}
		if (errors.length > 0) {
			this.setState({errors});
			this.openModal();
		} else {
			this.setState({
				errors: null, 
			});

			// here, it's all about currScreenbrab and currRefThumb
			// if they're set it's because a swap was made
			// if they're not and we're already here (no errors), we're in edit mode and 
			// we dont' want to switch them out

			if (this.state.editing) {
				// if there are values for curr's, then upload them.
				if (this.state.currScreengrab != null || this.state.currRefThumb != null) {
					if( this.state.currScreengrab != null) {
						this.uploadImage(this.screengrabInput.files[0], 'screengrab');
					}
					if (this.state.currRefThumb != null) {
						this.uploadImage(this.refThumb.files[0], 'thumb');
					}
				}
				//console.log(this.state.screengrabURL, this.state.refThumbURL);
				this.sendToFirebase(validData);
			} else {
				this.uploadImage(this.screengrabInput.files[0], 'screengrab');
				this.uploadImage(this.refThumb.files[0], 'thumb');
				this.sendToFirebase(validData);
			}
		}
	}

	// to do - delete this.state.uploading if not used
	uploadImage(file, type) {
		this.setState({uploading: true});
		var url = '';
		const dateStamp = new Date();
	    const filename = dateStamp.getTime();
		var uploadTask = this.state.storageRef.child('images/' + filename).put(file);
		var self = this;
		uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, null, 
			function(error) {
				console.log("upload error (" + file.name + ": ", error.code);
				var errors = this.state.errors;
				if (type === 'screengrab') {
					self.setState({screengrabURL: false});
					errors.push("There was an error uploading your screengrab. \
						Please check your file and try again.");
					self.setState({errors});
					this.openModal();
				} else if (type === 'thumb') {
					self.setState({thumbURL: false});
					errors.push("There was an error uploading your reference \
						image. Please check your file and try again.");
					self.setState({errors});
					this.openModal();
				}
			},
			function() {
				url = uploadTask.snapshot.downloadURL;
				console.log('url created: ', url)
				if (type === 'screengrab') {
					self.setState({screengrabURL: url});
				} else if (type === 'thumb') {
					self.setState({refThumbURL: url});
				}
			});
	}

	sendToFirebase(validData) {
		if (this.state.screengrabURL && this.state.refThumbURL) {
			this.setState({uploading: false});
			
			let cleanData = {};

			for (let obj in validData) {
				cleanData[obj] = validData[obj].value;
				if (this.state.editing) {
					cleanData.id = this.props.editData.id;
					cleanData.screengrab = this.state.screengrabURL;
					cleanData.refThumb = this.state.refThumbURL;
				}
			}

			// editSubmit is being called before the upload is done, 
			// which means this test at the top is not keeping us out
			// which means the URLs are true when I think they're not. 

    		const self = this;
    		if (self.state.editing === true && self.props.editData != null) {
    			firebase.database().ref('refs/' + cleanData.season + "/" 
				+ cleanData.episode + "/" + cleanData.id).update(cleanData).then(
				function() {
					//console.log('firebase save success');
					self.props.editSubmit(cleanData);
					self.formClose(cleanData.season, cleanData.episode);
				});
    		} else {
    			const dateStamp = new Date();
	    		const filename = dateStamp.getTime();
	    		cleanData.id = filename;
	    		cleanData.screengrab = this.state.screengrabURL;
				cleanData.refThumb = this.state.refThumbURL;

				firebase.database().ref('refs/' + cleanData.season + "/" 
					+ cleanData.episode + "/" + filename).set(cleanData).then(
					function() {
						//console.log('firebase save success');
						self.formClose(cleanData.season, cleanData.episode);
					});
			}	
		} else {
			console.log('waiting...'); // hold for image upload to complete
			const self = this;
			setTimeout(function() {
				self.sendToFirebase(validData);
			}, 500);
		}		
	}

	formClose(season, episode) {
		this.props.formClose(season, episode);
		this.state.currScreengrab = null;
		this.state.currRefThumb = null;
		this.state.screengrabURL = null;
		this.state.refThumbURL = null;
		this.clearForm(season, episode);
		this.setState({editing: false});
	}

	closeModal() {
        this.setState({ showModal: false });
    }

 	openModal() {
    	this.setState({ showModal: true });
  	}
	
	clearForm(season, episode) {
		if (season && episode) {
			this.season.value = season;
			this.episode.value = episode;
		} else {
			this.season.value = '1';
			this.episode.value = '1';
		}

		this.currPersonThumb.src = "assets/img/people/smiley.png";
		this.screengrabElement.src = "";
		this.refThumbElement.src = "";
		this.quote.value = '';
		this.timecode.value = '';
		this.screengrabInput.value = '';
		this.from.value = 'Rory Gilmore';
		this.to.value = 'Lorelai Gilmore';
		this.location.value = 'Luke\'s Diner';
		this.description.value = '';
		this.refThumb.value = '';
		this.refName.value = '';
		this.refIs.value = '';
		this.refCategory.value = 'Brand';
		this.refYear1.value = '';
		this.refYear2.value = '';
		this.wikipedia.value = '';
		this.images.value = '';
		this.video.value = '';
		this.refNotes.value = '';
	}

	handleCancel() {
		
	}


	render() {
		return (
			<div className="add-ref-form-wrapper">

			<div className="uploading">
				{this.state.uploading ? 
					<div className="uploading-modal">
						<i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i> 
					</div>
					: ''}
			</div>

			<div className="submit-error">
				{this.state.errors === null ? "" : this.state.errors.map( (e, index) => (<p key={index}>{e}</p>))}
			</div>

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
							<label htmlFor="screengrab-input" id="screengrab-label-edit" ref={c => this.screengrabUploadElement = c} ><i className="fa fa-arrow-circle-up" aria-hidden="true"></i><br/>screengrab</label>
							<input type="file" id="screengrab-input" ref={c => this.screengrabInput = c} onChange={this.uploadChange.bind(this)}/>
						</div>
						<div className="rf-time">
							<span className="season-episode">
								<p>Season:</p>
								<div className="select-wrap">
									<select className="season-select rf-button-link" ref={c => this.season = c}>
										{_.range(7).map( (s, index) => {
											return <option value={s+1} key={index}> {s + 1} </option>
										})}
									</select>
								</div>
								<p>Episode:</p>
								<div className="select-wrap">
									<select className="episode-select rf-button-link" ref={c => this.episode = c}>
										{_.range(23).map( (e, index) => {
											return <option value={e+1} key={index}> {e + 1} </option>
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
							  			if (c === "Rory Gilmore") {
							  				return <option value={c} key={index} selected> {c} </option> 
							  			} else {
							  				return <option value={c} key={index}> {c} </option> 
							  			}
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
												if (l === "Luke's Diner") { 
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
							<img className={this.state.currRefThumb === null && !this.state.editing ? 'empty-refThumb' : ''} src="" ref={c => this.refThumbElement = c}/>
							<label htmlFor="ref-thumb-input" id="screengrab-thumb-edit" ref={c => this.refThumbUploadElement = c} ><i className="fa fa-arrow-circle-up" aria-hidden="true"></i><br/>pic</label>
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
											<span className="year-dash"> - </span>
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
										<input className="rf-ref-tags-media" type="text" placeholder="YouTube link (search results or direct link)" ref={c => this.video = c}/>
									</li>
								</ul>

								<div className="detail-notes">
									<textarea placeholder="reference notes" ref={c => this.refNotes = c}/>
								</div> 	
							</div>
						</div>
					</div> 
					<div className="submit-error">
						{this.state.errors === null ? "" : 
						<Modal className="error-modal" show={this.state.showModal} onHide={this.closeModal.bind(this)}>
							<Modal.Header closeButton>
			          			<Modal.Title>Eek, errors! </Modal.Title>
			            	</Modal.Header>
			            	<Modal.Body>
								<p>Please see details at the top of the form.</p>
							</Modal.Body>
							<Modal.Footer>
					           <Button onClick={this.closeModal.bind(this)}>Close</Button>
					        </Modal.Footer>
						</Modal>}
					</div>
					<input id="submit-button" type="submit" value="Submit"/>
					<div id="cancel-button" onClick={this.handleCancel.bind(this)}>Cancel</div>
				</div> 
			</form>
			</div> 
		)
	}
}


export default AddRefForm;