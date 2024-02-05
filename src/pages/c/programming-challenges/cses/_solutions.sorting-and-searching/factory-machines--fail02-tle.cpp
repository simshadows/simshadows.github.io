#include <algorithm>
#include <iostream>
#include <queue>
#include <vector>

typedef std::pair<long, long> Tup2;
typedef std::vector<Tup2> NextFreeContainer;
typedef std::priority_queue<Tup2, NextFreeContainer, std::greater<Tup2>> NextFree;

int main() {
    int n, prodTarget;
    std::cin >> n >> prodTarget;

    NextFreeContainer nextFreeContainer;
    for (int i = 0; i < n; ++i) {
        long tmp;
        std::cin >> tmp;
        nextFreeContainer.emplace_back(tmp, tmp);
    }

    NextFree nextFree(std::greater<Tup2>(), std::move(nextFreeContainer));

    long totalDur = 0;
    for (long i = 0; i < prodTarget; ++i) {
        const auto [newTotalDur, machineDur] = nextFree.top();
        nextFree.pop();
        if (newTotalDur > totalDur) totalDur = newTotalDur;
        nextFree.emplace(newTotalDur + machineDur, machineDur);
    }
    std::cout << totalDur << std::endl;
    return 0;
}
