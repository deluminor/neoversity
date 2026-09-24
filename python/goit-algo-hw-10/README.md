# Linear Programming and Randomized Algorithms

This homework consists of two independent tasks demonstrating optimization techniques and Monte Carlo simulation.

---

## Task 1: Production Optimization

### Problem Statement

A company produces two types of beverages: **Lemonade** and **Fruit Juice**.

**Resources Available:**

- Water: 100 units
- Sugar: 50 units
- Lemon Juice: 30 units
- Fruit Puree: 40 units

**Production Requirements:**

- **Lemonade**: 2 Water + 1 Sugar + 1 Lemon Juice → 1 unit
- **Fruit Juice**: 2 Fruit Puree + 1 Water → 1 unit

**Objective:** Maximize total production.

### Mathematical Model

**Decision Variables:**

- `L` = units of Lemonade to produce
- `F` = units of Fruit Juice to produce

**Objective Function:**

```
Maximize: L + F
```

**Constraints:**

```
2L + 1F ≤ 100   (Water)
1L     ≤ 50    (Sugar)
1L     ≤ 30    (Lemon Juice)
    2F ≤ 40    (Fruit Puree)
L, F   ≥ 0     (Non-negativity)
```

### Solution

Using PuLP (Python Linear Programming library), the optimal solution is:

```
Lemonade:     30.00 units
Fruit Juice:  20.00 units
TOTAL:        50.00 units
```

**Resource Utilization:**

- Water: 80/100 units (80.0%) ⚡ Highly utilized
- Sugar: 30/50 units (60.0%)
- Lemon Juice: 30/30 units (100.0%) ⚠️ **BOTTLENECK**
- Fruit Puree: 40/40 units (100.0%) ⚠️ **BOTTLENECK**

### Key Insights

1. **Bottlenecks identified:** Lemon Juice and Fruit Puree are fully utilized
2. **Optimal ratio:** Lemonade:Fruit Juice = 1.5:1
3. **To increase production:**
   - Acquire more Lemon Juice (increases Lemonade capacity)
   - Acquire more Fruit Puree (increases Fruit Juice capacity)
4. **Water and Sugar have slack:** Not limiting factors at current production levels

---

## Task 2: Monte Carlo Integration

### Problem Statement

Calculate the definite integral of **f(x) = x²** from **0 to 2** using Monte Carlo method.

**Analytical Solution:**

```
∫₀² x²dx = [x³/3]₀² = 8/3 - 0 = 2.666666...
```

### Monte Carlo Method

**Algorithm:**

1. Generate N random points x ∈ [0, 2]
2. Calculate f(x) for each point
3. Estimate integral as: `(b - a) × average(f(x))`

**Why it works:**
The average value theorem states that the integral equals the average function value times the interval width.

### Results Comparison

Using **100,000 samples:**

| Method                 | Result       | Absolute Error | Relative Error |
| ---------------------- | ------------ | -------------- | -------------- |
| **Analytical (Exact)** | 2.6666666667 | 0.0000000000   | 0.0000%        |
| **Monte Carlo**        | 2.6667231842 | 0.0000565175   | 0.0021%        |
| **SciPy quad()**       | 2.6666666667 | 2.96e-14       | ~0.0000%       |

### Convergence Analysis

| Samples   | MC Result | Error    | Relative Error % |
| --------- | --------- | -------- | ---------------- |
| 100       | 2.714533  | 0.047867 | 1.7950%          |
| 1,000     | 2.662311  | 0.004355 | 0.1633%          |
| 10,000    | 2.668045  | 0.001378 | 0.0517%          |
| 100,000   | 2.666723  | 0.000057 | 0.0021%          |
| 500,000   | 2.666801  | 0.000134 | 0.0050%          |
| 1,000,000 | 2.666582  | 0.000085 | 0.0032%          |

**Key Observation:** Error decreases approximately as **1/√N**

### Visualization

The script generates a plot showing:

- Function curve f(x) = x²
- Integration area (shaded gray region)
- Integration bounds (x = 0 and x = 2)
- Monte Carlo result annotation

![Integration Plot](integration_plot.png)

### Conclusions

#### 1. **Monte Carlo Accuracy**

