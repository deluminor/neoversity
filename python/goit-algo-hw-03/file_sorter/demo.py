from __future__ import annotations

import shutil
from pathlib import Path

SAMPLE_FILES = {
    "docs/instructions.txt": "Demo instructions file.\n",
    "docs/report.md": "# Demo report\n\nSome markdown content.\n",
    "images/logo.svg": "<svg></svg>\n",
    "images/photo.png": "fake image bytes\n",
    "nested/inner/data.json": '{"demo": true}\n',
    "nested/notes.TXT": "UPPER CASE EXTENSION\n",
    "README": "File without an extension.\n",
    "archive.tar.gz": "fake tarball\n",
}


def create_demo_environment(base_dir: Path | None = None) -> tuple[Path, Path]:
    base_dir = base_dir or Path.cwd() / "demo_data"
    _reset_directory(base_dir)
    source = base_dir / "source"
    destination = base_dir / "sorted"
    source.mkdir(parents=True, exist_ok=True)
    destination.mkdir(parents=True, exist_ok=True)

    for relative_path, content in SAMPLE_FILES.items():
        file_path = source / relative_path
        file_path.parent.mkdir(parents=True, exist_ok=True)
        file_path.write_text(content, encoding="utf-8")

    return source, destination


def _reset_directory(directory: Path) -> None:
    if directory.exists():
        if not directory.name.startswith("demo"):
            raise ValueError(
                "Refusing to delete a directory that is not demo-specific."
            )
        shutil.rmtree(directory)
