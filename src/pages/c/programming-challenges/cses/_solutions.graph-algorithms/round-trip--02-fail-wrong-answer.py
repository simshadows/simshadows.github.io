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

def backtrack(cur, cur_level):
    seen[cur] = True
    for nxt in graph[cur]:
        if (cur_level > 2) and (nxt == 1):
            return [1, cur]
        elif seen[nxt]:
            continue
        v = backtrack(nxt, cur_level + 1)
        if v:
            v.append(cur)
            return v
    seen[cur] = False
    return None

lst = backtrack(1, 1)
print((f"{len(lst)}\n" + " ".join(str(x) for x in lst)) if lst else "IMPOSSIBLE")
