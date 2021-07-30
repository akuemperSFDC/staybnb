from .db import db

class Listing(db.Model):
    __tablename__ = 'listings'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    type = db.Column(db.VARCHAR, nullable=False)
    space = db.Column(db.VARCHAR, nullable=False)
    title = db.Column(db.VARCHAR, nullable=False)
    description = db.Column(db.VARCHAR, nullable=False)
    country = db.Column(db.VARCHAR, nullable=False)
    city = db.Column(db.VARCHAR, nullable=False)
    state = db.Column(db.VARCHAR, nullable=False)
    address = db.Column(db.VARCHAR, nullable=False, unique=True)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    price_per_night = db.Column(db.Integer, nullable=False)
    cleaning_fee = db.Column(db.Integer, nullable=False)
    check_in_time = db.Column(db.VARCHAR, nullable=False)
    check_in_type = db.Column(db.VARCHAR, nullable=False)
    wifi = db.Column(db.Integer, nullable=False, default=False)
    air_conditioning = db.Column(db.Integer, nullable=False, default=False)
    heat = db.Column(db.Integer, nullable=False, default=False)
    parking = db.Column(db.VARCHAR, nullable=False)
    bedrooms = db.Column(db.Integer, nullable=False)
    beds = db.Column(db.Integer, nullable=False)
    bathrooms = db.Column(db.Float, nullable=False)
    sleeps = db.Column(db.Integer, nullable=False)

    users = db.relationship("User", back_populates="listings")
    reviews = db.relationship('Review', back_populates='listing')
    listing_images = db.relationship('Listing_Image', backref='listings')
    bookings = db.relationship('Booking', back_populates='listing', uselist=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'type': self.type,
            'space': self.space,
            'title': self.title,
            'description': self.description,
            'country': self.country,
            'city': self.city,
            'state': self.state,
            'address': self.address,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'price_per_night': self.price_per_night,
            'cleaning_fee': self.cleaning_fee,
            'check_in_time': self.check_in_time,
            'check_in_type': self.check_in_type,
            'wifi': self.wifi,
            'air_conditioning': self.air_conditioning,
            'heat': self.heat,
            'parking': self.parking,
            'bedrooms': self.bedrooms,
            'beds': self.beds,
            'bathrooms': self.bathrooms,
            'sleeps': self.sleeps
        }
