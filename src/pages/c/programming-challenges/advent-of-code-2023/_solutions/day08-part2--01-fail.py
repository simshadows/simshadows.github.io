#!/usr/bin/env python3

from sys import stdin

def run(f):
    (instructions, graph) = f.read().strip().split("\n\n")
    graph = {x[0]: (x[2][1:-1], x[3][:-1]) for x in (s.split() for s in graph.split("\n"))}

    steps = 0
    cur = [x for x in graph.keys() if x[-1] == "A"]
    while any((x[-1] != "Z") for x in cur):
        i = 0 if (instructions[steps % len(instructions)] == "L") else 1
        cur[:] = [graph[x][i] for x in cur]
        steps += 1
        if steps % 1000000 == 0:
            print(steps)
    print(steps)

run(stdin)
