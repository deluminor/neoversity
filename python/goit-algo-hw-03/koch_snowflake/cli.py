from __future__ import annotations

import argparse

from .fractal import KochSnowflakeDrawer


def positive_int(value: str) -> int:
    parsed = int(value)
    if parsed < 0:
        raise argparse.ArgumentTypeError("Order must be >= 0.")
    return parsed


def positive_float(value: str) -> float:
    parsed = float(value)
    if parsed <= 0:
        raise argparse.ArgumentTypeError("Length must be > 0.")
    return parsed


def parse_arguments() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Visualize the Koch snowflake for the requested recursion order."
    )
    parser.add_argument(
        "--order",
        type=positive_int,
        default=3,
        help="Recursion depth for the snowflake (default: 3).",
    )
    parser.add_argument(
        "--length",
        type=positive_float,
        default=300.0,
        help="Edge length of the base triangle (default: 300).",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_arguments()
    drawer = KochSnowflakeDrawer(line_length=args.length)
    drawer.draw(order=args.order)


if __name__ == "__main__":
    main()
