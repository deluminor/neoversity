from address_book import AddressBook, Record

def input_error(func):
    """
    Decorator for handling input errors in bot command functions.
    """

    def inner(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except KeyError:
            return "Contact not found. Please check the name and try again."
        except ValueError as error:
            return str(error)
        except IndexError:
            return "Insufficient arguments provided. Please check command format."
        except Exception as error:  # pragma: no cover - safety net
            return f"An unexpected error occurred: {error}"

    return inner

def parse_input(user_input: str):
    parts = user_input.split()
    if not parts:
        return "", []
    command = parts[0].strip().lower()
    args = parts[1:]
    return command, args

@input_error
def add_contact(args, book: AddressBook):
    if len(args) < 2:
        raise IndexError("Enter user name and phone number.")

    name, phone, *_ = args
    record = book.find(name)
    message = "Contact updated."
    if record is None:
        record = Record(name)
        book.add_record(record)
        message = "Contact added."

    record.add_phone(phone)
    return message

@input_error
def change_contact(args, book: AddressBook):
    if len(args) < 3:
        raise IndexError("Give me name, old phone, and new phone please.")

    name, old_phone, new_phone, *_ = args
    record = book.find(name)
    if record is None:
        raise KeyError(f"Contact '{name}' not found")

    record.edit_phone(old_phone, new_phone)
    return "Phone updated."

@input_error
def show_phone(args, book: AddressBook):
    if len(args) < 1:
        raise IndexError("Enter user name.")

    name = args[0]
    record = book.find(name)
    if record is None:
        raise KeyError(f"Contact '{name}' not found")

    if not record.phones:
        return f"{name} has no phones saved."

    phones = ", ".join(phone.value for phone in record.phones)
    return f"{name}: {phones}"

def show_all(book: AddressBook):
    if not book.data:
        return "Contact book is empty."

    lines = ["All contacts:", "=" * 50]
    for index, record in enumerate(sorted(book.data.values(), key=lambda r: r.name.value), start=1):
        lines.append(f"{index:2}. {record}")
    lines.append("=" * 50)
    return "\n".join(lines)

@input_error
def add_birthday(args, book: AddressBook):
    if len(args) < 2:
        raise IndexError("Enter user name and birthday (DD.MM.YYYY).")

    name, birthday, *_ = args
    record = book.find(name)
    message = "Birthday updated."
    if record is None:
        record = Record(name)
        book.add_record(record)
        message = "Contact created and birthday added."

    record.add_birthday(birthday)
    return message

@input_error
def show_birthday(args, book: AddressBook):
    if len(args) < 1:
        raise IndexError("Enter user name.")

    name = args[0]
    record = book.find(name)
    if record is None:
        raise KeyError(f"Contact '{name}' not found")

    if record.birthday is None:
        return f"{name} has no birthday saved."

    return f"{name}: {record.birthday.value.strftime('%d.%m.%Y')}"

@input_error
def birthdays(args, book: AddressBook):
    upcoming = book.get_upcoming_birthdays()
    if not upcoming:
        return "No birthdays in the next 7 days."

    lines = ["Upcoming birthdays:"]
    for entry in upcoming:
        names = ", ".join(entry["names"])
        lines.append(f"{entry['weekday']} ({entry['date']}): {names}")
    return "\n".join(lines)

def main():
    book = AddressBook()

    print("\n" + "=" * 50)
    print("   Welcome to Contact Management Assistant Bot!")
    print("=" * 50)
    print("\nAvailable commands:")
    print("  hello                          - greeting")
    print("  add [name] [phone]             - add contact or phone")
    print("  change [name] [old] [new]      - change phone")
    print("  phone [name]                   - show phones")
    print("  all                            - show all contacts")
    print("  add-birthday [name] [DD.MM.YYYY] - add birthday")
    print("  show-birthday [name]           - show birthday")
    print("  birthdays                      - upcoming birthdays")
    print("  exit or close                  - exit")
    print("=" * 50 + "\n")

    while True:
        user_input = input("Enter command >>> ").strip()
        if not user_input:
            continue

        command, args = parse_input(user_input)

        if command in ["close", "exit"]:
            print("\n👋 Goodbye! Thank you for using the bot.")
            break
        elif command == "hello":
            print("👋 Hello! How can I help you?")
        elif command == "add":
            print(add_contact(args, book))
        elif command == "change":
            print(change_contact(args, book))
        elif command == "phone":
            print(show_phone(args, book))
        elif command == "all":
            print(show_all(book))
        elif command == "add-birthday":
            print(add_birthday(args, book))
        elif command == "show-birthday":
            print(show_birthday(args, book))
        elif command == "birthdays":
            print(birthdays(args, book))
        else:
            print(f"❌ Unknown command: '{command}'")
            print("💡 Type 'hello' for list of available commands")


if __name__ == "__main__":
    main()
