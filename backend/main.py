from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from service import fetch_aqi_data
from cache import Cache

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

cache = Cache()

@app.get("/api/airquality")
async def air(city: str):
    if cache.exists(city):
        return cache.get(city)
    result = await fetch_aqi_data(city)
    cache.set(city, result)
    return result
