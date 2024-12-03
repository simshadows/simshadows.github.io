#!/usr/bin/env python3

from sys import stdin
from collections import Counter

pairs = [tuple(map(int, s.split())) for s in stdin.readlines()]

cnt = Counter(x[1] for x in pairs)
print(sum(x[0] * cnt[x[0]] for x in pairs))
