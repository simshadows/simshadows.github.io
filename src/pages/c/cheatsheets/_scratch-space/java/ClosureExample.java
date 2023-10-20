
public class ClosureExample {
    interface Closure {
        public String run(String a);
    }

    public static void main(String[] args) {
        System.out.println("Hello, World!");
        final var s = "xd";

        final var closure = new Closure() {
            public String run(String a) {
                return a + " lmao " + s;
            }
        };
        System.out.println("###");
        System.out.println(closure.run("ayy"));
    }
}

