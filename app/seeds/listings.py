from app.models import db, Listing


def seed_listings():
    listing1 = Listing(user_id=2, type='House', space='Entire place', title='Newly Furnished Home', description='Our brand new furnished home, with a walkscore of 98!', country='US', city='Portland', state='OR', address='123 SW Easy Street', price_per_night=150, cleaning_fee=65, check_in_time='3:00 PM', check_in_type='Code',
    wifi=1, air_conditioning=1, heat=1, parking='Private Driveway', bedrooms=4, beds=4, bathrooms=2, sleeps=8)

    listing2 = Listing(user_id=3, type='House', space='Entire place', title='Beautiful Colonial Style Home', description='Old home, updated, and close to public transit', country='US', city='Eugene', state='OR', address='345 SW Hammond Drive', price_per_night=100, cleaning_fee=40, check_in_time='3:00 PM', check_in_type='Code', wifi=1, air_conditioning=1, heat=1, parking='Private Driveway', bedrooms=2, beds=3, bathrooms=1.5, sleeps=5)

    listing3 = Listing(user_id=3, type='Condo', space='Entire place', title='Highrise Condo in the Heart of Downtown', description='Top floor condo located in the heart of downtown seattle.  Walk just minutes to an assortment of eateries and bars', country='US', city='Seattle', state='WA', address='111 NW Princton street Unit 780', price_per_night=60, cleaning_fee=25, check_in_time='3:00 PM', check_in_type='Code', wifi=1, air_conditioning=1, heat=1, parking='Free Street Parking', bedrooms=1, beds=1, bathrooms=1, sleeps=2)

    listing4 = Listing(user_id=1, type='Apartment', space='Entire place', title='Clean & Luxurious Daylight Apartment Near Alberta', description='Welcome to our brand new NE PDX daylight apartment. Our awesome centrally-located neighborhood is between Irving Park and Alberta. Easy access to N. Portland, Airport, Downtown, and all the fun & food the city has to offer. Enjoy a comfy, clean eco-luxe stay in a cute apartment with all the amenities.', country='US', city='Portland', state='OR', address='15 East street Unit 780', price_per_night=60, cleaning_fee=25, check_in_time='3:00 PM', check_in_type='Code', wifi=1, air_conditioning=2, heat=2, parking='Free Street Parking', bedrooms=1, beds=1, bathrooms=1, sleeps=2)



    db.session.add(listing1)
    db.session.add(listing2)
    db.session.add(listing3)
    db.session.add(listing4)

    db.session.commit()


def undo_listings():
    db.session.execute('TRUNCATE listings RESTART IDENTITY CASCADE;')
    db.session.commit()
