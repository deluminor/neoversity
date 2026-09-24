import random
import timeit

from algorithms import insertion_sort, merge_sort


def measure_time(sort_func, data):
    return timeit.timeit(lambda: sort_func(data.copy()), number=5)


def generate_data(size, type="random"):
    if type == "random":
        return [random.randint(0, 10000) for _ in range(size)]
    elif type == "sorted":
        return list(range(size))
    elif type == "reverse":
        return list(range(size, 0, -1))
    return []


def run_benchmarks():
    sizes = [100, 1000, 5000]
    types = ["random", "sorted", "reverse"]

    print(
        f"{'Size':<10} | {'Type':<10} | {'Insertion Sort':<15} | {'Merge Sort':<15} | {'Timsort (sorted)':<15}"
    )
    print("-" * 75)

    for size in sizes:
        for dtype in types:
            data = generate_data(size, dtype)

            if size > 2000 and dtype != "sorted":
                t_insertion = "N/A (>2000)"
            else:
                t_insertion = f"{measure_time(insertion_sort, data):.5f}"

            t_merge = f"{measure_time(merge_sort, data):.5f}"
            t_timsort = f"{measure_time(sorted, data):.5f}"

            print(
                f"{size:<10} | {dtype:<10} | {t_insertion:<15} | {t_merge:<15} | {t_timsort:<15}"
            )


if __name__ == "__main__":
    run_benchmarks()
