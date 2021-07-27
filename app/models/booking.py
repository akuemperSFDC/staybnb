from .db import db


class Booking(db.Model):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key=True)
    listing_id = db.Column(db.Integer, db.ForeignKey('listings.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    number_of_guests = db.Column(db.Integer, nullable=False)
    check_in_date = db.Column(db.VARCHAR, nullable=False)
    check_out_date = db.Column(db.VARCHAR, nullable=False)

    user = db.relationship('User', back_populates='bookings')
    listing = db.relationship('Listing', back_populates='bookings')
