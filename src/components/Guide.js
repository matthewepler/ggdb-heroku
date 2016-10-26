import React, { Component } from 'react';

// styles
import '../assets/stylesheets/Guide.scss';

class Guide extends Component {
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
        	<h2>Contributor's Guide</h2>
        	<p>
        		Thanks so much for helping GGDB! Use this guide when adding a reference to the database. Each part of the 
            form has its own quirks, so I've listed them here in hopes that provide some clarity. 
        	</p>
          <p>
          To get started, sign-in using the "Login" link on the homepage (top). Once logged in, you'll see a new button appear with a "+" sign. 
          Click that to open the form and fill it out to add a new referece. To edit a reference you've already submitted, open 
          it by clicking on the quote as per normal, and scroll to the bottom of the reference where you will see an Edit button.
          </p>
          <p>When in doubt about how to fill something in, refer to Season 1, Episode 1.</p>
          
          <h2>Help & Suggestions</h2>
          <p>
            Are we missing a name from a dropdown menu? Are you getting an error that you think is wrong? 
            <a href="mailto:ggdb.info@gmail.com?Subject=Contributor%20Help/Suggestion"> Send an email </a>
            with the subject "Contributor Help/Suggestion." 
          </p>
          
          <h3 className="guide-section">THE SMILEY FACE</h3>
          <p>This will be changed automatically when you enter the 'From' name. If no picture is available, it will remain 
          a smiley face. I'll happily add an image if there isn't one for the Reference if you send me 
          <a href="mailto:ggdb.info@gmail.com">an email</a>.
          </p>

