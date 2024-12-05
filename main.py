from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for your entire Flask app

@app.route('/api', methods=['POST'])
def chatbot():
    data = request.get_json()
    user_message = data.get('message', '')

    # Print the incoming message to the console
    print("Received message:", user_message)

    # You can perform more sophisticated bot logic here
    # For now, just return "Hello" for every message
    import random
    bot_response = random.randint(30,49)

    return jsonify({'message': bot_response})

if __name__ == '__main__':
    app.run(host='192.168.42.240', port=3030, debug=True)
