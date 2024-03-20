#!/usr/bin/env python3

from sys import stdin, setrecursionlimit
setrecursionlimit(1000000)

(n, _) = [int(s) for s in stdin.readline().split()]

graph = [[] for _ in range(n + 1)]  # 0th index isn't used
for s in stdin.readlines():
    (a, b) = tuple(int(x) for x in s.split())
    graph[a].append(b)
    graph[b].append(a)

level = [0 for _ in range(n + 1)]     # 0th index isn't used
seen = [False for _ in range(n + 1)]  # 0th index isn't used

def backtrack(cur, cur_level):
    seen[cur] = True
    level[cur] = cur_level
    for nxt in graph[cur]:
        nxt_level = level[nxt]
        if (nxt_level > 0) and (cur_level > nxt_level + 1):
            return [nxt, cur]
        elif seen[nxt]:
            continue
        v = backtrack(nxt, cur_level + 1)
        if v:
            if v[0] != v[-1]:
                v.append(cur)
            return v
    level[cur] = 0
    return None

sol = None
for i in range(1, n + 1):
    if not seen[i]:
        sol = backtrack(i, 1)
        if sol:
            break

print((f"{len(sol)}\n" + " ".join(str(x) for x in sol)) if sol else "IMPOSSIBLE")
