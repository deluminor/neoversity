from __future__ import annotations

import logging
import os
import shutil
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

logger = logging.getLogger(__name__)


@dataclass
class FileSorter:
    source: Path
    destination: Path

    def __post_init__(self) -> None:
        self.source = self.source.expanduser().resolve()
        self.destination = self.destination.expanduser().resolve()
        if not self.source.exists():
            raise FileNotFoundError(f"Source directory '{self.source}' does not exist.")
        if not self.source.is_dir():
            raise NotADirectoryError(f"Source path '{self.source}' is not a directory.")
        self.destination.mkdir(parents=True, exist_ok=True)

    def sort(self) -> None:
        self._process_directory(self.source)

    def _process_directory(self, directory: Path) -> None:
        for entry in self._safe_iterdir(directory):
            if entry.is_dir():
                if self._is_destination_child(entry):
                    continue
                self._process_directory(entry)
            elif entry.is_file():
                self._handle_file(entry)

    def _handle_file(self, file_path: Path) -> None:
        extension = self._normalize_extension(file_path.suffix)
        target_dir = self.destination / extension
        target_dir.mkdir(parents=True, exist_ok=True)
        target_file = self._resolve_target_path(file_path, target_dir)
        try:
            shutil.copy2(file_path, target_file)
        except OSError as error:
            logger.error(
                "Failed to copy '%s' to '%s': %s", file_path, target_file, error
            )

    def _resolve_target_path(self, file_path: Path, target_dir: Path) -> Path:
        candidate = target_dir / file_path.name
        if not candidate.exists():
            return candidate

        stem, suffix = file_path.stem, file_path.suffix
        counter = 1
        while candidate.exists():
            candidate = target_dir / f"{stem}_{counter}{suffix}"
            counter += 1
        return candidate

    def _safe_iterdir(self, directory: Path) -> Iterable[Path]:
        try:
            return list(directory.iterdir())
        except (PermissionError, FileNotFoundError) as error:
            logger.warning("Skipping '%s': %s", directory, error)
            return []

    def _is_destination_child(self, entry: Path) -> bool:
        try:
            return entry.resolve().is_relative_to(self.destination)
        except AttributeError:
            dest = str(self.destination)
            resolved_entry = str(entry.resolve())
            prefix = dest + os.sep
            return resolved_entry == dest or resolved_entry.startswith(prefix)

    @staticmethod
    def _normalize_extension(suffix: str) -> str:
        clean_suffix = suffix.lower().lstrip(".")
        return clean_suffix if clean_suffix else "unknown"
