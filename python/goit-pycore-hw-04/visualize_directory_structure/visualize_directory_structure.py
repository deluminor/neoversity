import sys
from pathlib import Path
from colorama import Fore, Style, init

# Initialize colorama with autoreset
init(autoreset=True)

def visualize_directory_structure(directory_path, indent="", is_last=True):
    """
    Recursively visualize directory structure with colors.

    Args:
        directory_path (Path): Path object to directory
        indent (str): String for indentation
        is_last (bool): Whether this is the last item in parent directory

    Algorithm:
        - Time complexity: O(n) where n is number of files/dirs
        - Space complexity: O(d) where d is max depth (recursion stack)
    """
    try:
        # Get sorted items: directories first, then files
        items = sorted(directory_path.iterdir(), key=lambda x: (not x.is_dir(), x.name))

        for index, item in enumerate(items):
            is_current_last = (index == len(items) - 1)

            # Choose connector symbol: ┗ for last item, ┣ for others
            connector = "┗ " if is_current_last else "┣ "

            if item.is_dir():
                # Directories in blue with folder icon
                icon = "📂"
                color = Fore.BLUE
                print(f"{indent}{connector}{color}{icon} {item.name}{Style.RESET_ALL}")

                # Recursive call for subdirectory
                new_indent = indent + ("   " if is_current_last else "┃  ")
                visualize_directory_structure(item, new_indent, is_current_last)
            else:
                # Files in green with document icon
                icon = "📜"
                color = Fore.GREEN
                print(f"{indent}{connector}{color}{icon} {item.name}{Style.RESET_ALL}")

    except PermissionError:
        print(f"{indent}{Fore.RED}[Access denied]{Style.RESET_ALL}")

def main():
    """
    Main function - handles command line arguments and launches visualization.
    """
    # Validate arguments
    if len(sys.argv) != 2:
        print(f"{Fore.RED}Error: incorrect number of arguments{Style.RESET_ALL}")
        print(f"Usage: python {sys.argv[0]} <path_to_directory>")
        sys.exit(1)

    path_arg = sys.argv[1]
    directory_path = Path(path_arg)

    # Validate: does path exist?
    if not directory_path.exists():
        print(f"{Fore.RED}Error: path '{path_arg}' does not exist{Style.RESET_ALL}")
        sys.exit(1)

    # Validate: is it a directory?
    if not directory_path.is_dir():
        print(f"{Fore.RED}Error: '{path_arg}' is not a directory{Style.RESET_ALL}")
        sys.exit(1)

    # Print header
    print(f"\n{Fore.CYAN}{'='*60}{Style.RESET_ALL}")
    print(f"{Fore.CYAN}Directory structure: {directory_path.absolute()}{Style.RESET_ALL}")
    print(f"{Fore.CYAN}{'='*60}{Style.RESET_ALL}\n")

    # Print root directory
    print(f"📦 {Fore.MAGENTA}{directory_path.name}{Style.RESET_ALL}")

    # Launch visualization
    visualize_directory_structure(directory_path)

    print(f"\n{Fore.CYAN}{'='*60}{Style.RESET_ALL}\n")


if __name__ == "__main__":
    main()
