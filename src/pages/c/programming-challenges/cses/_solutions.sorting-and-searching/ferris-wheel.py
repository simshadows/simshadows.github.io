#!/usr/bin/env python3

from collections import deque

(_, max_weight) = [int(x) for x in input().strip().split()]
dq = deque(sorted(int(x) for x in input().strip().split()))

gondolas = 0
while len(dq) > 1:
    gondolas += 1
    if dq[0] + dq[-1] <= max_weight:
        dq.popleft()
    dq.pop()
print(gondolas + (len(dq) > 0))
