from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    user1 = User(
        first_name='Demo', last_name='User', email='demo@aa.io', password='password', img_url='https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ')
    user2 = User(
        first_name='Test', last_name='User', email='test@aa.io', password='password', img_url='https://randomuser.me/api/portraits/men/47.jpg')
    user3 = User(
        first_name='Dummy', last_name='User', email='dummy@aa.io', password='password', img_url='https://randomuser.me/api/portraits/women/44.jpg')
    user4 = User(
        first_name='New', last_name='User', email='new@aa.io', password='password', img_url='https://randomuser.me/api/portraits/women/47.jpg')
    user5 = User(
        first_name='Random', last_name='User', email='Random@aa.io', password='password', img_url='https://randomuser.me/api/portraits/women/0.jpg')

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
