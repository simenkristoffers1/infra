import asyncio
import os

from azure.identity.aio import DefaultAzureCredential
from azure.servicebus.aio import ServiceBusClient
from src.core.config import settings

credential = DefaultAzureCredential()
max_message_count = int(os.getenv("MAX_MESSAGE_COUNT", 20))
max_wait_time = os.getenv("MAX_WAIT_TIME", None)


async def fibonacci(n: int):
    if n <= 0:
        raise ValueError("n must be a positive integer")
    elif n == 1:
        return 0
    elif n == 2:
        return 1
    else:
        fib1 = await fibonacci(n - 1)
        fib2 = await fibonacci(n - 2)
        return fib1 + fib2


async def receive_messages():
    servicebus_client = ServiceBusClient(
        fully_qualified_namespace=f"{settings.service_bus_name}.servicebus.windows.net",
        credential=credential,
        logging_enable=True,
    )
    async with servicebus_client:
        # Get the Queue Receiver object for the input queue
        receiver = servicebus_client.get_queue_receiver(
            queue_name=settings.service_bus_queue_name
        )
        async with receiver:
            try:
                received_msgs = await receiver.receive_messages(
                    max_wait_time=max_wait_time, max_message_count=max_message_count
                )
                i = 0
                for msg in received_msgs:
                    # Check if message contains an integer value
                    try:
                        n = int(str(msg))
                        i += 1
                        print(f"[{i}] Received Message: {n}")
                        # Calculate Fibonacci number
                        result = await fibonacci(n)
                        print(f"[{i}] The Fibonacci number for {n} is {result}")
                        # Send result to the output queue
                    except ValueError:
                        print(
                            f"[{i}] Received message {str(msg)} is not an integer number"
                        )
                        continue
                    finally:
                        # Complete the message so that the message is removed from the queue
                        await receiver.complete_message(msg)
                        print(f"[{i}] Completed message: {str(msg)}")
            except Exception as e:
                print(
                    f"An error occurred while receiving messages from the {settings.service_bus_queue_name} queue: {e}"
                )


asyncio.run(receive_messages())

asyncio.run(credential.close())
