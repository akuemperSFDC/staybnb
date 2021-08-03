from .db import db


class Booking(db.Model):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key=True)
    listing_id = db.Column(db.Integer, db.ForeignKey('listings.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    number_of_guests = db.Column(db.Integer, nullable=False)
    start_date = db.Column(db.VARCHAR, nullable=False)
    end_date = db.Column(db.VARCHAR, nullable=False)
    check_in_day = db.Column(db.Integer)
    check_in_month = db.Column(db.Integer)
    check_in_year = db.Column(db.Integer)
    check_out_day = db.Column(db.Integer)
    check_out_month = db.Column(db.Integer)
    check_out_year = db.Column(db.Integer)

    user = db.relationship('User', back_populates='bookings')

    def to_dict(self):
        return {
            'id': self.id,
            'listing_id': self.listing_id,
            'user_id': self.user_id,
            'number_of_guests': self.number_of_guests,
            'start_date': self.start_date,
            'end_date': self.end_date,
            'check_in_day': self.check_in_day,
            'check_in_month': self.check_in_month,
            'check_in_year': self.check_in_year,
            'check_out_day': self.check_out_day,
            'check_out_month': self.check_out_month,
            'check_out_year': self.check_out_year,
        }
