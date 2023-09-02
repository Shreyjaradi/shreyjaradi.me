from flask import Flask
from models import db
from routes import static_routes, blog_routes, AdminRoutes
from auth import login_manager


app = Flask(__name__, template_folder='templates')
app.secret_key = 'secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'
db.init_app(app)

login_manager.init_app(app)

# Instantiate and initialize the AdminRoutes class
admin_routes = AdminRoutes()
admin_routes.init_app(app)

# Initialize the routes
static_routes.init_app(app)
blog_routes.init_app(app, db)

if __name__ == '__main__':
    app.run(debug=True)






