#!/usr/bin/env python3

input()
nums = [int(s) for s in input().strip().split()]

seen = [True] + ([False]*len(nums))
rounds = 1
for v in nums:
    if not seen[v - 1]:
        rounds += 1
    seen[v] = True
print(rounds)
