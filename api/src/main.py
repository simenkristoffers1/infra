import psycopg2
import requests
from azure.identity import DefaultAzureCredential
from azure.keyvault.secrets import SecretClient
from azure.servicebus import ServiceBusClient, ServiceBusMessage
from fastapi import FastAPI
from psycopg2.extras import RealDictCursor

from src.core.config import settings

app = FastAPI()

keyvault_url = f"https://{settings.key_vault_name}.vault.azure.net"
credential = DefaultAzureCredential()


@app.get("/")
def read_root():
    return {"message": "Hello from api v4"}


@app.get("/secret")
def read_secret():
    secret_client = SecretClient(vault_url=keyvault_url, credential=credential)
    secret = secret_client.get_secret("test-secret")
    return {"secret": secret.value}


@app.post("/run-pipeline")
async def run_pipeline():
    servicebus_client = ServiceBusClient(
        fully_qualified_namespace=f"{settings.service_bus_name}.servicebus.windows.net",
        credential=credential,
        logging_enable=True,
    )
    with servicebus_client:
        sender = servicebus_client.get_queue_sender(
            queue_name=settings.service_bus_queue_name
        )
        with sender:
            message = ServiceBusMessage(body="Hello, world!")
            sender.send_messages(message)
    return {"message": "Pipeline received"}


@app.get("/animals")
def read_animals():
    access_token = credential.get_token(
        "https://ossrdbms-aad.database.windows.net/.default"
    ).token
    conn = psycopg2.connect(
        host=settings.db_host,
        database=settings.db_name,
        user=settings.db_user,
        password=access_token,
        sslmode="require",
    )
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    cursor.execute("SELECT * FROM public.animal;")
    animals = []
    for row in cursor:
        animals.append(dict(row))
    return {"animals": animals}


@app.get("/internal")
def read_internal():
    response = requests.get(
        "https://internal-api.internal.victoriousmoss-91796d90.norwayeast.azurecontainerapps.io"
    )
    return response.json()
