#!/usr/bin/env python3
 
n = int(input())

codes = [""]
for _ in range(n):
    codes = ["0" + s for s in codes] + ["1" + s for s in reversed(codes)]
print("\n".join(codes))
