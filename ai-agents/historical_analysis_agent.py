# ai_agents/historical_analysis_agent.py

import yfinance as yf
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split

def historical_stock_analysis(ticker: str) -> dict:
    df = yf.download(ticker, start="2020-01-01", end="2023-12-31")
    
    if df.empty:
        return {"error": "No data found for this ticker."}

    # Feature Engineering (basic for example)
    df['Return'] = df['Close'].pct_change()
    df['MA5'] = df['Close'].rolling(window=5).mean()
    df['MA20'] = df['Close'].rolling(window=20).mean()
    df.dropna(inplace=True)

    # Label: 1 if next day's return is positive
    df['Target'] = (df['Return'].shift(-1) > 0).astype(int)

    features = ['Return', 'MA5', 'MA20']
    X = df[features]
    y = df['Target']

    X_train, X_test, y_train, y_test = train_test_split(X, y, shuffle=False, test_size=0.2)

    model = RandomForestClassifier(n_estimators=100)
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)

    # Return summarized insights
    return {
        "features_used": features,
        "accuracy": round(accuracy, 3),
        "latest_data_point": df.iloc[-1][features].to_dict()
    }
