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

def op(x11, x12, x21, x22):
    global rounds
    x1 = int(x11) + int(x12)
    x2 = int(x21) + int(x22)
    match (x1, x2):
        case (2, 1):
            rounds += 1
        case (1, 2):
            rounds -= 1
        case (1, 0):
            rounds += 1
        case (0, 1):
            rounds -= 1
        case _:
            pass

for a, b in ops:
    (av, bv) = (nums[a], nums[b])
    a11 = idx[av] > idx[av - 1]
    a12 = idx[av + 1] > idx[av]
    b11 = idx[bv] > idx[bv - 1]
    b12 = idx[bv + 1] > idx[bv]

    (nums[a], nums[b]) = (nums[b], nums[a])
    (idx[av], idx[bv]) = (idx[bv], idx[av])

    a21 = idx[av] > idx[av - 1]
    a22 = idx[av + 1] > idx[av]
    b21 = idx[bv] > idx[bv - 1]
    b22 = idx[bv + 1] > idx[bv]

    op(a11, a12, a21, a22)
    op(b11, b12, b21, b22)

    print(nums)
    print(idx)
    print(rounds)
    print()
