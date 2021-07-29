from flask import Blueprint, jsonify
from flask import request
from sqlalchemy import func
from app.forms import ListingForm
from app.models import Listing, db

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
    # listing_images = Listing_Image.query.all()
    # listings = listings.to_dict()

    # for listing in listings.listing_images:
    #     print(listing.to_dict())

    # print('-------------------------', listings.listing_images.to_dict())

    # listing_with_images = []
    # for listing in listings:
    #     l = listing.to_dict()
    #     for image in listing.listing_images:
    #         # print('--------------------', image.to_dict())
    #         l.update(image.to_dict())
    #         listing_with_images.append(l)

    # print('-------------------------', listing_with_images)

    # print('----------------------------------', listing_with_images)


    return {'listings': [listing.to_dict() for listing in listings]}



# Create a new listing
@listing_routes.route('/', methods=['POST'])
# @login_required
def post_listing():
    print('--------------------------------', request.json)
    form = ListingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_listing = Listing(
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
        db.session.commit()
        return new_listing.to_dict()

    return {'errors': form.errors}



# Get all listings based on user id
@listing_routes.route('/users/<int:user_id>')
def listings_from_user_id(user_id):
    listings = Listing.query.filter(Listing.user_id == (user_id)).all()

    return {'listings': [listing.to_dict() for listing in listings]}


# Get listing for specified listing id
@listing_routes.route('/<int:listing_id>')
def listings_from_listing_id(listing_id):
    listing = Listing.query.get(listing_id)
    print('--------------------------------', listing)
    listing = listing.to_dict()

    return {'listing': listing}



# Returns listings for specified city and state
@listing_routes.route('/<city>+<state>')
def listings_from_city(city, state):
    city = city.lower()
    state = state.lower()
    city_listings = Listing.query.filter(func.lower(Listing.city) == city).all()
    state_listings = Listing.query.filter(func.lower(Listing.state) == state).all()

    city_listings = set(city_listings)
    # Only include listings that are both in the city and state
    same_listings = city_listings.intersection(state_listings)
    same_listings = list(same_listings)


    return {'listing': [listing.to_dict() for listing in same_listings]}

# Update an exisiting listing
@listing_routes.route('/<int:listing_id>', methods=['PUT'])
# @login_required
def edit_listing(listing_id):

    form = ListingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        exisiting_listing = Listing.query.get(listing_id)
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

@listing_routes.route('/<int:listing_id>', methods=['DELETE'])
# @login_required
def delete_listing(listing_id):
    listing = Listing.query.get(listing_id)

    db.session.delete(listing)
    db.session.commit()

    return {"success": 'deleted listing'}
