from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    key_vault_name: str
    db_host: str
    db_name: str
    db_user: str

    service_bus_name: str
    service_bus_queue_name: str

    class Config:
        env_file = ".env"


settings = Settings()
