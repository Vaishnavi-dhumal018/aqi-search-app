import express from "express";
import cors from "cors";
import Cache from "./cache.js";
import { fetchAQI } from "./service.js";

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

const cache = new Cache();

app.get("/api/airquality", async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  const cached = cache.get(city);
  if (cached) {
    return res.json({ ...cached, cached: true });
  }

  const data = await fetchAQI(city);
  cache.set(city, data);

  res.json(data);
});

app.listen(PORT, () => {
  console.log(`💨 AQI Backend running at http://localhost:${PORT}`);
});
