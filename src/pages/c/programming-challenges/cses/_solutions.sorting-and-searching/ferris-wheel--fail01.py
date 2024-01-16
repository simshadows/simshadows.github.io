#!/usr/bin/env python3
 
(_, max_weight) = [int(x) for x in input().strip().split()]
children = sorted((int(x) for x in input().strip().split()))
 
gondolas = 0
cur_weight = 0
for child in children:
    if cur_weight == 0:
        cur_weight += child
    else:
        gondolas += 1
        cur_weight = child if (cur_weight + child > max_weight) else 0
print(gondolas + (cur_weight > 0))
