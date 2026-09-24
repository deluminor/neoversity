def total_salary(path):
    """
    Calculate total and average salary from file.

    Args:
        path (str): Path to the text file with salary data

    Returns:
        tuple: (total_salary, average_salary) or (0, 0) on error
    """
    try:
        with open(path, 'r', encoding='utf-8') as file:
            total = 0
            count = 0

            for line in file:
                line = line.strip()

                # Skip empty lines
                if not line:
                    continue

                # Split line into name and salary
                parts = line.split(',')

                if len(parts) != 2:
                    continue

                name, salary_str = parts

                try:
                    salary = int(salary_str)
                    total += salary
                    count += 1
                except ValueError:
                    print(f"Warning: invalid salary for {name}")
                    continue

            # Calculate average, check for division by zero
            if count == 0:
                return (0, 0)

            average = round((total / count), 2)
            return (total, average)

    except FileNotFoundError:
        print(f"Error: file '{path}' not found")
        return (0, 0)
    except Exception as e:
        print(f"Unexpected error: {e}")
        return (0, 0)

if __name__ == "__main__":
    # Create test file
    with open("salary_file.txt", 'w', encoding='utf-8') as f:
        salary_data = [
            ("Alex Korp", 30080),
            ("Nikita Borisenko", 24000),
            ("Sitarama Raju", 10600),
            ("Alex Korp", 31000),
            ("Nikita Borisenko", 20300),
            ("Sitarama Raju", 10400),
            ("Alex Korp", 30100),
            ("Nikita Borisenko", 20200),
            ("Sitarama Raju", 10200),
            ("Sitarama Raju", 10030),
            ("Alex Korp", 30100),
            ("Nikita Borisenko", 2000),
            ("Sitarama Raju", 10030),
        ]

        for name, salary in salary_data:
            f.write(f"{name}, {salary}\n")

    total, average = total_salary("salary_file.txt")
    print(f"Total salary: {total}, Average salary: {average}")
