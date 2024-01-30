#!/usr/bin/env python3

(n, k) = [int(s) for s in input().strip().split()]

cur = 0
debugging__already_removed = [False]*n
for num_removed in range(n):
    cur = (cur + k) % n
    if debugging__already_removed[cur]:
        print(debugging__already_removed)
        raise RuntimeError(cur)
    debugging__already_removed[cur] = True
    print(cur + 1)
    cur = (cur + 1) % n
