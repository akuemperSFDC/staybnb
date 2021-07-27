from .db import db


class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    listing_id = db.Column(db.Integer, db.ForeignKey('listings.id'))
    review_content = db.Column(db.VARCHAR, nullable=False)
    rating = db.Column(db.Integer, nullable=False)

    user = db.relationship('User', back_populates='reviews')
    listing = db.relationship('Listing', back_populates='reviews')
