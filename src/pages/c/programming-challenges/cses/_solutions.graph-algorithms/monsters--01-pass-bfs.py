#!/usr/bin/env python3

from sys import stdin
from collections import deque

# I'm adding character 'X' to indicate the outside of the graph.

stdin.readline()
graph = [[*s.strip(), 'X'] for s in stdin.readlines()]

graph.append(['X']*len(graph[0]))
(len1, len2) = (len(graph), len(graph[0]))

player_dq = deque()
monsters_dq = deque()

for i in range(len1):
    for j in range(len2):
        if graph[i][j] == 'M':
            monsters_dq.append((i, j))
            graph[i][j] = '#'
        elif graph[i][j] == 'A':
            player_dq.append((i, j, None))
            graph[i][j] = '#'

directions = ((1, 0), (-1, 0), (0, 1), (0, -1))

solution = None
while (solution is None) and len(player_dq):
    # propagate monster squares
    for _ in range(len(monsters_dq)):
        (i, j) = monsters_dq.popleft()
        for di, dj in directions:
            (ii, jj) = (i + di, j + dj)
            if graph[ii][jj] == '.':
                graph[ii][jj] = '#'
                monsters_dq.append((ii, jj))
    # propagate player positions
    for _ in range(len(player_dq)):
        tup = player_dq.popleft()
        (i, j, prev) = tup
        for di, dj in directions:
            (ii, jj) = (i + di, j + dj)
            if graph[ii][jj] == 'X':
                solution = tup
                break
            elif graph[ii][jj] == '.':
                graph[ii][jj] = '#'
                player_dq.append((ii, jj, tup))
        if solution:
            break

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
