import sys
import argparse
from pathlib import Path
from typing import Dict, List, Optional
from collections import defaultdict, Counter

def parse_log_line(line: str) -> Dict[str, str]:
    """
    Parse a single log line into its components.

    Expected format: YYYY-MM-DD HH:MM:SS LEVEL Message

    Args:
        line (str): Raw log line to parse

    Returns:
        Dict[str, str]: Parsed components with keys: 'date', 'time', 'level', 'message'
        Returns empty dict if parsing fails
    """

    try:
        # Strip whitespace and split by spaces
        parts = line.strip().split(' ', 3)

        # Ensure we have at least 4 parts (date, time, level, message)
        if len(parts) < 4:
            return {}

        date, time, level, message = parts

        # Basic validation
        if not date or not time or not level or not message:
            return {}

        return {
            'date': date,
            'time': time,
            'level': level.upper(),
            'message': message
        }
    except (ValueError, IndexError):
        # Return empty dict for malformed lines
        return {}

def load_logs(file_path: str) -> List[Dict[str, str]]:
    """
    Load and parse all logs from a file.

    Args:
        file_path (str): Path to the log file

    Returns:
        List[Dict[str, str]]: List of parsed log entries

    Raises:
        FileNotFoundError: If log file doesn't exist
        PermissionError: If file cannot be read
        UnicodeDecodeError: If file encoding is invalid
    """

    logs = []
    file_path_obj = Path(file_path)

    if not file_path_obj.exists():
        raise FileNotFoundError(f"Log file not found: {file_path}")

    if not file_path_obj.is_file():
        raise ValueError(f"Path is not a file: {file_path}")

    try:
        with open(file_path_obj, 'r', encoding='utf-8') as file:
            for line_num, line in enumerate(file, 1):
                # Skip empty lines
                if not line.strip():
                    continue

                parsed_log = parse_log_line(line)

                # Only add successfully parsed logs
                if parsed_log:
                    parsed_log['line_number'] = line_num
                    logs.append(parsed_log)
                else:
                    # Log parsing warning but continue processing
                    print(f"Warning: Could not parse line {line_num}: {line.strip()}",
                          file=sys.stderr)

    except PermissionError:
        raise PermissionError(f"Permission denied reading file: {file_path}")
    except UnicodeDecodeError as e:
        raise UnicodeDecodeError(f"File encoding error: {e}")

    return logs


def filter_logs_by_level(logs: List[Dict[str, str]], level: str) -> List[Dict[str, str]]:
    """
    Filter logs by specific level using functional programming approach.

    Args:
        logs (List[Dict[str, str]]): List of log entries
        level (str): Log level to filter by (case-insensitive)

    Returns:
        List[Dict[str, str]]: Filtered logs matching the specified level

    Example:
        >>> logs = [{'level': 'INFO', 'message': 'test'}, {'level': 'ERROR', 'message': 'fail'}]
        >>> filter_logs_by_level(logs, 'info')
        [{'level': 'INFO', 'message': 'test'}]
    """

    # Use functional programming with filter and lambda
    return list(filter(lambda log: log.get('level', '').upper() == level.upper(), logs))


def count_logs_by_level(logs: List[Dict[str, str]]) -> Dict[str, int]:
    """
    Count log entries by level using functional programming.

    Args:
        logs (List[Dict[str, str]]): List of log entries

    Returns:
        Dict[str, int]: Count of logs for each level

    Example:
        >>> logs = [{'level': 'INFO'}, {'level': 'ERROR'}, {'level': 'INFO'}]
        >>> count_logs_by_level(logs)
        {'INFO': 2, 'ERROR': 1}
    """

    # Use Counter with generator expression for functional approach
    return dict(Counter(log.get('level', 'UNKNOWN') for log in logs))


