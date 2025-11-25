import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const getClass = (aqi) => {
    if (aqi <= 50) return "good";
    if (aqi <= 100) return "moderate";
    if (aqi <= 150) return "bad";
    if (aqi <= 200) return "very-bad";
    return "hazardous";
  };

  const fetchAQI = async () => {
    setError("");
    try {
      const response = await fetch(`http://localhost:8000/api/airquality?city=${city}`);
      const result = await response.json();
      if (!result.aqi || result.aqi === "N/A") {
        setError("❗ No data available for this location.");
        setData(null);
        return;
      }
      setData(result);
    } catch {
      setError("⚠ Server not responding.");
    }
  };

  return (
    <div className="container">
      <h1 className="title">🌍 Air Quality Checker</h1>

      <input
        placeholder="Enter city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchAQI}>Search</button>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      {data && (
        <div className="card">
          <div className="city-name">{data.city}</div>
          <div className={`aqi ${getClass(data.aqi)}`}>AQI: {data.aqi}</div>
          <p>⚠ Dominant Pollutant: {data.dominantPollutant}</p>
          <p>🕒 Updated: {data.updated}</p>
        </div>
      )}
    </div>
  );
}

export default App;
