#include <iostream>
#include <set>
#include <vector>

int main() {
    int n;
    std::cin >> n;

    std::vector<long> cubes;

    for (int i = 0; i < n; ++i) {
        long tmp;
        std::cin >> tmp;
        cubes.push_back(tmp);
    }

    std::multiset<long> towerTops;

    for (auto cube : cubes) {
        towerTops.insert(cube);
        const auto &it = towerTops.upper_bound(cube);
        if (it != towerTops.end()) {
            towerTops.erase(it);
        }
    }
    std::cout << towerTops.size() << std::endl;
    return 0;
}