✅ **Advantages:**

- Good approximation with sufficient samples (0.002% error with 100k samples)
- Universal method - works for any integrable function
- Scalable to multidimensional integrals
- No need for analytical solution

⚠️ **Limitations:**

- Requires many samples for high precision
- Slower convergence than deterministic methods (1/√N)
- Random variation between runs

#### 2. **Method Comparison**

**When to use each:**

| Method          | Best For                                          | Accuracy                | Speed   |
| --------------- | ------------------------------------------------- | ----------------------- | ------- |
| **Analytical**  | Simple functions with known antiderivatives       | Exact                   | Instant |
| **SciPy quad**  | General 1D integrals                              | Very High (10⁻¹⁴)       | Fast    |
| **Monte Carlo** | Complex, multidimensional, or stochastic problems | Moderate (depends on N) | Slower  |

#### 3. **Statistical Properties**

- **Standard Error** decreases as σ/√N
- For 0.1% accuracy: need ~100,000 samples
- For 0.01% accuracy: need ~10,000,000 samples
- Confidence intervals can be constructed using CLT

#### 4. **Practical Recommendations**

For this specific integral (f(x) = x²):

- ✅ **Best:** Analytical solution (instant, exact)
- ✅ **Good:** SciPy quad (machine precision, easy)
- ⚠️ **Overkill:** Monte Carlo (educational purpose)

Monte Carlo shines when:

- 🎯 High-dimensional integrals (curse of dimensionality)
- 🎯 Complex domains or boundaries
- 🎯 Stochastic simulations
- 🎯 No closed-form solution exists

#### 5. **Verification**

All three methods agree to high precision:

- Analytical and SciPy: **identical to machine precision**
- Monte Carlo: **within 0.002% of exact value**
- ✓ Monte Carlo implementation is **verified correct**

---

## Installation

```bash
pip install -r requirements.txt
```

**Dependencies:**

- `pulp` - Linear programming
- `numpy` - Numerical computations
- `scipy` - Scientific computing (quad integration)
- `matplotlib` - Visualization

---

## Usage

### Task 1: Production Optimization

```bash
python task1_production.py
```

**Output:**

- Optimal production quantities
- Resource utilization breakdown
- Bottleneck analysis
- Business insights

### Task 2: Monte Carlo Integration

```bash
python task2_monte_carlo.py
```

**Output:**

- Monte Carlo result with error estimate
- Analytical solution
- SciPy quad result
- Comparison table
- Convergence analysis
- Visualization plot (saved as `integration_plot.png`)

---

## Project Structure

```
goit-algo-hw-10/
├── task1_production.py      # Linear programming solution
├── task2_monte_carlo.py     # Monte Carlo integration
├── requirements.txt         # Python dependencies
├── README.md                # This file
└── integration_plot.png     # Generated visualization
```

---

## Mathematical Background

### Linear Programming (Task 1)

Linear programming solves optimization problems of the form:

```
Maximize/Minimize: c^T x
Subject to:        Ax ≤ b
                   x ≥ 0
```

**Simplex Algorithm:** Used by PuLP to find optimal vertex of feasible region.

### Monte Carlo Integration (Task 2)

Based on **Law of Large Numbers:**

```
∫ₐᵇ f(x)dx ≈ (b-a) × (1/N) × Σf(xᵢ)
```

where `xᵢ ~ Uniform(a, b)`

**Error:** σ/√N where σ = standard deviation of f(x)

---

## Results Summary

### Task 1

- ✅ Maximum production: **50 units** (30 Lemonade + 20 Fruit Juice)
- ✅ Bottlenecks: Lemon Juice and Fruit Puree (100% utilized)
- ✅ Optimal solution found using PuLP

### Task 2

- ✅ Monte Carlo (100k samples): **2.666723** (0.002% error)
- ✅ Analytical: **2.666667** (exact)
- ✅ SciPy quad: **2.666667** (machine precision)
- ✅ Methods agree - Monte Carlo implementation verified

---

## Author

Implementation demonstrates practical applications of:

- Linear Programming optimization
- Monte Carlo simulation techniques
- Statistical validation and error analysis
- Professional Python coding standards
