#!/usr/bin/env python3

input()
coins = sorted(int(s) for s in input().strip().split())

interval_len = 1 # INTERVAL STARTS AT AND INCLUDES ZERO
for coin in coins:
    if coin > interval_len:
        print(interval_len)
        break
    interval_len += coin
