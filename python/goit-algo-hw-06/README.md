## Task 1: Graph Construction & Analysis

**File:** `task1_graph_analysis.py`

### Network Model

Simplified Kyiv Metro network with 15 stations and 3 lines:

- **Red Line (M1)**: Akademmistechko → Khreshchatyk (10 stations)
- **Blue Line (M2)**: Khreshchatyk → Klovska (4 stations)
- **Transfer hubs**: Teatralna ↔ Maidan Nezalezhnosti

```bash
python3 task1_graph_analysis.py
```

### Analysis Results

| Metric                 | Value  |
| ---------------------- | ------ |
| Nodes (stations)       | 15     |
| Edges (connections)    | 15     |
| Average degree         | 2.00   |
| Graph diameter         | 13     |
| Clustering coefficient | 0.1111 |

**Key findings:**

- Transfer stations (degree = 3): Teatralna, Maidan Nezalezhnosti
- Terminal stations (degree = 1): Akademmistechko, Klovska
- Longest path: Akademmistechko → Klovska (13 stations)
- Low clustering typical for linear metro topology

---

## Task 2: DFS & BFS Comparison

**File:** `task2_dfs_bfs.py`

```bash
python3 task2_dfs_bfs.py
```

### Algorithms Implemented

#### DFS (Depth-First Search)

- **Strategy**: Explore deep before backtracking
- **Data structure**: Stack (LIFO)
- **Implementation**: Recursive + iterative versions
- **Space**: O(h) where h is depth

#### BFS (Breadth-First Search)

- **Strategy**: Explore level by level
- **Data structure**: Queue (FIFO)
- **Implementation**: Iterative with deque
- **Space**: O(w) where w is width

### Traversal Comparison

Starting from **Teatralna** station:

**First 5 nodes:**

- **DFS**: Teatralna → Khreshchatyk → Maidan Nezalezhnosti → Ploshcha Lva Tolstoho → Palats Sportu
- **BFS**: Teatralna → Khreshchatyk → Maidan Nezalezhnosti → **University** → Ploshcha Lva Tolstoho

**Difference: 6 out of 15 positions**

### Why Paths Differ

**DFS behavior:**

1. From Teatralna (3 neighbors), picks first alphabetically: Khreshchatyk
2. Continues to Maidan Nezalezhnosti
3. **Goes deep** into Blue Line: Ploshcha → Palats → Klovska
4. Only then returns to explore University (Red Line)

**BFS behavior:**

1. From Teatralna, adds all 3 neighbors to queue
2. Processes them **level by level**: Khreshchatyk, Maidan, University
3. Then explores their neighbors: Ploshcha, Vokzalna, etc.
4. Spreads like ripples in water

**Key insight:** DFS fully explores one branch (Blue Line) before returning. BFS explores all neighbors at distance 1, then distance 2, etc.

---

## Task 3: Dijkstra's Algorithm

**File:** `task3_dijkstra.py`

```bash
python3 task3_dijkstra.py
```

### Implementation Details

- **Data structure**: Binary heap (heapq) for priority queue
- **Complexity**: O((V + E) log V) time, O(V) space
- **Edge weights**: Approximate distances in km between stations

### Sample Shortest Paths

**From Akademmistechko:**

| Destination        | Distance | Stations | Path                  |
| ------------------ | -------- | -------- | --------------------- |
| Zhytomyrska        | 2.10 km  | 2        | Direct connection     |
| Teatralna          | 12.90 km | 10       | Via Red Line          |
| Klovska (furthest) | 17.10 km | 14       | Full network traverse |

**From Teatralna (transfer hub):**

| Destination          | Distance | Path                               |
| -------------------- | -------- | ---------------------------------- |
| Maidan Nezalezhnosti | 0.60 km  | Teatralna → Maidan (transfer)      |
| Khreshchatyk         | 0.80 km  | Teatralna → Khreshchatyk           |
| University           | 0.90 km  | Teatralna → University             |
| Klovska              | 4.20 km  | Teatralna → Maidan → ... → Klovska |

### Distance Matrix (Sample)

|                     | Akademmistechko | Vokzalna | Teatralna | Klovska  |
| ------------------- | --------------- | -------- | --------- | -------- |
| **Akademmistechko** | —               | 10.90 km | 12.90 km  | 17.10 km |
| **Vokzalna**        | 10.90 km        | —        | 2.00 km   | 6.20 km  |
| **Teatralna**       | 12.90 km        | 2.00 km  | —         | 4.20 km  |
| **Klovska**         | 17.10 km        | 6.20 km  | 4.20 km   | —        |

### Verification

All results verified against NetworkX built-in `dijkstra_path()` — **100% match**.

---

## Conclusions

### Algorithm Comparison

| Algorithm    | Use Case                         | Guarantee        | Memory |
| ------------ | -------------------------------- | ---------------- | ------ |
| **DFS**      | Path finding, connectivity check | —                | O(h)   |
| **BFS**      | Shortest path (unweighted)       | Minimum hops     | O(w)   |
| **Dijkstra** | Shortest path (weighted)         | Minimum distance | O(V)   |

### Key Learnings

✅ DFS explores depth-first → good for complete exploration
✅ BFS explores breadth-first → guarantees shortest path in unweighted graphs
✅ Dijkstra uses priority queue → finds optimal path in weighted graphs
✅ Metro network is perfect real-world graph example

### Practical Applications

- **Metro navigation**: Dijkstra for shortest distance
- **Station accessibility**: BFS for minimum transfers
- **Network connectivity**: DFS for reachability analysis

---

## Project Structure

```
goit-algo-hw-06/
├── task1_graph_analysis.py    # Graph construction & analysis
├── task2_dfs_bfs.py            # DFS & BFS implementation
├── task3_dijkstra.py           # Dijkstra's algorithm
├── graph_visualization.png     # Network visualization
├── requirements.txt            # Python dependencies
└── README.md                   # Documentation
```

## Requirements

```bash
pip install -r requirements.txt
```

**Dependencies:**
- Python 3.8+
- NetworkX 3.0+
- Matplotlib 3.5+
