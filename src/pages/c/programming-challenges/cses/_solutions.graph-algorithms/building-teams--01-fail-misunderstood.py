#!/usr/bin/env python3

from sys import stdin

(n, _) = [int(s) for s in stdin.readline().split()]

graph = [[] for _ in range(n + 1)]  # 0th index isn't used
for s in stdin.readlines():
    (a, b) = tuple(int(x) for x in s.split())
    graph[a].append(b)
    graph[b].append(a)

teams = [2 for _ in range(n + 1)]

def dfs(i):
    for j in graph[i]:
        if teams[j] == 1:
            continue
        teams[j] = 1
        dfs(j)
teams[1] = 1
dfs(1)

if all((x == teams[1]) for x in teams[1:]):
    print("IMPOSSIBLE")
else:
    print(" ".join(str(x) for x in teams[1:]))
