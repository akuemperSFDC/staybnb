from flask import Blueprint, jsonify
from flask import request
from sqlalchemy import func
from app.forms import BookingForm, UpdateBookingForm
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


# Get all bookings
@booking_routes.route('/')
def bookings():
    bookings = Booking.all()

    return {'bookings': [booking.to_dict() for booking in bookings]}


# Create a new booking
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

# Update an exisiting booking
@booking_routes.route('/<int:booking_id>', methods=['PUT'])
# @login_required
def edit_booking(booking_id):

    form = UpdateBookingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.is_submitted():
        exisiting_booking = Booking.query.get(booking_id)
        form.populate_obj(exisiting_booking)
        exisiting_booking.listing_id = form.data['listing_id'],
        exisiting_booking.user_id = form.data['user_id'],
        exisiting_booking.number_of_guests = form.data['number_of_guests'],
        exisiting_booking.start_date = form.data['start_date'],
        exisiting_booking.end_date = form.data['end_date'],

        db.session.commit()
        return exisiting_booking.to_dict()

    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

# Get all bookings based on user id
@booking_routes.route('/users/<int:user_id>')
def bookings_from_user_id(user_id):

    bookings = Booking.query.filter(Booking.user_id == user_id).all()

    my_bookings = []
    for booking in bookings:
        booking_dict = booking.to_dict()
        booking_listing = booking.listing.to_dict()
        booking_listing_user = booking.listing.user.to_dict()
        booking_listing_images = [image.to_dict() for image in booking.listing.listing_images]
        booking_dict['Listing'] = booking_listing
        booking_dict['Listing_User'] = booking_listing_user
        booking_dict['Listing_Images'] = booking_listing_images
        my_bookings.append(booking_dict)

    return {'bookings': my_bookings}


#Delete booking
@booking_routes.route('/<int:booking_id>', methods=['DELETE'])
# @login_required
def delete_booking(booking_id):
    booking = Booking.query.get(booking_id)

    db.session.delete(booking)
    db.session.commit()
    print('------------------------------', booking.to_dict())

    return {"booking": booking.to_dict()}
