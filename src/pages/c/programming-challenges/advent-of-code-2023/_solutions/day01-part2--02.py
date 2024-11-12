#!/usr/bin/env python3

from sys import stdin
from math import isinf, inf

nums = {str(s) for s in range(10)}
tab = {
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9",
    #"zero": "0",
}

def run(f):
    n = 0
    for i, s in enumerate(x.strip() for x in f.readlines()):
        # replace first
        s1 = s
        best_idx = inf
        best_str = ""
        for (query, digit) in tab.items():
            idx = s1.find(query)
            if idx >= 0 and idx < best_idx:
                best_idx = idx
                best_str = query
        if not isinf(best_idx):
            s1 = s1.replace(best_str, tab[best_str], 1)
        s1 = [c for c in s1 if (c in nums)]

        # replace last
        s2 = s
        best_idx = -1
        best_str = ""
        for (query, digit) in tab.items():
            idx = s2.rfind(query)
            if idx >= 0 and idx > best_idx:
                best_idx = idx
                best_str = query
        if best_idx >= 1:
            s2 = s2.replace(best_str, tab[best_str])
        s2 = [c for c in s2 if (c in nums)]

        n += int(s1[0] + s2[-1])
    print(n)

run(stdin)
