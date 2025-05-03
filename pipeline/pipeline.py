import yfinance as yf
import pandas as pd
import requests
from datetime import datetime, timedelta
from bs4 import BeautifulSoup
from typing import List, Dict
import google.generativeai as genai

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

#NEWS DATA

class NSENewsFetcher:
    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
    
    def get_yahoo_news(self, symbol: str=symbol, days: int = 30) -> List[Dict]:
        news_items = []
        cutoff_date = datetime.now() - timedelta(days=days)
        url = f"https://finance.yahoo.com/quote/{symbol}/news"
        
        try:
            response = requests.get(url, headers=self.headers)
            soup = BeautifulSoup(response.text, 'html.parser')
            news_blocks = soup.find_all('div', {'class': 'Ov(h)'})
            
            for block in news_blocks:
                try:
                    title_tag = block.find('h3')
                    if not title_tag:
                        continue
                    title = title_tag.text.strip()
                    
                    link_tag = block.find('a')
                    if not link_tag:
                        continue
                    news_url = 'https://finance.yahoo.com' + link_tag.get('href', '')
                    
                    date_tag = block.find('div', {'class': 'C(#959595)'})
                    if not date_tag:
                        continue
                    date_text = date_tag.text.strip().split('·')[-1].strip()
                    
                    news_date = datetime.now()
                    if 'hour' in date_text or 'minute' in date_text:
                        pass
                    elif 'yesterday' in date_text.lower():
                        news_date = datetime.now() - timedelta(days=1)
                    elif 'day' in date_text:
                        try:
                            days_ago = int(date_text.split()[0])
                            news_date = datetime.now() - timedelta(days=days_ago)
                        except:
                            continue
                    
                    if news_date < cutoff_date:
                        continue
                    
                    source_tag = date_tag.find('span')
                    source = source_tag.text if source_tag else "Yahoo Finance"
                    
                    news_items.append({
                        'title': title,
                        'url': news_url,
                        'date': news_date,
                        'source': source
                    })
                except:
                    continue
                    
            return news_items
        except:
            return []
    
    def get_moneycontrol_news(self, company_name: str=user_input, days: int = 30) -> List[Dict]:
        news_items = []
        cutoff_date = datetime.now() - timedelta(days=days)
        search_url = f"https://www.moneycontrol.com/news/business/stocks/searchresult.php?q={company_name}"
        
        try:
            response = requests.get(search_url, headers=self.headers)
            soup = BeautifulSoup(response.text, 'html.parser')
            news_blocks = soup.find_all('li', class_='clearfix')
            
            for block in news_blocks:
                try:
                    date_tag = block.find('span', class_='date')
                    if not date_tag:
                        continue
                    
                    date_text = date_tag.text.strip()
                    try:
                        for fmt in ['%b %d, %Y', '%B %d, %Y', '%d %b, %Y', '%d %B, %Y']:
                            try:
                                news_date = datetime.strptime(date_text, fmt)
                                break
                            except ValueError:
                                continue
                        else:
                            continue
                    except:
                        continue
                    
                    if news_date < cutoff_date:
                        continue
                    
                    title_tag = block.find('h2')
                    if not title_tag or not title_tag.find('a'):
                        continue
                    
                    title = title_tag.find('a').text.strip()
                    url = title_tag.find('a').get('href', '')
                    
                    news_items.append({
                        'title': title,
                        'url': url,
                        'date': news_date,
                        'source': 'MoneyControl'
                    })
                except:
                    continue
                    
            return news_items
        except:
            return []
    
    def get_news(self, symbol: str=symbol, company_name: str=user_input, days: int = 30) -> pd.DataFrame:
        all_news = []
        all_news.extend(self.get_yahoo_news(symbol, days))
        all_news.extend(self.get_moneycontrol_news(company_name, days))
        
        if not all_news:
            return pd.DataFrame()
        
        df = pd.DataFrame(all_news)
        df = df.sort_values('date', ascending=False)
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


# Usage
if __name__ == "__main__":
    fetcher = NSENewsFetcher()
    symbol = "RELIANCE.NS"
    company = "Reliance Industries"
    
    news_df = fetcher.get_news(symbol, company, days=30)
    
    if not news_df.empty:
        print(f"Found {len(news_df)} news items")
        print(news_df[['title', 'date', 'source']].head())
        news_df.to_csv(f"{company.replace(' ', '_')}_news.csv", index=False)
    else:
        get_news_using_gemini(company, symbol)

