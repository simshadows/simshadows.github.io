#!/usr/bin/env python3

n = int(input())

tab = [0]*(n + 1)
for v in range(1, n + 1):
    tab[v] = 1 + min(tab[v - int(c)] for c in str(v) if (c != '0'))

print(tab[-1])
