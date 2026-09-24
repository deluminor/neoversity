from pulp import LpMaximize, LpProblem, LpStatus, LpVariable, value


def optimize_production():
    problem = LpProblem("Beverage_Production_Optimization", LpMaximize)

    lemonade = LpVariable("Lemonade", lowBound=0, cat="Continuous")
    fruit_juice = LpVariable("Fruit_Juice", lowBound=0, cat="Continuous")

    problem += lemonade + fruit_juice, "Total_Production"

    # Resource constraints
    problem += 2 * lemonade + 1 * fruit_juice <= 100, "Water_Constraint"
    problem += 1 * lemonade <= 50, "Sugar_Constraint"
    problem += 1 * lemonade <= 30, "Lemon_Juice_Constraint"
    problem += 2 * fruit_juice <= 40, "Fruit_Puree_Constraint"

    problem.solve()

    # Extract results
    status = LpStatus[problem.status]
    lemonade_result = value(lemonade)
    fruit_juice_result = value(fruit_juice)
    total_production = value(problem.objective)

    return lemonade_result, fruit_juice_result, total_production, status, problem


def print_results(lemonade, fruit_juice, total, status, problem):
    print("=" * 70)
    print("PRODUCTION OPTIMIZATION RESULTS")
    print("=" * 70)

    print(f"\nSolver Status: {status}")

    if status == "Optimal":
        print("\n✓ Optimal solution found!")
        print("-" * 70)

        print(f"\nProduction Plan:")
        print(f"  Lemonade:     {lemonade:.2f} units")
        print(f"  Fruit Juice:  {fruit_juice:.2f} units")
        print(f"  TOTAL:        {total:.2f} units")

        # Calculate resource usage
        print(f"\nResource Utilization:")
        water_used = 2 * lemonade + 1 * fruit_juice
        sugar_used = 1 * lemonade
        lemon_used = 1 * lemonade
        puree_used = 2 * fruit_juice

        print(
            f"  Water:        {water_used:.2f} / 100 units ({water_used / 100 * 100:.1f}%)"
        )
        print(
            f"  Sugar:        {sugar_used:.2f} / 50 units ({sugar_used / 50 * 100:.1f}%)"
        )
        print(
            f"  Lemon Juice:  {lemon_used:.2f} / 30 units ({lemon_used / 30 * 100:.1f}%)"
        )
        print(
            f"  Fruit Puree:  {puree_used:.2f} / 40 units ({puree_used / 40 * 100:.1f}%)"
        )

        # Identify bottlenecks
        print(f"\nBottleneck Analysis:")
        resources = {
            "Water": (water_used, 100),
            "Sugar": (sugar_used, 50),
            "Lemon Juice": (lemon_used, 30),
            "Fruit Puree": (puree_used, 40),
        }

        for name, (used, available) in resources.items():
            utilization = (used / available) * 100
            if utilization >= 99.9:  # Consider 100% with floating point tolerance
                print(f"  ⚠ {name} is FULLY UTILIZED (bottleneck)")
            elif utilization >= 80:
                print(f"  ⚡ {name} is highly utilized ({utilization:.1f}%)")

        print("\n" + "=" * 70)

    else:
        print(f"\n✗ Problem status: {status}")
        print("No optimal solution found.")
        print("=" * 70)


def analyze_constraints(problem):
    print("\nConstraint Analysis:")
    print("-" * 70)

    for name, constraint in problem.constraints.items():
        slack = constraint.slack
        if slack is not None:
            if abs(slack) < 1e-6:  # Binding constraint
                print(f"  {name:25s} - BINDING (slack = {slack:.6f})")
            else:
                print(f"  {name:25s} - slack = {slack:.2f} units")


if __name__ == "__main__":
    lemonade, fruit_juice, total, status, problem = optimize_production()

    print_results(lemonade, fruit_juice, total, status, problem)

    analyze_constraints(problem)

    # Additional insights
    print("\n" + "=" * 70)
    print("BUSINESS INSIGHTS")
    print("=" * 70)

    if status == "Optimal":
        print(
            f"\n1. Optimal product mix achieves {total:.2f} total units of production"
        )
        print(
            f"2. Lemonade-to-Fruit Juice ratio: {lemonade / fruit_juice:.2f}:1"
            if fruit_juice > 0
            else "2. Only Lemonade is produced"
        )
        print(f"3. Resources fully utilized indicate production capacity constraints")
        print(f"4. To increase production, focus on expanding bottleneck resources")

    print("\n" + "=" * 70)
