#!/usr/bin/env python3

from heapq import heappush, heappop
from math import inf, isinf

(n, num_roads, num_querys) = [int(s) for s in input().split()]

# adjacency matrix; 0th indices aren't used
graph = [[inf for _ in range(n + 1)] for _ in range(n + 1)]
querys = []

for _ in range(num_roads):
    (a, b, w) = tuple(int(x) for x in input().split())
    graph[a][b] = min(graph[a][b], w)
    graph[b][a] = min(graph[b][a], w)
for _ in range(num_querys):
    querys.append([int(x) for x in input().strip().split()])

# mark as seen for current query number (qnum) by marking the node with the qnum
seen = [-1 for _ in range(n + 1)]  # 0th index isn't used

for qnum, (a, b) in enumerate(querys):
    pq = [(0, a)]  # start at a
    solution = -1
    while len(pq):
        (dist, i) = heappop(pq)
        if seen[i] != qnum:
            if dist < graph[a][i]:
                graph[a][i] = dist
                graph[i][a] = dist
            
            if i == b:
                solution = dist
                break
            seen[i] = qnum
            for j, w in enumerate(graph[i][1:], start=1):
                if not isinf(w):
                    heappush(pq, (dist + w, j))
    print(solution)
