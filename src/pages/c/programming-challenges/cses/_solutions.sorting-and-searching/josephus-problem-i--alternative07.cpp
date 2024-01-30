#include <iostream>
#include <vector>
#include <functional>

int main() {
    long n;
    std::cin >> n;

    bool doPrint = false;

    std::vector<long> cur;
    for (long i = 1; i <= n; ++i) cur.push_back(i);

    while (!cur.empty()) {
        auto lo = 0;
        for (long hi = 0; ((unsigned long) hi) < cur.size(); ++hi) {
            if (doPrint) {
                std::cout << cur[hi] << std::endl;
            } else {
                cur[lo] = cur[hi];
                ++lo;
            }
            doPrint = (doPrint == false);
        }
        cur.resize(lo);
    }
    return 0;
}
