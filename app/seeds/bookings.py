from app.models import db, Booking
import datetime


def seed_bookings():
    booking1 = Booking(listing_id=1, user_id=1, number_of_guests=1, start_date=datetime.datetime(2021, 8, 2).isoformat(), end_date=datetime.datetime(2021, 8, 6).isoformat())

    booking2 = Booking(listing_id=2, user_id=1, number_of_guests=2, start_date=datetime.datetime(2021, 8, 7).isoformat(), end_date=datetime.datetime(2021, 8, 12).isoformat())

    booking3 = Booking(listing_id=3, user_id=4, number_of_guests=3, start_date='2021-08-12', end_date='2021-08-18')

    booking4 = Booking(listing_id=1, user_id=5, number_of_guests=4, start_date='2021-08-20', end_date='2021-08-21')


    db.session.add(booking1)
    db.session.add(booking2)
    db.session.add(booking3)
    db.session.add(booking4)

    db.session.commit()


def undo_bookings():
    db.session.execute('TRUNCATE bookings RESTART IDENTITY CASCADE;')
    db.session.commit()
