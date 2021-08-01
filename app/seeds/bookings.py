from app.models import db, Booking


def seed_bookings():
    booking1 = Booking(listing_id=1, user_id=2, number_of_guests=1, check_in_day=2, check_in_month=8, check_in_year=21, check_out_day=6, check_out_month=8, check_out_year=21)

    booking2 = Booking(listing_id=1, user_id=3, number_of_guests=2, check_in_day=7, check_in_month=8, check_in_year=21, check_out_day=12, check_out_month=8, check_out_year=21)

    booking3 = Booking(listing_id=1, user_id=4, number_of_guests=3, check_in_day=12, check_in_month=8, check_in_year=21, check_out_day=18, check_out_month=8, check_out_year=21)

    booking4 = Booking(listing_id=1, user_id=5, number_of_guests=4, check_in_day=20, check_in_month=8, check_in_year=21, check_out_day=21, check_out_month=8, check_out_year=21)


    db.session.add(booking1)
    db.session.add(booking2)
    db.session.add(booking3)
    db.session.add(booking4)

    db.session.commit()


def undo_bookings():
    db.session.execute('TRUNCATE bookings RESTART IDENTITY CASCADE;')
    db.session.commit()
