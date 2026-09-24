import statistics
import time
from typing import Callable, List, Tuple

from main import find_coins_greedy, find_min_coins


def measure_execution_time(
    func: Callable[[int], dict], amount: int, iterations: int = 100
) -> Tuple[float, float]:
    times = []

    for _ in range(iterations):
        start = time.perf_counter()
        func(amount)
        end = time.perf_counter()
        times.append((end - start) * 1000)  # Convert to milliseconds

    return statistics.mean(times), statistics.median(times)


def run_benchmark(amounts: List[int], iterations: int = 100) -> None:
    print("=" * 80)
    print("PERFORMANCE BENCHMARK: Greedy vs Dynamic Programming")
    print("=" * 80)
    print(f"Iterations per test: {iterations}\n")

    results = []

    for amount in amounts:
        print(f"Testing amount: {amount}")
        print("-" * 80)

        # Benchmark greedy algorithm
        greedy_avg, greedy_med = measure_execution_time(
            find_coins_greedy, amount, iterations
        )

        # Benchmark dynamic programming
        dp_avg, dp_med = measure_execution_time(find_min_coins, amount, iterations)

        # Calculate speedup factor
        speedup = dp_avg / greedy_avg if greedy_avg > 0 else 0

        print(f"Greedy Algorithm:")
        print(f"  Average: {greedy_avg:.6f} ms")
        print(f"  Median:  {greedy_med:.6f} ms")

        print(f"\nDynamic Programming:")
        print(f"  Average: {dp_avg:.6f} ms")
        print(f"  Median:  {dp_med:.6f} ms")

        print(f"\nSpeedup: Greedy is {speedup:.2f}x faster")
        print("=" * 80)
        print()

        results.append(
            {
                "amount": amount,
                "greedy_avg": greedy_avg,
                "dp_avg": dp_avg,
                "speedup": speedup,
            }
        )

    # Summary
    print("\n" + "=" * 80)
    print("SUMMARY")
    print("=" * 80)
    print(f"{'Amount':<15} {'Greedy (ms)':<15} {'DP (ms)':<15} {'Speedup':<10}")
    print("-" * 80)

    for result in results:
        print(
            f"{result['amount']:<15} "
            f"{result['greedy_avg']:<15.6f} "
            f"{result['dp_avg']:<15.6f} "
            f"{result['speedup']:<10.2f}x"
        )

    print("=" * 80)


if __name__ == "__main__":
    # Test with various amounts: small, medium, large
    test_amounts = [
        10,  # Very small
        113,  # Example from task
        500,  # Small
        1000,  # Medium
        5000,  # Large
        10000,  # Very large
        50000,  # Extreme
    ]

    run_benchmark(test_amounts, iterations=100)

    # Additional detailed test for specific amount
    print("\n" + "=" * 80)
    print("DETAILED ANALYSIS FOR AMOUNT = 113")
    print("=" * 80)

    greedy_result = find_coins_greedy(113)
    dp_result = find_min_coins(113)

    print(f"\nGreedy result: {greedy_result}")
    print(f"Total coins: {sum(greedy_result.values())}")

    print(f"\nDP result: {dp_result}")
    print(f"Total coins: {sum(dp_result.values())}")

    print(f"\nOptimality: {'EQUAL' if greedy_result == dp_result else 'DIFFERENT'}")
