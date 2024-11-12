#!/usr/bin/env python3

from sys import stdin

def run(f):
    solution = 0
    for line in f:
        (_, all_numbers) = line.split(":")
        (card, winning_numbers) = [x.strip().split() for x in all_numbers.strip().split("|")]
        matches = len(set(card) & set(winning_numbers))
        if matches > 0:
            solution += 2 ** (matches - 1)
    print(solution)

run(stdin)
