#!/usr/bin/env python3

(_, target) = [int(s) for s in input().strip().split()]
nums = [int(s) for s in input().strip().split()]

(acc, leftsums, solution) = (0, {0}, 0)
for v in nums:
    acc += v
    if acc - target in leftsums:
        solution += 1
    leftsums.add(acc)
print(solution)
