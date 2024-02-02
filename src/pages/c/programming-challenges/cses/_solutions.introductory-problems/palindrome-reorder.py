#!/usr/bin/env python3

from collections import Counter
 
s = input().strip()

cnt = Counter(s)
odds = [(c, v) for c, v in cnt.items() if (v % 2)]
evens = [(c, v) for c, v in cnt.items() if (v % 2 == 0)]

if len(odds) > 1:
    print("NO SOLUTION")
else:
    left = [c*(v // 2) for c, v in evens]
    mid = (odds[0][0]*odds[0][1]) if len(odds) else ""
    print("".join([*left, mid, *reversed(left)]))
