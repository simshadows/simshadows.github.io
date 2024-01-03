#!/usr/bin/env python3

# input: 7
#   7 5 2
# 6 1 4 3

# 1 2 3 4

# 1 2 3 4 5 6
#

n = int(input())

if n <= 2:
    print("NO")
elif n % 2:
    print("YES")
    halflen = (n - 1) // 2
    print(halflen + 1)
    print(n, end=" ")
    (i, j) = (n - 2, 2)
    while i > j:
        print(i, j, end=" ")
        (i, j) = (i - 2, j + 2)
    print()
    print(halflen)
    (i, j) = (n - 1, 1)
    while i > j:
        print(i, j, end=" ")
        (i, j) = (i - 2, j + 2)
    print()
elif not ((n // 2) % 2):
    print("YES")
    print(n // 2)
    (i, j) = (n, 1)
    while i > j:
        print(i, j, end=" ")
        (i, j) = (i - 2, j + 2)
    print()
    print(n // 2)
    (i, j) = (n - 1, 2)
    while i > j:
        print(i, j, end=" ")
        (i, j) = (i - 2, j + 2)
    print()
else:
    print("NO")
