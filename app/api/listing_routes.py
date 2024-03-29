from flask import Blueprint, jsonify
from flask import request
from sqlalchemy import func
from app.forms import ListingForm
from app.forms import UpdateListingForm
from app.models import Listing, db
from datetime import datetime
# from flask_login import current_user, login_user, logout_user, login_required

listing_routes = Blueprint('listings', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@listing_routes.route('/')
def listings():
    listings = Listing.query.all()

    my_listings = []
    for listing in listings:
        listing_dict = listing.to_dict()
        listing_images = [list.to_dict() for list in listing.listing_images]
        listing_dict['listing_images'] = listing_images
        listing_bookings = [list.to_dict() for list in listing.bookings]
        listing_dict['listing_bookings'] = listing_bookings
        my_listings.append(listing_dict)

    return {'listings': my_listings}


# Create a new listing
@listing_routes.route('/', methods=['POST'])
# @login_required
def post_listing():

    form = ListingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_listing = Listing(
            id = form.data['id'],
            user_id = form.data['user_id'],
            type = form.data['type'],
            space = form.data['space'],
            title = form.data['title'],
            description = form.data['description'],
            country = form.data['country'],
            city = form.data['city'],
            state = form.data['state'],
            address = form.data['address'],
            latitude = form.data['latitude'],
            longitude = form.data['longitude'],
            price_per_night = form.data['price_per_night'],
            cleaning_fee = form.data['cleaning_fee'],
            check_in_time = form.data['check_in_time'],
            check_in_type = form.data['check_in_type'],
            wifi = form.data['wifi'],
            air_conditioning = form.data['air_conditioning'],
            heat = form.data['heat'],
            parking = form.data['parking'],
            bedrooms = form.data['bedrooms'],
            beds = form.data['beds'],
            bathrooms = form.data['bathrooms'],
            sleeps = form.data['sleeps']
        )

        db.session.add(new_listing)
        db.session.flush()
        db.session.refresh(new_listing)
        db.session.commit()

        new_listing_id = {'id': new_listing.id}
        new_listing = new_listing.to_dict()
        new_listing.update(new_listing_id)
        return new_listing

    return {'errors': form.errors}

# Update an exisiting listing
@listing_routes.route('/<int:listing_id>', methods=['PUT'])
# @login_required
def edit_listing(listing_id):

    form = UpdateListingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.is_submitted():
        exisiting_listing = Listing.query.get(listing_id)
        form.populate_obj(exisiting_listing)
        exisiting_listing.user_id = form.data['user_id']
        exisiting_listing.type = form.data['type']
        exisiting_listing.space = form.data['space']
        exisiting_listing.title = form.data['title']
        exisiting_listing.description = form.data['description']
        exisiting_listing.country = form.data['country']
        exisiting_listing.city = form.data['city']
        exisiting_listing.state = form.data['state']
        exisiting_listing.address = form.data['address']
        exisiting_listing.latitude = form.data['latitude']
        exisiting_listing.longitude = form.data['longitude']
        exisiting_listing.price_per_night = form.data['price_per_night']
        exisiting_listing.cleaning_fee = form.data['cleaning_fee']
        exisiting_listing.check_in_time = form.data['check_in_time']
        exisiting_listing.check_in_type = form.data['check_in_type']
        exisiting_listing.wifi = form.data['wifi']
        exisiting_listing.air_conditioning = form.data['air_conditioning']
        exisiting_listing.heat = form.data['heat']
        exisiting_listing.parking = form.data['parking']
        exisiting_listing.bedrooms = form.data['bedrooms']
        exisiting_listing.beds = form.data['beds']
        exisiting_listing.bathrooms = form.data['bathrooms']
        exisiting_listing.sleeps = form.data['sleeps']

        db.session.commit()
        return exisiting_listing.to_dict()

    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

# Get all listings based on user id
@listing_routes.route('/users/<int:user_id>')
def listings_from_user_id(user_id):

    listings = Listing.query.filter(Listing.user_id == user_id).all()

    my_listings = []
    for listing in listings:
        listing_dict = listing.to_dict()
        listing_images = [list.to_dict() for list in listing.listing_images]
        listing_user = listing.user.to_dict()
        listing_dict['listing_images'] = listing_images
        listing_dict['Listing_User'] = listing_user
        my_listings.append(listing_dict)

    if (my_listings):
        return {'listings': my_listings}
    else:
        return {'listings': -1}


#Get listing by listingId
@listing_routes.route('/<int:listing_id>')
def listings_from_listing_id(listing_id):

    listing = Listing.query.get(listing_id)
    listing_dict = listing.to_dict()
    listing_images = [list.to_dict() for list in listing.listing_images]
    listing_dict['Listing_User'] = listing.user.to_dict()
    listing_dict['listing_images'] = listing_images


    return {'listing': listing_dict}


# Returns listings for specified city and state
@listing_routes.route('/<city>+<state>')
def listings_search_city_state(city, state):
    print('-----------------------------------', city)
    city = city.lower()
    state = state.lower()
    city_listings = Listing.query.filter(func.lower(Listing.city) == city).all()
    state_listings = Listing.query.filter(func.lower(Listing.state) == state).all()

    city_listings = set(city_listings)
    # Only include listings that are both in the city and state
    same_listings = city_listings.intersection(state_listings)
    same_listings = list(same_listings)

    my_listings = []
    for listing in same_listings:
        listing_dict = listing.to_dict()
        listing_images = [list.to_dict() for list in listing.listing_images]
        listing_dict['listing_images'] = listing_images
        listing_bookings = [list.to_dict() for list in listing.bookings]
        listing_dict['listing_bookings'] = listing_bookings
        my_listings.append(listing_dict)

    return {'listings': my_listings}


# Returns listings for specified city, state, and number of guests
@listing_routes.route('/<city>+<state>/<num_guests>')
def listings_search_city_state_num_guests(city, state, num_guests):
    city = city.lower()
    state = state.lower()
    guests = int(num_guests)
    city_listings = Listing.query.filter(func.lower(Listing.city) == city).all()
    state_listings = Listing.query.filter(func.lower(Listing.state) == state).all()
    guest_listings = Listing.query.filter(Listing.sleeps >= guests).all()

    city_listings = set(city_listings)
    # Only include listings that are both in the city and state
    same_listings = city_listings.intersection(state_listings)
    same_listings = city_listings.intersection(guest_listings)
    same_listings = list(same_listings)

    my_listings = []
    for listing in same_listings:
        listing_dict = listing.to_dict()
        listing_images = [list.to_dict() for list in listing.listing_images]
        listing_dict['listing_images'] = listing_images
        listing_bookings = [list.to_dict() for list in listing.bookings]
        listing_dict['listing_bookings'] = listing_bookings
        my_listings.append(listing_dict)

    if (my_listings):
        return {'listings': my_listings}
    else:
        return {'listings': -1}


# Returns listings for specified city, state, start date, end date, and number of guests
@listing_routes.route('/<city>+<state>/<start_date>+<end_date>/<num_guests>')
def listings_search_all_params(city, state, start_date, end_date, num_guests):
    start_dtm = datetime.strptime(start_date, '%y%m%d')
    end_dtm = datetime.strptime(end_date, '%y%m%d')

    city = city.lower()
    state = state.lower()
    guests = int(num_guests)
    city_listings = Listing.query.filter(func.lower(Listing.city) == city).all()
    state_listings = Listing.query.filter(func.lower(Listing.state) == state).all()
    guest_listings = Listing.query.filter(Listing.sleeps >= guests).all()


    city_listings = set(city_listings)
    # Only include listings that are both in the city and state
    same_listings = city_listings.intersection(state_listings)
    same_listings = city_listings.intersection(guest_listings)
    same_listings = list(same_listings)

    my_listings = []
    for listing in same_listings:
        listing_dict = listing.to_dict()
        listing_images = [list.to_dict() for list in listing.listing_images]
        listing_dict['listing_images'] = listing_images
        listing_bookings = [list.to_dict() for list in listing.bookings]
        listing_dict['listing_bookings'] = listing_bookings
        conflict_found = False
        for booking in listing_bookings:
            booking_start = datetime(booking['check_in_year'], booking['check_in_month'], booking['check_in_day'])
            booking_end = datetime(booking['check_out_year'], booking['check_out_month'], booking['check_out_day'])

            print('--------------------------------------', booking_start, booking_end)


            if (start_dtm < booking_start < end_dtm) or (start_dtm < booking_end < end_dtm):
                conflict_found = True
                break

        if not conflict_found:
            my_listings.append(listing_dict)








        #         my_listings.append(listing_dict)

        # if all([booking['check_in_month'] == in_month and booking['check_out_month'] == out_month for booking in listing_bookings]):
        #     if all([booking['check_in_day'] <= in_day and booking['check_in_day'] >= in_day for booking in listing_bookings]):
        #         print('True')

        # for booking in listing_bookings:
        #     if not booking['check_in_month'] == in_month and booking['check_out_month'] == out_month and in_day >= booking['check_out_day']:

    # for listing in my_listings:
    #     for booking in listing_bookings:
    #         if in_year > booking.check_in_year:


    if (my_listings):
        return {'listings': my_listings}
    else:
        return {'listings': -1}



#Delete listing
@listing_routes.route('/<int:listing_id>', methods=['DELETE'])
# @login_required
def delete_listing(listing_id):
    listing = Listing.query.get(listing_id)

    db.session.delete(listing)
    db.session.commit()

    return {"listing": listing.to_dict()}
