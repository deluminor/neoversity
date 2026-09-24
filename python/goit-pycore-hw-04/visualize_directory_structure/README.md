# Directory Structure Visualizer

A Python script that visualizes directory structure with colored output and tree-like formatting.

## Features

- 🎨 Colored output (directories in blue, files in green)
- 📂 Tree-like structure with proper connectors
- 🔒 Handles permission errors gracefully
- 📊 Optimized algorithm: O(n) time complexity

## Installation

### 1. Create virtual environment
```bash
python -m venv venv
```

### 2. Activate virtual environment

**Windows:**
```bash
venv\Scripts\activate
```

**Linux/Mac:**
```bash
source venv/bin/activate
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

## Usage

```bash
python visualize_directory_structure.py /path/to/directory
```

### Example
```bash
python visualize_directory_structure.py /Users/username/Documents
```

## Output Example

```
============================================================
Directory structure: /Users/username/Documents
============================================================

📦 Documents
┣ 📂 Projects
┃  ┣ 📂 Python
┃  ┃  ┣ 📜 main.py
┃  ┃  ┗ 📜 requirements.txt
┃  ┗ 📂 JavaScript
┃     ┗ 📜 app.js
┗ 📜 notes.txt
============================================================
```

## Error Handling

- **Path doesn't exist**: Shows error message and exits
- **Not a directory**: Shows error message and exits
- **Permission denied**: Shows "[Access denied]" for restricted folders
- **Invalid arguments**: Shows usage instructions

## Dependencies

- `colorama==0.4.6` - For colored terminal output
- `pathlib` - For path operations (built-in)