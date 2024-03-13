#!/usr/bin/env python3

from sys import stdin, setrecursionlimit

setrecursionlimit(10000000)

stdin.readline()
graph = [[*s.strip(), '#'] for s in stdin.readlines()]

graph.append(['#']*len(graph[0]))
(len1, len2) = (len(graph), len(graph[0]))

def floodfill(i, j):
    if graph[i][j] == '#':
        return
    graph[i][j] = '#'
    for ii, jj in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        floodfill(i + ii, j + jj)

solution = 0
for i in range(len1):
    for j in range(len2):
        if graph[i][j] == '.':
            solution += 1
            floodfill(i, j)
print(solution)
