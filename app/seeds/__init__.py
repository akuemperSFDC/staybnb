from flask.cli import AppGroup
from .users import seed_users, undo_users
from .listings import seed_listings, undo_listings
from .listing_images import seed_listing_images, undo_listing_images
from .bookings import seed_bookings, undo_bookings

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_listings()
    seed_listing_images()
    seed_bookings()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_listings()
    undo_listing_images()
    undo_bookings()
    # Add other undo functions here
