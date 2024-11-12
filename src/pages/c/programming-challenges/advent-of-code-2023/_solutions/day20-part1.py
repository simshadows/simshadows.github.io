#!/usr/bin/env python3

from sys import stdin
from collections import defaultdict, deque

HI = True
LO = False

UNCATEGORIZED = "."
FLIPFLOP = "%"
CONJ = "&"

def run(f):
    raw_rules = [s.strip().split("->") for s in f.readlines()]
    raw_rules = [(k.strip(), [x.strip() for x in v.strip().split(",")]) for k, v in raw_rules]
    rules = {"output": (UNCATEGORIZED, [])}
    for k, v in raw_rules:
        if k[0] in FLIPFLOP + CONJ:
            module_type = k[0]
            k = k[1:]
        else:
            module_type = UNCATEGORIZED
        rules[k] = (module_type, v)

    # turns out there are modules that don't go anywhere
    dependencies = defaultdict(list)
    for src, (_, dsts) in rules.items():
        for dst in dsts:
            dependencies[dst].append(src)

    cur_states = {k: LO for k in rules.keys()}
    inputs_history = defaultdict(dict)
    conj_input_memory = {
        k: {dep: LO for dep in dependencies[k]}
        for k, v in rules.items() if v[0] == CONJ
    }

    dq = deque()
    (num_lo, num_hi) = (0, 0)
    for i in range(1000):
        dq.append(("button", LO, "broadcaster"))
        while len(dq):
            (src, pulse, dst) = dq.popleft()
            if pulse == HI:
                num_hi += 1
            else:
                num_lo += 1

            if dst not in rules:
                continue
            elif dst in {"broadcaster", "output"}:
                pass
            elif rules[dst][0] == FLIPFLOP:
                if pulse == LO:
                    cur_states[dst] = (cur_states[dst] != True)
                else:
                    continue # "nothing happens"
            elif rules[dst][0] == CONJ:
                conj_input_memory[dst][src] = pulse
                if all((v == HI) for v in conj_input_memory[dst].values()):
                    cur_states[dst] = LO
                else:
                    cur_states[dst] = HI
            else:
                raise RuntimeError()
            dq.extend((dst, cur_states[dst], x) for x in rules[dst][1])
    print(num_lo * num_hi)

run(stdin)
