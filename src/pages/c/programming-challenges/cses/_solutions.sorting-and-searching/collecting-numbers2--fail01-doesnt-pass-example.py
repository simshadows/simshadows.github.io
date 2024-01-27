#!/usr/bin/env python3

from sys import stdin

stdin.readline()
nums = [int(s) for s in stdin.readline().strip().split()]
ops = [[int(x) - 1 for x in s.strip().split()] for s in stdin.readlines()]
# ops is now 0-indexed instead of 1-indexed

idx = {0: -1, (len(nums) + 1): len(nums)} # {num: index}
rounds = 1
for i, v in enumerate(nums):
    if (v - 1) not in idx:
        rounds += 1
    idx[v] = i

print(nums)
print(idx)
print(rounds)
print()

for a, b in ops:
    (av, bv) = (nums[a], nums[b])
    a1 = (idx[av + 1] > idx[av] > idx[av - 1])
    b1 = (idx[bv + 1] > idx[bv] > idx[bv - 1])

    (nums[a], nums[b]) = (nums[b], nums[a])
    (idx[av], idx[bv]) = (idx[bv], idx[av])

    a2 = (idx[av + 1] > idx[av] > idx[av - 1])
    b2 = (idx[bv + 1] > idx[bv] > idx[bv - 1])
    
    if a1:
        if a2:
            pass
        else:
            rounds += 1
    else:
        if a2:
            rounds -= 1
        else:
            pass

    if b1:
        if b2:
            pass
        else:
            rounds += 1
    else:
        if b2:
            rounds -= 1
        else:
            pass

    print(nums)
    print(idx)
    print(rounds)
    print()
