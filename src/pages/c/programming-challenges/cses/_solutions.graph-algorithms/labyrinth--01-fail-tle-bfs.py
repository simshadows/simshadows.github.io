#!/usr/bin/env python3

from sys import stdin
from collections import deque

stdin.readline()
graph = [[*s.strip(), '#'] for s in stdin.readlines()]

graph.append(['#']*len(graph[0]))
(len1, len2) = (len(graph), len(graph[0]))

a_loc = None
b_loc = None
for i in range(len1):
    for j in range(len2):
        if graph[i][j] == 'A':
            a_loc = (i, j)
            graph[i][j] = '.'
        elif graph[i][j] == 'B':
            b_loc = (i, j)
            graph[i][j] = '.'

dq = deque([(*a_loc, None)])
seen = {a_loc}
solution = None
while (solution is None) and len(dq):
    tup = dq.popleft()
    (i, j, _) = tup
    for ii, jj in ((i + 1, j), (i - 1, j), (i, j + 1), (i, j - 1)):
        if (graph[ii][jj] == '#') or ((ii, jj) in seen):
            continue
        elif (ii, jj) == b_loc:
            solution = (ii, jj, tup)
            break
        dq.append((ii, jj, tup))
        seen.add((ii, jj))

if solution is None:
    print("NO")
else:
    path = []
    while solution[2] is not None:
        prev = solution[2]
        (difi, difj) = (solution[0] - prev[0], solution[1] - prev[1])
        path.append(
            'D' if (difi == 1) else
            'U' if (difi == -1) else
            'R' if (difj == 1) else
            'L'
        )
        solution = prev
    print("YES")
    print(len(path))
    print("".join(reversed(path)))
