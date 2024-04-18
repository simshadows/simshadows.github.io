package main

import (
    "fmt"
    "sync"
    "time"
)

var m sync.Mutex
var v int = 0

func producer() {
    for i := 0; i < 3; i++ {
        m.Lock()  // Blocks until mutex is released
        tmp := v + 1
        time.Sleep(time.Millisecond)  // Simulated "long running calculation"
        fmt.Printf("%d ", tmp)
        v = tmp
        m.Unlock()
    }
}

func main() {
    go producer()
    go producer()
    go producer()
    time.Sleep(time.Second)
    fmt.Println()
}
