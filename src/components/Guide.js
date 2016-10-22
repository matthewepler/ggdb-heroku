import React, { Component } from 'react';

// styles
import '../assets/stylesheets/Guide.scss';

class Guide extends Component {
	render() {
		return (
			<div>
				<div className="title-wrapper">
          <a className="title"> ggdb </a>
          <p className="subtitle">
            <span>
              <a href="/about">About </a>
              |
              <a href="/api"> API </a>
              |
              <a href="/"> Home </a>
            </span>
          </p>
        </div>

        <div className="text-wrapper">
        	<h2>Contributor's Guide</h2>
        	<p>
        		Thanks so much for helping GGDB! Use this guide when adding a reference to the database. Each part of the 
            form has its own quirks, so I've listed them here in hopes that provide some clarity. 
        	</p>
          <h2>Help & Suggestions</h2>
          <p>
            Are we missing a name from a dropdown menu? Are you getting an error that you think is wrong? 
            <a href="mailto:ggdb.info@gmail.com?Subject=Contributor%20Help/Suggestion"> Send an email </a>
            with the subject "Contributor Help/Suggestion." 
          </p>
          <h3 className="guide-section">QUOTE</h3>
          <p>descript goes here</p>
        </div>
			</div>
		)
	}
}

export default Guide;