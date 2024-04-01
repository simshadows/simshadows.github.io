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

    for (long i = 1; i <= targetSum; ++i) {
        for (const auto coin : coins) {
            if (coin <= i) tab[i] = (tab[i] + tab[i - coin]) % MOD;
        }
    }

    std::cout << tab[targetSum] << std::endl;
    return 0;
}
