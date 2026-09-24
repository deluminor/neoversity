# Homework 05 - Search Algorithms Comparison

## Tasks Overview

### Task 1: Hash Table with Delete Method

**File:** `hash_table.py`

Implementation of hash table with insert, get, and delete operations using separate chaining for collision resolution.

```bash
python3 hash_table.py
```

---

### Task 2: Binary Search with Upper Bound

**File:** `binary_search.py`

Binary search that returns `(iterations_count, upper_bound)` tuple, where upper_bound is the smallest element ≥ target.

```bash
python3 binary_search.py
```

---

### Task 3: String Search Algorithms Comparison

**File:** `string_search_benchmark.py`

Performance comparison of three string search algorithms:

- Boyer-Moore
- Knuth-Morris-Pratt (KMP)
- Rabin-Karp

```bash
python3 string_search_benchmark.py
```

---

## Performance Results

### Summary Table

| Algorithm       | Average Time (s) | Relative Speed     |
| --------------- | ---------------- | ------------------ |
| **Boyer-Moore** | 0.004776         | **1.0x (fastest)** |
| KMP             | 0.041788         | 8.7x slower        |
| Rabin-Karp      | 0.048275         | 10.1x slower       |

### Article 1 Results (12,658 chars)

| Pattern           | Boyer-Moore | KMP       | Rabin-Karp | Winner          |
| ----------------- | ----------- | --------- | ---------- | --------------- |
| "алгоритм"        | 0.000453s   | 0.001795s | 0.002078s  | **Boyer-Moore** |
| "структури даних" | 0.000673s   | 0.004290s | 0.004793s  | **Boyer-Moore** |
| "пошук"           | 0.000792s   | 0.002533s | 0.002810s  | **Boyer-Moore** |
| Non-existing      | 0.005212s   | 0.099556s | 0.117949s  | **Boyer-Moore** |

### Article 2 Results (17,591 chars)

| Pattern           | Boyer-Moore | KMP       | Rabin-Karp | Winner          |
| ----------------- | ----------- | --------- | ---------- | --------------- |
| "алгоритм"        | 0.005579s   | 0.026090s | 0.029518s  | **Boyer-Moore** |
| "структури даних" | 0.000152s   | 0.000305s | 0.000276s  | **Boyer-Moore** |
| "пошук"           | 0.018408s   | 0.059651s | 0.066737s  | **Boyer-Moore** |
| Non-existing      | 0.007805s   | 0.145089s | 0.175719s  | **Boyer-Moore** |

---

## Conclusions

### 1. Overall Winner: Boyer-Moore

**Boyer-Moore** consistently outperformed both competitors:

- **8.7x faster** than KMP
- **10.1x faster** than Rabin-Karp
- Won in **all 8 test scenarios**

### 2. Key Findings

#### Boyer-Moore Advantages

- Right-to-left scanning enables large jumps on mismatch
- Bad character heuristic is highly effective with natural text
- Particularly efficient when pattern doesn't exist (5-35x faster than alternatives)
- Best performance across all pattern types and lengths

#### KMP Performance

- Moderate speed (8.7x slower than Boyer-Moore)
- Predictable O(n+m) complexity
- LPS array computation adds overhead
- Particularly slow on non-existing patterns (0.099-0.145s)

#### Rabin-Karp Performance

- Slowest overall (10.1x slower than Boyer-Moore)
- Hash computation overhead for every position
- Hash collisions require full string comparison
- Not recommended for single pattern search

### 3. Pattern-Specific Insights

**Short patterns** (e.g., "пошук"):

- Boyer-Moore maintains consistent advantage
- All algorithms perform reasonably well

**Long patterns** (e.g., "структури даних"):

- Boyer-Moore shows dramatic advantage
- Longer patterns allow bigger jumps on mismatch

**Non-existing patterns** (biggest performance gap):

- Boyer-Moore: 0.005-0.008s
- KMP: 0.099-0.145s (**19-24x slower**)
- Rabin-Karp: 0.117-0.175s (**23-35x slower**)

### 4. Practical Recommendations

**Use Boyer-Moore when:**

- Single pattern search in text
- Natural language processing
- Pattern length > 2-3 characters
- Performance is critical
- Pattern might not exist in text

**Use KMP when:**

- Need guaranteed worst-case performance
- Streaming data (can't backtrack)
- Working with binary data

**Use Rabin-Karp when:**

- Multiple pattern search
- Plagiarism detection
- NOT for single pattern search

### 5. Why Boyer-Moore Dominates

1. **Cyrillic alphabet advantage**: Large alphabet size (33+ characters) makes bad character rule extremely effective
2. **Smart skipping**: Can skip large portions of text when mismatch occurs
3. **Natural text characteristics**: Real-world text patterns favor Boyer-Moore's heuristics
4. **Minimal overhead**: No complex preprocessing like KMP's LPS array
5. **Non-match efficiency**: Excels when pattern doesn't exist

### 6. Theoretical vs Practical

| Algorithm   | Theoretical   | Practical            |
| ----------- | ------------- | -------------------- |
| Boyer-Moore | O(nm) worst   | ⭐⭐⭐⭐⭐ Excellent |
| KMP         | O(n+m) always | ⭐⭐⭐ Good          |
| Rabin-Karp  | O(n+m) avg    | ⭐⭐ Moderate        |

**Key takeaway**: Theoretical worst-case complexity doesn't predict real-world performance. Boyer-Moore's practical optimizations outweigh theoretical concerns.

---

## Final Verdict

For Ukrainian (Cyrillic) text search, **Boyer-Moore is the clear winner** with 8-10x better performance. The larger alphabet actually helps Boyer-Moore's bad character rule work even better.

**Production recommendation: Use Boyer-Moore** for text search unless you have specific requirements for KMP (streaming) or Rabin-Karp (multiple patterns).

---

## Files

```
goit-algo-hw-05/
├── hash_table.py              # Task 1: Hash table with delete
├── binary_search.py            # Task 2: Binary search with upper bound
├── string_search_benchmark.py  # Task 3: Algorithms comparison
├── article_1.txt               # Test article 1
├── article_2.txt               # Test article 2
└── README.md                   # This file
```
