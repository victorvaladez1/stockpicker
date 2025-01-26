from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import requests
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__, static_folder="static", template_folder="templates")
CORS(app)

# Finnhub API Key
FINNHUB_API_KEY = os.getenv("FINNHUB_API_KEY")

# Function to fetch real-time stock data
def fetch_stock_data(symbol):
    url = f"https://finnhub.io/api/v1/quote?symbol={symbol}&token={FINNHUB_API_KEY}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        if data and data.get("c") is not None:  # Ensure valid data exists
            return {
                "symbol": symbol,
                "price": data.get("c"),  # Current price
                "high": data.get("h"),   # High price of the day
                "low": data.get("l"),    # Low price of the day
                "change_percent": data.get("dp")  # Percent change
            }
    return None  # Return None if data is invalid or request fails

# Function to fetch analyst recommendation trends
def fetch_recommendation_trends(symbol):
    url = f"https://finnhub.io/api/v1/stock/recommendation?symbol={symbol}&token={FINNHUB_API_KEY}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        if data:
            latest_trend = data[0]  # Get the most recent recommendation trend
            return {
                "buy": latest_trend.get("buy"),
                "hold": latest_trend.get("hold"),
                "sell": latest_trend.get("sell"),
                "strong_buy": latest_trend.get("strongBuy"),
                "strong_sell": latest_trend.get("strongSell")
            }
    return None  # Return None if recommendation data is invalid

# API Endpoint: Recommendations
@app.route('/recommendations', methods=['POST'])
def get_recommendations():
    """
    Generates investment recommendations based on user input.
    """
    data = request.json
    goal = data.get('goal')
    risk = data.get('risk')
    amount = data.get('amount')

    try:
        # Example stock symbols based on risk level
        stock_symbols = []
        if risk == 'high':
            stock_symbols = ['AAPL', 'TSLA', 'NVDA']  # High-risk stocks
        elif risk == 'medium':
            stock_symbols = ['JNJ', 'PG', 'KO']  # Medium-risk stocks
        elif risk == 'low':
            stock_symbols = ['MMM', 'MCD', 'WMT']  # Low-risk stocks

        # Fetch stock data and recommendation trends for the selected symbols
        stock_details = []
        for symbol in stock_symbols:
            stock_data = fetch_stock_data(symbol)
            recommendation_trends = fetch_recommendation_trends(symbol)
            if stock_data:
                stock_data["recommendation_trends"] = recommendation_trends
                stock_details.append(stock_data)
            else:
                stock_details.append({
                    "symbol": symbol,
                    "price": "Data not available",
                    "recommendation_trends": "Data not available"
                })
            
        # Mock bond recommendations based on risk level
        bond_details = []
        if risk == 'high':
            bond_details = [{"symbol": "HYG", "price": 85.23, "change_percent": -0.10}]
        elif risk == 'medium':
            bond_details = [{"symbol": "LQD", "price": 120.50, "change_percent": 0.25}]
        elif risk == 'low':
            bond_details = [{"symbol": "BND", "price": 84.23, "change_percent": -0.05}]

        recommendation = {
            "stocks": stock_details,
            "bonds": bond_details,
            "note": f'Based on your goal of "{goal}" and risk tolerance of "{risk}", we suggest the following investments for ${amount}.',
        }

        return jsonify(recommendation), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to generate recommendations."}), 500

# Mock user portfolio data
USER_PORTFOLIO = [
    {"symbol": "AAPL", "shares": 10},
    {"symbol": "MSFT", "shares": 5},
    {"symbol": "TSLA", "shares": 8}
]

# API Endpoint: Portfolio
@app.route('/portfolio', methods=['GET'])
def get_portfolio():
    """
    Fetches real-time stock data for the user's portfolio holdings.
    """
    try:
        portfolio_details = []
        for holding in USER_PORTFOLIO:
            # Fetch real-time stock data for each holding
            stock_data = fetch_stock_data(holding['symbol'])
            if stock_data:
                portfolio_details.append({
                    "symbol": holding['symbol'],
                    "shares": holding['shares'],
                    "price": stock_data.get("price"),
                    "change_percent": stock_data.get("change_percent")
                })
            else:
                portfolio_details.append({
                    "symbol": holding['symbol'],
                    "shares": holding['shares'],
                    "price": "Data not available",
                    "change_percent": "Data not available"
                })

        return jsonify({"portfolio": portfolio_details}), 200
    except Exception as e:
        print(f"Error fetching portfolio: {e}")
        return jsonify({"error": "Failed to fetch portfolio data"}), 500

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
@app.route('/portfolio-page')
def portfolio_page():
    return render_template('portfolio.html')

# Serve the About Us Page
@app.route('/about')
def about_page():
    return render_template('about.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)
