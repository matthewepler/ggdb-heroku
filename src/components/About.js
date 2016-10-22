import React, { Component } from 'react';

// styles
import '../assets/stylesheets/About.scss';

class About extends Component {

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
        	<h2>Wonderful things, old and new.</h2>
        	<p>
        		Too often we pass up TV as a way to understand who we are and where we came from. TV brings us together, and gives us
        		a common language. In the case of GG, it goes even further by giving us a list of things to fall in love with. 
        	</p>
        	<p>
        		This site is a love note to the writers of the Gilmore Girls. I wanted it to embody the character of the show - quick, smart, fun. Hopefully you find it to be like a good friend  who 
        		says the right thing at the right time, makes you laugh, and knows what you love. Kinda like the Gilmore Girls.
        		May it be a resource of wonderful things old and new.
        	</p>
        	<h2> Lastly...</h2>
        	<p>
        		I'd like to take this opportunity to address the writers and creators of the show. Wow. You all must have had the time of your life.
        		Thanks for sharing your obsessions with us. It's made us richer as human beings and given us more to share with each other. We owe you a great debt. You 
        		made the world a more interesting place. In my book, that's as good a life as any of us can hope to lead.
        	</p>
        	<p>xo, <br/><a href="http://mepler.com">Matthew Epler</a></p>
        </div>
			</div>
		)
	}
}

export default About;