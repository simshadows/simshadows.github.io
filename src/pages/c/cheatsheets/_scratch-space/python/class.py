class MyBaseClass:
    def __init__(self, foo):
        print("MyBaseClass was called...", foo)

class MyClass(MyBaseClass):
    __slots__ = ("_foo", "_bar")
    def __init__(self, foo):
        super().__init__(foo)
        self._foo = foo
        self._bar = 456

x = MyClass("lmao")
print(x)
print(x._foo)
print(x._bar)
#print(x._lmao)  # throws exception as expected

x._foo = "xd"
x._bar = 789
print(x._foo)
print(x._bar)
#x._baz = "ayy"  # throws exception as expected

