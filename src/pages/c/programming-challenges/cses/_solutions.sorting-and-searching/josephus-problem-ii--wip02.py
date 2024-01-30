#!/usr/bin/env python3

BIGSKIP_LEN = 5

(n, k) = [int(s) for s in input().strip().split()]

last_bigskip = n - (n % BIGSKIP_LEN)

num_elems = n
skips = list(range(n))
bigskips_fwd = [
    (((i + BIGSKIP_LEN) if (i + BIGSKIP_LEN < n) else 0) if (i % BIGSKIP_LEN == 0) else -1)
    for i in range(n)
]
print(bigskips_fwd)
bigskips_bck = [
    ((last_bigskip if (i - BIGSKIP_LEN < 0) else i - BIGSKIP_LEN) if (i % BIGSKIP_LEN == 0) else -1)
    for i in range(n)
]
print(bigskips_bck)

bigskips_fwdsizes = [BIGSKIP_LEN]*n
bigskips_fwdsizes[last_bigskip] = n - last_bigskip
print(bigskips_fwdsizes)

def canonical(i):
    if i != skips[i]:
        skips[i] = canonical(skips[i])
    return skips[i]
def remove(i):
    if i != skips[i]:
        raise RuntimeError()
    if num_elems <= BIGSKIP_LEN * 2:
        # we just ignore the bigskips
        skips[i] = canonical((i + 1) % n)
        num_elems -= 1
        return
    hi = i
    while bigskips_fwd[hi] == -1:
        hi = canonical((hi + 1) % n)
    lo = canonical(bigskips_bck[hi])
    if hi == i:
        hi = canonical((hi + 1) % n)
        if bigskips_fwdsizes[i] > 1:
            bigskips_fwd[lo] = hi
            bigskips_bck[hi] = lo
            bigskips_fwd[hi] = bigskips_fwd[i]
            bigskips_fwdsizes[hi] = bigskips_fwdsizes[i] - 1
    else:
        bigskips_fwdsizes[lo] -= 1
    skips[i] = hi
    num_elems -= 1
def move_fwd(i, dist):
    raise NotImplementedError()

raise NotImplementedError()
