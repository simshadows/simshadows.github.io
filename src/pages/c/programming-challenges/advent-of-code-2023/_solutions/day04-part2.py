#!/usr/bin/env python3

from sys import stdin

def run(f):
    cards = []
    for line in f:
        (_, all_numbers) = line.split(":")
        (card, winning_numbers) = [x.strip().split() for x in all_numbers.strip().split("|")]
        cards.append(len(set(card) & set(winning_numbers)))

    solution = 0
    for i, v in reversed(list(enumerate(cards))):
        cards[i] = sum(cards[i+1:i+1+cards[i]]) + 1
        solution += cards[i]
    print(solution)

run(stdin)
