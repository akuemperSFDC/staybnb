from flask_wtf import FlaskForm
from wtforms.fields import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired

class ListingForm(FlaskForm):
    id = IntegerField('id')
    user_id = IntegerField('user_id', validators=[DataRequired()])
    type = StringField('type', validators=[DataRequired()])
    space = StringField('space', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    country = StringField('country', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    address = StringField('address', validators=[DataRequired()])
    latitude = FloatField('latitude')
    longitude = FloatField('longitude')
    price_per_night = IntegerField('price_per_night', validators=[DataRequired()])
    cleaning_fee = IntegerField('cleaning_fee', validators=[DataRequired()])
    check_in_time = StringField('check_in_time', validators=[DataRequired()])
    check_in_type = StringField('check_in_type', validators=[DataRequired()])
    wifi = IntegerField('wifi', validators=[DataRequired()])
    air_conditioning = IntegerField('air_conditioning', validators=[DataRequired()])
    heat = IntegerField('heat', validators=[DataRequired()])
    parking = StringField('parking', validators=[DataRequired()])
    bedrooms = IntegerField('bedrooms', validators=[DataRequired()])
    beds = IntegerField('beds', validators=[DataRequired()])
    bathrooms = FloatField('bathrooms', validators=[DataRequired()])
    sleeps = IntegerField('sleeps', validators=[DataRequired()])
