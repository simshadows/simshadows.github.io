#!/usr/bin/env python3

MOD = int(1e9 + 7)

n = int(input())

tab = [0, 0, 0, 0, 0, 1]
for i in range(n):
    tab[i % 6] = sum(tab) % MOD
print(tab[(n - 1) % 6])
