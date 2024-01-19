#include <iostream>
#include <vector>

int main() {
    long n;
    std::cin >> n;

    std::vector<std::pair<long, long>> intervals;
    for (long i = 0; i < n; ++i) {
        long start, end;
        std::cin >> start >> end;
        intervals.emplace_back(start, end);
    }
    std::sort(intervals.begin(), intervals.end());

    long solution = 0;
    long prev_b = 0;
    for (auto [a, b] : intervals) {
        if (a >= prev_b) {
            // Guaranteed to add a new movie
            prev_b = b;
            ++solution;
        } else if (b >= prev_b) {
            // Offers no advantages to the previous one
            continue;
        } else {
            // We prefer to take this film instead of the previous one
            prev_b = b;
        }
    }
    std::cout << solution << std::endl;
    return 0;
}