def display_log_counts(counts: Dict[str, int]) -> None:
    """
    Display log counts in a formatted table.

    Args:
        counts (Dict[str, int]): Dictionary with log levels and their counts
    """

    if not counts:
        print("No log entries found.")
        return

    print("\nLog Level Statistics:")
    print("=" * 40)
    print(f"{'Log Level':<15} | {'Count':<10}")
    print("-" * 40)

    # Sort by log level for consistent output
    for level in sorted(counts.keys()):
        count = counts[level]
        print(f"{level:<15} | {count:<10}")

    print("=" * 40)
    print(f"{'Total':<15} | {sum(counts.values()):<10}")


def display_filtered_logs(logs: List[Dict[str, str]], level: str) -> None:
    """
    Display filtered logs for a specific level.

    Args:
        logs (List[Dict[str, str]]): Filtered log entries
        level (str): Log level being displayed
    """

    if not logs:
        print(f"\nNo logs found for level '{level.upper()}'")
        return

    print(f"\nDetailed logs for level '{level.upper()}':")
    print("=" * 60)

    for log in logs:
        date = log.get('date', 'N/A')
        time = log.get('time', 'N/A')
        message = log.get('message', 'N/A')
        print(f"{date} {time} - {message}")

    print("=" * 60)


def create_sample_log_file(file_path: str) -> None:
    """
    Create a sample log file for testing purposes.

    Args:
        file_path (str): Path where to create the sample log file
    """

    sample_logs = [
        "2024-01-22 08:30:01 INFO User logged in successfully.",
        "2024-01-22 08:45:23 DEBUG Attempting to connect to the database.",
        "2024-01-22 09:00:45 ERROR Database connection failed.",
        "2024-01-22 09:15:10 INFO Data export completed.",
        "2024-01-22 10:30:55 WARNING Disk usage above 80%.",
        "2024-01-22 11:05:00 DEBUG Starting data backup process.",
        "2024-01-22 11:30:15 ERROR Backup process failed.",
        "2024-01-22 12:00:00 INFO User logged out.",
        "2024-01-22 12:45:05 DEBUG Checking system health.",
        "2024-01-22 13:30:30 INFO Scheduled maintenance."
    ]

    with open(file_path, 'w', encoding='utf-8') as file:
        for log_line in sample_logs:
            file.write(log_line + '\n')

    print(f"Sample log file created: {file_path}")


def main():
    """
    Main function to handle command-line arguments and execute log analysis.

    Command-line usage:
        python task3_log_analyzer.py <log_file_path> [log_level]

    Arguments:
        log_file_path: Path to the log file to analyze
        log_level: Optional log level to filter by (INFO, ERROR, DEBUG, WARNING)
    """
    parser = argparse.ArgumentParser(
        description="Analyze log files and display statistics by log levels",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python3 log_analyzer.py sample.log
  python3 log_analyzer.py sample.log error
  python3 log_analyzer.py --create-sample sample.log
        """
    )

    parser.add_argument(
        'log_file',
        nargs='?',
        help='Path to the log file to analyze'
    )

    parser.add_argument(
        'log_level',
        nargs='?',
        help='Optional: Log level to filter by (INFO, ERROR, DEBUG, WARNING)'
    )

    parser.add_argument(
        '--create-sample',
        metavar='FILENAME',
        help='Create a sample log file for testing'
    )

    args = parser.parse_args()

    # Handle sample file creation
    if args.create_sample:
        try:
            create_sample_log_file(args.create_sample)
            return
        except Exception as e:
            print(f"Error creating sample file: {e}", file=sys.stderr)
            sys.exit(1)

    # Validate required arguments
    if not args.log_file:
        parser.print_help()
        sys.exit(1)

    try:
        # Load and parse logs
        print(f"Analyzing log file: {args.log_file}")
        logs = load_logs(args.log_file)

        if not logs:
            print("No valid log entries found in the file.")
            return

        # Count logs by level
        counts = count_logs_by_level(logs)
        display_log_counts(counts)

        # Filter and display specific level if requested
        if args.log_level:
            filtered_logs = filter_logs_by_level(logs, args.log_level)
            display_filtered_logs(filtered_logs, args.log_level)

    except FileNotFoundError as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)
    except PermissionError as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"Unexpected error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
