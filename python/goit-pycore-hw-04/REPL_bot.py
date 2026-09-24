def parse_input(user_input):
    """
    Parse user input into command and arguments.

    Args:
        user_input (str): Raw input string

    Returns:
        tuple: (command, list_of_arguments)

    Example:
        >>> parse_input("add John 1234567890")
        ('add', ['John', '1234567890'])
    """
    parts = user_input.split()

    if not parts:
        return "", []

    # First part is command, rest are arguments
    cmd = parts[0].strip().lower()
    args = parts[1:]

    return cmd, args

def add_contact(args, contacts):
    """
    Add new contact to dictionary.

    Args:
        args (list): [name, phone]
        contacts (dict): Contacts dictionary

    Returns:
        str: Result message

    Time complexity: O(1) - hash table
    """
    if len(args) < 2:
        return "Error: insufficient arguments. Format: add [name] [phone]"

    name = args[0]
    phone = args[1]

    # Basic phone validation
    if not phone.isdigit():
        return f"Error: phone '{phone}' must contain only digits"

    if len(phone) < 7:
        return "Error: phone must contain at least 7 digits"

    contacts[name] = phone
    return f"Contact '{name}' added successfully."

def change_contact(args, contacts):
    """
    Change phone for existing contact.

    Args:
        args (list): [name, new_phone]
        contacts (dict): Contacts dictionary

    Returns:
        str: Result message
    """
    if len(args) < 2:
        return "Error: insufficient arguments. Format: change [name] [new_phone]"

    name = args[0]
    new_phone = args[1]

    if not new_phone.isdigit():
        return f"Error: phone '{new_phone}' must contain only digits"

    if len(new_phone) < 7:
        return "Error: phone must contain at least 7 digits"

    # Check if contact exists (O(1) lookup)
    if name not in contacts:
        return f"Error: contact '{name}' not found"

    old_phone = contacts[name]
    contacts[name] = new_phone
    return f"Contact '{name}' updated. Old: {old_phone}, new: {new_phone}"

def show_phone(args, contacts):
    """
    Display phone for given name.

    Args:
        args (list): [name]
        contacts (dict): Contacts dictionary

    Returns:
        str: Phone number or error message
    """
    if len(args) < 1:
        return "Error: specify name. Format: phone [name]"

    name = args[0]

    # Safe dictionary access with get()
    phone = contacts.get(name)

    if phone is None:
        return f"Error: contact '{name}' not found"

    return f"{name}: {phone}"

def show_all(contacts):
    """
    Display all contacts.

    Args:
        contacts (dict): Contacts dictionary

    Returns:
        str: Formatted list of all contacts
    """
    if not contacts:
        return "Contact book is empty."

    result = ["All contacts:", "=" * 40]

    # Sort by name (alphabetically)
    for index, (name, phone) in enumerate(sorted(contacts.items()), start=1):
        result.append(f"{index:2}. {name:20} | {phone}")

    result.append("=" * 40)

    # join() is O(n), more efficient than concatenation in loop
    return "\n".join(result)

def main():
    """
    Main function - REPL loop for the bot.

    Architecture:
        1. Read - input() reads command
        2. Eval - parse_input() + corresponding handler
        3. Print - output result
        4. Loop - repeat until exit command
    """
    contacts = {}

    print("\n" + "="*50)
    print("   Welcome to Contact Management Assistant Bot!")
    print("="*50)
    print("\nAvailable commands:")
    print("  hello                     - greeting")
    print("  add [name] [phone]        - add contact")
    print("  change [name] [phone]     - change phone")
    print("  phone [name]              - show phone")
    print("  all                       - show all contacts")
    print("  exit or close             - exit")
    print("="*50 + "\n")

    # Infinite REPL loop
    while True:
        user_input = input("Enter command >>> ").strip()

        # Skip empty lines
        if not user_input:
            continue

        # Parse input
        command, args = parse_input(user_input)

        # Command dispatching
        if command in ["close", "exit"]:
            print("\n👋 Goodbye! Thank you for using the bot.")
            break

        elif command == "hello":
            print("👋 Hello! How can I help you?")

        elif command == "add":
            result = add_contact(args, contacts)
            print(result)

        elif command == "change":
            result = change_contact(args, contacts)
            print(result)

        elif command == "phone":
            result = show_phone(args, contacts)
            print(result)

        elif command == "all":
            result = show_all(contacts)
            print(result)

        else:
            print(f"❌ Unknown command: '{command}'")
            print("💡 Type 'hello' for list of available commands")

if __name__ == "__main__":
    main()
