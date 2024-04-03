#!/usr/bin/env python3

n = int(input())

tab = [0]*(n + 1)
for v in range(1, n + 1):
    solution = n  # arbitrary large number
    v2 = v
    while v2 > 0:
        digit = v2 % 10
        if digit:
            solution = min(solution, tab[v - digit])
        v2 //= 10
    tab[v] = 1 + solution

print(tab[-1])
