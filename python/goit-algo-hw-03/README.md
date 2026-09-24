# goit-algo-hw-03

Three independent Python modules demonstrate recursion through practical tasks.

## Task 1. Recursive file sorter

The `file_sorter` module walks through the source directory recursively and copies every file into a destination folder grouped by its extension. Unknown or missing extensions are placed in the `unknown` subfolder.

### Demo mode

To play with a ready-made dataset run:

```bash
python3 -m file_sorter.cli --demo
```

### Run

```bash
python3 -m file_sorter.cli <source_dir> [destination_dir] [--log-level DEBUG]
```

Example:

```bash
python3 -m file_sorter.cli ~/Downloads ./dist --log-level INFO
```

The script creates `demo_data/source` with sample files, prepares `demo_data/sorted`, and then executes the recursive copy. Paths to the generated folders are printed in the logs.

## Task 2. Koch snowflake

The `koch_snowflake` module uses `turtle` to draw the Koch snowflake for the requested recursion order.

```bash
python3 -m koch_snowflake.cli --order 4 --length 250
```

- `--order` — recursion depth (0 or greater).
- `--length` — base triangle edge length.

When the drawing finishes, close the `turtle` window manually.

## Task 3. Tower of Hanoi

The `hanoi_tower` module prints each step of the Tower of Hanoi solution.

```bash
python3 -m hanoi_tower.cli 3
```

- First and last lines show the initial and final states.
- Intermediate entries print the action and the current `{peg: stack}` configuration.

## Requirements

- Python >= 3.10.
