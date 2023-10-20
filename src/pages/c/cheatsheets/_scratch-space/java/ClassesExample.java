
public class ClassesExample {
    public static void main(String[] args) {
        System.out.println("Hello, World!");

        final Foo tmp = new Foo(123, "lmao");
        System.out.println(tmp.a);
        System.out.println(tmp.b);
        tmp.a = 321;
        tmp.b = "ayy";
        System.out.println(tmp.a);
        System.out.println(tmp.b);
    }
}

class Foo {
    public int a;
    public String b;

    //public Foo(int a, String b) {
    //    this.a = a;
    //    this.b = b;
    //}
}
