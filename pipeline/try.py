import yfinance as yf
import pandas as pd
import requests
from datetime import datetime, timedelta

# filename: stock_news_gemini.py

import google.generativeai as genai

# Replace with your actual Gemini API key
API_KEY = "AIzaSyAG4zSrJ-tt06NVMO3LxyjhPGqzYUXs7-k"

# Initialize Gemini API
genai.configure(api_key=API_KEY)

# Initialize the model (using Gemini Pro)
model = genai.GenerativeModel('gemini-1.5-pro-latest')
ticker_symbol="TSLA"  # Example ticker symbol
stock_name="Tesla"  # Example stock name
def get_stock_news(stock_name, ticker_symbol):
    # Construct the prompt
    prompt = (
        f"Find the financial and all stock related news about {stock_name} ({ticker_symbol}) from the past 30 days. "
        "Summarize the key developments, including any major financial reports, partnerships, "
        "management changes, regulatory updates, or market trends affecting the stock. "
        "Provide sources and publication dates if available."
        "every single article, new, social status, leadership that can effect ther stock price"
    )
    
    # Generate the response from Gemini
    response = model.generate_content(prompt)

    # Return the response text
    return response.text

if __name__ == "__main__":
    # Example: Tesla stock
    stock_name = "Tesla"
    ticker_symbol = "TSLA"

    news_summary = get_stock_news(stock_name, ticker_symbol)
    print("\n📈 Latest News Summary:")
    print(news_summary)
