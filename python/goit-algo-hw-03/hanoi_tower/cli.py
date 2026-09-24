from __future__ import annotations

import argparse
from typing import Dict, List

try:
    from .solver import HanoiSolver
except ImportError:  # pragma: no cover - fallback when run as a script
    from solver import HanoiSolver


def positive_int(value: str) -> int:
    parsed = int(value)
    if parsed <= 0:
        raise argparse.ArgumentTypeError("Number of disks must be greater than zero.")
    return parsed


def parse_arguments() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Solve the Tower of Hanoi puzzle and display each step."
    )
    parser.add_argument(
        "disks",
        type=positive_int,
        help="Number of disks on the starting peg.",
    )
    return parser.parse_args()


def render_state(state: Dict[str, List[int]], disk_count: int) -> str:
    pegs = ("A", "B", "C")
    max_width = disk_count * 2 - 1

    def disk_at_level(disks: List[int], level: int) -> int | None:
        index = len(disks) - level - 1
        if index < 0:
            return None
        return disks[index]

    def draw_disk(size: int | None) -> str:
        if size is None:
            return "|".center(max_width)
        symbol_count = size * 2 - 1
        return ("=" * symbol_count).center(max_width)

    lines: List[str] = []
    for level in range(disk_count):
        row = "   ".join(
            draw_disk(disk_at_level(state.get(peg, []), level)) for peg in pegs
        )
        lines.append(row)

    base = "-" * max_width
    lines.append("   ".join(base for _ in pegs))
    lines.append("   ".join(peg.center(max_width) for peg in pegs))
    return "\n".join(lines)


def main() -> None:
    args = parse_arguments()
    solver = HanoiSolver(disk_count=args.disks)
    history = solver.solve()

    for index, log in enumerate(history):
        print(log.action)
        print(render_state(log.state, solver.disk_count))
        if index != len(history) - 1:
            print()


if __name__ == "__main__":
    main()
