# ai_agents/gemini_agent.py

import google.generativeai as genai

def get_news_summary(stock_name: str, ticker_symbol: str) -> str:
    API_KEY = "AIzaSyAG4zSrJ-tt06NVMO3LxyjhPGqzYUXs7-k"
    genai.configure(api_key=API_KEY)
    model = genai.GenerativeModel('gemini-1.5-pro-latest')

    prompt = (
        f"Find all financial and stock-related news about {stock_name} ({ticker_symbol}) from the past 30 days. "
        "Summarize major developments, financial reports, partnerships, management changes, regulations, or trends."
    )

    response = model.generate_content(prompt)
    with open("generated_text.txt", "w", encoding="utf-8") as f:
        f.write(response.text)

    return response.text
