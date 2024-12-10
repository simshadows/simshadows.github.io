#!/usr/bin/env python3

from sys import stdin

v = 0
for i, c in enumerate(stdin.readline()):
    v += (1 if c == "(" else -1)
    if v == -1:
        print(i + 1)
        break
