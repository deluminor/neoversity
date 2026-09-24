# Coin Change Algorithms: Greedy vs Dynamic Programming

## Overview

This project implements and compares two algorithms for making change in a cash register system:

1. **Greedy Algorithm** (`find_coins_greedy`)
2. **Dynamic Programming** (`find_min_coins`)

**Coin denominations:** `[50, 25, 10, 5, 2, 1]`

---

## Algorithms Description

### 1. Greedy Algorithm

The greedy algorithm selects the largest possible coin denomination at each step until the remaining amount is zero.
**Time Complexity:** O(n) where n = number of coin denominations (constant = 6)
**Space Complexity:** O(1) - only stores result dictionary

**Pros:**

- Extremely fast execution
- Simple implementation
- Low memory consumption

**Cons:**

- Not guaranteed to find optimal solution for all coin systems
- Only works optimally for canonical coin systems

---

### 2. Dynamic Programming

The DP algorithm uses bottom-up approach to guarantee finding the minimum number of coins.
**Time Complexity:** O(amount × n) where n = number of coin denominations
**Space Complexity:** O(amount) for DP tables

**Pros:**

- Guarantees optimal solution
- Works for any coin system

**Cons:**

- Significantly slower for large amounts
- Higher memory consumption
- Overkill for canonical coin systems

---

## Performance Comparison

### Benchmark Results

Test conditions:

- **Hardware:** Apple Silicon (M-series)
- **Iterations:** 100 per test
- **Python:** 3.x

| Amount | Greedy (ms) | DP (ms)  | Speedup Factor |
| ------ | ----------- | -------- | -------------- |
| 10     | 0.000223    | 0.001963 | 8.8x           |
| 113    | 0.000335    | 0.021637 | **64.5x**      |
| 500    | 0.000151    | 0.094100 | 622x           |
| 1,000  | 0.000136    | 0.168030 | 1,234x         |
| 5,000  | 0.000122    | 0.776770 | 6,366x         |
| 10,000 | 0.000102    | 1.537953 | 15,075x        |
| 50,000 | 0.000107    | 8.733067 | **81,328x**    |

### Key Findings

1. **Greedy is consistently faster** - from 8x for small amounts to **81,000x** for large amounts
2. **DP time grows linearly** with amount (O(amount × n) complexity confirmed)
3. **Greedy time is constant** regardless of amount (O(n) confirmed)

---

## Complexity Analysis

### Time Complexity (Big-O)

**Greedy Algorithm:**

- Best case: O(1) - if amount equals first coin
- Worst case: O(n) - iterate through all coins
- Average: O(n) where n = 6 (constant)

**Dynamic Programming:**

- Best case: O(amount × n)
- Worst case: O(amount × n)
- Always: O(amount × n) where n = 6

**Example for amount = 10,000:**

- Greedy: 6 operations (constant)
- DP: 10,000 × 6 = 60,000 operations

### Space Complexity

**Greedy:**

- O(k) where k = number of unique coins in result (≤ n)
- Practical: O(1) - at most 6 entries

**Dynamic Programming:**

- O(amount) for `dp` array
- O(amount) for `coin_used` array
- Total: O(2 × amount) = O(amount)

**Example for amount = 10,000:**

- Greedy: ~6 integers = 24 bytes
- DP: 2 × 10,000 integers = ~80 KB

---

## When to Use Each Algorithm

### Use Greedy When:

✅ **Canonical coin systems** (like [50, 25, 10, 5, 2, 1])
✅ **Performance is critical** (high-frequency operations)
✅ **Large amounts** (greedy advantage increases exponentially)
✅ **Memory constrained** environments

**Example:** Cash register systems, ATMs, vending machines

### Use Dynamic Programming When:

✅ **Non-canonical coin systems** (e.g., [25, 10, 1] where greedy fails)
✅ **Optimality is critical** over performance
✅ **Small amounts** (performance difference negligible)
✅ **Proof of optimality required**

**Example:** Cryptocurrency denomination optimization, theoretical analysis

---

## Canonical Coin Systems

Our coin set `[50, 25, 10, 5, 2, 1]` is **canonical**, meaning greedy always finds optimal solution.

**Proof by example (amount = 113):**

- Greedy: `{50: 2, 10: 1, 2: 1, 1: 1}` = 5 coins ✓
- DP: `{50: 2, 10: 1, 2: 1, 1: 1}` = 5 coins ✓
- **Both produce identical optimal result**

This is why greedy works perfectly for real-world currency systems.

---

## Conclusions

1. **For this specific task (coins [50, 25, 10, 5, 2, 1]):**
   - Greedy algorithm is **optimal choice** in production
   - DP is academically interesting but practically unnecessary
   - Performance gap reaches **80,000x** for large amounts

2. **Theoretical insights:**
   - Greedy's O(n) vs DP's O(amount × n) difference is **massive** in practice
   - Space complexity difference becomes critical for large amounts
   - Canonical property eliminates need for DP guarantees

3. **Practical recommendation:**
   - **Cash register systems:** Use greedy
   - **Generic coin change solver:** Use DP
   - **High-performance systems:** Always use greedy for canonical sets

4. **Big-O validation:**
   - Benchmark data perfectly matches theoretical complexity
   - Linear growth of DP time with amount confirmed
   - Constant time of greedy confirmed

---

## Usage

### Run main examples:

```bash
python3 main.py
```

### Run comprehensive tests:

```bash
python3 test_examples.py
```

### Run performance benchmark:

```bash
python3 benchmark.py
```

### Example output:

```python
from main import find_coins_greedy, find_min_coins

# Example: Make change for 113
greedy_result = find_coins_greedy(113)
# Result: {50: 2, 10: 1, 2: 1, 1: 1}

dp_result = find_min_coins(113)
# Result: {50: 2, 10: 1, 2: 1, 1: 1}

# Both algorithms return the same optimal solution
```

---

## Files Structure

```
goit-algo-hw-09/
├── main.py              # Core implementations
├── benchmark.py         # Performance comparison
├── test_examples.py     # Test suite
└── README.md            # This file
```

---
