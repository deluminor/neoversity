from __future__ import annotations

import itertools
import queue
import random
from dataclasses import dataclass
from typing import Iterator


@dataclass
class ServiceRequest:
    request_id: int
    payload: str


class RequestGenerator:
    def __init__(self) -> None:
        self._id_source: Iterator[int] = itertools.count(1)

    def generate(self) -> ServiceRequest:
        return ServiceRequest(
            request_id=next(self._id_source),
            payload=f"Issue code #{random.randint(1000, 9999)}",
        )


def generate_request(
    request_queue: queue.Queue[ServiceRequest], generator: RequestGenerator
) -> None:
    request = generator.generate()
    request_queue.put(request)
    print(f"Generated request {request.request_id}: {request.payload}")


def process_request(request_queue: queue.Queue[ServiceRequest]) -> None:
    if request_queue.empty():
        print("No pending requests. Taking a short break.\n")
        return

    request = request_queue.get()
    print(f"Processing request {request.request_id}: {request.payload}\n")


def run_simulation(iterations: int = 10, max_new_requests: int = 3) -> None:
    request_queue: queue.Queue[ServiceRequest] = queue.Queue()
    generator = RequestGenerator()

    for step in range(1, iterations + 1):
        print(f"--- Tick {step} ---")
        for _ in range(random.randint(1, max_new_requests)):
            generate_request(request_queue, generator)
        process_request(request_queue)


if __name__ == "__main__":
    run_simulation()
