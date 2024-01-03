#!/usr/bin/env python3

n = int(input())

for k in range(1, min(8, n + 1)):
    print({1: 0, 2: 6, 3: 28, 4: 96, 5: 252, 6: 550, 7: 1056}[k])

acc = 1056
seen = 7 * 7
for k in range(8, n + 1):
    # corner
    acc += seen - 2
    seen += 1
    # next square
    acc += seen - 3
    seen += 1
    # continue until near corner
    # -1 since we're skipping the very corner
    # -2 since we've already done two squares
    # -2 since we're also going to hardcode the final two squares
    for _ in range(k - 1 - 2 - 2):
        acc += seen - 4
        seen += 1
    # more hardcodes
    acc += seen - 3
    seen += 1
    acc += seen - 2
    seen += 1
    # start again
    # corner
    acc += seen - 2
    seen += 1
    # next square
    acc += seen - 3
    seen += 1
    # this time, we're not skipping the very corner, so just -2 -2
    for _ in range(k - 2 - 2):
        acc += seen - 4
        seen += 1
    # more hardcodes
    acc += seen - 3
    seen += 1
    acc += seen - 2
    seen += 1
    print(acc)
