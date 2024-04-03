#include <iostream>
#include <vector>

int main() {
    long n, maxSum;
    std::cin >> n >> maxSum;

    std::vector<long> costs {0};  // padded with an extra dummy element so we can 1-index
    for (long i = 0; i < n; ++i) {
        long tmp;
        std::cin >> tmp;
        costs.push_back(tmp);
    }

    std::vector<long> pages {0};  // padded with an extra dummy element so we can 1-index
    for (long i = 0; i < n; ++i) {
        long tmp;
        std::cin >> tmp;
        pages.push_back(tmp);
    }

    std::vector<long> realTab0(maxSum + 1, 0);
    std::vector<long> realTab1(maxSum + 1, 0);
    std::vector<long> *tab0 = &realTab0;
    std::vector<long> *tab1 = &realTab1;
    for (long i = 1; i <= n; ++i) {
        for (long curMaxSum = 1; curMaxSum <= maxSum; ++curMaxSum) {
            if (curMaxSum < costs[i]) {
                (*tab1)[curMaxSum] = (*tab0)[curMaxSum];
            } else {
                (*tab1)[curMaxSum] = std::max(
                    (*tab0)[curMaxSum - costs[i]] + pages[i],
                    (*tab0)[curMaxSum]
                );
            }
        }
        std::swap(tab0, tab1);
    }

    std::cout << (*tab0)[maxSum] << std::endl;
    return 0;
}
