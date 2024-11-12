#!/usr/bin/env python3

from sys import stdin

def get_box_num(s):
    boxnum = 0
    for c in s:
        boxnum = ((boxnum + ord(c)) * 17) % 256
    return boxnum

def run(f):
    strs = f.readlines()[0].strip().split(",")

    boxes = [[] for _ in range(256)] # [[[label, focal length], ...], ...]
    for s in strs:
        if "-" in s:
            label = s[:-1]
            box = boxes[get_box_num(label)]
            box[:] = [x for x in box if (x[0] != label)]
        else:
            (label, focal_len) = s.split("=")
            box = boxes[get_box_num(label)]
            for tup in box:
                if tup[0] == label:
                    tup[1] = focal_len
                    break
            else:
                box.append([label, focal_len])

    print(sum(
        ((1 + boxnum) * sum(
            (i + 1) * int(focal_len) for i, (label, focal_len) in enumerate(box)
        ))
        for boxnum, box in enumerate(boxes)
    ))

run(stdin)
