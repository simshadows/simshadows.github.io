#include <algorithm>
#include <iostream>
#include <queue>
#include <vector>

typedef std::pair<long, long> Tup2;
typedef std::vector<Tup2> NextFreeContainer;
typedef std::priority_queue<Tup2, NextFreeContainer, std::greater<Tup2>> NextFree;

int main() {
    long n, prodTarget;
    std::cin >> n >> prodTarget;

    std::vector<long> machines;
    for (long i = 0; i < n; ++i) {
        long tmp;
        std::cin >> tmp;
        machines.push_back(tmp);
    }

    long long prodRemaining = prodTarget;
    long long estTotalDur = 0;
    long long bitmask = 1;
    bitmask <<= 31; // how come just doing (1 << 31) doesn't work?
    while (bitmask) {
        long long newProdRemaining = prodTarget;
        long long newEstTotalDur = estTotalDur | bitmask;
        for (const auto &machineDur : machines) {
            newProdRemaining -= newEstTotalDur / machineDur;
            if (newProdRemaining <= 0) break;
        }
        if (newProdRemaining > 0) {
            estTotalDur = newEstTotalDur;
            prodRemaining = newProdRemaining;
        }
        bitmask >>= 1;
        if (bitmask < 0) return 0;
    }

    NextFreeContainer nextFreeContainer;
    for (const auto &machineDur : machines) {
        const long long totalDur = estTotalDur - (estTotalDur % machineDur);
        nextFreeContainer.emplace_back(totalDur + machineDur, machineDur);
    }

    NextFree nextFree(std::greater<Tup2>(), std::move(nextFreeContainer));

    long long totalDur = 0;
    for (long i = 0; i < prodRemaining; ++i) {
        const auto [newTotalDur, machineDur] = nextFree.top();
        nextFree.pop();
        if (newTotalDur > totalDur) totalDur = newTotalDur;
        nextFree.emplace(newTotalDur + machineDur, machineDur);
    }
    std::cout << totalDur << std::endl;
    return 0;
}
