from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import requests
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__, static_folder="static", template_folder="templates")
CORS(app)

# Finnhub API Key
FINNHUB_API_KEY = os.getenv('FINNHUB_API_KEY')

# Function to fetch real-time stock data
def fetch_stock_data(symbol):
    url = f"https://finnhub.io/api/v1/quote?symbol={symbol}&token={FINNHUB_API_KEY}"
    response = requests.get(url)
    print(f"Fetching data for {symbol}: {response.status_code} -> {response.json()}")
    if response.status_code == 200:
        data = response.json()
        if data and data.get("c") is not None:
            return {
                "symbol": symbol,
                "price": data.get("c"),
                "high": data.get("h"),
                "low": data.get("l"),
                "change_percent": data.get("dp")
            }
    return None

# Function to fetch analyst recommendation trends
def fetch_recommendation_trends(symbol):
    url = f"https://finnhub.io/api/v1/stock/recommendation?symbol={symbol}&token={FINNHUB_API_KEY}"
    response = requests.get(url)
    print(f"Fetching recommendations for {symbol}: {response.status_code} -> {response.json()}")
    if response.status_code == 200:
        data = response.json()
        if data:
            latest_trend = data[0]
            return {
                "buy": latest_trend.get("buy"),
                "hold": latest_trend.get("hold"),
                "sell": latest_trend.get("sell"),
                "strong_buy": latest_trend.get("strongBuy"),
                "strong_sell": latest_trend.get("strongSell")
            }
    return None

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/form")
def form():
    return render_template("form.html")

@app.route("/recommendations", methods=["POST", "GET"])
def recommendations():
    if request.method == "POST":
        data = request.json
        goal = data.get('goal')
        risk = data.get('risk')
        amount = data.get('amount')

        stock_symbols = []
        if risk == 'high':
            stock_symbols = ['AAPL', 'TSLA', 'NVDA']
        elif risk == 'medium':
            stock_symbols = ['JNJ', 'PG', 'KO']
        elif risk == 'low':
            stock_symbols = ['MMM', 'MCD', 'WMT']

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

        return jsonify(recommendation)
    return render_template("recommendations.html")

@app.route("/portfolio")
def portfolio():
    portfolio = [
        {"symbol": "AAPL", "shares": 10, "price": 150},
        {"symbol": "TSLA", "shares": 5, "price": 900}
    ]
    return render_template("portfolio.html", portfolio=portfolio)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
