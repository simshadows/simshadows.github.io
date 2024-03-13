#!/usr/bin/env python3

from sys import stdin, setrecursionlimit

setrecursionlimit(10000000)

stdin.readline()
graph = [[*s.strip(), '#'] for s in stdin.readlines()]

graph.append(['#']*len(graph[0]))
(len1, len2) = (len(graph), len(graph[0]))

def floodfill(i, j):
    stack = [(i, j)]
    while len(stack):
        (i, j) = stack.pop()
        if graph[i][j] == '#':
            continue
        graph[i][j] = '#'
        stack.extend(((i + 1, j), (i - 1, j), (i, j + 1), (i, j - 1)))

solution = 0
for i in range(len1):
    for j in range(len2):
        if graph[i][j] == '.':
            solution += 1
            floodfill(i, j)
print(solution)
