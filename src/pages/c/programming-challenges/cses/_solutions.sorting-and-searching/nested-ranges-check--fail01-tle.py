#!/usr/bin/env python3

from sys import stdin
from collections import Counter, defaultdict

stdin.readline()
ranges = [
    (*(int(x) for x in s.strip().split()), i)  # (start, end, index)
    for i, s in enumerate(stdin.readlines())
]

grouped = defaultdict(list)
cnt = Counter()  # {(start, end): count}
for tup in ranges:
    grouped[tup[0]].append(tup)
    cnt[(tup[0], tup[1])] += 1
for v in grouped.values():
    v.sort(key=lambda x: x[1])
grouped = sorted(grouped.items())

# check if range contains another range
solution = [0]*len(ranges)
cum_min_end = grouped[-1][1][-1][1] + 1  # arbitrary large end
for start, lst in reversed(grouped):
    for _, end, i in lst:
        if (cnt[(start, end)] > 1) or (end >= cum_min_end):
            solution[i] = 1
        cum_min_end = min(cum_min_end, end)  # only updates at the start of a group... hmmmm....
print(" ".join(str(x) for x in solution))

# check if range is contained in another range
solution = [0]*len(ranges)
cum_max_end = 0
for start, lst in grouped:
    for _, end, i in reversed(lst):
        if (cnt[(start, end)] > 1) or (end <= cum_max_end):
            solution[i] = 1
        cum_max_end = max(cum_max_end, end)  # only updates at the start of a group... hmmmm....
print(" ".join(str(x) for x in solution))
