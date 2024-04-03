#!/usr/bin/env python3

from sys import stdin

(_, max_sum) = [int(s) for s in stdin.readline().strip().split()]
costs = [None, *(int(s) for s in stdin.readline().strip().split())]
pages = [None, *(int(s) for s in stdin.readline().strip().split())]

tab0 = [0]*(max_sum + 1)
tab1 = [0]*(max_sum + 1)
for i in range(1, len(costs)):
    for cur_max_sum in range(max_sum + 1):
        if cur_max_sum < costs[i]:
            tab1[cur_max_sum] = tab0[cur_max_sum]
        else:
            tab1[cur_max_sum] = max(
                tab0[cur_max_sum - costs[i]] + pages[i],
                tab0[cur_max_sum],
            )
    (tab0, tab1) = (tab1, tab0)

print(tab0[-1])
