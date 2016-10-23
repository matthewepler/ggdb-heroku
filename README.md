# TO DO
* create mobile layout and media query based on width (device independent === resolution independent?)
* padding email
* add page "Contributor's Reference Guide" http://gg-db.com/guide.
* check that season/episode validation during form submission works

* testing
 - add new stuff (use hour format)

* plan for contributors madness!
* plant.

* ES Lint, clean (including README)


## NON-CRITICAL
* lighten lorelai
* all links (dots, selector 'go' button, etc.) should use the app to fetch data and reload components instead of reload. update browser history:
		- https://developer.mozilla.org/en-US/docs/Web/API/History_API
* add drag-and drop: https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications
* filter for seeing all mentions by a single character, in a single location



## GUIDE
( put the link right above the "+" Toolbar)
For years, 


* was/is - any works of art that are still generally available are considered part of the present and therefore should be refered to with "is" or "are." 

* refName should appear exactly as it did in the quote. If it is a nickname, or shortened to just a first name, then address this in is/was. Ex" Flo Jo (instead of Florence Griffith Joyner) or Melville (instead of Herman Melville)
or "Oprah" -> Oprah (Winfrey) is a popular talk show host."

* link to the guide in the public "about" page

* refIS - try to stay awawy from unecessary descriptors like "classic," "American," etc. The simpler the better here. If you want to put the full name or reference, do it at the end in parenthesis (see Herman Melville).

* when to use "Person" ex. Mark Twain is a lit reference, not a Person. Why?


## Dev Notes
When you first run the app, you may get a warning about 'Synchronous XMLHttpRequest...' Don't worry. It's part of how Firebase
works and is addressed in this [StackOverflow post](http://stackoverflow.com/questions/32467144/firebase-synchronous-xmlhttprequest-deprecated).

Remeber when you ejected the create-react-app becauase you wanted SCSS? Maybe just try using post-css loader, as shown in the "Webpack" usage section of Autoprefixer npm page: shttps://www.npmjs.com/package/autoprefixer (loader: "style-loader!css-loader!postcss-loader")

## At launch time
allow use of nav dropdown