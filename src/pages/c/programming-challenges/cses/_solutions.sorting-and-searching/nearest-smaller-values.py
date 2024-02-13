#!/usr/bin/env python3

from bisect import bisect_left

input()
nums = [int(s) for s in input().strip().split()]

stack = [(2e9, -1)]
for i, v in enumerate(nums):
    j = bisect_left(stack, v, key=lambda x: x[0]) - 1
    print(0 if (j < 0) else stack[j][1] + 1)
    while len(stack) and (stack[-1][0] >= v):
        stack.pop()
    stack.append((v, i))
