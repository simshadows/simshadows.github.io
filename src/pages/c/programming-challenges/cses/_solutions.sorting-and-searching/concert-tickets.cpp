#include <algorithm>
#include <iostream>
#include <set>
#include <vector>

int main() {
    int n, m;
    std::cin >> n >> m;

    std::multiset<long> tickets;
    std::vector<long> bids;

    for (int i = 0; i < n; ++i) {
        long tmp;
        std::cin >> tmp;
        tickets.insert(-tmp);
    }
    for (int i = 0; i < m; ++i) {
        long tmp;
        std::cin >> tmp;
        bids.push_back(tmp);
    }

    for (auto bid : bids) {
        const auto i = tickets.lower_bound(-bid);
        if (i == tickets.end()) {
            std::cout << -1 << std::endl;
        } else {
            std::cout << -(*i) << std::endl;
            tickets.erase(i);
        }
    }
    return 0;
}

