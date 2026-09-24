def binary_search_with_upper_bound(arr, target):
    if not arr:
        return (0, None)

    left = 0
    right = len(arr) - 1
    iterations = 0
    upper_bound = None

    while left <= right:
        iterations += 1
        mid = (left + right) // 2

        if arr[mid] == target:
            upper_bound = arr[mid]
            right = mid - 1
        elif arr[mid] < target:
            left = mid + 1
        else:
            upper_bound = arr[mid]
            right = mid - 1

    # Check if there's an element >= target
    if upper_bound is None and left < len(arr):
        upper_bound = arr[left]

    return (iterations, upper_bound)


if __name__ == "__main__":
    # Test with integer array
    arr1 = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
    print(f"Array: {arr1}\n")

    test_values = [5, 6, 1, 19, 20, 0]
    for val in test_values:
        iterations, upper_bound = binary_search_with_upper_bound(arr1, val)
        print(
            f"Search for {val:2d}: iterations={iterations}, upper_bound={upper_bound}"
        )

    # Test with floating point array
    print("\n" + "=" * 50)
    arr2 = [1.5, 2.3, 3.7, 5.1, 6.8, 8.2, 9.9, 11.4, 13.6, 15.8]
    print(f"Float array: {arr2}\n")

    test_values_float = [5.1, 5.0, 7.5, 16.0]
    for val in test_values_float:
        iterations, upper_bound = binary_search_with_upper_bound(arr2, val)
        print(
            f"Search for {val:5.1f}: iterations={iterations}, upper_bound={upper_bound}"
        )
