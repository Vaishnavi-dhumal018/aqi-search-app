import httpx

API_KEY = "demo"  # replace later with real token

async def fetch_aqi_data(city: str):
    url = f"https://api.waqi.info/feed/{city}/?token={API_KEY}"

    async with httpx.AsyncClient() as client:
        response = await client.get(url)

    data = response.json()

    if data.get("status") != "ok":
        return {"city": city, "aqi": None, "error": "City not found"}

    d = data["data"]

    return {
        "city": d["city"]["name"],
        "aqi": d["aqi"],
        "updated": d["time"]["s"],
    }
