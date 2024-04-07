#!/usr/bin/env python3

from sys import stdin

MOD = int(1e9 + 7)

stdin.readline()
tests = [int(s) for s in stdin.readlines()]

tab = [(1, 1, None, None), (2, 3, 1, 1)]  # [(f_val, f_cum, s_val, s_cum), ...]
for _ in range(max(tests) - 1):
    (f_val, f_cum, s_val, s_cum) = tab[-1]
    s_val_new = (f_cum + (2 * s_cum)) % MOD
    f_val_new = (s_val_new + f_cum) % MOD
    tab.append((
        f_val_new,
        (f_val_new + f_cum) % MOD,
        s_val_new,
        (s_val_new + s_cum) % MOD,
    ))

for height in tests:
    print(tab[height][0])
