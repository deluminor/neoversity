import re
from typing import Callable, Generator

def generator_numbers(text: str) -> Generator[float, None, None]:
    """
    Generator function that extracts all valid real numbers from text.

    This function analyzes text and identifies all real numbers that are
    considered parts of income. Real numbers in text are written without
    errors and clearly separated by spaces on both sides.

    Args:
        text (str): Input text containing potential real numbers

    Yields:
        float: Each valid real number found in the text

    Time Complexity: O(n) where n is the length of text
    Space Complexity: O(1) - generator uses constant memory
    """

    # Regular expression pattern for real numbers
    # Matches: integers, decimals (with dot), negative numbers
    # Ensures numbers are surrounded by word boundaries (spaces/punctuation)
    pattern = r'\b\d+(?:\.\d+)?\b'

    # Find all matches in the text
    matches = re.finditer(pattern, text)

    # Yield each number as float
    for match in matches:
        try:
            number = float(match.group())
            yield number
        except ValueError:
            # Skip invalid numbers (shouldn't happen with our regex)
            continue


def sum_profit(text: str, func: Callable[[str], Generator[float, None, None]]) -> float:
    """
    Calculates total profit by summing all numbers extracted by generator function.

    This function demonstrates functional programming by accepting a generator
    function as an argument and using it to process the input text.

    Args:
        text (str): Input text containing income information
        func (Callable): Generator function that extracts numbers from text

    Returns:
        float: Total sum of all extracted numbers

    Time Complexity: O(n) where n is the number of extracted numbers
    Space Complexity: O(1) - processes numbers one at a time
    """

    # Use the generator function to extract numbers and sum them
    # The sum() function efficiently processes the generator
    return sum(func(text))


def analyze_income_text(text: str) -> dict:
    """
    Comprehensive analysis of income text with detailed breakdown.

    Args:
        text (str): Input text to analyze

    Returns:
        dict: Analysis results including total, count, and individual numbers
    """
    numbers = list(generator_numbers(text))

    return {
        'total_income': sum(numbers),
        'number_count': len(numbers),
        'individual_amounts': numbers,
        'average_amount': sum(numbers) / len(numbers) if numbers else 0,
        'max_amount': max(numbers) if numbers else 0,
        'min_amount': min(numbers) if numbers else 0
    }


def main():
    """
    Demonstration of the generator_numbers and sum_profit functions.

    Shows various examples of text processing and income calculation
    with different types of input data.
    """
    print("=" * 70)
    print("Text number generator and profit calculator demonstration")
    print("=" * 70)

    # Test cases with different scenarios
    test_cases = [
        {
            'description': 'Multiple income sources',
            'text': 'Monthly report: salary 2500.00, bonus 150.50, commission 75.25, overtime 200.00.'
        },
        {
            'description': 'Mixed text with numbers',
            'text': 'Project budget includes 1500.75 for development, 800.25 for testing, and 300.00 for documentation.'
        },
        {
            'description': 'No numbers',
            'text': 'This text contains no valid numbers for processing.'
        }
    ]

    for i, test_case in enumerate(test_cases, 1):
        print(f"\nTest Case {i}: {test_case['description']}")
        print("-" * 50)
        print(f"Text: {test_case['text']}")

        # Extract numbers using generator
        numbers = list(generator_numbers(test_case['text']))
        print(f"Extracted numbers: {numbers}")

        # Calculate total using sum_profit
        total = sum_profit(test_case['text'], generator_numbers)
        print(f"Total income: {total:.2f}")

        # Detailed analysis
        analysis = analyze_income_text(test_case['text'])
        if analysis['number_count'] > 0:
            print(f"Count: {analysis['number_count']}")
            print(f"Average: {analysis['average_amount']:.2f}")
            print(f"Range: {analysis['min_amount']:.2f} - {analysis['max_amount']:.2f}")

    print("\n" + "=" * 70)

    # Demonstrate generator behavior
    print("\nGenerator Behavior Demonstration:")
    print("-" * 40)

    sample_text = "Values: 10.5, 20.75, 30.25"
    gen = generator_numbers(sample_text)

    print(f"Generator object: {gen}")
    print("Iterating through generator:")

    for i, number in enumerate(gen, 1):
        print(f"  Step {i}: {number}")

if __name__ == "__main__":
    main()
