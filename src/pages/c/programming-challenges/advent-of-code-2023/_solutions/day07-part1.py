#!/usr/bin/env python3

from sys import stdin
from collections import Counter
from itertools import chain, count

label_order = {c: i for c, i in zip(reversed("AKQJT98765432"), count())}

def run(f):
    hands = [s.split() for s in f.readlines()]

    sorted_hands = [[], [], [], [], [], [], []]
    for labels, bid in hands:
        bid = int(bid)
        cnt = Counter(labels)
        freqs = Counter(cnt.values())

        tup = (tuple(label_order[c] for c in labels), bid)
        if 5 in freqs:
            sorted_hands[6].append(tup)
        elif 4 in freqs:
            sorted_hands[5].append(tup)
        elif 3 in freqs:
            if 2 in freqs:
                sorted_hands[4].append(tup)
            else:
                sorted_hands[3].append(tup)
        elif freqs[2] == 2:
            sorted_hands[2].append(tup)
        elif freqs[2] == 1:
            sorted_hands[1].append(tup)
        else:
            sorted_hands[0].append(tup)

    all_sorted = chain(*(tuple(sorted(lst)) for lst in sorted_hands))
    print(sum(bid * rank for ((_, bid), rank) in zip(all_sorted, count(1))))

run(stdin)
