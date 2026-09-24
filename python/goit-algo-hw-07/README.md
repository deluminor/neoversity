# Homework #7: Binary Search Trees and AVL Trees

This homework focuses on working with Binary Search Trees (BST) and basic operations on them.

## Project Structure

```
goit-algo-hw-07/
├── task1_find_max.py      # Find maximum value in BST
├── task2_find_min.py      # Find minimum value in BST
├── task3_tree_sum.py      # Calculate sum of all values in BST
├── task4_comments.py      # Hierarchical comment system (optional)
└── README.md              # This file
```

## Tasks

### Task 1: Find Maximum Value

**File:** `task1_find_max.py`

**Description:** Function that finds the largest value in a binary search tree.

**Implementation:**

- In a BST, the maximum value is always located at the rightmost node
- Two implementations provided: iterative and recursive
- Complexity: O(h), where h is the tree height

**Run:**

```bash
python task1_find_max.py
```

**Expected output:**

```
Maximum value in the tree (iterative): 20
Maximum value in the tree (recursive): 20
Maximum value in empty tree: None
Maximum value in single-node tree: 42
```

---

### Task 2: Find Minimum Value

**File:** `task2_find_min.py`

**Description:** Function that finds the smallest value in a binary search tree.

**Implementation:**

- In a BST, the minimum value is always located at the leftmost node
- Two implementations provided: iterative and recursive
- Complexity: O(h), where h is the tree height

**Run:**

```bash
python task2_find_min.py
```

**Expected output:**

```
Minimum value in the tree (iterative): 1
Minimum value in the tree (recursive): 1
Minimum value in empty tree: None
Minimum value in single-node tree: 42
```

---

### Task 3: Sum of All Values

**File:** `task3_tree_sum.py`

**Description:** Function that calculates the sum of all values in a binary search tree.

**Implementation:**

- Uses recursive tree traversal (DFS - Depth-First Search)
- Iterative implementation with stack also provided
- Complexity: O(n), where n is the number of nodes in the tree

**Run:**

```bash
python task3_tree_sum.py
```

**Expected output:**

```
Sum of all values in the tree (recursive): 151
Verification: 151 (should match)
Sum of all values in the tree (iterative): 151
Sum of empty tree: 0
Sum of single-node tree: 42
```

---

### Task 4: Hierarchical Comment System (Optional)

**File:** `task4_comments.py`

**Description:** Implementation of a tree-like comment structure where each comment can have replies, which in turn can also have their own replies.

**Functionality:**

- `Comment` class that stores text, author, and list of replies
- `add_reply(comment)` — adds a reply to the comment
- `remove_reply()` — soft deletion of comment (changes text instead of physical removal)
- `display(indent)` — recursive display of comments with indentation

**Run:**

```bash
python task4_comments.py
```

**Expected output:**

```
=== Test case from assignment ===

Бодя: Яка чудова книга!
    Цей коментар було видалено.
        Сергій: Не книжка, а перевели купу паперу ні нащо...
    Марина: Що в ній чудового?
```

---

## Implementation Features

### Binary Search Tree (BST)

All tasks use a classic Binary Search Tree implementation:

- **`Node` class**: represents a single node with value and references to left and right children
- **`BinarySearchTree` class**: provides insertion operations and stores the tree root
- **BST property**: for each node, all values in the left subtree are smaller, and in the right subtree are larger

### Type Hints

All functions use type annotations (type hints) according to PEP 484 for better readability and type checking.

### Docstrings

Each function and class contains docstrings describing purpose, parameters, return values, and algorithm complexity.

## Technical Details

- **Language:** Python 3.10+
- **Code style:** PEP 8
- **Principles:** SOLID, DRY, KISS
- **Dependencies:** Only Python standard library (no requirements.txt needed)

## Testing

Each file contains an `if __name__ == "__main__"` block with test examples:

- Testing with different datasets
- Edge cases (empty tree, single node)
- Result correctness verification

## Algorithm Complexity

| Operation | Time Complexity | Space Complexity               |
| --------- | --------------- | ------------------------------ |
| find_max  | O(h)            | O(1) iterative, O(h) recursive |
| find_min  | O(h)            | O(1) iterative, O(h) recursive |
| tree_sum  | O(n)            | O(h) recursive, O(h) iterative |

where:

- `h` — tree height
- `n` — number of nodes

## Author

Completed as part of GoIT - Algorithms and Data Structures course

## License

Educational project for personal use
