from __future__ import annotations

import argparse
import logging
from pathlib import Path

from .demo import create_demo_environment
from .sorter import FileSorter


def parse_arguments() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Recursively copy files into extension-based folders."
    )
    parser.add_argument(
        "source",
        type=Path,
        nargs="?",
        help="Path to the directory that should be scanned.",
    )
    parser.add_argument(
        "destination",
        type=Path,
        nargs="?",
        default=Path("dist"),
        help="Destination directory (default: ./dist).",
    )
    parser.add_argument(
        "--log-level",
        dest="log_level",
        default="INFO",
        choices=["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"],
        help="Configure verbosity of diagnostic output.",
    )
    parser.add_argument(
        "--demo",
        action="store_true",
        help="Generate sample files automatically and sort them.",
    )
    return parser.parse_args()


def configure_logging(level: str) -> None:
    logging.basicConfig(
        level=getattr(logging, level),
        format="%(levelname)s: %(message)s",
    )


def main() -> None:
    args = parse_arguments()
    configure_logging(args.log_level)

    if args.demo:
        source, destination = create_demo_environment()
        logging.info(
            "Demo environment created at '%s'. Destination: '%s'.",
            source,
            destination,
        )
    else:
        if args.source is None:
            raise SystemExit("Source path is required unless --demo is used.")
        source = args.source
        destination = args.destination

    try:
        sorter = FileSorter(source, destination)
        sorter.sort()
        logging.info(
            "Files from '%s' were copied to '%s' grouped by extension.",
            sorter.source,
            sorter.destination,
        )
    except (FileNotFoundError, NotADirectoryError) as error:
        logging.error(error)
        raise SystemExit(1) from error


if __name__ == "__main__":
    main()
