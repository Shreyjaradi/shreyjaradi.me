from flask import Flask
from models import db
from routes import static_routes, blog_routes
from routes import BlogPost

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'
db.init_app(app)

# Initialize the routes
static_routes.init_app(app)
blog_routes.init_app(app, db)

if __name__ == '__main__':
    app.run(debug=True)






