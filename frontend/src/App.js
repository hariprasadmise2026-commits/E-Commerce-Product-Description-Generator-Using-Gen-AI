import React, { useState } from "react";

function App() {
  const [product, setProduct] = useState("");
  const [features, setFeatures] = useState("");
  const [description, setDescription] = useState("");

  const generateDescription = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product, features }),
      });

      const data = await response.json();
      setDescription(data.description);
    } catch (error) {
      console.error("Error:", error);
      setDescription("Error generating description");
    }
  };

  return (
  <div style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px",
    fontFamily: "Arial",
    background: "#f5f7fa",
    minHeight: "100vh"
  }}>
    <h1 style={{ color: "#333" }}>🛒 AI Product Description Generator</h1>

    <div style={{
      background: "white",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      width: "350px"
    }}>
      <input
        type="text"
        placeholder="Enter Product Name"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
      />

      <input
        type="text"
        placeholder="Enter Features"
        value={features}
        onChange={(e) => setFeatures(e.target.value)}
        style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
      />

      <button
        onClick={generateDescription}
        style={{
          padding: "10px",
          width: "100%",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Generate 🚀
      </button>
    </div>

    {description && (
      <div style={{
        marginTop: "20px",
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        width: "400px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        whiteSpace: "pre-line"
      }}>
        <h3>📄 Generated Description</h3>
        <p>{description}</p>
      </div>
    )}
  </div>
)};

  export default App;