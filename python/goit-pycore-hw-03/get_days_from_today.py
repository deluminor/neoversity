import datetime

def get_days_from_today(date: str):
    try:
        date_obj = datetime.datetime.strptime(date, '%Y-%m-%d').date()
        today = datetime.date.today()
        delta = today - date_obj
        return delta.days
    except ValueError:
        return "Invalid date format. Please use 'YYYY-MM-DD'."

print(f"Days from today to 2026-01-01: {get_days_from_today('2026-01-01')}")
print(f"Days from today to 2025-10-01: {get_days_from_today('2025-10-01')}")
print(f"Invalid input: {get_days_from_today('invalid-date')}")
