from flask import Flask, send_from_directory

app = Flask(__name__)

# Route to serve static files (css, js, images, etc.) from the 'public' directory
@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('public', filename)

# Route to serve the index.html page from the 'public' directory
@app.route('/')
def serve_index():
    return send_from_directory('public', 'index.html')

# Run the app
if __name__ == '__main__':
    app.run(debug=True)

