#!/usr/bin/env python3

from sys import stdin
from math import inf
from heapq import heappush, heappop

print("lmao")

def run(f):
    citymap = [s.strip() for s in f.readlines()]
    goal = (len(citymap) - 1, len(citymap[0]) - 1)

    seen = set()
    pq = [(0, 0, 0, 0, 1, 0)]
    def pqpush(cost, i, j, travel_i, travel_j, moves):
        if (0 <= i <= goal[0]) and (0 <= j <= goal[1]):
            heappush(pq, (cost + int(citymap[i][j]), i, j, travel_i, travel_j, moves))

    solution = inf
    while len(pq):
        (cost, i, j, travel_i, travel_j, moves) = heappop(pq)
        if (i, j, travel_i, travel_j, moves) in seen:
            continue
        if (i, j) == goal:
            print(cost)
            return
        seen.add((i, j, travel_i, travel_j, moves))
        if moves < 10:
            pqpush(cost, i + travel_i, j + travel_j, travel_i, travel_j, moves + 1)
        if 4 <= moves <= 10:
            if travel_i:
                pqpush(cost, i, j + 1, 0, 1, 1)
                pqpush(cost, i, j - 1, 0, -1, 1)
            elif travel_j:
                pqpush(cost, i + 1, j, 1, 0, 1)
                pqpush(cost, i - 1, j, -1, 0, 1)
    raise RuntimeError()

run(stdin)
