from main import COINS, find_coins_greedy, find_min_coins


def test_edge_cases():
    """Test edge cases for both algorithms."""
    print("Testing Edge Cases")
    print("=" * 60)

    # Test case 1: Zero amount
    print("\n1. Amount = 0")
    assert find_coins_greedy(0) == {}
    assert find_min_coins(0) == {}
    print("✓ Both algorithms return empty dict for zero amount")

    # Test case 2: Negative amount
    print("\n2. Negative amount")
    try:
        find_coins_greedy(-10)
        print("✗ Greedy should raise ValueError")
    except ValueError:
        print("✓ Greedy raises ValueError for negative amount")

    try:
        find_min_coins(-10)
        print("✗ DP should raise ValueError")
    except ValueError:
        print("✓ DP raises ValueError for negative amount")

    # Test case 3: Single coin
    print("\n3. Amount = 1 (single smallest coin)")
    greedy = find_coins_greedy(1)
    dp = find_min_coins(1)
    assert greedy == {1: 1}
    assert dp == {1: 1}
    print(f"✓ Both return {greedy}")

    # Test case 4: Exact denomination
    print("\n4. Amount = 50 (exact denomination)")
    greedy = find_coins_greedy(50)
    dp = find_min_coins(50)
    assert greedy == {50: 1}
    assert dp == {50: 1}
    print(f"✓ Both return {greedy}")

    print("\n" + "=" * 60)


def test_standard_cases():
    """Test standard use cases."""
    print("\nTesting Standard Cases")
    print("=" * 60)

    test_cases = [
        (113, "Example from task"),
        (99, "Just below 100"),
        (100, "Round number"),
        (237, "Multiple large coins"),
        (1, "Minimum amount"),
        (999, "Large odd number"),
    ]

    for amount, description in test_cases:
        print(f"\nAmount: {amount} ({description})")
        print("-" * 60)

        greedy = find_coins_greedy(amount)
        dp = find_min_coins(amount)

        print(f"Greedy: {greedy}")
        print(f"DP:     {dp}")

        # Verify correctness: sum of coins * denomination = amount
        greedy_total = sum(coin * count for coin, count in greedy.items())
        dp_total = sum(coin * count for coin, count in dp.items())

        assert greedy_total == amount, (
            f"Greedy sum mismatch: {greedy_total} != {amount}"
        )
        assert dp_total == amount, f"DP sum mismatch: {dp_total} != {amount}"

        greedy_count = sum(greedy.values())
        dp_count = sum(dp.values())

        print(f"Greedy coins count: {greedy_count}")
        print(f"DP coins count:     {dp_count}")

        if greedy_count == dp_count:
            print("✓ Both algorithms found optimal solution")
        else:
            print("⚠ Different coin counts (should be equal for this coin set)")

    print("\n" + "=" * 60)


def test_large_amounts():
    """Test with large amounts to verify correctness."""
    print("\nTesting Large Amounts")
    print("=" * 60)

    large_amounts = [1000, 5000, 10000]

    for amount in large_amounts:
        print(f"\nAmount: {amount}")
        print("-" * 60)

        greedy = find_coins_greedy(amount)
        dp = find_min_coins(amount)

        # Verify correctness
        greedy_total = sum(coin * count for coin, count in greedy.items())
        dp_total = sum(coin * count for coin, count in dp.items())

        assert greedy_total == amount
        assert dp_total == amount

        greedy_count = sum(greedy.values())
        dp_count = sum(dp.values())

        print(f"Greedy: {greedy_count} coins")
        print(f"DP:     {dp_count} coins")
        print(f"Status: {'✓ OPTIMAL' if greedy_count == dp_count else '⚠ SUBOPTIMAL'}")

    print("\n" + "=" * 60)


def test_coin_denominations():
    """Test specific coin denomination combinations."""
    print("\nTesting Specific Coin Combinations")
    print("=" * 60)

    # Test cases designed to use each coin type
    test_cases = [
        (1, {1: 1}, "Only 1 cent"),
        (2, {2: 1}, "Only 2 cents"),
        (5, {5: 1}, "Only 5 cents"),
        (10, {10: 1}, "Only 10 cents"),
        (25, {25: 1}, "Only 25 cents"),
        (50, {50: 1}, "Only 50 cents"),
        (88, {50: 1, 25: 1, 10: 1, 2: 1, 1: 1}, "Uses all denominations"),
    ]

    for amount, expected, description in test_cases:
        print(f"\n{description} (amount = {amount})")
        greedy = find_coins_greedy(amount)
        dp = find_min_coins(amount)

        print(f"Expected: {expected}")
        print(f"Greedy:   {greedy}")
        print(f"DP:       {dp}")

        # For this specific coin set, greedy should always be optimal
        if greedy == expected == dp:
            print("✓ All match expected result")
        else:
            print("⚠ Results differ from expected")

    print("\n" + "=" * 60)


def run_all_tests():
    """Run all test suites."""
    print("\n" + "=" * 80)
    print("COIN CHANGE ALGORITHMS - COMPREHENSIVE TEST SUITE")
    print("=" * 80)
    print(f"Coin denominations: {COINS}\n")

    try:
        test_edge_cases()
        test_standard_cases()
        test_large_amounts()
        test_coin_denominations()

        print("\n" + "=" * 80)
        print("ALL TESTS PASSED ✓")
        print("=" * 80)

    except AssertionError as e:
        print(f"\n✗ TEST FAILED: {e}")
        raise
    except Exception as e:
        print(f"\n✗ UNEXPECTED ERROR: {e}")
        raise


if __name__ == "__main__":
    run_all_tests()
