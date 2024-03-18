#!/usr/bin/env python3

from sys import stdin
from collections import deque

(n, _) = [int(s) for s in stdin.readline().split()]

graph = [[] for _ in range(n + 1)]  # 0th index isn't used
for s in stdin.readlines():
    (a, b) = tuple(int(x) for x in s.split())
    graph[a].append(b)
    graph[b].append(a)

seen = {}  # {node: previous node before it}

dq = deque([1])
solution = None
while (not solution) and len(dq):
    i = dq.popleft()
    for j in graph[i]:
        if j in seen:
            continue
        elif j == n:
            solution = i
            break
        seen[j] = i
        dq.append(j)

if solution is None:
    print("IMPOSSIBLE")
else:
    path = [n]
    while solution != 1:
        path.append(solution)
        solution = seen[solution]
    print(len(path) + 1)
    print("1 " + " ".join(str(x) for x in reversed(path)))
