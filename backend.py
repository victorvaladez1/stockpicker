from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__, static_folder="static", template_folder="templates")
CORS(app)

# Load your API key
FINNHUB_API_KEY = os.getenv("FINNHUB_API_KEY")

# Serve the Home Page
@app.route('/')
def index():
    return render_template('index.html')

# Serve the Form Page
@app.route('/form')
def form():
    return render_template('form.html')

# Serve the Recommendations Page
@app.route('/recommendations')
def recommendations_page():
    return render_template('recommendations.html')

# Serve the Portfolio Page
@app.route('/portfolio')
def portfolio_page():
    return render_template('portfolio.html')

# Serve the About Us Page
@app.route('/about')
def about_page():
    return render_template('about.html')

# API Endpoint: Recommendations
@app.route('/recommendations', methods=['POST'])
def get_recommendations():
    data = request.json
    goal = data.get('goal')
    risk = data.get('risk')
    amount = data.get('amount')

    # Example: Fetch data based on the risk level
    stock_symbols = []
    if risk == 'high':
        stock_symbols = ['AAPL', 'TSLA', 'NVDA']
    elif risk == 'medium':
        stock_symbols = ['JNJ', 'PG', 'KO']
    elif risk == 'low':
        stock_symbols = ['MMM', 'MCD', 'WMT']

    stock_details = []
    for symbol in stock_symbols:
        url = f"https://finnhub.io/api/v1/quote?symbol={symbol}&token={FINNHUB_API_KEY}"
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            stock_details.append({
                "symbol": symbol,
                "price": data.get("c"),
                "change_percent": data.get("dp"),
            })

    # Example bonds data
    bond_details = [{"symbol": "BND", "price": 84.23, "change_percent": -0.05}]

    return jsonify({
        "stocks": stock_details,
        "bonds": bond_details,
        "note": f"Goal: {goal}, Risk: {risk}, Amount: {amount}",
    })

# API Endpoint: Portfolio
@app.route('/portfolio', methods=['GET'])
def get_portfolio():
    portfolio = [
        {"symbol": "AAPL", "shares": 10, "price": 150, "change_percent": 1.5},
        {"symbol": "TSLA", "shares": 5, "price": 900, "change_percent": 3.2},
    ]
    return jsonify({"portfolio": portfolio})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
