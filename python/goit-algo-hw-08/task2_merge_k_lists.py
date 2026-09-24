import heapq


def merge_k_lists(lists: list[list[int]]) -> list[int]:
    if not lists:
        return []

    non_empty_lists = [lst for lst in lists if lst]

    if not non_empty_lists:
        return []

    merged = []

    heap = []

    for list_idx, lst in enumerate(non_empty_lists):
        if lst:
            heapq.heappush(heap, (lst[0], list_idx, 0))

    while heap:
        value, list_idx, elem_idx = heapq.heappop(heap)
        merged.append(value)

        if elem_idx + 1 < len(non_empty_lists[list_idx]):
            next_value = non_empty_lists[list_idx][elem_idx + 1]
            heapq.heappush(heap, (next_value, list_idx, elem_idx + 1))

    return merged


def merge_k_lists_verbose(lists: list[list[int]]) -> list[int]:
    if not lists:
        return []

    non_empty_lists = [lst for lst in lists if lst]

    if not non_empty_lists:
        return []

    print("\nMerging process:")
    print("-" * 60)
    print(f"Input lists: {non_empty_lists}")
    print(f"Total elements to merge: {sum(len(lst) for lst in non_empty_lists)}")
    print("-" * 60)

    merged = []
    heap = []

    for list_idx, lst in enumerate(non_empty_lists):
        if lst:
            heapq.heappush(heap, (lst[0], list_idx, 0))

    step = 0
    while heap:
        value, list_idx, elem_idx = heapq.heappop(heap)
        merged.append(value)

        step += 1
        if step <= 10 or len(heap) == 0:
            print(
                f"Step {step}: Extract {value} from list {list_idx}, "
                f"merged so far: {merged[-min(5, len(merged)) :]}"
            )

        if elem_idx + 1 < len(non_empty_lists[list_idx]):
            next_value = non_empty_lists[list_idx][elem_idx + 1]
            heapq.heappush(heap, (next_value, list_idx, elem_idx + 1))

    print("-" * 60)
    return merged


def main():
    print("=" * 60)
    print("MERGE K SORTED LISTS")
    print("=" * 60)

    lists1 = [[1, 4, 5], [1, 3, 4], [2, 6]]
    print(f"\nExample 1: {lists1}")
    result1 = merge_k_lists_verbose(lists1)
    print(f"Merged list: {result1}")

    lists2 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    print(f"\n\nExample 2: {lists2}")
    result2 = merge_k_lists(lists2)
    print(f"Merged list: {result2}")

    lists3 = [[1, 3, 5, 7], [2, 4, 6, 8], [0, 9, 10]]
    print(f"\n\nExample 3: {lists3}")
    result3 = merge_k_lists(lists3)
    print(f"Merged list: {result3}")

    lists4 = [[1, 2, 3, 4, 5]]
    print(f"\n\nExample 4: {lists4} (single list)")
    result4 = merge_k_lists(lists4)
    print(f"Merged list: {result4}")

    lists5 = [[], [1, 3], [], [2, 4], []]
    print(f"\n\nExample 5: {lists5} (with empty lists)")
    result5 = merge_k_lists(lists5)
    print(f"Merged list: {result5}")

    lists6 = [[i] for i in range(10, 0, -1)]
    print(f"\n\nExample 6: Ten single-element lists in descending order")
    result6 = merge_k_lists(lists6)
    print(f"Merged list: {result6}")

    print("\n" + "=" * 60)
    print("\nAlgorithm explanation:")
    print("- Use min-heap to track smallest element from each list")
    print("- Always extract minimum element across all list heads")
    print("- Add next element from the same list to heap")
    print("- Time complexity: O(N log k)")
    print("  where N = total elements, k = number of lists")
    print("- Space complexity: O(k) for heap + O(N) for result")
    print("=" * 60)


if __name__ == "__main__":
    main()
