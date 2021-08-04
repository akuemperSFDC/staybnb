from .db import db


class Booking(db.Model):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key=True)
    listing_id = db.Column(db.Integer, db.ForeignKey('listings.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    number_of_guests = db.Column(db.Integer, nullable=False)
    start_date = db.Column(db.VARCHAR, nullable=False)
    end_date = db.Column(db.VARCHAR, nullable=False)

    user = db.relationship('User', back_populates='bookings')

    def to_dict(self):
        return {
            'id': self.id,
            'listing_id': self.listing_id,
            'user_id': self.user_id,
            'number_of_guests': self.number_of_guests,
            'start_date': self.start_date,
            'end_date': self.end_date,
        }
