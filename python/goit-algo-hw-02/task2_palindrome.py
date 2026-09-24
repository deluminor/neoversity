from __future__ import annotations

from collections import deque


def is_palindrome(text: str) -> bool:
    normalized = "".join(ch.lower() for ch in text if not ch.isspace())
    symbols = deque(normalized)

    while len(symbols) > 1:
        if symbols.popleft() != symbols.pop():
            return False
    return True


def main() -> None:
    samples = [
        "Able was I ere I saw Elba",
        "Step on no pets",
        "Hello world",
    ]

    for sample in samples:
        print(f"'{sample}' -> {is_palindrome(sample)}")


if __name__ == "__main__":
    main()
