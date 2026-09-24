import matplotlib.pyplot as plt
import numpy as np
import scipy.integrate as spi


def f(x):
    return x**2


def monte_carlo_integration(func, a, b, num_samples=100000):
    x_random = np.random.uniform(a, b, num_samples)
    y_random = func(x_random)
    integral = (b - a) * np.mean(y_random)

    # Standard error estimate
    variance = np.var(y_random)
    std_error = (b - a) * np.sqrt(variance / num_samples)

    return integral, std_error


def analytical_integral(a, b):
    return (b**3 / 3) - (a**3 / 3)


def scipy_integration(func, a, b):
    result, error = spi.quad(func, a, b)
    return result, error


def visualize_function(func, a, b, mc_result=None):
    x = np.linspace(-0.5, 2.5, 400)
    y = func(x)

    fig, ax = plt.subplots(figsize=(10, 6))
    ax.plot(x, y, "r", linewidth=2, label="f(x) = x²")

    # Fill area under curve
    ix = np.linspace(a, b, 100)
    iy = func(ix)
    ax.fill_between(ix, iy, color="gray", alpha=0.3, label="Integration area")

    # Add integration bounds
    ax.axvline(x=a, color="blue", linestyle="--", alpha=0.7, label=f"x = {a}")
    ax.axvline(x=b, color="blue", linestyle="--", alpha=0.7, label=f"x = {b}")

    # Configure plot
    ax.set_xlim([x[0], x[-1]])
    ax.set_ylim([0, max(y) + 0.5])
    ax.set_xlabel("x", fontsize=12)
    ax.set_ylabel("f(x)", fontsize=12)
    ax.set_title(
        f"Integration of f(x) = x² from {a} to {b}", fontsize=14, fontweight="bold"
    )
    ax.grid(True, alpha=0.3)
    ax.legend(loc="upper left")

    # Add result annotation if provided
    if mc_result is not None:
        ax.text(
            0.5,
            3.5,
            f"Monte Carlo Result: {mc_result:.6f}",
            bbox=dict(boxstyle="round", facecolor="wheat", alpha=0.5),
            fontsize=11,
        )

    plt.tight_layout()
    plt.savefig("integration_plot.png", dpi=300, bbox_inches="tight")
    print("Plot saved as 'integration_plot.png'")
    plt.show()


def run_convergence_test(func, a, b, sample_sizes):
    analytical = analytical_integral(a, b)
    results = {}

    print("\nConvergence Analysis:")
    print("=" * 80)
    print(f"{'Samples':<15} {'MC Result':<15} {'Error':<15} {'Rel Error %':<15}")
    print("-" * 80)

    for n in sample_sizes:
        mc_result, std_error = monte_carlo_integration(func, a, b, n)
        error = abs(mc_result - analytical)
        rel_error = (error / analytical) * 100

        results[n] = {
            "result": mc_result,
            "std_error": std_error,
            "error": error,
            "rel_error": rel_error,
        }

        print(f"{n:<15} {mc_result:<15.6f} {error:<15.6f} {rel_error:<15.4f}")

    print("=" * 80)

    return results


if __name__ == "__main__":
    a = 0  # Lower bound
    b = 2  # Upper bound
    num_samples = 100000

    print("=" * 80)
    print("MONTE CARLO INTEGRATION: f(x) = x² from 0 to 2")
    print("=" * 80)

    # 1. Monte Carlo integration
    print(f"\n1. Monte Carlo Method (n = {num_samples:,} samples)")
    print("-" * 80)
    mc_result, mc_error = monte_carlo_integration(f, a, b, num_samples)
    print(f"Result: {mc_result:.10f}")
    print(f"Standard Error: ±{mc_error:.10f}")

    # 2. Analytical solution
    print(f"\n2. Analytical Solution")
    print("-" * 80)
    analytical_result = analytical_integral(a, b)
    print(f"∫₀² x²dx = [x³/3]₀² = {b}³/3 - {a}³/3 = {analytical_result:.10f}")

    # 3. SciPy quad
    print(f"\n3. SciPy quad() Method")
    print("-" * 80)
    scipy_result, scipy_error = scipy_integration(f, a, b)
    print(f"Result: {scipy_result:.10f}")
    print(f"Error Estimate: {scipy_error:.2e}")

    # 4. Comparison
    print(f"\n4. Comparison of Methods")
    print("=" * 80)
    print(f"{'Method':<25} {'Result':<20} {'Absolute Error':<20}")
    print("-" * 80)

    mc_abs_error = abs(mc_result - analytical_result)
    scipy_abs_error = abs(scipy_result - analytical_result)

    print(f"{'Analytical (Exact)':<25} {analytical_result:<20.10f} {0:<20.10f}")
    print(f"{'Monte Carlo':<25} {mc_result:<20.10f} {mc_abs_error:<20.10f}")
    print(f"{'SciPy quad':<25} {scipy_result:<20.10f} {scipy_abs_error:<20.10f}")

    print("\n" + "-" * 80)
    mc_rel_error = (mc_abs_error / analytical_result) * 100
    scipy_rel_error = (scipy_abs_error / analytical_result) * 100

    print(f"Monte Carlo Relative Error: {mc_rel_error:.4f}%")
    print(f"SciPy quad Relative Error:  {scipy_rel_error:.6f}%")

    # 5. Convergence test
    sample_sizes = [100, 1000, 10000, 100000, 500000, 1000000]
    convergence_results = run_convergence_test(f, a, b, sample_sizes)

    # 6. Visualization
    print("\n" + "=" * 80)
    print("VISUALIZATION")
    print("=" * 80)
    visualize_function(f, a, b, mc_result)

    # 7. Conclusions
    print("\n" + "=" * 80)
    print("CONCLUSIONS")
    print("=" * 80)
    print(f"""
1. Monte Carlo method provides good approximation with sufficient samples
   - With 100,000 samples: error ≈ {mc_abs_error:.6f} ({mc_rel_error:.4f}%)

2. SciPy's quad() is extremely accurate
   - Uses adaptive quadrature for high precision
   - Error: {scipy_abs_error:.2e} (essentially machine precision)

3. Monte Carlo accuracy improves with √n
   - Error decreases proportionally to 1/√(number of samples)
   - For 1% accuracy, need ~10,000 samples
   - For 0.1% accuracy, need ~1,000,000 samples

4. Method comparison:
   - Analytical: Exact, but only works for simple functions
   - Monte Carlo: Universal, good for complex/multidimensional integrals
   - SciPy quad: Best balance of accuracy and ease of use

5. Monte Carlo is particularly useful when:
   - Function is complex or multidimensional
   - Analytical solution doesn't exist
   - Approximate result is sufficient
    """)

    print("=" * 80)
