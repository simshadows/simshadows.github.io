#include <iostream>
#include <map>
#include <vector>
#include <set>
#include <unordered_map>

int main() {
    int n, m;
    std::cin >> n >> m;

    std::vector<long> nums;
    std::vector<std::pair<long, long>> ops;

    for (int i = 0; i < n; ++i) {
        long tmp;
        std::cin >> tmp;
        nums.push_back(tmp);
    }
    for (int i = 0; i < m; ++i) {
        long tmp1, tmp2;
        std::cin >> tmp1 >> tmp2;
        ops.emplace_back(tmp1 - 1, tmp2 - 1); // -1 to convert to 0-indexed
    }

    std::unordered_map<long, long> numsmap; // number --> index
    std::set<long> bases {0, (long) nums.size() + 1};
    //std::set<long> inverted_bases;

    for (std::size_t i = 0; i < nums.size(); ++i) {
        if (!numsmap.contains(nums[i] - 1)) {
            bases.insert(nums[i]);
            //inverted_bases.insert(-nums[i]);
        }
        numsmap.emplace(nums[i], i);
    }

    //for (const auto &x : bases) std::cout << x << std::endl;
    //std::cout << std::endl;

    for (const auto &[a, b] : ops) {
        const auto &av = nums[a];
        const auto &bv = nums[b];

        bases.insert(av);
        bases.insert(bv);
        bases.insert(av + 1);
        bases.insert(bv + 1);

        std::swap(nums[a], nums[b]);
        std::swap(numsmap[av], numsmap[bv]);

        const auto op = [&](const long &xv){
            const auto &it0 = bases.find(xv);
            if ((it0 != bases.end()) && (numsmap[xv - 1] < numsmap[xv])) {
                bases.erase(it0);
            }
            const auto &it1 = bases.find(xv + 1);
            if ((it1 != bases.end()) && (numsmap[xv + 1] > numsmap[xv])) {
                bases.erase(it1);
            }
        };
        op(av);
        op(bv);
        bases.insert(1); // Always a base

        //for (const auto &x : bases) std::cout << x << std::endl;
        std::cout << bases.size() - 2 << std::endl; // << std::endl;
    }
    return 0;
}
