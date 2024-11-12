#!/usr/bin/env python3

from sys import stdin

def run(f):
    (instructions, graph) = f.read().strip().split("\n\n")
    graph = {x[0]: (x[2][1:-1], x[3][:-1]) for x in (s.split() for s in graph.split("\n"))}

    steps = 0
    cur = "AAA"
    while cur != "ZZZ":
        cur = graph[cur][0] if (instructions[steps % len(instructions)] == "L") else graph[cur][1]
        steps += 1
    print(steps)

run(stdin)
