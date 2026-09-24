from __future__ import annotations

BRACKET_PAIRS = {
    "(": ")",
    "[": "]",
    "{": "}",
}


class BracketError(Exception):
    """Raised when the bracket sequence is invalid."""


def check_brackets(sequence: str) -> bool:
    """Return True if brackets inside sequence are symmetric."""

    stack: list[str] = []
    for index, char in enumerate(sequence, start=1):
        if char in BRACKET_PAIRS:
            stack.append(char)
        elif char in BRACKET_PAIRS.values():
            if not stack:
                raise BracketError(f"Unexpected closing '{char}' at position {index}")
            opener = stack.pop()
            if BRACKET_PAIRS[opener] != char:
                raise BracketError(
                    f"Mismatched brackets '{opener}{char}' at position {index}"
                )
    if stack:
        raise BracketError("Unclosed brackets remaining in the sequence")
    return True


def main() -> None:
    samples = [
        "(){[1](1+3)(){}}",
        "(23(2-3);",
        "(11}",
    ]

    for sample in samples:
        try:
            check_brackets(sample)
        except BracketError as error:
            print(f"{sample}: Not symmetric ({error})")
        else:
            print(f"{sample}: Symmetric")


if __name__ == "__main__":
    main()
