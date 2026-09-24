from typing import Optional


class Node:
    def __init__(self, value: int) -> None:
        self.value = value
        self.left: Optional[Node] = None
        self.right: Optional[Node] = None


class BinarySearchTree:
    def __init__(self) -> None:
        self.root: Optional[Node] = None

    def insert(self, value: int) -> None:
        if self.root is None:
            self.root = Node(value)
        else:
            self._insert_recursive(self.root, value)

    def _insert_recursive(self, node: Node, value: int) -> None:
        if value < node.value:
            if node.left is None:
                node.left = Node(value)
            else:
                self._insert_recursive(node.left, value)
        else:
            if node.right is None:
                node.right = Node(value)
            else:
                self._insert_recursive(node.right, value)


def tree_sum(root: Optional[Node]) -> int:
    if root is None:
        return 0

    return root.value + tree_sum(root.left) + tree_sum(root.right)


def tree_sum_iterative(root: Optional[Node]) -> int:
    if root is None:
        return 0

    total = 0
    stack = [root]

    while stack:
        current = stack.pop()
        total += current.value

        if current.right:
            stack.append(current.right)
        if current.left:
            stack.append(current.left)

    return total


if __name__ == "__main__":
    bst = BinarySearchTree()

    values = [10, 5, 15, 3, 7, 12, 18, 1, 4, 6, 8, 11, 14, 17, 20]
    for value in values:
        bst.insert(value)

    total_sum = tree_sum(bst.root)
    print(f"Sum of all values in the tree (recursive): {total_sum}")
    print(f"Verification: {sum(values)} (should match)")

    total_sum_iterative = tree_sum_iterative(bst.root)
    print(f"Sum of all values in the tree (iterative): {total_sum_iterative}")

    empty_tree = BinarySearchTree()
    print(f"Sum of empty tree: {tree_sum(empty_tree.root)}")

    single_node_tree = BinarySearchTree()
    single_node_tree.insert(42)
    print(f"Sum of single-node tree: {tree_sum(single_node_tree.root)}")

    print("\nTree structure (values inserted):")
    print(f"Root: {bst.root.value}")
    print(f"Left subtree root: {bst.root.left.value if bst.root.left else None}")
    print(f"Right subtree root: {bst.root.right.value if bst.root.right else None}")
