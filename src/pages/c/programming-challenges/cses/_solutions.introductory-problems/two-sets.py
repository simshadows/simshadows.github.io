#!/usr/bin/env python3

n = int(input())

def print_set(lst):
    print(len(lst))
    print(" ".join(str(x) for x in lst))

def walk(lst, i, j):
    while i > j:
        lst.extend((i, j))
        (i, j) = (i - 2, j + 2)
    return lst

if n <= 2:
    print("NO")
elif n % 2:
    if (((n - 1) // 2) % 2):
        print("YES")
        print_set(walk([n], n - 2, 2))
        print_set(walk([], n - 1, 1))
    else:
        print("NO")
elif not ((n // 2) % 2):
    print("YES")
    print_set(walk([], n, 1))
    print_set(walk([], n - 1, 2))
else:
    print("NO")
