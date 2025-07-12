from transformers import pipeline

print("📦 Downloading model...")
pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")
print("✅ Model downloaded and cached locally.")
