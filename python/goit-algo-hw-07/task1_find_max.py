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


def find_max(root: Optional[Node]) -> Optional[int]:
    if root is None:
        return None

    current = root
    while current.right is not None:
        current = current.right

    return current.value


def find_max_recursive(root: Optional[Node]) -> Optional[int]:
    if root is None:
        return None

    if root.right is None:
        return root.value

    return find_max_recursive(root.right)


if __name__ == "__main__":
    bst = BinarySearchTree()

    values = [10, 5, 15, 3, 7, 12, 18, 1, 4, 6, 8, 11, 14, 17, 20]
    for value in values:
        bst.insert(value)

    max_value = find_max(bst.root)
    print(f"Maximum value in the tree (iterative): {max_value}")

    max_value_recursive = find_max_recursive(bst.root)
    print(f"Maximum value in the tree (recursive): {max_value_recursive}")

    empty_tree = BinarySearchTree()
    print(f"Maximum value in empty tree: {find_max(empty_tree.root)}")

    single_node_tree = BinarySearchTree()
    single_node_tree.insert(42)
    print(f"Maximum value in single-node tree: {find_max(single_node_tree.root)}")
