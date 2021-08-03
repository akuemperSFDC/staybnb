from flask import Blueprint, jsonify
from flask import request
from sqlalchemy import func
from app.forms import BookingForm
from app.models import Booking, db
from datetime import datetime
# from flask_login import current_user, login_user, logout_user, login_required

booking_routes = Blueprint('booking', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@booking_routes.route('/')
def listings():
    listings = Listing.query.all()

    return {'listings': [listing.to_dict() for listing in listings]}


# Create a new listing
@booking_routes.route('/', methods=['POST'])
# @login_required
def post_booking():

    form = BookingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_booking = Booking(
            listing_id = form.data['listing_id'],
            user_id = form.data['user_id'],
            number_of_guests = form.data['number_of_guests'],
            start_date = form.data['start_date'],
            end_date = form.data['end_date'],
        )

        db.session.add(new_booking)
        db.session.commit()
        return new_booking.to_dict()

    return {'errors': form.errors}

# Update an exisiting listing
@booking_routes.route('/<int:listing_id>', methods=['PUT'])
# @login_required
def edit_booking(listing_id):

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

# Get all bookings based on user id
@booking_routes.route('/users/<int:user_id>')
def bookings_from_user_id(user_id):

    # listings = db.session.query(Listing).join(Listing_Image).filter(Listing.user_id == (user_id)).all()
    listings = Listing.query.filter(Listing.user_id == user_id).all()

    my_listings = []
    for listing in listings:
        listing_dict = listing.to_dict()
        listing_images = [list.to_dict() for list in listing.listing_images]
        listing_dict['listing_images'] = listing_images
        my_listings.append(listing_dict)

    return {'listings': my_listings}


#Delete booking
@booking_routes.route('/<int:booking_id>', methods=['DELETE'])
# @login_required
def delete_booking(booking_id):
    listing = Listing.query.get(listing_id)

    db.session.delete(listing)
    db.session.commit()

    return {"listing": listing.to_dict()}
