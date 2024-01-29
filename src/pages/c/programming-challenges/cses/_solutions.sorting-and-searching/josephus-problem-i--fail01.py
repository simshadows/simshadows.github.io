#!/usr/bin/env python3

n = int(input())

skips = list(range(n))
def canonical(i):
    if i != skips[i]:
        skips[i] = canonical(skips[i])
    return skips[i]

cur = 0
for _ in range(n):
    cur = canonical((cur + 1) % n)
    print(cur + 1)
    cur = skips[cur] = canonical((cur + 1) % n)
