#include <iostream>
#include <vector>

constexpr long MOD = 1e9 + 7;

int main() {
    long n, targetSum;
    std::cin >> n >> targetSum;

    std::vector<long> coins;
    for (long i = 0; i < n; ++i) {
        long tmp;
        std::cin >> tmp;
        coins.push_back(tmp);
    }

    std::vector<long> tab(targetSum + 1, 0);
    tab[0] = 1;

    for (const auto coin : coins) {
        for (long offset = 0; offset < coin; ++offset) {
            long acc = 0;
            for (long i = offset; i <= targetSum; i += coin) {
                acc = (acc + tab[i]) % MOD;
                tab[i] = acc;
            }
        }
    }

    std::cout << tab[targetSum] << std::endl;
    return 0;
}
