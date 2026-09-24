from typing import Dict

# Available coin denominations in descending order
COINS = [50, 25, 10, 5, 2, 1]


def find_coins_greedy(amount: int) -> Dict[int, int]:
    if amount < 0:
        raise ValueError("Amount cannot be negative")

    if amount == 0:
        return {}

    result = {}
    remaining = amount

    for coin in COINS:
        if remaining >= coin:
            count = remaining // coin
            result[coin] = count
            remaining -= coin * count

        if remaining == 0:
            break

    return result


def find_min_coins(amount: int) -> Dict[int, int]:
    if amount < 0:
        raise ValueError("Amount cannot be negative")

    if amount == 0:
        return {}

    # DP table: dp[i] = minimum coins needed for amount i
    dp = [float("inf")] * (amount + 1)
    dp[0] = 0

    # Track which coin was used to achieve minimum for each amount
    coin_used = [0] * (amount + 1)

    # Fill DP table
    for i in range(1, amount + 1):
        for coin in COINS:
            if coin <= i and dp[i - coin] + 1 < dp[i]:
                dp[i] = dp[i - coin] + 1
                coin_used[i] = coin

    # If no solution exists (shouldn't happen with coin denomination 1)
    if dp[amount] == float("inf"):
        return {}

    # Reconstruct the solution
    result = {}
    current_amount = amount

    while current_amount > 0:
        coin = coin_used[current_amount]
        result[coin] = result.get(coin, 0) + 1
        current_amount -= coin

    return result


if __name__ == "__main__":
    # Test examples
    test_amounts = [113, 50, 99, 1000]

    print("Coin Change System - Algorithm Comparison\n")
    print("=" * 60)

    for amount in test_amounts:
        print(f"\nAmount: {amount}")
        print("-" * 60)

        greedy_result = find_coins_greedy(amount)
        dp_result = find_min_coins(amount)

        print(f"Greedy Algorithm: {greedy_result}")
        print(f"Total coins (Greedy): {sum(greedy_result.values())}")

        print(f"\nDynamic Programming: {dp_result}")
        print(f"Total coins (DP): {sum(dp_result.values())}")

        # Verify both give same total
        if sum(greedy_result.values()) == sum(dp_result.values()):
            print("✓ Both algorithms found optimal solution")
        else:
            print("⚠ Different number of coins used")
