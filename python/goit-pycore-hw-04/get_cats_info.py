def get_cats_info(path):
    """
    Read cats information from file and return as list of dictionaries.

    Args:
        path (str): Path to the text file with cats data

    Returns:
        list: List of dictionaries with keys 'id', 'name', 'age'
              Empty list on error
    """
    cats = []

    try:
        with open(path, 'r', encoding='utf-8') as file:
            for line_number, line in enumerate[str](file, start=1):
                line = line.strip()

                # Skip empty lines
                if not line:
                    continue

                parts = line.split(',')

                # Validate format
                if len(parts) != 3:
                    print(f"Warning (line {line_number}): expected 3 fields, got {len(parts)}")
                    continue

                cat_id, name, age = parts

                cat_dict = {
                    "id": cat_id.strip(),
                    "name": name.strip(),
                    "age": age.strip()
                }

                cats.append(cat_dict)

        return cats

    except FileNotFoundError:
        print(f"Error: file '{path}' not found")
        return []
    except Exception as e:
        print(f"Unexpected error: {e}")
        return []


if __name__ == "__main__":
    # Create test file
    with open("cats_file.txt", 'w', encoding='utf-8') as f:
        data = [
            ("1", "Tayson", "3"),
            ("2", "Vika", "1"),
            ("3", "Barsik", "2"),
            ("4", "Simon", "12"),
            ("5", "Tessi", "5"),
            ("6", "Barsik", "2"),
            ("7", "Simon", "12"),
            ("8", "Tessi", "5"),
        ]

        for line in data:
            f.write(','.join(line) + "\n")

    cats_info = get_cats_info("cats_file.txt")
    print(cats_info)
