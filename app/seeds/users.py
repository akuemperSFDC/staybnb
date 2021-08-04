from app.models import db, User
from faker import Faker
fake = Faker()


# Adds a demo user, you can add other users here if you want
def seed_users():
    user1 = User(
        first_name=fake.unique.first_name_female(), last_name=fake.unique.last_name(), email='demo@aa.io', password='password', img_url='https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ')
    user2 = User(
        first_name=fake.unique.first_name_male(), last_name=fake.unique.last_name(), email=fake.email(), password='password', img_url="https://randomuser.me/api/portraits/men/47.jpg")
    user3 = User(
        first_name=fake.unique.first_name_female(), last_name=fake.unique.last_name(), email=fake.email(), password='password', img_url='https://randomuser.me/api/portraits/women/44.jpg')
    user4 = User(
        first_name=fake.unique.first_name_female(), last_name=fake.unique.last_name(), email=fake.email(), password='password', img_url='https://randomuser.me/api/portraits/women/47.jpg')
    user5 = User(
        first_name=fake.unique.first_name_female(), last_name=fake.unique.last_name(), email=fake.email(), password='password', img_url='https://randomuser.me/api/portraits/women/0.jpg')

    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)
    db.session.add(user4)
    db.session.add(user5)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
