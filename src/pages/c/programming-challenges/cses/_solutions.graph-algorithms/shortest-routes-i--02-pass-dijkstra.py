#!/usr/bin/env python3

from sys import stdin
from heapq import heappush, heappop

(n, _) = [int(s) for s in stdin.readline().split()]

graph = [[] for _ in range(n + 1)]  # 0th index isn't used
for s in stdin.readlines():
    (a, b, w) = tuple(int(x) for x in s.split())
    graph[a].append((b, w))

dists = [-1 for _ in range(n + 1)]  # 0th index isn't used

pq = [(0, 1)]
while len(pq):
    (dist, i) = heappop(pq)
    if dists[i] == -1:
        dists[i] = dist
        for j, w in graph[i]:
            heappush(pq, (dist + w, j))

print(" ".join(str(x) for x in dists[1:]))
