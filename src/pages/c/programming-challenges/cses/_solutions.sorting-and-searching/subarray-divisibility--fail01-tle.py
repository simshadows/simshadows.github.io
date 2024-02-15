#!/usr/bin/env python3

from collections import Counter

input()
nums = [int(s) for s in input().strip().split()]

target = len(nums)
pad = 1e9*target

(acc, leftsums, solution) = (0, Counter((0,)), 0)
for v in nums:
    acc = (acc + v + pad) % target
    if acc in leftsums:
        solution += leftsums[acc]
    leftsums[acc] += 1
print(solution)
