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
            graph[i][j] = '#'  # marks cell as seen
        elif graph[i][j] == 'B':
            b_loc = (i, j)
            graph[i][j] = '.'

def heuristic_dist(i, j):
    return abs(i - b_loc[0]) + abs(j - b_loc[1])

# This will keep going down a path as long as there's only one option
def travel_through_corridor(i, j):
    chars = []
    while True:
        next_loc = None
        invalid = False
        for c, ii, jj in (('D', i + 1, j), ('U', i - 1, j), ('R', i, j + 1), ('L', i, j - 1)):
            if graph[ii][jj] != '#':
                if next_loc is not None:
                    invalid = True
                elif (ii, jj) == b_loc:
                    return (i, j, chars)  # we stop short
                next_loc = (c, ii, jj)

        if next_loc is None:
            return (None, None, None)

        if invalid:
            return (i, j, chars)
        chars.append(next_loc[0])
        (i, j) = (next_loc[1], next_loc[2])
        graph[i][j] = '#'  # marks cell as seen

pq = [(0, 0, *a_loc, None, [])]
solution = None
while (solution is None) and len(pq):
    tup = heappop(pq)
    (est, dist, i, j, _, _) = tup
    for c, ii, jj in (('D', i + 1, j), ('U', i - 1, j), ('R', i, j + 1), ('L', i, j - 1)):
        if graph[ii][jj] == '#':
            continue
        elif (ii, jj) == b_loc:
            solution = (0, 0, 0, 0, tup, [c])
            break
        graph[ii][jj] = '#'  # marks cell as seen
        (ii, jj, chars) = travel_through_corridor(ii, jj)
        if ii is not None:
            new_dist = dist + 1 + len(chars)
            heappush(pq, (new_dist + heuristic_dist(ii, jj), new_dist, ii, jj, tup, [c, *chars]))

if solution is None:
    print("NO")
else:
    path = ["".join(solution[5])]
    while solution[4] is not None:
        solution = solution[4]
        path.append("".join(solution[5]))
    path = "".join(reversed(path))
    print("YES")
    print(len(path))
    print(path)
