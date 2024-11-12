#!/usr/bin/env python3

from sys import stdin

def run(f):
    n = 0
    for s in f.readlines():
        s = [c for c in s if (c in "1234567890")]
        n += int(s[0] + s[-1])
    print(n)

run(stdin)
