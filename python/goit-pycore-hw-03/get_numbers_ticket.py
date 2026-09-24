import random

def get_numbers_ticket(min_val: int, max_val: int, quantity: int) -> list[int]:
    is_valid = (1 <= min_val <= max_val <= 1000 and
                1 <= quantity <= max_val - min_val + 1)

    if not is_valid:
        return []

    numbers = random.sample(range(min_val, max_val + 1), quantity)
    return sorted(numbers)

print(f"Your lottery numbers: {get_numbers_ticket(1, 49, 6)}")
print(f"Invalid input: {get_numbers_ticket(1, 10, 11)}")
print(f"Invalid input: {get_numbers_ticket(10, 1, 5)}")
