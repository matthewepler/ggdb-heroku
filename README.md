# TO DO
* links: 
    - put the refID in the id attribute
    - in Server, make route that accepts the id of any ref
    - look it up, pass it to the App
        - will require moving some stuff into the server, me thinks.
    - go to that season, episode
    - scroll to that ref, open it

* dataViz charts default open
* dataviz

* testing

* check responsive layout for everything.
 - add auto-prefixing
* finish people seeding.
 - if no match, put smiley

* add page "Contributor's Reference Guide" http://gg-db.com/guide.
* add page "About"
* add countdown to launch

* API - return JSON with keywords? - quick tutorial or read-up suggested.

* plan for contributors madness!


## NON-CRITICAL
* lighten lorelai
* links for each entry: http://stackoverflow.com/questions/13266746/scroll-jump-to-id-without-jquery
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

## At launch time
allow use of nav dropdown