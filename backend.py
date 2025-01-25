from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from dotenv import load_dotenv
import os 

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

# Alpha Vantage API Key
ALPHA_VANTAGE_API_KEY = os.getenv('ALPHA_VANTAGE_API_KEY')

@app.route('/recommendations', methods=['POST'])
def get_recommendations():
    data = request.json
    goal = data.get('goal')
    risk = data.get('risk')
    amount = data.get('amount')

    try:
        # Fetch a list of recommended stocks based on the risk level
        stock_symbols = []
        if risk == 'high':
            # Example: Growth stocks (tech-heavy)
            stock_symbols = ['AAPL', 'TSLA', 'NVDA', 'AMZN', 'MSFT']
        elif risk == 'medium':
            # Example: Blend of growth and stable stocks
            stock_symbols = ['JNJ', 'PG', 'DIS', 'KO', 'PEP']
        elif risk == 'low':
            # Example: Stable dividend-paying stocks
            stock_symbols = ['MMM', 'MCD', 'WMT', 'PFE', 'VZ']

        # Fetch real-time data for selected stocks from Alpha Vantage
        stock_details = []
        for symbol in stock_symbols:
            stock_response = requests.get(
                f'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={symbol}&apikey={ALPHA_VANTAGE_API_KEY}'
            )
            stock_data = stock_response.json().get('Global Quote', {})
            if stock_data:
                stock_details.append({
                    'symbol': stock_data.get('01. symbol'),
                    'price': stock_data.get('05. price'),
                    'change_percent': stock_data.get('10. change percent'),
                })

        # Fetch bond recommendations based on risk level
        bond_symbols = []
        if risk == 'high':
            # High-risk bonds could include emerging market or corporate bonds
            bond_symbols = ['HYG', 'EMB']  # High Yield Corporate Bond ETF, Emerging Markets Bond ETF
        elif risk == 'medium':
            # Medium-risk bonds could include investment-grade corporate bonds
            bond_symbols = ['LQD', 'VCIT']  # Investment Grade Corporate Bond ETF, Intermediate-Term Corporate Bond ETF
        elif risk == 'low':
            # Low-risk bonds could include government bonds or broad bond market ETFs
            bond_symbols = ['BND', 'SHY']  # Total Bond Market ETF, Short-Term Treasury ETF

        bond_details = []
        for symbol in bond_symbols:
            bond_response = requests.get(
                f'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={symbol}&apikey={ALPHA_VANTAGE_API_KEY}'
            )
            bond_data = bond_response.json().get('Global Quote', {})
            if bond_data:
                bond_details.append({
                    'symbol': bond_data.get('01. symbol'),
                    'price': bond_data.get('05. price'),
                    'change_percent': bond_data.get('10. change percent'),
                })

        recommendation = {
            'stocks': stock_details,
            'bonds': bond_details,
            'note': f'Based on your goal of "{goal}" and risk tolerance of "{risk}", we suggest the following investments for ${amount}.',
        }

        return jsonify(recommendation), 200
    except Exception as e:
        print('Error:', e)
        return jsonify({'error': 'Failed to generate recommendations.'}), 500

# Mock user portfolio data
USER_PORTFOLIO = [
    {"symbol": "AAPL", "shares": 10},
    {"symbol": "MSFT", "shares": 5},
    {"symbol": "TSLA", "shares": 8}
]

@app.route('/portfolio', methods=['GET'])
def get_portfolio():
    try:
        portfolio_details = []
        for holding in USER_PORTFOLIO:
            symbol = holding['symbol']
            shares = holding['shares']

            # Fetch real-time stock price for each holding
            stock_response = requests.get(
                f'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={symbol}&apikey={ALPHA_VANTAGE_API_KEY}'
            )
            stock_data = stock_response.json().get('Global Quote', {})

            # Append portfolio details
            portfolio_details.append({
                "symbol": symbol,
                "shares": shares,
                "price": stock_data.get("05. price"),
                "change_percent": stock_data.get("10. change percent")
            })

        return jsonify({"portfolio": portfolio_details}), 200
    except Exception as e:
        print(f"Error fetching portfolio: {e}")
        return jsonify({"error": "Failed to fetch portfolio data"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
