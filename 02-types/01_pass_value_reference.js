var a = 5;
var b = a;

b++; //a = 5 y b = 6

let obj1 = { name: "Yao", password: "123" };
let obj2 = obj1;

obj2.password = "easypeasy"; // Afecta tanto a obj1 como a obj2

// Copiar arreglo
b = [...a];

// Copiar objeto
obj2 = Object.assign({}, obj1);
var obj3 = {...obj1 };

// Copiar objetos de manera profunda (en casi todos los navegadores)
const copia = structuredClone(obj);