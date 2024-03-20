#!/usr/bin/env python3

from sys import stdin, setrecursionlimit
setrecursionlimit(1000000)

(n, _) = [int(s) for s in stdin.readline().split()]

graph = [[] for _ in range(n + 1)]  # 0th index isn't used
for s in stdin.readlines():
    (a, b) = tuple(int(x) for x in s.split())
    graph[a].append(b)
    graph[b].append(a)

seen = [False for _ in range(n + 1)]  # 0th index isn't used

origin = None
def backtrack(cur, cur_level):
    seen[cur] = True
    for nxt in graph[cur]:
        if (cur_level > 2) and (nxt == origin):
            return [origin, cur]
        elif seen[nxt]:
            continue
        v = backtrack(nxt, cur_level + 1)
        if v:
            v.append(cur)
            return v
    seen[cur] = False
    return None

sol = None
for i in range(1, n + 1):
    origin = i
    sol = backtrack(i, 1)
    if sol:
        break

print((f"{len(sol)}\n" + " ".join(str(x) for x in sol)) if sol else "IMPOSSIBLE")
