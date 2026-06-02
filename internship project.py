from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI

app = Flask(__name__)
CORS(app)

# 👉 your API key
import os
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@app.route("/")
def home():
    return "AI Backend Running"

@app.route("/generate", methods=["POST"])
def generate():
    data = request.json
    product = data.get("product")
    features = data.get("features")

    prompt = f"Write a professional e-commerce product description for {product} with features: {features}."

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}]
        )
        result = response.choices[0].message.content

    except Exception as e:
        result = f"Introducing the {product}! Designed with {features}, this product delivers outstanding performance and style. Ideal for everyday use, it ensures reliability, comfort, and a premium experience for customers."

    return jsonify({"description": result})

if __name__ == "__main__":
    app.run(debug=True)