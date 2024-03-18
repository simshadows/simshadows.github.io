#!/usr/bin/env python3

from sys import stdin
from collections import defaultdict

(n, _) = [int(s) for s in stdin.readline().split()]

graph = defaultdict(list)
for s in stdin.readlines():
    (a, b) = tuple(int(x) for x in s.split())
    graph[a].append(b)
    graph[b].append(a)

unseen = set(range(2, n + 1))

def dfs(i):
    for j in graph[i]:
        if j in unseen:
            unseen.remove(j)
            dfs(j)

solution = []

dfs(1)
while len(unseen):
    i = unseen.pop()
    solution.append((1, i))
    dfs(i)

print(len(solution))
print("\n".join(f"{a} {b}" for a, b in solution))
