#!/usr/bin/env python3

input()
songs = [int(s) for s in input().strip().split()]

(lo, hi) = (0, 0)
songs_in_seq = {songs[0]}
longest_seq = 1
while hi < len(songs) - 1:
    if songs[hi + 1] in songs_in_seq:
        songs_in_seq.remove(songs[lo])
        if lo == hi:
            hi += 1
            songs_in_seq.add(songs[hi])
        lo += 1
    else:
        hi += 1
        songs_in_seq.add(songs[hi])
    longest_seq = max(longest_seq, (hi - lo) + 1)
print(longest_seq)
