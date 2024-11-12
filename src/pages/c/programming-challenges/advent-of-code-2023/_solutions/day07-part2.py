#!/usr/bin/env python3

from sys import stdin
from collections import Counter
from itertools import chain, count

label_order = {c: i for c, i in zip(reversed("AKQT98765432J"), count())}

def run(f):
    hands = [s.split() for s in f.readlines()]

    sorted_hands = [[], [], [], [], [], [], []]
    for labels, bid in hands:
        bid = int(bid)

        tup = (tuple(label_order[c] for c in labels), bid)
        strength = -1
        for joker_mimic in "AKQT98765432J":
            mimicked = labels.replace("J", joker_mimic)
            print(mimicked)
            cnt = Counter(mimicked)
            freqs = Counter(cnt.values())

            if 5 in freqs:
                strength = max(strength, 6)
            elif 4 in freqs:
                strength = max(strength, 5)
            elif 3 in freqs:
                if 2 in freqs:
                    strength = max(strength, 4)
                else:
                    strength = max(strength, 3)
            elif freqs[2] == 2:
                strength = max(strength, 2)
            elif freqs[2] == 1:
                strength = max(strength, 1)
            else:
                strength = max(strength, 0)
        sorted_hands[strength].append(tup)

    all_sorted = chain(*(tuple(sorted(lst)) for lst in sorted_hands))
    print(sum(bid * rank for ((_, bid), rank) in zip(all_sorted, count(1))))

run(stdin)
