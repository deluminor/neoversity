# Homework 08: Heaps and Heap Sort

## 📋 Tasks Overview

### Task 1: Cable Connection Cost Minimization (Required)

**File:** `task1_cable_connection.py`

**Problem:**
Given several network cables of different lengths, connect them in pairs using connectors. The cost of connecting two cables equals the sum of their lengths. Find the order of connections that minimizes the total cost.

**Solution Approach:**

- Use a min-heap to implement a greedy algorithm
- Always connect the two shortest cables first
- This minimizes total cost because shorter cables participate in fewer connections

**Algorithm:**

1. Convert the cable list to a min-heap
2. While more than one cable remains:
   - Extract the two shortest cables
   - Connect them (cost = sum of lengths)
   - Add the combined cable back to the heap
3. Sum all connection costs

**Complexity:**

- Time: O(n log n)
- Space: O(n)

**Example:**

```python
cables = [4, 3, 2, 6]
# Step 1: Connect 2 + 3 = 5, cost = 5
# Step 2: Connect 4 + 5 = 9, cost = 9
# Step 3: Connect 6 + 9 = 15, cost = 15
# Total cost: 5 + 9 + 15 = 29
```

### Task 2: Merge K Sorted Lists (Optional)

**File:** `task2_merge_k_lists.py`

**Problem:**
Given k sorted lists of integers, merge them into one sorted list efficiently.

**Solution Approach:**

- Use a min-heap to track the smallest element from each list
- Always extract the minimum element across all current list heads
- Add the next element from the same list to maintain heap invariant

**Algorithm:**

1. Initialize heap with the first element from each list
2. Store tuples: (value, list_index, element_index)
3. While heap is not empty:
   - Extract minimum element
   - Add to result
   - If the same list has more elements, add the next one to heap

**Complexity:**

- Time: O(N log k), where N = total elements, k = number of lists
- Space: O(k) for heap + O(N) for result

**Example:**

```python
lists = [[1, 4, 5], [1, 3, 4], [2, 6]]
# Result: [1, 1, 2, 3, 4, 4, 5, 6]
```

## 🚀 Usage

### Running Task 1:

```bash
python task1_cable_connection.py
```

**Output:**

```
==============================================================
CABLE CONNECTION COST MINIMIZATION
==============================================================

Example 1: Cables = [4, 3, 2, 6]

Connection process:
------------------------------------------------------------
Step 1: Connect cables 2 and 3 -> Cost: 5, Total: 5
Step 2: Connect cables 4 and 5 -> Cost: 9, Total: 14
Step 3: Connect cables 6 and 9 -> Cost: 15, Total: 29
------------------------------------------------------------
Minimum total cost: 29
```

### Running Task 2:

```bash
python task2_merge_k_lists.py
```

**Output:**

```
==============================================================
MERGE K SORTED LISTS
==============================================================

Example 1: [[1, 4, 5], [1, 3, 4], [2, 6]]

Merging process:
------------------------------------------------------------
Input lists: [[1, 4, 5], [1, 3, 4], [2, 6]]
Total elements to merge: 8
------------------------------------------------------------
Step 1: Extract 1 from list 0, merged so far: [1]
Step 2: Extract 1 from list 1, merged so far: [1, 1]
Step 3: Extract 2 from list 2, merged so far: [1, 1, 2]
...
------------------------------------------------------------
Merged list: [1, 1, 2, 3, 4, 4, 5, 6]
```

## 🧪 Using the Functions Programmatically

### Task 1:

```python
from task1_cable_connection import minimize_cable_cost

cables = [4, 3, 2, 6]
total_cost = minimize_cable_cost(cables)
print(f"Minimum cost: {total_cost}")  # Output: 29
```

### Task 2:

```python
from task2_merge_k_lists import merge_k_lists

lists = [[1, 4, 5], [1, 3, 4], [2, 6]]
merged = merge_k_lists(lists)
print(f"Merged list: {merged}")  # Output: [1, 1, 2, 3, 4, 4, 5, 6]
```

## 📚 Key Concepts

### Min-Heap (heapq)

Python's `heapq` module provides an efficient implementation of the heap queue algorithm (priority queue):

- `heapq.heapify(list)` - Transform list into a heap, in-place, in O(n) time
- `heapq.heappush(heap, item)` - Push item onto heap, maintaining heap invariant
- `heapq.heappop(heap)` - Pop and return smallest item from heap

### Why Heaps for These Problems?

**Cable Connection:**

- Need to repeatedly find and remove the two minimum elements
- Min-heap provides O(log n) for both operations
- Greedy approach: always connect shortest cables first

**K-Way Merge:**

- Need to find minimum among k list heads efficiently
- Direct comparison would be O(k) per element → O(Nk) total
- Min-heap reduces this to O(log k) per element → O(N log k) total

## 🎯 Learning Outcomes

1. **Heap Data Structure:**
   - Understanding min-heap properties
   - Efficient operations: insert O(log n), extract-min O(log n)
   - Using Python's `heapq` module

2. **Greedy Algorithms:**
   - Cable connection uses greedy approach
   - Proof: connecting shortest cables first minimizes total cost

3. **Complexity Analysis:**
   - Time and space complexity considerations
   - Trade-offs between different approaches

4. **Practical Applications:**
   - Network optimization (cable connection)
   - Data merging (k-way merge in external sorting)
   - Priority queues in scheduling

## 📝 Requirements

- Python 3.7+
