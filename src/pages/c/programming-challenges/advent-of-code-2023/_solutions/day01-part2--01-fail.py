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

def run():
    n = 0
    for i, s in enumerate(x.strip() for x in f.readlines()):
        while True:
            best_idx = inf
            best_str = ""
            for (query, digit) in tab.items():
                idx = s.find(query)
                if idx >= 0 and idx < best_idx:
                    best_idx = idx
                    best_str = query
            if isinf(best_idx):
                break
            s = s.replace(best_str, tab[best_str], 1)
        s = list(filter(lambda x : x in nums, s))
        n += int(s[0] + s[-1])
    print(n)

run(f)
