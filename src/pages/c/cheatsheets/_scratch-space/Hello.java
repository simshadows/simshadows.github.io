import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Deque;
import java.util.Queue;

import java.util.ArrayList;
import java.util.ArrayDeque;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Arrays;
import java.util.stream.Collectors;
import java.util.Comparator;
import java.util.PriorityQueue;
import java.util.Collections;

public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");

        System.out.println("################ 1");
        int[] arr1 = {123, 321, 456, 654};
        for (int v : arr1) System.out.println(v);
        System.out.println("Length: " + arr1.length);

        System.out.println("################ 2");
        List<Integer> lst1 = new ArrayList<Integer>();
        // Naive way of converting
        for (int v : arr1) lst1.add(v);
        for (int v : lst1) System.out.println(v);

        System.out.println("################ 3");
        final List<Integer> lst2 = Arrays.stream(arr1).boxed().toList();
        for (int v : lst2) System.out.println(v);
        //lst2.add(999); // Doesn't work. It's immutable.

        System.out.println("################ 4");
        final ArrayList<Integer> lst3 = Arrays.stream(arr1).boxed()
            .collect(Collectors.toCollection(ArrayList::new));
        for (int v : lst3) System.out.println(v);
        System.out.println("##### a");
        lst3.add(999); // This actually works now!
        lst3.remove(1);
        for (int v : lst3) System.out.println(v);
        System.out.println("##### b");
        lst3.remove(lst3.size() - 1);
        for (int v : lst3) System.out.println(v);

        System.out.println("################ 5");
        final Map<Integer, String> map1 = Map.of(
            234, "lmao",
            432, "ayy",
            567, "yeet",
            765, "kek"
        );
        for (var v : map1.entrySet()) {
            System.out.println(v.getKey() + " : " + v.getValue());
        }
        for (var v : map1.values()) {
            System.out.println(v);
        }
        for (var k : map1.keySet()) {
            System.out.println(k);
        }
        // map1.put(999, "oml"); // Doesn't work. Immutable!

        System.out.println("################ 6");
        final Map<Integer, String> map2 = Map.ofEntries(
            Map.entry(23, "lmao"),
            Map.entry(45, "ayy"),
            Map.entry(67, "yeet"),
            Map.entry(89, "kek")
        );
        for (var v : map2.entrySet()) {
            System.out.println(v.getKey() + " : " + v.getValue());
        }
        System.out.println(map2.get(45));
        System.out.println(map2.size());

        System.out.println("################ 7");
        final HashMap<Integer, String> map3 = new HashMap();
        map3.put(34, "alice");
        map3.put(43, "bob");
        map3.put(56, "mallory");
        map3.put(65, "eve");
        for (var v : map3.entrySet()) {
            System.out.println(v.getKey() + " : " + v.getValue());
        }
        System.out.println(map3.containsKey(12));
        System.out.println(map3.containsKey(43));
        map3.remove(56);
        for (var v : map3.entrySet()) {
            System.out.println(v.getKey() + " : " + v.getValue());
        }
        assert map3.size() > 0;
        map3.clear();
        System.out.println(map3.size());
        assert map3.size() == 0;

        System.out.println("################ 8");
        // We're just gonna reuse map1
        for (var v : map1.entrySet()) {
            System.out.println(v.getKey() + " : " + v.getValue());
        }
        System.out.println("##### a");
        String[] arr2 = new String[map1.size()];
        arr2 = map1.values().toArray(arr2);
        for (String v : arr2) System.out.println(v);
        Integer[] arr3 = new Integer[map1.size()];
        arr3 = map1.keySet().toArray(arr3);
        for (int v : arr3) System.out.println(v);
        System.out.println("##### b");
        final List<Integer> lst4 = new ArrayList(map1.keySet());
        for (int v : lst4) System.out.println(v);
        final List<String> lst5 = new ArrayList(map1.values());
        for (String v : lst5) System.out.println(v);

        System.out.println("##### c");
        final Set<Integer> set1 = new HashSet(map1.keySet());
        for (int v : set1) System.out.println(v);
        final Set<String> set2 = new HashSet(map1.values());
        for (String v : set2) System.out.println(v);

        System.out.println("################ 9");
        final var set3 = new HashSet<Integer>(Arrays.asList(123, 321, 456, 654));
        for (int v : set3) System.out.println(v);
        System.out.println("##### a");
        final Set<Integer> set4 = Arrays.stream(arr1).boxed()
            .collect(Collectors.toCollection(HashSet::new));
        for (int v : set4) System.out.println(v);
        System.out.println("##### b");
        final var set5 = new HashSet<Integer>(Arrays.asList(arr3));
        for (int v : set5) System.out.println(v);
        System.out.println("##### c");
        System.out.println(set5.size());
        System.out.println("##### d");
        System.out.println(set5.contains(5555));
        System.out.println(set5.add(5555));
        System.out.println(set5.contains(5555));
        System.out.println(set5);
        System.out.println(set5.add(5555));
        System.out.println("##### e");
        System.out.println(set5.contains(567));
        System.out.println(set5.remove(567));
        System.out.println(set5.contains(567));
        System.out.println(set5);
        System.out.println("##### f");
        set5.clear();
        System.out.println(set5);

        System.out.println("################ 10");
        Integer[] arr4 = {22, 33, 44, 55};
        final var lst6 = new ArrayList<Integer>(Arrays.asList(arr4));
        System.out.println(lst6);

        System.out.println("################ 11");
        final int[] arr5 = {8, 2, 6, 4, 5};
        for (int v : arr5) System.out.println(v);
        System.out.println("##### a");
        Arrays.sort(arr5);
        for (int v : arr5) System.out.println(v);

        System.out.println("################ 11");
        final Integer[] arr6 = {80, 20, 60, 40, 50};
        for (int v : arr6) System.out.println(v);
        System.out.println("##### a");
        Arrays.sort(arr6);
        for (int v : arr6) System.out.println(v);

        System.out.println("################ 12");
        String[] arr7 = {"ada", "bbc", "ccd", "aaa", "aea"};
        for (String v : arr7) System.out.println(v);
        System.out.println("##### a");
        Arrays.sort(arr7,
            (var a, var b) -> ((Character) a.charAt(1)).compareTo(b.charAt(1))
        );
        for (String v : arr7) System.out.println(v);

        System.out.println("################ 13");
        String[] arr8 = {"ada", "bbc", "ccd", "aaa", "aea"};
        for (String v : arr8) System.out.println(v);
        System.out.println("##### a");
        Arrays.sort(arr8, new Comparator<String>() {
            @Override
            public int compare(String a, String b) {
                char aa = a.charAt(1);
                char bb = b.charAt(1);
                if (aa > bb) return 1;
                if (aa < bb) return -1;
                return 0;
            }
        });
        for (String v : arr8) System.out.println(v);

        System.out.println("################ 14");
        String[] arr9 = {"ada", "bbc", "ccd", "aaa", "aea"};
        for (String v : arr9) System.out.println(v);
        System.out.println("##### a");
        Arrays.sort(arr9,
            (var a, var b) -> b.charAt(1) - a.charAt(1)
        );
        for (String v : arr9) System.out.println(v);

        System.out.println("################ 15");
        final var lst7 = new ArrayList<Integer>(Arrays.asList(8, 4, 7, 5, 6));
        for (int v : lst7) System.out.println(v);
        System.out.println("##### a");
        lst7.sort(null);
        for (int v : lst7) System.out.println(v);

        System.out.println("################ 16");
        final var lst8 = new ArrayList<Integer>(Arrays.asList(88, 44, 77, 55, 66));
        for (int v : lst8) System.out.println(v);
        System.out.println("##### a");
        lst8.sort((var a, var b) -> b - a);
        for (int v : lst8) System.out.println(v);

        System.out.println("################ 17");
        try {
            System.out.println("throwing...");
            throw new RuntimeException("lmao");
            // This actually causes a compile error if we uncomment
            //System.out.println("we shouldn't reach this statement");
        } catch (Exception e) {
            System.out.println("caught");
            System.out.println(e);
        } finally {
            System.out.println("finally");
        }

        System.out.println("################ 18");
        final Deque<Integer> dq1 = new ArrayDeque<Integer>(Arrays.asList(123, 321, 456, 654));
        for (int v : dq1) System.out.println(v);
        System.out.println(dq1);
        dq1.addLast(222);
        System.out.println(dq1);
        dq1.addFirst(555);
        System.out.println(dq1);
        System.out.println(dq1.getLast());
        System.out.println(dq1.getFirst());
        System.out.println(dq1);
        System.out.println(dq1.removeLast());
        System.out.println(dq1);
        System.out.println(dq1.removeFirst());
        System.out.println(dq1);
        System.out.println(dq1.offerLast(2222));
        System.out.println(dq1.offerFirst(5555));
        System.out.println(dq1);
        System.out.println("##### a");
        final Queue<Integer> q1 = dq1;
        System.out.println(q1);
        q1.add(3333);
        System.out.println(q1);
        System.out.println(q1.remove());
        System.out.println(q1);
        System.out.println(q1.element());
        System.out.println(q1);
        final Queue<Integer> q2 = new ArrayDeque<Integer>();
        System.out.println(q2);
        q2.add(234);
        q2.add(123);
        q2.add(984);
        for (int v : q2) System.out.println(v);

        System.out.println("################ 19");
        final var q3 = new PriorityQueue<Integer>(Arrays.asList(7, 3, 6, 4, 1, 5));
        System.out.println(q3);
        while (!q3.isEmpty()) System.out.println(q3.remove());

        System.out.println("################ 19");
        final var q4 = new PriorityQueue<Integer>(
            (var a, var b) -> b.compareTo(a)
        );
        q4.add(7);
        q4.add(2);
        q4.add(5);
        q4.add(6);
        System.out.println(q4);
        while (!q4.isEmpty()) System.out.println(q4.remove());

        System.out.println("################ 20");
        final var buf1 = new StringBuilder("ayy lmao");
        System.out.println(buf1);
        buf1.append('!');
        System.out.println(buf1);
        buf1.append((char) 0x61);
        System.out.println(buf1);
        buf1.append("foobar");
        System.out.println(buf1);

        final String str1 = buf1.toString();
        System.out.println(str1);

        System.out.println("################ 21");
        final var lst9 = new ArrayList<Integer>(Arrays.asList(10,20,30,40,50,60,70,80,90));
        System.out.println(lst9);
        System.out.println(Collections.binarySearch(lst9, 30));
        System.out.println(Collections.binarySearch(lst9, 31));
        System.out.println(Collections.binarySearch(lst9, 29));
        lst9.add(2, 29);
        System.out.println(lst9);

        System.out.println("################ 22");
        final int[] arr10 = {10, 20, 30, 40, 50, 60};
        System.out.println(Arrays.binarySearch(arr10, 30));
        System.out.println(Arrays.binarySearch(arr10, 31));
        System.out.println(Arrays.binarySearch(arr10, 29));

        System.out.println("################ 23");
        record Foo(int a, String b){};
        final Foo tmp1 = new Foo(123, "kekekek");
        System.out.println(tmp1);
        System.out.println(tmp1.a);
        System.out.println(tmp1.b);
        //tmp1.b = "yeet"; // doesn't work
        System.out.println(tmp1.hashCode());

        System.out.println("################ 24");
        //record Foo1(int a, String b){};
        //final Foo1 tmp2 = new Foo1(321, "loll");

        System.out.println("################ 25");
        System.out.println(lst1);
        for (int i = 0; i < lst1.size(); ++i) {
            System.out.println("[" + i + "] " + lst1.get(i));
        }

        System.out.println("################ 25");
        for (int v : arr1) System.out.println(v);
        System.out.println("##### a");
        for (int i = 0; i < arr1.length; ++i) {
            System.out.println(i);
            System.out.println(arr1[i]);
        }
        

        //System.out.println("################ 11");
        //int[] arr2 = {123, 321, 456, 654};
        //for (int v : arr2) System.out.println(v);
        //// Integer[] arr3 = arr2; // DOESN'T WORK
        //// for (int v : arr3) System.out.println(v);
        //System.out.println("##### a");
    }
}
