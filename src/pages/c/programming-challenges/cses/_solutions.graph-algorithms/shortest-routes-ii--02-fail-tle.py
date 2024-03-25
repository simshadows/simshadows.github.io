#!/usr/bin/env python3

from heapq import heappush, heappop
from math import inf, isinf

LARGE_C = int(2e9)

(n, num_roads, num_querys) = [int(s) for s in input().split()]

graph = [{} for _ in range(n + 1)]  # 0th index isn't used
querys = []

for _ in range(num_roads):
    (a, b, w) = tuple(int(x) for x in input().split())
    if (b not in graph[a]) or (graph[a][b] > w):
        graph[a][b] = w
        graph[b][a] = w
for _ in range(num_querys):
    querys.append([int(x) for x in input().strip().split()])

# Step 1: We figure out what's reachable

components = list(range(n + 1))  # 0th index isn't used
seen = [0 for _ in range(n + 1)]  # 0th index isn't used
for i in range(1, n + 1):
    if components[i] == i:
        stack = [i]
        while len(stack):
            j = stack.pop()
            if seen[j] == i:
                continue
            components[j] = i
            seen[j] = i
            for jj in graph[j].keys():
                stack.append(jj)

# adjacency matrix; 0th indices aren't used
shortest_cache = [[LARGE_C for _ in range(n + 1)] for _ in range(n + 1)]
seen = [-1 for _ in range(n + 1)]  # 0th index isn't used
for qi, (a, b) in enumerate(querys):
    if components[a] != components[b]:
        print(-1)
        continue
    elif shortest_cache[a][b] != LARGE_C:
        print(shortest_cache[a][b])
        continue

    pq = [(0, a)]  # start at a
    while len(pq):
        (dist, i) = heappop(pq)
        if seen[i] != qi:
            shortest_cache[a][i] = dist
            shortest_cache[i][a] = dist
            graph[a][i] = dist
            graph[i][a] = dist
            if i == b:
                print(dist)
                break
            seen[i] = qi
            for j, w in graph[i].items():
                if seen[j] != qi:
                    heappush(pq, (dist + w, j))
