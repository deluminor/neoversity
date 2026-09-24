def input_error(func):
    """
    Decorator for handling input errors in bot command functions.
    
    This decorator catches common exceptions that occur during user input
    processing and returns user-friendly error messages instead of crashing.
    
    Handles:
        - KeyError: When contact doesn't exist
        - ValueError: When phone number format is invalid
        - IndexError: When insufficient arguments provided
    
    Args:
        func (callable): Function to be decorated
        
    Returns:
        callable: Wrapped function with error handling
    """
    def inner(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except KeyError:
            return "Contact not found. Please check the name and try again."
        except ValueError:
            return "Invalid input format. Please provide valid data."
        except IndexError:
            return "Insufficient arguments provided. Please check command format."
        except Exception as e:
            return f"An unexpected error occurred: {str(e)}"
    
    return inner


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

@input_error
def add_contact(args, contacts):
    """
    Add new contact to dictionary.

    Args:
        args (list): [name, phone]
        contacts (dict): Contacts dictionary

    Returns:
        str: Result message

    Time complexity: O(1) - hash table
    
    Raises:
        IndexError: When insufficient arguments provided
        ValueError: When phone format is invalid
    """
    if len(args) < 2:
        raise IndexError("Enter user name and phone number")

    name = args[0]
    phone = args[1]

    # Basic phone validation
    if not phone.isdigit():
        raise ValueError(f"Phone '{phone}' must contain only digits")

    if len(phone) < 7:
        raise ValueError("Phone must contain at least 7 digits")

    contacts[name] = phone
    return f"Contact '{name}' added successfully."

@input_error
def change_contact(args, contacts):
    """
    Change phone for existing contact.

    Args:
        args (list): [name, new_phone]
        contacts (dict): Contacts dictionary

    Returns:
        str: Result message
        
    Raises:
        IndexError: When insufficient arguments provided
        ValueError: When phone format is invalid
        KeyError: When contact doesn't exist
    """
    if len(args) < 2:
        raise IndexError("Give me name and phone please")

    name = args[0]
    new_phone = args[1]

    if not new_phone.isdigit():
        raise ValueError(f"Phone '{new_phone}' must contain only digits")

    if len(new_phone) < 7:
        raise ValueError("Phone must contain at least 7 digits")

    # Check if contact exists (O(1) lookup)
    if name not in contacts:
        raise KeyError(f"Contact '{name}' not found")

    old_phone = contacts[name]
    contacts[name] = new_phone
    return f"Contact '{name}' updated. Old: {old_phone}, new: {new_phone}"

@input_error
def show_phone(args, contacts):
    """
    Display phone for given name.

    Args:
        args (list): [name]
        contacts (dict): Contacts dictionary

    Returns:
        str: Phone number or error message
        
    Raises:
        IndexError: When no name provided
        KeyError: When contact doesn't exist
    """
    if len(args) < 1:
        raise IndexError("Enter user name")

    name = args[0]

    # Check if contact exists and raise KeyError if not
    if name not in contacts:
        raise KeyError(f"Contact '{name}' not found")

    return f"{name}: {contacts[name]}"

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
        2. Eval - parse_input() + corresponding handler with error handling
        3. Print - output result
        4. Loop - repeat until exit command
        
    Features:
        - Comprehensive error handling via decorators
        - User-friendly error messages
        - Robust command processing
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

        # Command dispatching with error handling
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
