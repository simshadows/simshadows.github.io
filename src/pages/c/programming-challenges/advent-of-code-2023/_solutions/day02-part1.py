#!/usr/bin/env python3

from sys import stdin

R_LIMIT = 12
G_LIMIT = 13
B_LIMIT = 14

def run(f):
    solution = 0
    for i, s in enumerate(f.readlines()):
        (title, tail) = s.strip().split(":")
        (_, game_num) = title.split()
        sets = [dict(reversed(y.split()) for y in x.split(",")) for x in tail.split(";")]

        game_is_possible = all(
            (
                int(d.get("red", 0)) <= R_LIMIT
                and int(d.get("green", 0)) <= G_LIMIT
                and int(d.get("blue", 0)) <= B_LIMIT
            )
            for d in sets
        )
        if game_is_possible:
            solution += int(game_num)
    print(solution)

run(stdin)
