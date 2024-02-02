#include <iostream>
#include <vector>
#include <algorithm>
#include <queue>

typedef std::pair<long, long> Room;
typedef std::priority_queue<Room, std::vector<Room>, std::greater<Room>> RoomsPQ;

int main() {
    long n;
    std::cin >> n;

    std::vector<std::tuple<long, long, long>> bookings;
    for (long i = 0; i < n; ++i) {
        long start, end;
        std::cin >> start >> end;
        bookings.emplace_back(start, end, i);
    }
    std::sort(bookings.begin(), bookings.end());
    //for (const auto &[a, b, c] : bookings) std::cout << a << " " << b << " " << c << std::endl;

    std::vector<long> solution(n);

    // [(earliest acceptable start, room number), ...]
    RoomsPQ rooms;
    rooms.push(std::make_pair(std::get<0>(bookings[0]), 1));

    for (const auto &[start, end, i] : bookings) {
        const auto &top = rooms.top();
        long roomNum = top.second;
        if (top.first <= start) {
            rooms.pop();
        } else {
            roomNum = rooms.size() + 1;
        }
        //std::cout << start << " " << end << " " << i << " " << roomNum << std::endl;
        solution[i] = roomNum;
        rooms.push(std::make_pair(end + 1, roomNum));
    }

    std::cout << rooms.size() << std::endl;
    for (const long &v : solution) std::cout << v << " ";
    std::cout << std::endl;
    return 0;
}
