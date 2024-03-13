#!/usr/bin/env python3

MOD = int(1e9 + 7)

n = int(input())

tab = [1]
for _ in range(n):
    window_size = min(len(tab), 6)
    tab.append(sum(tab[-window_size:]) % MOD)
print(tab[-1])
