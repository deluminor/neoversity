import matplotlib.pyplot as plt
import networkx as nx


def create_city_transport_graph():
    G = nx.Graph()

    stations = [
        "Akademmistechko",
        "Zhytomyrska",
        "Sviatoshyn",
        "Nyvky",
        "Beresteiska",
        "Shuliavska",
        "Polytechnic Institute",
        "Vokzalna",
        "University",
        "Teatralna",
        "Khreshchatyk",
        "Maidan Nezalezhnosti",
        "Ploshcha Lva Tolstoho",
        "Palats Sportu",
        "Klovska",
    ]

    G.add_nodes_from(stations)

    # Red Line (M1) connections
    edges = [
        ("Akademmistechko", "Zhytomyrska"),
        ("Zhytomyrska", "Sviatoshyn"),
        ("Sviatoshyn", "Nyvky"),
        ("Nyvky", "Beresteiska"),
        ("Beresteiska", "Shuliavska"),
        ("Shuliavska", "Polytechnic Institute"),
        ("Polytechnic Institute", "Vokzalna"),
        ("Vokzalna", "University"),
        ("University", "Teatralna"),
        ("Teatralna", "Khreshchatyk"),
        # Blue Line (M2) connections
        ("Khreshchatyk", "Maidan Nezalezhnosti"),
        ("Maidan Nezalezhnosti", "Ploshcha Lva Tolstoho"),
        ("Ploshcha Lva Tolstoho", "Palats Sportu"),
        ("Palats Sportu", "Klovska"),
        # Green Line (M3) transfer
        ("Teatralna", "Maidan Nezalezhnosti"),
    ]

    G.add_edges_from(edges)

    return G


def visualize_graph(G):
    plt.figure(figsize=(14, 10))

    pos = nx.spring_layout(G, k=2, iterations=50, seed=42)

    nx.draw_networkx_nodes(G, pos, node_color="lightblue", node_size=1500, alpha=0.9)
    nx.draw_networkx_edges(G, pos, width=2, alpha=0.6, edge_color="gray")
    nx.draw_networkx_labels(G, pos, font_size=8, font_weight="bold")

    plt.title("Kyiv Metro Network", fontsize=16, fontweight="bold")
    plt.axis("off")
    plt.tight_layout()
    plt.savefig("graph_visualization.png", dpi=300, bbox_inches="tight")
    plt.show()

    print("✓ Graph visualization saved as 'graph_visualization.png'")


def analyze_graph(G):
    print("=" * 60)
    print("GRAPH ANALYSIS - KYIV METRO NETWORK")
    print("=" * 60)

    print(f"\n📊 Basic Metrics:")
    print(f"   • Number of stations (nodes): {G.number_of_nodes()}")
    print(f"   • Number of connections (edges): {G.number_of_edges()}")
    print(
        f"   • Average degree: {sum(dict(G.degree()).values()) / G.number_of_nodes():.2f}"
    )

    print(f"\n🔗 Station Connectivity (Degree):")
    degrees = dict(G.degree())
    sorted_degrees = sorted(degrees.items(), key=lambda x: x[1], reverse=True)

    for station, degree in sorted_degrees:
        connections = "connection" if degree == 1 else "connections"
        if degree > 2:
            print(f"   • {station}: {degree} {connections} ⭐ (transfer station)")
        else:
            print(f"   • {station}: {degree} {connections}")

    # Calculate diameter if graph is connected
    if nx.is_connected(G):
        diameter = nx.diameter(G)
        print(f"\n📏 Graph Diameter: {diameter}")
        print(f"   (Maximum shortest path between any two stations)")

        # Find the longest shortest path
        all_pairs = dict(nx.all_pairs_shortest_path_length(G))
        max_pair = None
        max_length = 0
        for source in all_pairs:
            for target, length in all_pairs[source].items():
                if length > max_length:
                    max_length = length
                    max_pair = (source, target)

        if max_pair:
            print(
                f"   Longest route: {max_pair[0]} → {max_pair[1]} ({max_length} stations)"
            )

    # Clustering coefficient
    avg_clustering = nx.average_clustering(G)
    print(f"\n🔄 Average Clustering Coefficient: {avg_clustering:.4f}")
    print(f"   (Measure of how stations form local clusters)")

    print("\n" + "=" * 60)


def main():
    G = create_city_transport_graph()
    visualize_graph(G)
    analyze_graph(G)


if __name__ == "__main__":
    main()
