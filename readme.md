# Library Application
Using the framework of your choice, please build a **Single Page Application** according to the design. You should have received an invitation to view our Invision board. Use the Inspect mode to get specific details on dimensions, font families and sizes, spacing, etc. and make the application as true to the design as possible. It has been made interactive on Invision so you can click through to view how it is supposed to behave.

Please do not make any modifications to the screens. If you have any questions about Invision, please reach out to Heather.

Spend no more than **four hours** on the application. To submit, either zip up and send back to Heather, or send a link to a publicly accessible repository. Do not submit a compiled application, ensure we can replicate your dev environment.

##API

The application was designed to make use of the [OpenLibrary API](https://openlibrary.org/developers/api)

The API is open and requires no authorization to use.

Build assuming all API calls will return a 200 response. No error handling is necessary.

## Pick your poison
**React:** [https://reactjs.org/](https://reactjs.org/) (version 16 or later)

or

**VueJS:** [https://vuejs.org/](https://vuejs.org/) (version 2.0 or later)

Our office has gravitated toward React and VueJS as the frameworks of choice for SPAs.

Feel free to use any preferred scaffolding tools as a starting point for this application.

## Requirements

A user should be able to:

 - Search for a book by title
 - See the results page if the user hits enter with a query typed
 - See information regarding a single book when that result is clicked on in the "Search Results" view or the "My Reading List" view
 - See a book's cover on the "Book Single" view if it is available via the API. Otherwise, display the 'No Preview Available' text according to the design
 - Add and remove books from their reading list from the "Search Results", "Book Single" and "My Reading List" views

There are four views total:

 - Search
 - Search Results
 - Book Single
 - My Reading List

User "Reading List" data can be reset after a hard reload. Does not need to persist through localstorage, databases, etc.

## Additional Information
The Invision board includes click interactions and hover states.

To give you a small head start, here is the link for the fonts used in the designs:
	
	<link href="https://fonts.googleapis.com/css?family=Crimson+Text:400,400i,700" rel="stylesheet">