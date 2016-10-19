# TO DO
HD 
 - timeline has new value not yet pushed. validate and then the prop and if-block to the other graphs.
 - make anything that is set to pixels a rem value
 - quote font size
 - pop up size and font size (signin, link)
 - link icon size
 - circular pic size

* finish people seeding.
 - if no match, put smiley

* testing
 - add new stuff (use hour format)

* add page "Contributor's Reference Guide" http://gg-db.com/guide.
* add page "About"
* add countdown to launch

* API - return JSON with keywords? - quick tutorial or read-up suggested.

* fix redirects...?

* plan for contributors madness!
* plant.

* ES Lint
* clean README


## NON-CRITICAL
* lighten lorelai
* all links (dots, selector 'go' button, etc.) should use the app to fetch data and reload components instead of reload. update browser history:
		- https://developer.mozilla.org/en-US/docs/Web/API/History_API
* add drag-and drop: https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications
* filter for seeing all mentions by a single character, in a single location



## GUIDE
( put the link right above the "+" Toolbar)
For years, 
1.)try to make the first date the year in which the person released their first major public work 
2.) the second year is not required. if used, it indicates that the person, place, or thing extended beyond the first year and had a definite end. 
3.) If the person, place, thing is still ongoing, enter "now." Works of art are the excecption. ALthought ongoing (see "is/was"), only their date of creation matters. 

Example: Britney Spears' "...Baby One More Time" released in 1999 and she's still alive, so the years would be "1999" and "now".

See Ruth Gordon. Listed as 1968 because the reference is specific to one character she played, not the entirety of her career (like Mark Twain earlier in the same episode);

* was/is - any works of art that are still generally available are considered part of the present and therefore should be refered to with "is" or "are." 

* refName should appear exactly as it did in the quote. If it is a nickname, or shortened to just a first name, then address this in is/was. Ex" Flo Jo (instead of Florence Griffith Joyner) or Melville (instead of Herman Melville)
or "Oprah" -> Oprah (Winfrey) is a popular talk show host."

* link to the guide in the public "about" page

* refIS - try to stay awawy from unecessary descriptors like "classic," "American," etc. The simpler the better here. If you want to put the full name or reference, do it at the end in parenthesis (see Herman Melville).

* when to use "Person" ex. Mark Twain is a lit reference, not a Person. Why?

* link to examples after putting in scrollTo links

* Locations: The Gilmore house = grandma and grandpa's house. 

* quote - the bold text will appear automtically. Teh application checks what you putin RefName (person, place, thing) and if it matches the reference in teh quote, it makes it bold. 

## Dev Notes
When you first run the app, you may get a warning about 'Synchronous XMLHttpRequest...' Don't worry. It's part of how Firebase
works and is addressed in this [StackOverflow post](http://stackoverflow.com/questions/32467144/firebase-synchronous-xmlhttprequest-deprecated).

Remeber when you ejected the create-react-app becauase you wanted SCSS? Maybe just try using post-css loader, as shown in the "Webpack" usage section of Autoprefixer npm page: shttps://www.npmjs.com/package/autoprefixer (loader: "style-loader!css-loader!postcss-loader")

## At launch time
allow use of nav dropdown