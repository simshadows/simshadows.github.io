#!/usr/bin/env python3

n = int(input())

skips = list(range(n))
def canonical(i):
    if i != skips[i]:
        skips[i] = canonical(skips[i])
    return skips[i]

cur = 0
for _ in range(n):
    nxt = canonical((cur + 1) % n)
    print(nxt + 1)
    cur = skips[nxt] = canonical((nxt + 1) % n)
