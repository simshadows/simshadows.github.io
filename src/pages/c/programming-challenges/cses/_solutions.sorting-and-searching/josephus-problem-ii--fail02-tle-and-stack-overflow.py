#!/usr/bin/env python3

(n, k) = [int(s) for s in input().strip().split()]

skips = list(range(n))
def canonical(i):
    if i != skips[i]:
        skips[i] = canonical(skips[i])
    return skips[i]

cur = 0
for _ in range(n):
    for _ in range(k):
        cur = canonical((cur + 1) % n)
    print(cur + 1)
    skips[cur] = canonical((cur + 1) % n)
    cur = canonical((cur + 1) % n)
