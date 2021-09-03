# Staybnb

[Live Site](https://staybnb2.herokuapp.com/)

![splash](/readme_images/splash.png)

---

## Summary

Staybnb is a single-page web application inspired by the peer-to-peer marketplace app, Airbnb. Built using React/Redux on the front end, and flask on the back end.

- Create an account
- Log in / Log out, upload a profile image using AWS S3
- Create a listing, add a single image to the listing using AWS S3.png
- Edit listing details
- Search listing by location (using Google Maps API Places AutoComplete), dates, and group size
- Browse and reserve listings
- Manage reservations by editing a or cancelling
- Generate random set of listings for a spontaneous adventure

---

## Technologies Used

### Front End

The app was built completely using [React.js](https://reactjs.org/) / [Redux](https://redux.js.org/) on the front end.

### Back End

The app was built using [Flask](https://flask.palletsprojects.com/en/2.0.x/) on the back end, with a [postgreSQL](https://www.postgresql.org/) database. Additionally, [SQL-Alchemy](https://www.sqlalchemy.org/) was used as the ORM, as well as [Flask-SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/en/2.x/) for additional support within Flask applications.

### Libraries

- [React.js](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [React Redux](https://react-redux.js.org/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Places AutoComplete](https://www.npmjs.com/package/react-places-autocomplete)
- [React DatePicker](https://www.npmjs.com/package/react-datepicker)
- [US State Converter](https://www.npmjs.com/package/us-state-converter)
- [Material UI](https://material-ui.com/)
- [Faker](https://faker.readthedocs.io/en/master/)
- [AWS S3](https://aws.amazon.com/s3/)

### 3rd Party API

- [Google Maps API](https://developers.google.com/maps)

## Primary Components

### Authentication / Authorization

User input validations are handled for both the sign up and log in forms in Flask using WTForms validations. Passwords are hashed when saved to the database using [Wrkzeug](https://werkzeug.palletsprojects.com/en/2.0.x/).

#### Sign Up

![signup](/readme_images/signup.png)

#### Log In

![login](/readme_images/login.png)

---

### Search / Home Page

#### Home Page

Where users will navigate in order to search for places to visit / stay. There is also a button to generate random listings, bypassing the search altogether.

![home](/readme_images/home.png)

#### Search Results

Search results display all listings that match user input criteria.

![searchresults](/readme_images/searchresults.png)

---

### Listings

#### Create Listing

A logged in user can navigate to this page (found under the user dropdown, located at the top right of all pages in the navigation bar). This page leads a user through a series of questions and prompts to fill out information regarding the property the wish to list.

![createlisting](/readme_images/createlisting.png)

#### Edit Listing

Allows a user to edit their listing.

![editlistings](/readme_images/editlistings.png)

#### View Logged In User Listings

Showcases all of the listings a user currently has listed for other users to book.

![managelistings](/readme_images/managelistings.png)

---

### Reservations

#### Create Reservation

When navigating to a listing's page (from the search results page), users can reserve a listing for a specified range of dates, and for a specified amount of guests. Both of these inputs are required.

![booklisting](/readme_images/booklisting.png)

#### Edit Reservation

Allows users to view all of their past and current reservations. Current reservations can be edited and cancelled by the user.

![reservations](/readme_images/reservations.png)

---

## Future Implementations

- Google Maps API map on search result page to show general location for properties
- Google Maps API map on listing page to show general location of property
- Property reviews - 5 Star and Comment review system
- Multiple image uploads when creating / editing listing
