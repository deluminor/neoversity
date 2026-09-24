# Comparison of Sorting Algorithms

## Task Description

The goal of this homework assignment is to compare the efficiency of three sorting algorithms:

1.  **Insertion Sort**.
2.  **Merge Sort**.
3.  **Timsort** (Python's built-in algorithm: `sorted` / `list.sort`).

A function for merging $k$ sorted lists has also been implemented.

## Testing Results

Testing was conducted on arrays of sizes 100, 1000, and 5000 elements.
Three types of data were used:

- **Random**: Random numbers.
- **Sorted**: Already sorted array.
- **Reverse**: Array sorted in reverse order.

Time is given in seconds (total for 5 runs).

| Size | Type | Insertion Sort | Merge Sort | Timsort |
| 100 | random | 0.00037 | 0.00030 | 0.00002 |
| 100 | sorted | 0.00002 | 0.00024 | 0.00000 |
| 100 | reverse | 0.00068 | 0.00023 | 0.00000 |
| 1000 | random | 0.03283 | 0.00295 | 0.00018 |
| 1000 | sorted | 0.00016 | 0.00228 | 0.00002 |
| 1000 | reverse | 0.05537 | 0.00230 | 0.00002 |
| 5000 | random | N/A (>2000)_ | 0.01725 | 0.00122 |
| 5000 | sorted | 0.00077 | 0.01334 | 0.00012 |
| 5000 | reverse | N/A (>2000)_ | 0.01368 | 0.00012 |

_\*Note: Insertion Sort for 5000 elements on random and reverse data takes too long for a quick test, which confirms its quadratic complexity._

## Conclusions

### 1. Insertion Sort

- **Efficiency**: Highly dependent on input data.
- **Best Case**: On already sorted data, it shows $O(N)$ performance, sometimes even outperforming Merge Sort on small volumes (as seen for 100/Sorted).
- **Worst Case**: On large or reverse arrays, it becomes extremely inefficient ($O(N^2)$), making it unsuitable for large datasets.

### 2. Merge Sort

- **Efficiency**: Stable $O(N \log N)$.
- **Characteristics**: Execution time is almost independent of data order (random, sorted, reverse show similar results).
- **Drawback**: Requires additional $O(N)$ memory and, in a pure Python implementation, runs slower than optimized C-code.

### 3. Timsort (Python `sorted`)

- **Efficiency**: The undisputed leader.
- **Why so fast?**:
  1.  **Hybridity**: Combines the strengths of Insertion Sort for small subarrays and Merge Sort for merging them.
  2.  **Adaptability**: Leverages existing data order ("runs"). This is evident in the results: on `Sorted` and `Reverse` data, it performs almost instantly.
  3.  **C Implementation**: The built-in function is written in C, providing a huge speed boost compared to interpreted Python code.

## Summary

Python's built-in algorithm (`Timsort`) is significantly more efficient than pure Python implementations of classical algorithms due to a combination of algorithmic optimizations and low-level implementation. This is why developers typically use `sorted()` and `list.sort()` instead of writing their own sorting functions.

## How to run

To run the tests:

```bash
python3 main.py
```

To run the optional task (merge_k_lists):

```bash
python3 task_2.py
```
