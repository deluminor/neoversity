import timeit


def boyer_moore_search(text, pattern):
    m = len(pattern)
    n = len(text)

    if m == 0:
        return 0
    if m > n:
        return -1

    # Build bad character table
    bad_char = {}
    for i in range(m):
        bad_char[pattern[i]] = i

    shift = 0
    while shift <= n - m:
        j = m - 1

        while j >= 0 and pattern[j] == text[shift + j]:
            j -= 1

        if j < 0:
            return shift
        else:
            # Shift based on bad character
            bad_char_shift = j - bad_char.get(text[shift + j], -1)
            shift += max(1, bad_char_shift)

    return -1


def compute_lps(pattern):
    """Compute LPS array for KMP"""
    m = len(pattern)
    lps = [0] * m
    length = 0
    i = 1

    while i < m:
        if pattern[i] == pattern[length]:
            length += 1
            lps[i] = length
            i += 1
        else:
            if length != 0:
                length = lps[length - 1]
            else:
                lps[i] = 0
                i += 1
    return lps


def kmp_search(text, pattern):
    n = len(text)
    m = len(pattern)

    if m == 0:
        return 0
    if m > n:
        return -1

    lps = compute_lps(pattern)
    i = 0
    j = 0

    while i < n:
        if pattern[j] == text[i]:
            i += 1
            j += 1

        if j == m:
            return i - j
        elif i < n and pattern[j] != text[i]:
            if j != 0:
                j = lps[j - 1]
            else:
                i += 1

    return -1


def rabin_karp_search(text, pattern, d=256, q=101):
    m = len(pattern)
    n = len(text)

    if m == 0:
        return 0
    if m > n:
        return -1

    h = 1
    p = 0
    t = 0

    # Calculate h = d^(m-1) % q
    for i in range(m - 1):
        h = (h * d) % q

    # Calculate initial hash
    for i in range(m):
        p = (d * p + ord(pattern[i])) % q
        t = (d * t + ord(text[i])) % q

    # Slide pattern
    for i in range(n - m + 1):
        if p == t:
            if text[i : i + m] == pattern:
                return i

        if i < n - m:
            t = (d * (t - ord(text[i]) * h) + ord(text[i + m])) % q
            if t < 0:
                t += q

    return -1


def read_file(filename):
    encodings = ["utf-8", "cp1251", "windows-1251", "iso-8859-1", "utf-8-sig"]

    for encoding in encodings:
        try:
            with open(filename, "r", encoding=encoding) as f:
                return f.read()
        except (UnicodeDecodeError, UnicodeError):
            continue
        except FileNotFoundError:
            print(f"Error: File '{filename}' not found.")
            return ""

    # Fallback with error replacement
    try:
        with open(filename, "r", encoding="utf-8", errors="replace") as f:
            return f.read()
    except Exception as e:
        print(f"Error reading file '{filename}': {e}")
        return ""


def measure_time(algorithm, text, pattern, number=100):
    return timeit.timeit(lambda: algorithm(text, pattern), number=number)


def run_comparison():
    print("=" * 80)
    print("STRING SEARCH ALGORITHMS COMPARISON")
    print("=" * 80)

    article_1 = read_file("article_1.txt")
    article_2 = read_file("article_2.txt")

    if not article_1 or not article_2:
        print("Error: Could not read article files.")
        return

    print(f"\nArticle 1 length: {len(article_1)} characters")
    print(f"Article 2 length: {len(article_2)} characters")

    # Test patterns
    existing_patterns = ["алгоритм", "структури даних", "пошук"]
    non_existing_pattern = "вигаданий_підрядок_який_не_існує_123"
    all_patterns = existing_patterns + [non_existing_pattern]

    algorithms = {
        "Boyer-Moore": boyer_moore_search,
        "KMP": kmp_search,
        "Rabin-Karp": rabin_karp_search,
    }

    results = {
        "Article 1": {pattern: {} for pattern in all_patterns},
        "Article 2": {pattern: {} for pattern in all_patterns},
    }

    articles = {"Article 1": article_1, "Article 2": article_2}

    for article_name, article_text in articles.items():
        print(f"\n{'=' * 80}")
        print(f"{article_name}")
        print(f"{'=' * 80}")

        for pattern in all_patterns:
            pattern_type = (
                "NON-EXISTING" if pattern == non_existing_pattern else "EXISTING"
            )
            print(f"\nPattern: '{pattern}' ({pattern_type})")
            print(f"{'Algorithm':<20} | {'Time (s)':<12} | {'Found at':<10}")
            print("-" * 50)

            for algo_name, algo_func in algorithms.items():
                time_taken = measure_time(algo_func, article_text, pattern, number=100)
                index = algo_func(article_text, pattern)

                results[article_name][pattern][algo_name] = {
                    "time": time_taken,
                    "index": index,
                }

                found_text = f"{index}" if index != -1 else "Not found"
                print(f"{algo_name:<20} | {time_taken:<12.6f} | {found_text:<10}")

    # Summary
    print(f"\n{'=' * 80}")
    print("SUMMARY")
    print(f"{'=' * 80}")

    for article_name in articles.keys():
        print(f"\n{article_name}:")
        print(f"{'Pattern':<35} | {'Fastest':<20} | {'Time (s)':<12}")
        print("-" * 75)

        for pattern in all_patterns:
            pattern_results = results[article_name][pattern]
            fastest = min(pattern_results.items(), key=lambda x: x[1]["time"])
            fastest_name = fastest[0]
            fastest_time = fastest[1]["time"]

            pattern_short = pattern[:32] + "..." if len(pattern) > 35 else pattern
            print(f"{pattern_short:<35} | {fastest_name:<20} | {fastest_time:<12.6f}")

    # Overall
    print(f"\n{'=' * 80}")
    print("OVERALL AVERAGE")
    print(f"{'=' * 80}")

    algo_totals = {algo: 0 for algo in algorithms.keys()}
    test_count = 0

    for article_name in articles.keys():
        for pattern in all_patterns:
            for algo_name in algorithms.keys():
                algo_totals[algo_name] += results[article_name][pattern][algo_name][
                    "time"
                ]
                test_count += 1

    algo_averages = {
        algo: total / (test_count / len(algorithms))
        for algo, total in algo_totals.items()
    }

    print(f"\n{'Algorithm':<20} | {'Avg Time (s)':<15}")
    print("-" * 40)

    sorted_algos = sorted(algo_averages.items(), key=lambda x: x[1])
    for algo_name, avg_time in sorted_algos:
        print(f"{algo_name:<20} | {avg_time:<15.6f}")

    fastest_overall = sorted_algos[0][0]
    print(f"\n🏆 Fastest: {fastest_overall}")
    print("=" * 80)


if __name__ == "__main__":
    run_comparison()
