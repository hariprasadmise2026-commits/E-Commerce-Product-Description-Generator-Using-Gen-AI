from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI

app = Flask(__name__)
CORS(app)

import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@app.route("/")
def home():
    return "AI Backend Running Successfully"

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
        result = result = f"""
✨ Product: {product}

🔥 Key Features:
- {features}

💡 Description:
Introducing the {product}! Crafted with {features}, this product offers exceptional quality and performance. Designed for modern users, it ensures comfort, durability, and style"""

    return jsonify({"description": result})

if __name__ == "__main__":
    app.run(debug=True)