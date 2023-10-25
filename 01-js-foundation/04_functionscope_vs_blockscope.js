// Function scope
function a() {
    var secret2 = "123";
}

// Block scope
if (5 > 4) {
    let secret = "123";
}

console.log(secret);

// Exercise
function loop() {
    for (var i = 0; i < 5; i++) {
        console.log(i);
    }

    console.log(i); // Con var devuelve 5, con let se rompe el código
}