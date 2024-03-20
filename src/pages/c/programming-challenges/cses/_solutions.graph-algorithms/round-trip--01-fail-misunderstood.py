#!/usr/bin/env python3

from sys import stdin

(n, _) = [int(s) for s in stdin.readline().split()]

graph = [[] for _ in range(n + 1)]  # 0th index isn't used
for s in stdin.readlines():
    (a, b) = tuple(int(x) for x in s.split())
    graph[a].append(b)
    graph[b].append(a)

seen = [False for _ in range(n + 1)]  # 0th index isn't used

def backtrack(cur, cur_level):
    if cur_level == n:
        for nxt in graph[cur]:
            if nxt == 1:
                return [1, cur]
        return None

    seen[cur] = True
    for nxt in graph[cur]:
        if seen[nxt]:
            continue
        v = backtrack(nxt, cur_level + 1)
        if v:
            v.append(cur)
            return v
    seen[cur] = False
    return None

solution = backtrack(1, 1)
print(solution)
