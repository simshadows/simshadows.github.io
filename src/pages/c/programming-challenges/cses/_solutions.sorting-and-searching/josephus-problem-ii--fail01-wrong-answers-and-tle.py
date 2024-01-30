#!/usr/bin/env python3

(n, k) = [int(s) for s in input().strip().split()]

skips = list(range(n))
def canonical(i):
    if i != skips[i]:
        skips[i] = canonical(skips[i])
    return skips[i]

cur = k - 1
for _ in range(n):
    nxt = canonical((cur + 1) % n)
    print(nxt + 1)
    cur = skips[nxt] = canonical((nxt + 1) % n)
    for _ in range(k - 1):
        cur = canonical((cur + 1) % n)
