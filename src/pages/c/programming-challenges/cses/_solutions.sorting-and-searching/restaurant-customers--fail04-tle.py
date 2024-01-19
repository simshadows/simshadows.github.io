#!/usr/bin/env python3

from sys import stdin
from itertools import accumulate
from collections import Counter
from operator import add

stdin.readline()
customers = [[int(t) for t in s.strip().split()] for s in stdin.readlines()]

difs = Counter(t for t, _ in customers)
difs.subtract(t for _, t in customers)
print(max(accumulate((v for _, v in sorted(difs.items())), add)))
