from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import analytics

app = FastAPI(title="A2 Crash Analytics API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analytics.router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Crash Analytics API is running"}
