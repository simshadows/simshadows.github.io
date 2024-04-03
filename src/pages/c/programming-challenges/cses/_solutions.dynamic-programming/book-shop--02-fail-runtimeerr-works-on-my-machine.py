#!/usr/bin/env python3

from sys import stdin

(_, max_sum) = [int(s) for s in stdin.readline().strip().split()]
costs = [None, *(int(s) for s in stdin.readline().strip().split())]
pages = [None, *(int(s) for s in stdin.readline().strip().split())]

tab = [[0]*(max_sum + 1) for _ in range(len(costs))]
for i in range(1, len(costs)):
    for cur_max_sum in range(max_sum + 1):
        if cur_max_sum < costs[i]:
            tab[i][cur_max_sum] = tab[i - 1][cur_max_sum]
        else:
            tab[i][cur_max_sum] = max(
                tab[i - 1][cur_max_sum - costs[i]] + pages[i],
                tab[i - 1][cur_max_sum],
            )

print(tab[-1][-1])
