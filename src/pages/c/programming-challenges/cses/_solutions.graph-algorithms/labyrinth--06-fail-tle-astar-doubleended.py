#!/usr/bin/env python3

from sys import stdin
from collections import deque
from heapq import heappush, heappop

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

def heuristic_dist(i1, j1, i2, j2):
    return abs(i1 - i2) + abs(j1 - j2)

possible_moves_fwd = (('D', 1, 0), ('U', -1, 0), ('R', 0, 1), ('L', 0, -1))
possible_moves_bck = (('U', 1, 0), ('D', -1, 0), ('L', 0, 1), ('R', 0, -1))

def do_search():
    tup1 = (0, 0, 'A', *a_loc, "", None)  # [0] = score, [1] = distance, [2] = origin char
    tup2 = (0, 0, 'B', *b_loc, "", None)  # [3..4] = location, [5] = moves, [6] = previous

    pq1 = [tup1]  # FORWARD
    pq2 = [tup2]  # BACK
    while len(pq1) and len(pq2):
        # Forward
        tup = heappop(pq1)
        (_, dist, _, i, j, _, _) = tup
        v = graph[i][j]
        if isinstance(v, tuple):
            if v[2] == 'A':
                continue
            return (tup, v)
        elif v == '.':
            graph[i][j] = tup
            #print("popped", i, j)
            for c, di, dj in possible_moves_fwd:
                (i2, j2) = (i + di, j + dj)
                v = graph[i2][j2]
                #print(c, i2, j2)
                if (isinstance(v, tuple) and (v[2] == 'A')) or (v == '#'):
                    continue
                new_tup = (dist + 1 + heuristic_dist(i2, j2, *b_loc), dist + 1, 'A', i2, j2, c, tup)
                heappush(pq1, new_tup)
        
        # Backward
        tup = heappop(pq2)
        (_, dist, _, i, j, _, _) = tup
        v = graph[i][j]
        if isinstance(v, tuple):
            if v[2] == 'B':
                continue
            return (v, tup)
        elif v == '.':
            graph[i][j] = tup
            for c, di, dj in possible_moves_bck:
                (i2, j2) = (i + di, j + dj)
                v = graph[i2][j2]
                if (isinstance(v, tuple) and (v[2] == 'B')) or (v == '#'):
                    continue
                new_tup = (dist + 1 + heuristic_dist(i2, j2, *a_loc), dist + 1, 'B', i2, j2, c, tup)
                heappush(pq2, new_tup)

    return (None, None)

(sol1, sol2) = do_search()

## DEBUGGING
#for lst in graph:
#    for v in lst:
#        print(v[2] if isinstance(v, tuple) else v, end="")
#    print()

if sol1 is None:
    print("NO")
else:
    (fwd, bck) = ([], [])
    while sol1[6] is not None:
        fwd.append(sol1[5])
        sol1 = sol1[6]
    while sol2[6] is not None:
        bck.append(sol2[5])
        sol2 = sol2[6]
    path = "".join(reversed(fwd)) + "".join(bck)
    print("YES")
    print(len(path))
    print(path)
