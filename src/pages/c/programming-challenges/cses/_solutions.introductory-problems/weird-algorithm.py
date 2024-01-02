#!/usr/bin/env python3

from sys import stdin

n = int("".join(stdin.readlines()).strip())
while n > 1:
    print(n, end=" ")
    if n % 2:
        n = (n * 3) + 1
    else:
        n //= 2
print(n)
