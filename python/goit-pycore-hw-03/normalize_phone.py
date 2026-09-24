import re

def normalize_phone(phone_number: str) -> str:
    cleaned_number = re.sub(r'\D', '', phone_number)

    if cleaned_number.startswith('380'):
        return '+' + cleaned_number
    else:
        return '+38' + cleaned_number

raw_numbers = [
    "067\\t123 4567",
    "(095) 234-5678\\n",
    "+380 44 123 4567",
    "380501234567",
]

sanitized_numbers = [normalize_phone(num) for num in raw_numbers]
print("Normalized numbers:", sanitized_numbers)
