#!/usr/bin/env python3

(_, target) = [int(s) for s in input().strip().split()]
nums = [int(s) for s in input().strip().split()]

(acc, leftsums, solution) = (0, {0: 1}, 0)
for v in nums:
    acc += v
    if acc - target in leftsums:
        solution += leftsums[acc - target]
    if acc in leftsums:
        leftsums[acc] += 1
    else:
        leftsums[acc] = 1
print(solution)
