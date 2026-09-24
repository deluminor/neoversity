from collections import deque

from task1_graph_analysis import create_city_transport_graph


def dfs_recursive(graph, start, visited=None, path=None):
    if visited is None:
        visited = set()
        path = []

    visited.add(start)
    path.append(start)

    # Sort neighbors for consistent traversal order
    neighbors = sorted(graph.neighbors(start))

    for neighbor in neighbors:
        if neighbor not in visited:
            dfs_recursive(graph, neighbor, visited, path)

    return path


def dfs_iterative(graph, start):
    visited = set()
    path = []
    stack = [start]

    while stack:
        vertex = stack.pop()

        if vertex not in visited:
            visited.add(vertex)
            path.append(vertex)

            # Add neighbors in reverse sorted order to maintain consistency with recursive version
            neighbors = sorted(graph.neighbors(vertex), reverse=True)
            for neighbor in neighbors:
                if neighbor not in visited:
                    stack.append(neighbor)

    return path


def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    path = []

    while queue:
        vertex = queue.popleft()
        path.append(vertex)

        # Sort neighbors for consistent traversal order
        neighbors = sorted(graph.neighbors(vertex))

        for neighbor in neighbors:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return path


def display_paths(dfs_path, bfs_path, start_node):
    print("=" * 80)
    print("GRAPH TRAVERSAL ALGORITHMS COMPARISON")
    print("=" * 80)
    print(f"\nStarting node: {start_node}")
    print(f"Total nodes in graph: {len(dfs_path)}")

    print("\n" + "─" * 80)
    print("🔹 DEPTH-FIRST SEARCH (DFS) - Goes Deep First")
    print("─" * 80)
    print("\nTraversal order:")
    for i, node in enumerate(dfs_path, 1):
        print(f"  {i:2d}. {node}")

    print("\n" + "─" * 80)
    print("🔸 BREADTH-FIRST SEARCH (BFS) - Goes Wide First")
    print("─" * 80)
    print("\nTraversal order:")
    for i, node in enumerate(bfs_path, 1):
        print(f"  {i:2d}. {node}")

    print("\n" + "=" * 80)
    print("KEY DIFFERENCES")
    print("=" * 80)

    print("\n🔹 DFS (Depth-First Search):")
    print("   • Uses STACK (LIFO - Last In, First Out)")
    print("   • Goes deep into one branch before exploring others")
    print("   • Memory usage: O(h) where h is the height/depth")
    print("   • Use case: Finding paths, maze solving, topological sort")

    print("\n🔸 BFS (Breadth-First Search):")
    print("   • Uses QUEUE (FIFO - First In, First Out)")
    print("   • Explores all neighbors at current level first")
    print("   • Memory usage: O(w) where w is the maximum width")
    print("   • Use case: Shortest path in unweighted graph, level-order traversal")

    print("\n📊 Path Comparison:")
    differences = sum(1 for i in range(len(dfs_path)) if dfs_path[i] != bfs_path[i])
    print(f"   • Positions where paths differ: {differences} out of {len(dfs_path)}")
    print(f"   • DFS first 5 nodes: {' → '.join(dfs_path[:5])}")
    print(f"   • BFS first 5 nodes: {' → '.join(bfs_path[:5])}")

    print("\n💡 Why are paths different?")
    print("   DFS explores the first neighbor completely before returning to explore")
    print("   other neighbors, creating a deep traversal pattern. BFS explores all")
    print("   immediate neighbors first, then their neighbors, creating a wide")
    print("   spreading pattern like ripples in water.")

    print("\n" + "=" * 80)


def main():
    graph = create_city_transport_graph()
    start_node = "Teatralna"

    print(f"\nPerforming graph traversal from '{start_node}' station...\n")

    dfs_path = dfs_recursive(graph, start_node)
    bfs_path = bfs(graph, start_node)

    display_paths(dfs_path, bfs_path, start_node)


if __name__ == "__main__":
    main()
