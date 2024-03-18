#!/usr/bin/env python3

from sys import stdin
from collections import deque
from heapq import heappush, heappop

stdin.readline()
graph = [[*s.strip(), '#'] for s in stdin.readlines()]

graph.append(['#']*len(graph[0]))
(len1, len2) = (len(graph), len(graph[0]))

a_loc = None
b_loc = None
for i in range(len1):
    for j in range(len2):
        if graph[i][j] == 'A':
            a_loc = (i, j)
            graph[i][j] = '#'  # marks cell as seen
        elif graph[i][j] == 'B':
            b_loc = (i, j)
            graph[i][j] = '.'

def heuristic_dist(i, j):
    return abs(i - b_loc[0]) + abs(j - b_loc[1])

pq = [(0, 0, *a_loc, None)]
solution = None
while (solution is None) and len(pq):
    tup = heappop(pq)
    (est, dist, i, j, _) = tup
    for ii, jj in ((i + 1, j), (i - 1, j), (i, j + 1), (i, j - 1)):
        if graph[ii][jj] == '#':
            continue
        graph[ii][jj] = '#'  # marks cell as seen
        candidate = (dist + 1 + heuristic_dist(ii, jj), dist + 1, ii, jj, tup)
        if (ii, jj) == b_loc:
            solution = candidate
            break
        heappush(pq, candidate)

if solution is None:
    print("NO")
else:
    path = []
    while solution[4] is not None:
        prev = solution[4]
        (difi, difj) = (solution[2] - prev[2], solution[3] - prev[3])
        path.append(
            'D' if (difi == 1) else
            'U' if (difi == -1) else
            'R' if (difj == 1) else
            'L'
        )
        solution = prev
    print("YES")
    print(len(path))
    print("".join(reversed(path)))
