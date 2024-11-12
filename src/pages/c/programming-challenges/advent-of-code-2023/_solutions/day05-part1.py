#!/usr/bin/env python3

from sys import stdin

maps_order = (
    "seed-to-soil map",
    "soil-to-fertilizer map",
    "fertilizer-to-water map",
    "water-to-light map",
    "light-to-temperature map",
    "temperature-to-humidity map",
    "humidity-to-location map",
)

def run(f):
    sections = [x.split(":") for x in "".join(f.readlines()).split("\n\n")]
    sections = {k.strip(): v.strip() for k, v in sections}

    seeds = [int(x) for x in sections["seeds"].split()]
    del sections["seeds"]

    maps = {k: [[int(y) for y in x.split()] for x in v.split("\n")] for k, v in sections.items()}

    ids = seeds
    for map_name in maps_order:
        ranges = maps[map_name]
        new_ids = []
        for i in ids:
            new_i = i
            for dst, src, rangelen in ranges:
                if (i >= src) and (i < src + rangelen):
                    new_i = dst + (i - src)
                    break
            new_ids.append(new_i)
        ids = new_ids
    print(min(ids))

run(stdin)
