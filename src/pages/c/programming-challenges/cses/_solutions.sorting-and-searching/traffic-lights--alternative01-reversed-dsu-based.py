#!/usr/bin/env python3

from itertools import pairwise, chain

(x, _) = [int(x) for x in input().strip().split()]
p = [int(x) for x in input().strip().split()]
sorted_p = sorted(p)

p_to_interval = {v: i for i, v in enumerate(sorted_p, start=1)}
intervals = list(pairwise(chain((0,), sorted(p), (x,))))

groups = list(range(len(intervals)))
def canonical(i):
    if i != groups[i]:
        groups[i] = canonical(groups[i])
    return groups[i]

group_sizes = [b - a for a, b in intervals]

solution = [max(group_sizes)]
for pv in reversed(p):
    i = p_to_interval[pv]
    j = canonical(i - 1)
    group_sizes[j] += group_sizes[i]
    groups[i] = j
    solution.append(max(solution[-1], group_sizes[j]))
print(" ".join(str(v) for v in reversed(solution[:-1])))
