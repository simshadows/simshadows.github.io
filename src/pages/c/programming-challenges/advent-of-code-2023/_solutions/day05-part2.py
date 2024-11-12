#!/usr/bin/env python3

from sys import stdin
from itertools import chain, pairwise, zip_longest

maps_order = (
    "seed-to-soil map",
    "soil-to-fertilizer map",
    "fertilizer-to-water map",
    "water-to-light map",
    "light-to-temperature map",
    "temperature-to-humidity map",
    "humidity-to-location map",
)

# <https://docs.python.org/3/library/itertools.html#itertools-recipes>
def grouper(iterable, n, *, incomplete='fill', fillvalue=None):
    "Collect data into non-overlapping fixed-length chunks or blocks"
    # grouper('ABCDEFG', 3, fillvalue='x') --> ABC DEF Gxx
    # grouper('ABCDEFG', 3, incomplete='strict') --> ABC DEF ValueError
    # grouper('ABCDEFG', 3, incomplete='ignore') --> ABC DEF
    args = [iter(iterable)] * n
    if incomplete == 'fill':
        return zip_longest(*args, fillvalue=fillvalue)
    if incomplete == 'strict':
        return zip(*args, strict=True)
    if incomplete == 'ignore':
        return zip(*args)
    else:
        raise ValueError('Expected fill, strict, or ignore')

def run(f):
    sections = [x.split(":") for x in "".join(f.readlines()).split("\n\n")]
    sections = {k.strip(): v.strip() for k, v in sections}

    seeds = list(grouper((int(x) for x in sections["seeds"].split()), 2))
    del sections["seeds"]

    maps = {k: [[int(y) for y in x.split()] for x in v.split("\n")] for k, v in sections.items()}

    ids = seeds
    for map_name in maps_order:
        ranges = maps[map_name]
        new_ids = []
        while len(ids):
            id_start, id_len = ids.pop()
            if id_len == 0:
                continue
            for dst, src, rangelen in ranges:
                intersect_start = max(id_start, src)
                intersect_end = min(id_start + id_len, src + rangelen)
                if intersect_end > intersect_start:
                    ids.append((id_start, intersect_start - id_start))
                    ids.append((intersect_end, id_start + id_len - intersect_end))
                    new_ids.append((intersect_start + dst - src, intersect_end - intersect_start))
                    break
            else:
                new_ids.append((id_start, id_len))
        ids = new_ids
    print(min((x for (x, _) in ids), default="NONE"))

run(stdin)
