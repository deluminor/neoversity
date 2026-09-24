def caching_fibonacci():
    """
    Creates a Fibonacci function with caching capability using closure.

    This function demonstrates the closure concept by creating an inner function
    that has access to the cache dictionary from its enclosing scope. The cache
    persists between function calls, providing memoization for optimization.

    Returns:
        function: Inner fibonacci function with access to persistent cache

    Time Complexity: O(n) with memoization vs O(2^n) without
    Space Complexity: O(n) for cache storage
    """

    # Cache dictionary persists in closure scope
    cache = {}

    def fibonacci(n):
        """
        Calculates the nth Fibonacci number using memoization.

        Args:
            n (int): Position in Fibonacci sequence (non-negative integer)

        Returns:
            int: The nth Fibonacci number

        Raises:
            ValueError: If n is negative
            TypeError: If n is not an integer
        """

        # Input validation
        if not isinstance(n, int):
            raise TypeError(f"Expected integer, got {type(n).__name__}")

        if n < 0:
            raise ValueError("Fibonacci sequence is not defined for negative numbers")

        # Base cases
        if n <= 0:
            return 0
        if n == 1:
            return 1

        # Check cache first (O(1) lookup)
        if n in cache:
            return cache[n]

        # Recursive calculation with memoization
        # Store result in cache before returning
        cache[n] = fibonacci(n - 1) + fibonacci(n - 2)
        return cache[n]

    return fibonacci


def main():
    print("=" * 60)
    print("Fibonacci sequence with caching demonstration")
    print("=" * 60)

    # Get the fibonacci function with caching
    fib = caching_fibonacci()

    # Test cases to demonstrate functionality
    test_cases = [0, 1, 5, 10, 15, 20, 30]

    print("\nCalculating Fibonacci numbers:")
    print("-" * 30)

    for n in test_cases:
        result = fib(n)
        print(f"F({n:2d}) = {result:>10,}")

    # Demonstrate error handling
    print("\nError Handling Examples:")
    print("-" * 30)

    try:
        fib(-5)
    except ValueError as e:
        print(f"ValueError: {e}")

    try:
        fib(3.14)
    except TypeError as e:
        print(f"TypeError: {e}")


if __name__ == "__main__":
    main()
