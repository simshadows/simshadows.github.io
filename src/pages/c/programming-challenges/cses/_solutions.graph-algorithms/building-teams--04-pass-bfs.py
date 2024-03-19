#!/usr/bin/env python3

from sys import stdin

(n, _) = [int(s) for s in stdin.readline().split()]

graph = [[] for _ in range(n + 1)]  # 0th index isn't used
for s in stdin.readlines():
    (a, b) = tuple(int(x) for x in s.split())
    graph[a].append(b)
    graph[b].append(a)

teams = [0 for _ in range(n + 1)]  # 0th index isn't used

def bfs(start):
    teams[start] = 1
    (cur, cur_team) = ([start], 1)
    while len(cur):
        nxt = []
        nxt_team = 2 if (cur_team == 1) else 1
        for i in cur:
            for j in graph[i]:
                if teams[j] == cur_team:
                    return False
                elif not teams[j]:
                    teams[j] = nxt_team
                    nxt.append(j)
        (cur, cur_team) = (nxt, nxt_team)
    return True

impossible = False
for i in range(1, n + 1):
    if (not teams[i]) and (not bfs(i)):
        impossible = True
        break
print("IMPOSSIBLE" if impossible else " ".join(str(x) for x in teams[1:]))
