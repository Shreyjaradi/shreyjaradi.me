from flask import send_from_directory, render_template, request, redirect, session
from models import BlogPost, db, User
from auth import login_required



class StaticRoutes:
    def init_app(self, app):
        @app.route('/<path:filename>')
        def serve_static(filename):
            return send_from_directory('public', filename)

        @app.route('/')
        def serve_index():
            return render_template('index.html')
        


class BlogRoutes:
    def init_app(self, app, db):
        @app.route('/blog')
        def blog():
            posts = BlogPost.query.all()
            return render_template('blog.html', posts=posts)

        @app.route('/create', methods=['GET', 'POST'], endpoint='create_post')
        def create_post():
            if request.method == 'POST':
                title = request.form['title']
                content = request.form['content']
                new_post = BlogPost(title=title, content=content)
                db.session.add(new_post)
                db.session.commit()
                return redirect('/blog')
            return render_template('create_post.html')
    



class AdminRoutes:
    def init_app(self, app):
        @app.route('/admin/dashboard')
        @login_required(role='admin')
        def admin_dashboard():
            # Ensure that only authenticated users with 'admin' role can access this route

            # Retrieve the currently logged-in user
            user_id = session.get('user_id')
            current_user = User.query.get(user_id)

            # Fetch a list of all users with 'admin' role (assuming there's a 'role' field in your User model)
            admin_users = User.query.filter_by(role='admin').all()

            # Additional logic for the admin dashboard can be implemented here

            return render_template('admin_dashboard.html', current_user=current_user, admin_users=admin_users)







static_routes = StaticRoutes()
blog_routes = BlogRoutes()


