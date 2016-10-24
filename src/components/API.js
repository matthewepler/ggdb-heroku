import React, { Component } from 'react';

// styles
import '../assets/stylesheets/API.scss';

class API extends Component {
	render() {
		return (
			<div>
				<div className="title-wrapper">
          <a className="title" href="/"> ggdb </a>
          <p className="subtitle">
            <span>
              <a href="/about">About </a>
              |
              <a href="/api"> API </a>
            </span>
          </p>
        </div>

        <div className="text-wrapper">
        	<h2>Using the API</h2>
        	<p>
        		Use your favorite client to access the API. All queries will return a JSON 
        		 object. If you're new to using API's, I recommend starting with Code Academy's  
        		<a href="https://www.codecademy.com/courses/javascript-beginner-en-EID4t/0/4?curriculum_id=5122e6f8b2cb8a8e97000a01"> API tutorials</a>.
        	</p>
        	<h2>Submitting Your Project</h2>
        	<p>
        		We will be featuring projects that use the API on the site. Please submit yours to <a href="mailto:ggdb.info@gmail.com?Subject=Dataviz%20Project">ggdb.info@gmail.com</a>.
        	</p>
        	<div className="api-descrip">
	        	<h3>ALL REFERENCES</h3>
	        	<p>https://ggdb-af77a.firebaseio.com/refs.json</p>
	        	
	        	<h3>SEASONS/EPISODES</h3>
	        	<p>https://ggdb-af77a.firebaseio.com/refs/SEASON.json</p>
	        	<p>https://ggdb-af77a.firebaseio.com/refs/SEASON/EPISODE.json</p>
	        	<em>SEASON = integer with a range of 1-8. EPISODE = integer with a range of 1-22.</em>
        	</div>
        </div>
			</div>
		)
	}
}

export default API;