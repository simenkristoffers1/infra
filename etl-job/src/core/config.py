from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    service_bus_name: str
    service_bus_queue_name: str

    class Config:
        env_file = ".env"


settings = Settings()
