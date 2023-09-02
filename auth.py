from functools import wraps
from flask import flash, redirect, url_for, session
from flask_login import LoginManager
from models import db, User

login_manager = LoginManager()

@login_manager.user_loader
def load_user(user_id):
    # This function is used by Flask-Login to load a user from the user_id.
    # You should implement this based on your user model.
    return User.query.get(int(user_id))

def login_required(role=None):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            if not session.get('user_id'):
                flash('You must be logged in to access this page.', 'warning')
                return redirect(url_for('login'))
            user = User.query.get(session['user_id'])
            
            if role and user.role != role:
                flash('You do not have permission to access this page.', 'danger')
                return redirect(url_for('login'))
            
            return fn(*args, **kwargs)
        return wrapper
    return decorator

