from fastapi import FastAPI
import requests

app = FastAPI()


@app.get("/")
def read_root():
    return {"message": "Hello from api v2"}


@app.get("/internal")
def read_internal():
    response = requests.get(
        "https://internal-api.internal.victoriousmoss-91796d90.norwayeast.azurecontainerapps.io"
    )
    return response.json()
