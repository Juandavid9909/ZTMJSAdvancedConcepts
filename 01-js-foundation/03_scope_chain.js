function sayMyName() {
    var a = "a";

    return function findName() {
        var b = "b";

        return function printName() {
            var c = "c";

            console.log(a);

            return "Juan David";
        };
    };
}

sayMyName()()();