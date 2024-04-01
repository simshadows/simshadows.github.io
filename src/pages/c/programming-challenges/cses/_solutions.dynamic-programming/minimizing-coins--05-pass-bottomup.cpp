#include <iostream>
#include <vector>
#include <limits>

constexpr long LONG_MAX = std::numeric_limits<long>::max();

int main() {
    long n, targetSum;
    std::cin >> n >> targetSum;

    std::vector<long> coins;
    for (long i = 0; i < n; ++i) {
        long tmp;
        std::cin >> tmp;
        coins.push_back(tmp);
    }

    std::vector<long> tab(targetSum + 1, LONG_MAX - 1);
    tab[0] = 0;

    for (long i = 1; i <= targetSum; ++i) {
        for (const auto coin : coins) {
            if (coin <= i) {
                tab[i] = std::min(tab[i], tab[i - coin]);
            }
        }
        ++tab[i];
    }

    std::cout << ((tab[targetSum] == LONG_MAX) ? -1 : tab[targetSum]) << std::endl;
    return 0;
}
