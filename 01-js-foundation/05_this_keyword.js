// Ventaja 1
const obj = {
    name: "Veronica",
    sing: function() {
        return "lalala " + this.name;
    },
    signAgain() {
        return this.sign() + "!";
    }
};

obj.sing();

// Ventaja 2
function importantPerson() {
    console.log(this.name);
}

const name = "Sunny";
const obj1 = {
    name: "Cassy",
    importantPerson
};
const obj2 = {
    name: "Jacob",
    importantPerson
};

importantPerson();

// Ejercicio
const a = function() {
    console.log("a", this);

    const b = function() {
        console.log("b", this);

        const c = {
            hi: function() {
                console.log("c", this);
            }
        }

        c.hi(); // c
    }

    b(); // Window
}

a(); // Window