#!/usr/bin/env python3

from sys import stdin
from itertools import cycle
from math import lcm

def run(f):
    (instructions, graph) = f.read().strip().split("\n\n")
    instructions = [(0 if x == "L" else 1) for x in instructions]
    graph = {x[0]: (x[2][1:-1], x[3][:-1]) for x in (s.split() for s in graph.split("\n"))}

    starts = list({x for x in graph.keys() if x[-1] == "A"})
    cycle_exits = []
    cycle_bounds = []
    for i, start in enumerate(starts):
        seen = {} # {(node, instruction order): step, ...}
        cycle_exits.append([])
        cur = start
        for step, (j, instr) in enumerate(cycle(enumerate(instructions))):
            tup = (cur, j)
            if tup in seen:
                cycle_bounds.append((seen[tup], step))
                break
            if cur[-1] == "Z":
                cycle_exits[-1].append(step)
            seen[tup] = step
            cur = graph[cur][instr]
    print("exits:", cycle_exits)
    print()
    print("bounds:", cycle_bounds)
    print()

    # the rest of this code works only because we know there is only exactly one exit for
    # each cycle
    if any(len(x) != 1 for x in cycle_exits):
        raise RuntimeError()

    # also, we ignore any steps before they all enter a cycle
    offset = max(start for (start, _) in cycle_bounds)
    cycle_lens = [end - start for (start, end) in cycle_bounds]
    first_exit = [x[0] - offset for x in cycle_exits]
    diffs = [cl - fe for cl, fe in zip(cycle_lens, first_exit)]

    print("cycle lengths - first exit:", diffs)
    print()

    # the rest of the code below assumes the same difference!
    if any(x != diffs[0] for x in diffs):
        raise RuntimeError()
    
    print(lcm(*cycle_lens))

run(stdin)
