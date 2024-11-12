#!/usr/bin/env python3

from sys import stdin

def run(f):
    solution = 0
    for i, s in enumerate(f.readlines()):
        (title, tail) = s.strip().split(":")
        (_, game_num) = title.split()
        sets = [dict(reversed(y.split()) for y in x.split(",")) for x in tail.split(";")]

        (r, g, b) = (0, 0, 0)
        for d in sets:
            r = max(r, int(d.get("red", 0)))
            g = max(g, int(d.get("green", 0)))
            b = max(b, int(d.get("blue", 0)))
        solution += r * g * b
    print(solution)

run(stdin)
