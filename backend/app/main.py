from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "G-TRISP Backend Running"}