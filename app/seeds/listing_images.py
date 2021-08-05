from app.models import db, Listing_Image


def seed_listing_images():
    image1 = Listing_Image(listing_id=1, img_url='https://a0.muscache.com/im/pictures/610b4782-0eef-4d53-8fd0-0c9137f804cc.jpg?im_w=960')

    image2 = Listing_Image(listing_id=1, img_url='https://a0.muscache.com/im/pictures/54d10b87-13c9-4d90-a390-80c1c94a5e79.jpg?im_w=1200')

    image3 = Listing_Image(listing_id=1, img_url='https://a0.muscache.com/im/pictures/4fe342f8-3d82-4b89-b0b1-2502050d2cf9.jpg?im_w=1200')

    image4 = Listing_Image(listing_id=1, img_url='https://a0.muscache.com/im/pictures/d32d1913-92f9-4334-978e-93012e3d90cf.jpg?im_w=1200')

    image5 = Listing_Image(listing_id=2, img_url='https://a0.muscache.com/im/pictures/b7a93a2b-89f5-4775-9050-9303300a4000.jpg?im_w=960')

    image6 = Listing_Image(listing_id=2, img_url='https://a0.muscache.com/im/pictures/2a535618-74c7-472c-84fd-1da0fb327223.jpg?im_w=1200')

    image7 = Listing_Image(listing_id=2, img_url='https://a0.muscache.com/im/pictures/c7d94b45-046e-4e73-bfbe-92c5c522a760.jpg?im_w=1200')

    image8 = Listing_Image(listing_id=2, img_url='https://a0.muscache.com/im/pictures/0caee228-8146-4005-8717-d001e84e1a85.jpg?im_w=1200')

    image9 = Listing_Image(listing_id=3, img_url='https://a0.muscache.com/im/pictures/f83b4273-db04-473c-9eca-7c2fdb8d47bd.jpg?im_w=1200')

    image10 = Listing_Image(listing_id=3, img_url='https://a0.muscache.com/im/pictures/39a4b205-8c75-433d-b9cc-e78a45a1bfdc.jpg?im_w=1200')

    image11 = Listing_Image(listing_id=3, img_url='https://a0.muscache.com/im/pictures/43ba7b9f-0130-4e92-9061-bff1f7a799df.jpg?im_w=1200')

    image12 = Listing_Image(listing_id=3, img_url='https://a0.muscache.com/im/pictures/a14534bb-a6b7-49ad-bab8-3eb8c670cbcc.jpg?im_w=1200')

    image13 = Listing_Image(listing_id=4, img_url='https://a0.muscache.com/im/pictures/7566809c-d02b-414f-84df-349545d03077.jpg?im_w=1200')

    image14 = Listing_Image(listing_id=4, img_url='https://a0.muscache.com/im/pictures/9ad7f3ba-1aa8-4a75-a10c-1d689f7fe80c.jpg?im_w=720')

    image15 = Listing_Image(listing_id=4, img_url='https://a0.muscache.com/im/pictures/7665532b-3ef2-4dba-9805-a374f76c4bed.jpg?im_w=720')

    image16 = Listing_Image(listing_id=4, img_url='https://a0.muscache.com/im/pictures/e34bf2f5-f811-407f-87dc-f0bc3831033c.jpg?im_w=720')

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    db.session.add(image5)
    db.session.add(image6)
    db.session.add(image7)
    db.session.add(image8)
    db.session.add(image9)
    db.session.add(image10)
    db.session.add(image11)
    db.session.add(image12)
    db.session.add(image13)
    db.session.add(image14)
    db.session.add(image15)
    db.session.add(image16)

    db.session.commit()



def undo_listing_images():
    db.session.execute('TRUNCATE listing_images RESTART IDENTITY CASCADE;')
    db.session.commit()
