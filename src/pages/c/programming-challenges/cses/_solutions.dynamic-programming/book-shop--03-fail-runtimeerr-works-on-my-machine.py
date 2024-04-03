#!/usr/bin/env python3

from sys import stdin

(_, max_sum) = [int(s) for s in stdin.readline().strip().split()]
costs = [None, *(int(s) for s in stdin.readline().strip().split())]
pages = [None, *(int(s) for s in stdin.readline().strip().split())]

tab = [[0]*(max_sum + 1) for _ in range(len(costs))]
for i in range(1, len(costs)):
    for cur_max_sum in range(1, max_sum + 1):
        args = [tab[i - 1][cur_max_sum]]
        if cur_max_sum >= costs[i]:
            args.append(tab[i - 1][cur_max_sum - costs[i]] + pages[i])
        tab[i][cur_max_sum] = max(args)

print(tab[-1][-1])
