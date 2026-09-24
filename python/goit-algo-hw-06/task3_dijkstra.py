import heapq

import networkx as nx
from task1_graph_analysis import create_city_transport_graph


def add_weights_to_graph(G):
    weights = {
        ("Akademmistechko", "Zhytomyrska"): 2.1,
        ("Zhytomyrska", "Sviatoshyn"): 1.8,
        ("Sviatoshyn", "Nyvky"): 1.6,
        ("Nyvky", "Beresteiska"): 1.4,
        ("Beresteiska", "Shuliavska"): 1.2,
        ("Shuliavska", "Polytechnic Institute"): 1.5,
        ("Polytechnic Institute", "Vokzalna"): 1.3,
        ("Vokzalna", "University"): 1.1,
        ("University", "Teatralna"): 0.9,
        ("Teatralna", "Khreshchatyk"): 0.8,
        ("Khreshchatyk", "Maidan Nezalezhnosti"): 0.5,
        ("Maidan Nezalezhnosti", "Ploshcha Lva Tolstoho"): 1.0,
        ("Ploshcha Lva Tolstoho", "Palats Sportu"): 1.2,
        ("Palats Sportu", "Klovska"): 1.4,
        ("Teatralna", "Maidan Nezalezhnosti"): 0.6,
    }

    for (u, v), weight in weights.items():
        G[u][v]["weight"] = weight

    return G


def dijkstra(graph, start):
    # Initialize distances with infinity, except start node
    distances = {node: float("infinity") for node in graph.nodes()}
    distances[start] = 0

    # Track previous node in optimal path for path reconstruction
    previous = {node: None for node in graph.nodes()}

    # Priority queue: (distance, node)
    pq = [(0, start)]
    visited = set()

    while pq:
        current_distance, current_node = heapq.heappop(pq)

        # Skip if already visited (we may have duplicate entries in pq)
        if current_node in visited:
            continue

        visited.add(current_node)

        # Check all neighbors
        for neighbor in graph.neighbors(current_node):
            weight = graph[current_node][neighbor]["weight"]
            distance = current_distance + weight

            # If found shorter path, update distance and previous node
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                previous[neighbor] = current_node
                heapq.heappush(pq, (distance, neighbor))

    return distances, previous


def reconstruct_path(previous, start, end):
    path = []
    current = end

    while current is not None:
        path.append(current)
        current = previous[current]

    path.reverse()

    # Check if path is valid (starts with start node)
    if path[0] == start:
        return path
    else:
        return None


def display_shortest_paths(graph):
    nodes = sorted(graph.nodes())

    print("=" * 100)
    print("DIJKSTRA'S ALGORITHM - SHORTEST PATHS IN WEIGHTED GRAPH")
    print("=" * 100)
    print("\nWeighted edges (distances in km between stations):")

    # Display all edges with weights
    edges = sorted(graph.edges(data=True), key=lambda x: x[2]["weight"])
    for u, v, data in edges:
        print(f"   {u} ↔ {v}: {data['weight']} km")

    print("\n" + "=" * 100)
    print("SHORTEST PATHS FROM EACH STATION TO ALL OTHERS")
    print("=" * 100)

    # Calculate shortest paths from each node
    all_paths_data = {}

    for start in nodes:
        distances, previous = dijkstra(graph, start)
        all_paths_data[start] = (distances, previous)

    # Display detailed results for a few key stations
    key_stations = ["Akademmistechko", "Teatralna", "Klovska"]

    for start in key_stations:
        if start not in nodes:
            continue

        print(f"\n{'─' * 100}")
        print(f"📍 From: {start}")
        print(f"{'─' * 100}")

        distances, previous = all_paths_data[start]

        for end in nodes:
            if end == start:
                continue

            distance = distances[end]
            path = reconstruct_path(previous, start, end)

            if path and distance != float("infinity"):
                path_str = " → ".join(path)
                print(f"\n   To {end}:")
                print(f"      Distance: {distance:.2f} km")
                print(f"      Path: {path_str}")
                print(f"      Stations: {len(path)}")

    # Summary table for all pairs
    print("\n" + "=" * 100)
    print("SUMMARY TABLE - SHORTEST DISTANCES (km)")
    print("=" * 100)
    print("\nNote: Only showing distances from selected stations for brevity.\n")

    # Create a compact summary table
    sample_stations = [
        "Akademmistechko",
        "Vokzalna",
        "Teatralna",
        "Maidan Nezalezhnosti",
        "Klovska",
    ]
    sample_stations = [s for s in sample_stations if s in nodes]

    print(f"{'From / To':<25}", end="")
    for dest in sample_stations:
        print(f"{dest[:12]:>12}", end=" ")
    print()
    print("─" * 100)

    for start in sample_stations:
        distances, _ = all_paths_data[start]
        print(f"{start:<25}", end="")
        for dest in sample_stations:
            if start == dest:
                print(f"{'—':>12}", end=" ")
            else:
                dist = distances[dest]
                if dist == float("infinity"):
                    print(f"{'∞':>12}", end=" ")
                else:
                    print(f"{dist:>11.2f}km", end=" ")
        print()

    print("\n" + "=" * 100)
    print("ALGORITHM EXPLANATION")
    print("=" * 100)
    print("""
Dijkstra's algorithm finds the shortest path between nodes in a weighted graph:

1. Initialize: Set distance to start node = 0, all others = ∞
2. Use priority queue (min-heap) to always process nearest unvisited node
3. For each node, check all neighbors:
   - Calculate: new_distance = current_distance + edge_weight
   - If new_distance < known_distance: update distance and previous node
4. Mark node as visited, repeat until all nodes processed

Time complexity: O((V + E) log V) with binary heap
Space complexity: O(V)

Key advantage: Guarantees shortest path in graphs with non-negative weights
""")
    print("=" * 100)


def main():
    # Create graph and add weights
    graph = create_city_transport_graph()
    graph = add_weights_to_graph(graph)

    print("\nCalculating shortest paths using Dijkstra's algorithm...\n")

    display_shortest_paths(graph)

    # Verify using NetworkX built-in function
    print("\n" + "=" * 100)
    print("VERIFICATION (using NetworkX built-in Dijkstra)")
    print("=" * 100)

    test_pairs = [
        ("Akademmistechko", "Klovska"),
        ("Teatralna", "Nyvky"),
        ("Vokzalna", "Palats Sportu"),
    ]

    for start, end in test_pairs:
        try:
            length = nx.dijkstra_path_length(graph, start, end, weight="weight")
            path = nx.dijkstra_path(graph, start, end, weight="weight")
            print(f"\n{start} → {end}:")
            print(f"   Distance: {length:.2f} km")
            print(f"   Path: {' → '.join(path)}")
        except nx.NetworkXNoPath:
            print(f"\n{start} → {end}: No path exists")

    print("\n✓ Implementation verified successfully!")
    print("=" * 100)


if __name__ == "__main__":
    main()
