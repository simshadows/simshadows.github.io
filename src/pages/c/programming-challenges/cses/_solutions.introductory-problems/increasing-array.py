#!/usr/bin/env python3

input()
nums = [int(s) for s in input().split()]

cur = 0
solution = 0
for n in nums:
    if n < cur:
        solution += cur - n
    else:
        cur = n

print(solution)
