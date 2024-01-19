#!/usr/bin/env python3

from sys import stdin
from itertools import chain

stdin.readline()
customers = [[int(t) for t in s.strip().split()] for s in stdin.readlines()]

(cur_t, cur_cust, prev_max) = (0, 0, 0)
for t, v in sorted(chain(((x, 1) for x, _ in customers), ((x, -1) for _, x in customers))):
    if t != cur_t:
        prev_max = max(cur_cust, prev_max)
        cur_t = t
    cur_cust += v
print(max(cur_cust, prev_max))
