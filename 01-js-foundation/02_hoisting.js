// Exercise 1
var one = 1;
var one = 2;

console.log(one); // Prints 2


// Exercise 2
a(); // Prints Bye

function a() {
    console.log("Hi");
}

function a() {
    console.log("Bye");
}


// Exercise 3
var favouriteFood = "grapes";

var foodThoughts = function() {
    console.log("Original favourite food: " + favouriteFood);

    var favouriteFood = "sushi";

    console.log("New favourite food: " + favouriteFood);
}

foodThoughts(); // Returns undefined and sushi


// Exercise 4
function bigBrother() {
    function littleBrother() {
        return 'it is me!';
    }
    return littleBrother();

    function littleBrother() {
        return 'no me!';
    }
}

console.log(bigBrother()); // Returns no me!