#!/usr/bin/env python3

MOD = int(1e9 + 7)

n = int(input())

tab = [0, 0, 0, 0, 0, 1]
this_sum = 1
for i in range(n):
    i %= 6
    old = tab[i]
    tab[i] = this_sum
    this_sum = ((this_sum * 2) - old) % MOD
print(tab[(n - 1) % 6])
