#!/usr/bin/env python3

input()
nums = [int(s) for s in input().strip().split()]

stack = [(2e9, -1)]
for i, v in enumerate(nums):
    while len(stack) and (stack[-1][0] >= v):
        stack.pop()
    print((stack[-1][1] + 1) if len(stack) else 0)
    stack.append((v, i))
