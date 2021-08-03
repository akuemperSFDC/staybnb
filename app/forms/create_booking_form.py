from flask_wtf import FlaskForm
from wtforms.fields import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired

class BookingForm(FlaskForm):
    listing_id = IntegerField('user_id', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])
    number_of_guests = IntegerField('user_id', validators=[DataRequired()])
    start_date = StringField('type', validators=[DataRequired()])
    end_date = StringField('type', validators=[DataRequired()])
