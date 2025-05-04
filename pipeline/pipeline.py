import yfinance as yf
import pandas as pd
import requests
from datetime import datetime, timedelta
from bs4 import BeautifulSoup
from typing import List, Dict
import google.generativeai as genai
import sqlite3
from sklearn.preprocessing import MinMaxScaler, StandardScaler
import numpy as np

user_input = input("Enter the stock name (e.g., RELIANCE): ").strip().upper()
symbol = input("enter stock ticker (e.g., RELIANCE.NS): ").strip().upper()
def get_stock_data(user_input):
    ticker = f"{user_input}.NS"
    stock = yf.Ticker(ticker)

    # Get minute-level data for last 7 days
    df = stock.history(period="7d", interval="1m")

    # Process the DataFrame
    df = df[['Open', 'High', 'Low', 'Close', 'Volume']]
    print(df)
    print("\n\n")
    print(df.head())
    print("\n\n")
    print(df.tail())
    print("\n\n")
    print(df.columns)
    print("\n\n")
    print(df.index)

    df.to_csv(f"{user_input}.csv", index=True)

    return df
def get_news_using_gemini(stock_name, ticker_symbol):
# Replace with your actual Gemini API key
    API_KEY = "AIzaSyAG4zSrJ-tt06NVMO3LxyjhPGqzYUXs7-k"

    # Initialize Gemini API
    genai.configure(api_key=API_KEY)

    # Initialize the model (using Gemini Pro)
    model = genai.GenerativeModel('gemini-1.5-pro-latest')

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


    print("\n📈 Latest News Summary:")
    print(response.text)
    # Return the response text
    text = response.text
    # Save text to a file (example path)
    with open("generated_text.txt", "w", encoding="utf-8") as f:
        f.write(text)
    return response.text

if __name__ == "__main__":
    # Get stock data
    df = get_stock_data(user_input)

    # Get news using Gemini
    news_summary = get_news_using_gemini(user_input, symbol)

    # Print the news summary
    print("\n\n")
    print("News Summary:")
    print(news_summary)