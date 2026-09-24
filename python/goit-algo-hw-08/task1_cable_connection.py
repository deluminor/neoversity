import heapq


def minimize_cable_cost(cables: list[int]) -> int:
    if not cables:
        raise ValueError("Cable list cannot be empty")

    if any(cable <= 0 for cable in cables):
        raise ValueError("All cable lengths must be positive")

    if len(cables) == 1:
        return 0

    # Convert list to min-heap
    # heapq uses min-heap by default
    heap = cables.copy()
    heapq.heapify(heap)

    total_cost = 0
    connection_steps = []

    while len(heap) > 1:
        first = heapq.heappop(heap)
        second = heapq.heappop(heap)

        connection_cost = first + second
        total_cost += connection_cost

        # Store step for detailed output
        connection_steps.append(
            {"cables": (first, second), "cost": connection_cost, "total": total_cost}
        )

        heapq.heappush(heap, connection_cost)

    print("\nConnection process:")
    print("-" * 60)
    for i, step in enumerate(connection_steps, 1):
        print(
            f"Step {i}: Connect cables {step['cables'][0]} and {step['cables'][1]} "
            f"-> Cost: {step['cost']}, Total: {step['total']}"
        )
    print("-" * 60)

    return total_cost


def main():
    print("=" * 60)
    print("CABLE CONNECTION COST MINIMIZATION")
    print("=" * 60)

    cables1 = [4, 3, 2, 6]
    print(f"\nExample 1: Cables = {cables1}")
    cost1 = minimize_cable_cost(cables1)
    print(f"Minimum total cost: {cost1}")

    cables2 = [1, 2, 3]
    print(f"\n\nExample 2: Cables = {cables2}")
    cost2 = minimize_cable_cost(cables2)
    print(f"Minimum total cost: {cost2}")

    cables3 = [5, 4, 2, 8, 1, 3]
    print(f"\n\nExample 3: Cables = {cables3}")
    cost3 = minimize_cable_cost(cables3)
    print(f"Minimum total cost: {cost3}")

    cables4 = [10]
    print(f"\n\nExample 4: Cables = {cables4} (single cable)")
    cost4 = minimize_cable_cost(cables4)
    print(f"Minimum total cost: {cost4}")
    print("(No connection needed)")

    print("\n" + "=" * 60)
    print("\nAlgorithm explanation:")
    print("- Always connect the two shortest cables first")
    print("- This greedy approach minimizes total cost")
    print("- Time complexity: O(n log n)")
    print("- Uses min-heap for efficient operations")
    print("=" * 60)


if __name__ == "__main__":
    main()
