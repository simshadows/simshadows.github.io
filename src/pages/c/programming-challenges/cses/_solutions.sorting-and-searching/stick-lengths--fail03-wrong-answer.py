#!/usr/bin/env python3

from itertools import accumulate, pairwise

input()
sticks = sorted(int(s) for s in input().strip().split())

(left, right) = (0, len(sticks) - 1)
(llen, rlen) = (1, 1)
cost = 0
while right > left:
    (llen, rlen) = (left + 1, len(sticks) - right)
    ladd = (sticks[left + 1] - sticks[left]) * llen
    radd = (sticks[right] - sticks[right - 1]) * rlen
    if ladd > radd:
        cost += radd
        right -= 1
    else:
        cost += ladd
        left += 1
print(cost)
