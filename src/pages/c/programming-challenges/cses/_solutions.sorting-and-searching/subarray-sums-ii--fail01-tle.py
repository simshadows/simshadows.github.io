#!/usr/bin/env python3

from collections import Counter

(_, target) = [int(s) for s in input().strip().split()]
nums = [int(s) for s in input().strip().split()]

(acc, leftsums, solution) = (0, Counter((0,)), 0)
for v in nums:
    acc += v
    if acc - target in leftsums:
        solution += leftsums[acc - target]
    leftsums[acc] += 1
print(solution)