          <h3 className="guide-section">QUOTE</h3>
          <p>Just enter the text as it appears in the subtitles. If you believe there is a spelling error, use your 
          best judgement. The bold text will be added automatically but must match exactly what you put in the field
          for the Reference Name (where is says "Person, place or thing..."
          </p>

          <h3 className="guide-section">SCREENGRAB</h3>
          <p>I think having subtitles helps you relive the moment a little more. But I could be convinced otherwise. These
          should be standard image files and will be resized according to the user's screen size and resoluion. If we
          get a cease-and-desist, it will likely be because of these and they may eventually have to be taken down. 
          </p>

          <h3 className="guide-section">QUOTE</h3>
          <p>Just enter the text as it appears in the subtitles. If you believe there is a spelling error, use your 
          best judgement. The bold text will be added automatically but must match exactly what you put in the field
          for the Reference Name (where is says "Person, place or thing..."
          </p>

          <h3 className="guide-section">SEASON/EPISODE</h3>
          <p>When you are added as a contributor, you are assigned a season and episode. If you try submitting a reference for 
          any other season/episode, you will get an error.
          </p>

          <h3 className="guide-section">TIMECODE</h3>
          <p>Format should be ##:## or #:##. For example, a reference that occurs at 9 minutes and 38 seconds should be 
          entered as 09:38 or 9:38. If season 8, then you may encounter a reference over 1 hour. In that case, the format
          should be #:##:##. 
          </p>

          <h3 className="guide-section">FROM</h3>
          <p>Pick one from the list and it will try to match it to an image file so that the smiley face next to the
          quote changes. If there is no picture for the person you've chosen, the smiley face will remain. If the person
          you are trying to find is not in the list, <a href="mailto:ggdb.info@gmail.com?Subject=Missing%20Character%20Name"> email me </a>
           and I'll add it. Please attach an image for the person to be added or a note saying you couldn't find one. 
          </p>

          <h3 className="guide-section">TO</h3>
          <p>Same as "From," but without the image stuff. 
          </p>

          <h3 className="guide-section">LOCATION</h3>
          <p>Some might disagree with calling everything outdoors "Town Square," but that's basically what it boils down
          to in 99% of the cases. I am open to other suggestions, though. If there is a location missing or you want to 
          suggest a different way of doing it, <a href="mailto:ggdb.info@gmail.com?Subject=Missing%20Character%20Name"> email me</a>.  
          Also, a note about the separate Gilmore households. "The Gilmore House" refers to to Rory's grandparents' house. For 
          Rory and Lorelai's house, use "Lorelai's House."
          </p>  

          <h3 className="guide-section">SCENE DESCRIPTION</h3>
          <p>This should be short and give context to the scene. It should give a description of the conversation in which
          the reference occurs and describe why it is being used. See Season 1, Episode 1 for examples.
          </p>  

          <h3 className="guide-section">PIC</h3>
          <p>This should be a picture of the reference. It will be sized small when on the website, so the best images 
            will fill the frame with the subject. For example, if the reference is a person, crop the picture to be just the 
            head of the person. If you can, try to find a pic of the subject from around the year the episode aired. 
          </p>          

          <h3 className="guide-section">REFERENCE ("Person, Place, thing")</h3>
          <p>This is the name of the reference as it appears in the dialog. Whatever you put here should match exactly what's in 
          the quote so the bold text magic works. Here's an example of a tricky situation: In Season 1, Episode 1,
          Lorelai makes a reference to <a href="http://gg-db.com/?season=1&episode=1&id=1475940876973"> "...pull a Menendez," </a>
          which refers to the Menedez brothers. Although the proper noun is "The Menendez Brothers," the entry here should just be 
          Menendez so that it matches the quote. Then, in the description below, you can explain the full reference and type it as a 
          proper noun. For nicknames, see <a href="http://gg-db.com/?season=1&episode=1&id=1475940101136"> Flo Jo </a> in Season 1, 
          Episode 1 as an example. 
          </p>  

          <h3 className="guide-section">REFERENCE DESCRIPTION ("is a...")</h3>
          <p>
          All entries here should begin with the words "is," "are," "was," or "were." That's because the app will take
          whatever is in the Reference section and add it to this to form a complete sentence. See any reference in Season 1,
          Episode 1. If you have questions about which word to use with your reference, ask another contributor or <a href="mailto:ggdb.info@gmail.com?Subject=Missing%20Character%20Name"> email me</a>.  
          </p>   

          <h3 className="guide-section">REFERENCE DESCRIPTION ("is a...")</h3>
          <p>
          All entries here should begin with the words "is," "are," "was," or "were." That's because the app will take
          whatever is in the Reference section and add it to this to form a complete sentence. See any reference in Season 1,
          Episode 1. If you have questions about which word to use with your reference, ask another contributor or <a href="mailto:ggdb.info@gmail.com?Subject=Missing%20Character%20Name"> email me</a>.  
          </p>   

          <h3 className="guide-section">CATEGORY (Brand, Comedy, Fashion, Film, etc)</h3>
          <p>
          This can be tricky. Some references will fit both. When in doubt, go with the category the reference is most
          commonly known for. Discuss with your team or contact me if you cannot make a decision and we'll work it out. 
          </p>   

          <h3 className="guide-section">YEAR</h3>
          <p>
          The first date is required. The second is optional. If used, it indicates that the person, place or thing has 
          come to a definite end. If the reference is ongoing, please input "now". This can be tricky, but use your own
          judgement. Usually, "now" is used persons only. 
          </p>
          <p>
          Example: <a href="http://gg-db.com/?season=1&episode=1&id=1475938024015">Britney Spears</a> -  "...Baby One 
          More Time" released in 1999 and she's still alive, so the years would be "1999" and "now".
          </p>
          <p>
          Example: <a href="http://gg-db.com/?season=1&episode=1&id=1475938748179">Ruth Gordon</a> - Listed as 1968 
          because the reference is specific to one character she played, not the entirety of her career (like 
          <a href="http://gg-db.com/?season=1&episode=1&id=1475936693030"> Mark Twain </a>earlier in the same episode).
          </p> 

          <h3 className="guide-section">WIKIPEDIA</h3>
          <p>
          Link directly to the most relevant wikipedia page.
          </p> 

          <h3 className="guide-section">GOOGLE IMAGES</h3>
          <p>
          This is a little strange, I admit. But one pic doesn't do some of these references justice and I thought it 
          might also be a way to get to see how they're circulated now. To do this, just copy/paste the URL from a Google 
          image search. 
          </p> 

          <h3 className="guide-section">YOUTUBE LINK</h3>
          <p>
          Link to a video you think is relevant, or to a search result within YouTube to show a variety. If you can, 
          try to find a video of the subject from around the year the episode aired. 
          </p> 

          <h3 className="guide-section">REFERENCE NOTES</h3>
          <p>
          This is a place for you to explain why a reference is categorized the way it is, why the year was chosen, if they
          are sometimes refered to by another name, etc. For ideas, see Season 1, Episode 1.
          </p> 

        </div>
			</div>
		)
	}
}

export default Guide;