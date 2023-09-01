from flask import send_from_directory, render_template, request, redirect
from models import BlogPost, db



class StaticRoutes:
    def init_app(self, app):
        @app.route('/<path:filename>')
        def serve_static(filename):
            return send_from_directory('public', filename)

        @app.route('/')
        def serve_index():
            return send_from_directory('public', 'index.html')
        


class BlogRoutes:
    def init_app(self, app, db):
        @app.route('/blog')
        def blog():
            posts = BlogPost.query.all()
            return render_template('blog.html', posts=posts)

        @app.route('/create', methods=['GET', 'POST'])
        def create_post():
            if request.method == 'POST':
                title = request.form['title']
                content = request.form['content']
                new_post = BlogPost(title=title, content=content)
                db.session.add(new_post)
                db.session.commit()
                return redirect('/blog')
            return render_template('create_post.html')
    

static_routes = StaticRoutes()
blog_routes = BlogRoutes()


