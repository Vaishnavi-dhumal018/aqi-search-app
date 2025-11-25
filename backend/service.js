import axios from "axios";

const API_TOKEN = "demo"; // later replace with real token

export async function fetchAQI(city) {
  const url = `https://api.waqi.info/feed/${city}/?token=${API_TOKEN}`;

  const response = await axios.get(url);
  const data = response.data;

  if (data.status !== "ok") {
    return { city, aqi: null, error: "City not found" };
  }

  return {
    city: data.data.city.name,
    aqi: data.data.aqi,
    dominantPollutant: data.data.dominentpol,
    updated: data.data.time.s
  };
}
