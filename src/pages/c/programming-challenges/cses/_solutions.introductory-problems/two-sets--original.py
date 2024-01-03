#!/usr/bin/env python3

n = int(input())

def print_set(lst):
    print(len(lst))
    print(" ".join(str(x) for x in lst))

if n <= 2:
    print("NO")
elif n % 2:
    if (((n - 1) // 2) % 2):
        print("YES")
        halflen = (n - 1) // 2
        (i, j) = (n - 2, 2)
        lst = [n]
        while i > j:
            lst.extend((i, j))
            (i, j) = (i - 2, j + 2)
        print_set(lst)
        (i, j) = (n - 1, 1)
        lst = []
        while i > j:
            lst.extend((i, j))
            (i, j) = (i - 2, j + 2)
        print_set(lst)
    else:
        print("NO")
elif not ((n // 2) % 2):
    print("YES")
    (i, j) = (n, 1)
    lst = []
    while i > j:
        lst.extend((i, j))
        (i, j) = (i - 2, j + 2)
    print_set(lst)
    (i, j) = (n - 1, 2)
    lst = []
    while i > j:
        lst.extend((i, j))
        (i, j) = (i - 2, j + 2)
    print_set(lst)
else:
    print("NO")
