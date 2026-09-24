from datetime import date, timedelta, datetime

def get_upcoming_birthdays(users: list[dict]) -> list[dict]:
    today = date.today()
    upcoming_birthdays = []

    for user in users:
        birthday = datetime.strptime(user["birthday"], "%Y.%m.%d").date()

        # Check if birthday is this year
        birthday_this_year = birthday.replace(year=today.year)

        # If birthday is this year, but has already passed, move to next year
        if birthday_this_year < today:
            birthday_this_year = birthday_this_year.replace(year=today.year + 1)

        # Check if birthday is within next 7 days
        delta_days = (birthday_this_year - today).days
        if 0 <= delta_days < 7:
            congratulation_date = birthday_this_year

            # If birthday is on a weekend, move to next Monday
            if congratulation_date.weekday() >= 5:
                # Move to next Monday
                days_to_monday = 7 - congratulation_date.weekday()
                congratulation_date += timedelta(days=days_to_monday)

            upcoming_birthdays.append({
                "name": user["name"],
                "congratulation_date": congratulation_date.strftime("%Y.%m.%d")
            })

    return upcoming_birthdays

users = [
    {"name": "John Doe", "birthday": "1985.10.15"}, # Wednesday
    {"name": "Jane Smith", "birthday": "1990.10.11"}  # Saturday
]

print("List of upcoming birthdays:", get_upcoming_birthdays(users))
