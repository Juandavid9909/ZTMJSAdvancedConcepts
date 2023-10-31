# Fundamentos de JavaScript

## Interpretador vs compilador

El interpretador es simplemente cuando le pasamos ciertas instrucciones a nuestra computadora y le decimos "ok, haz esto, después esto y luego esto", simplemente la máquina interpreta el conjunto de instrucciones que le pasamos y retorna un valor.

El compilador trata de entender lo que queremos hacer en nuestro código y lo convierte a otro código que la computadora puede entender, esto sucede muy a menudo con lenguajes de bajo nivel, como el lenguaje de máquina.

Los compiladores pueden ser más rápidos a medida que crece el código ya que al traducir nuestras instrucciones a un lenguaje de bajo nivel la computadora podrá ejecutar dichas instrucciones más rápido, mientras que los interpretadores pueden tender a ser lentos si el código es muy grande o si hay ciclos también grandes, sin embargo este puede tener otras ventajas.

### JIT Compilers
Luego de todo este inconveniente por no saber cuál usar entre estas 2 opciones se crearon los JIT Compilers, donde usan lo mejor de ambos en una solución unificada, y actualmente esta es la opción por la que optan los navegadores.

### JavaScript Engine
Teniendo esto claro ahora miremos el paso a paso del engine de JavaScript:

![JavaScript Engine](https://images.ctfassets.net/aq13lwl6616q/3o7Q3edCrVJG9Zzj6VMZ1K/28136a643636dfa04090f3fb5c5467ff/javascript_engine.png)

1. Primero se parsea el código.
2. Se convierte en un árbol de sintaxis abstracto (Abstract Sintax Tree).
3. El interpretador interpreta el código.
4. Una vez el código fue interpretado este es convertido a Bytecode (es un lenguaje no tan a bajo nivel como el código máquina pero es código que puede ser interpretado por JavaScript).
5. El profiler se encarga de verificar cómo puede ser optimizado nuestro código, como cuántas veces será corrido, qué tipos de datos usa, etc.
6. Una vez completado el proceso del profiler si se detecta que se puede optimizar nuestro código en tiempo de ejecución nuestro compilador hará ese trabajo.
7. Después de hacer todo esto se retorna el código optimizado.

## Clases ocultas

JavaScript permite crear clases dinámicas, esto significa que si tenemos una clase con n cantidad de argumentos y luego de instanciar un objeto de esta clase agregamos un argumento nuevo `myObjeto.valorNuevo = "lo que sea";` este será capaz de agregar el nuevo valor a la clase, sin embargo esto disminuirá drásticamente el rendimiento de nuestro programa, por lo que la mejor práctica es sólo instanciar valores que estén en nuestro constructor.

## Inline Caching

Cuando recibimos argumentos en una función lo más recomendable es no reasignar sus valores ya que esto puede generar lentitud en el rendimiento de nuestro programa, es mejor crear variables auxiliares y en lo posible no hacer asignaciones innecesarias.

## Call Stack y Memory Heap

A continuación un bloque de código de ejemplo:

```javascript
const number = 610; // Allocate memory for number
const string = "some text"; // Allocate memory for a string
const human = { // Allocate memory for an object... and it's values
	first: "Juan",
	last: "Varela"
};

function subtractTwo(num) {
	return num - 2;
}

function calculate() {
	const sumTotal = 4 + 5;
	return subtractTwo(sumTotal);
}

calculate();
```

### ¿Qué es Memory Heap?
Es un gran bloque en memoria que JavaScript nos proporciona para guardar los valores que necesitemos.

### ¿Qué es Call Stack?
Es una región en memoria que guarda los procesos que hace falta por ejecutar y utiliza LIFO (Last In First Out) para ejecutar todos los procesos pendientes.

## Garbage Collection

JavaScript es un lenguaje de programación que usa Garbage Collector, esto significa que cuando se asignan valores en nuestro Memory Heap, automáticamente JavaScript detectará si no usamos algún valor guardado y lo limpiará por nosotros.

## Memory Leaks

El Memory Leak se produce cuando un bloque de memoria reservado no se libera en un programa. Para crear nuestro propio Memory Leak podemos hacer algo como lo siguiente:

```javascript
let array = [];

for(let i = 5; i > 1; i++) {
	array.push(i - 1);
}
```

## Single Thread

JavaScript es Single Threaded, esto significa que ejecuta una función a la vez, por ejemplo si ejecutamos la instrucción `alert("Hola");` veremos que JavaScript bloqueará incluso el scroll de la página.

## Hoisting

JavaScript tiene Hoisting, es decir que tiene la capacidad de no romper la ejecución de código cuando llamamos a una variable o una función antes de su inicialización, para las variables sólo funciona con `var`, también tiene en cuenta la reasignación con `var` de una misma variable, de ser así no declara una segunda variable sino que reescribe el valor de la primera.

```javascript
console.log("1------");
console.log(teddy);
console.log(sign());
var teddy = "bear";

// Function expression
var sing2 = function() {
	console.log("uhhh la la la ");
}

// Function declaration
function sign() {
	console.log("ohhh la la la");
}
```

### Global Execution Context
Contiene el **Creation Phase** y el **Execution Phase**, y cada vez que llamamos una función se realiza cada una de estas fases. A continuación un ejemplo:

```javascript
var favouriteFood = "grapes";

var foodThoughts = function() {
	console.log("Original favourite food: " + favouriteFood);
	
	var favouriteFood  =  "sushi";

	console.log("New favourite food: " + favouriteFood);
}

foodThoughts();
```

En este bloque de código el resultado es `undefined` y `sushi` para los `console.log`, esto sucede debido que aunque tenemos favouriteFood en el inicio del programa se realiza un nuevo **Execution Context** para la función, y al ver que hay una declaración de la variable pone esta con un valor de `undefined` en el contexto inicial hasta que se le indica el valor, por eso en el primer `console.log` queda como `undefined`. Si la declaración de la variable no estuviera en dicha función no crearía en el contexto la variable con el valor de `undefined` sino que buscaría su valor en contextos anteriores.

## Function Invocation

### Function Expression
Es la declaración de funciones pero usando asignación de variables con function o funciones de flecha.

```javascript
var canada = function() {
	console.log("cold");
}
```

### Function Declaration
Cuando simplemente creamos una función, tal como:

```javascript
function india() {
	console.log("warm");
}
```

Puedes tener **Function Invocation/Call/Execution** haciendo algo como `canada()`. La importancia de tener las **Function Expression** y **Function Declaration** es que las expresiones de funciones se declaran en tiempo de ejecución, mientras que las declaraciones de funciones se declaran cuando el compilador está revisando el código antes de ejecutarlo. Aquí también existe un contexto, el **Execution Context** donde tenemos acceso a las palabras reservadas `arguments` y `this`.


## Arguments keyword

No existe en el contexto global, sólo en el contexto de las funciones, para usarlo se debe ejecutar de la siguiente manera:

```javascript
function marry(person1, person2) {
	console.log("arguments", arguments);
	console.log(Array.from(arguments));

	return `${ person1 } is now married to ${ person2 }`;
}

marry("Tim", "Tina");
```

Sin embargo, no es la forma recomendada de generar un arreglo (se debe hacer la conversión porque llega como un objeto) con todos los parámetros de la función, si ese es nuestro objetivo podemos utilizar el **spread operator** de JavaScript para hacerlo.

```javascript
function marry2(...args) {
	console.log(args);

	return `${ args[0] } is now married to ${ args[1] }`;
}
```


## Scope Chain

Es importante tener claro el scope de nuestras variables a lo largo de la ejecución de nuestro código, ya que como mencioné antes, cada función genera su propio **Execution Context** por lo que las funciones hijas pueden tener acceso a las variables de los contextos padres, pero no a las variables de los contextos hijos.

En JavaScript nuestro **scope léxico** (datos disponibles + variables donde la función fue definida) determina nuestras variables disponibles. No cuando la función es llamada (scope dinámico).

### [[Scope]]
Es un arreglo en window que guarda todos los scopes incluyendo el global.


## JS is Weird

Cuando creamos variables sin `const`, `let` o `var` en una función con una asignación JavaScript creará estas variables en el scope global, sin embargo para evitar esto podemos usar el `"use strict";` al inicio de nuestro archivo JavaScript para evitar que se puedan usar variables sin ser declaradas.

Otro comportamiento extraño es el siguiente:

```javascript
var heyhey = function doodle() {
	doodle();

	return "heyhey";
}

heyhey();
```

Su comportamiento es extraño porque la función se crea a sí misma en su contexto, por lo que se puede llamar usando el nombre *doodle* a pesar de que la variable que contiene la función se llama *heyhey*.


## Function Scope vs Block Scope

El scope de funciones es cuando creamos variables dentro de funciones, ya que tendrán un scope local, es decir que en scope global dichas variables no serán accesibles. El scope de bloque  es dentro de alguna condición, for, etc (es decir dentro de unas {}) usando `let` y/o `const` ya que tampoco serán accesibles las variables que se encuentren dentro de las llaves actuales, en cambio si usamos `var` sí serían accesibles.


## IIFE (Immediately Invoked Function Expression)

Son conocidas con funciones anónimas y nos permiten tener un scope aparte del contexto de ejecución global para nuestras variables, a continuación un ejemplo:

```javascript
(function() {
})()
```

Si necesitamos tener 2 funciones con el mismo nombre en nuestro código podemos hacer algo como lo siguiente:

```javascript
var script1 = (function() {
	function a() {
		return 5;
	}

	return {
		a: a
	}
})()

function a() {
	return "hahaha";
}

a();
script1.a();
```


## This keyword

`this` hace referencia al objeto que tiene como propiedad la función donde lo ejecutamos. Es por esto que en el contexto global de nuestro código `this` hará referencia a window, sin embargo, si usamos el `"use strict"` la palabra `this` ya no hará referencia a window.

Los módulos en ES6 ya traen por defecto el `"use strict"`. A continuación unos ejemplos del uso de `this`.

```javascript
// Ventaja 1
const obj = {
	name: "Veronica",
	sing: function() {
		return "lalala " + this.name; // Apunta a nombre ya que obj es el objeto del cual la función es propiedad
	},
	signAgain() {
		return this.sign() + "!"; // Apunta también al nombre
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

importantPerson(); // Apunta a window => Sunny
obj1.importantPerson(); // Apunta a obj1 => Cassy
obj2.importantPerson(); // Apunta a obj2 => Jacob
```

### Ventajas
- Da acceso a los métodos del objeto en el que estamos.
- Ejecuta el mismo código para múltiples objetos.

### Ejercicio Dynamic Scope vs Lexical Scope
```javascript
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


const obj = {
	name: "Billy",
	sign() {
		console.log("a", this); // obj

		var anotherFunc = () => {
			console.log("b", this); // Con función de flecha obj, con function window
		}
		
		anotherFunc();
		// return anotherFunc.bind(this); // Por si queremos usar el function sin arrow functions y que retorne obj, también se podría declarar una variable antes de la declaración de la función que sea igual a this y hacer el console.log a la misma
	}
}
```


## call(), apply() y bind()

`call()` y `apply()` nos permiten ejecutar funciones, por ejemplo si tenemos la función `a`, normalmente haríamos el llamado `a()`, sin embargo, también podríamos hacerlo `a.call()` o `a.apply()`.

Entonces, ¿por qué debería de usar alguno de estos métodos? Básicamente porque nos permitirá usar una función de un objeto en otro objeto que le indicaremos a JavaScript, a continuación un ejemplo.

```javascript
const wizard = {
	name: "Merlin",
	health: 50,
	heal() {
		return this.health = 100;
	}
}

const archer = {
	name: "Robin Hood",
	health: 30
}

wizard.heal.call(archer); // También se puede usar apply()

// Si necesitamos parámetros
const wizard = {
	name: "Merlin",
	health: 50,
	heal(num1, num2) {
		return this.health += num1 + num2;
	}
}

const archer = {
	name: "Robin Hood",
	health: 30
}

wizard.heal.call(archer, 50, 30);
// wizard.heal.call(archer, [50, 30]); // Otra forma
```

La diferencia de `call()` y `apply()` con `bind()` es que esta última no ejecuta directamente la función que deseamos, sino que nos retorna una función nueva con cierto contexto y parámetros, un ejemplo a continuación.

```javascript
const wizard = {
	name: "Merlin",
	health: 50,
	heal() {
		return this.health = 100;
	}
}

const archer = {
	name: "Robin Hood",
	health: 30
}

wizard.heal.call(archer); // También se puede usar apply()

// Si necesitamos parámetros
const wizard = {
	name: "Merlin",
	health: 50,
	heal(num1, num2) {
		return this.health += num1 + num2;
	}
}

const archer = {
	name: "Robin Hood",
	health: 30
}

const healArcher = wizard.heal.bind(archer, 50, 30);
healArcher(); // Hará el cambio aquí, no cuando se define el bind
```


## bind() and currying

En algunas ocasiones querremos utilizar `bind` para copiar funciones pero no pasar todos los parámetros de forma inmediata, podemos hacer algo como lo siguiente:

```javascript
function multiply(a, b) {
	return a * b;
}

let multiplyByTwo = multiply.bind(this, 2);

console.log(multiplyByTwo(4));
```


# Types in JavaScript

Hay 7 tipos en JavaScript, `number`, `boolean`, `string`, `undefined`, `null (object)`, `symbol` y `object`. Para validar el tipo de un dato/variable existe el operador `typeof`.

Hay que tener en cuenta que los arreglos y las funciones (si haces `typeof` de una función JavaScript te retornará `function`)  son en sí `object`. Una forma de confirmar esto es la siguiente:

```javascript
function a() {
	return 5;
}

a.hi = "hihihihihi"; // Agregará dicha propiedad a la función

console.log(a.hi);
```


## Differences between undefined and null

La diferencia entre `undefined` y `null` es que `undefined` es la ausencia de una definición, y `null` es la ausencia de un valor.


## Primitive types and non primitive types

En JavaScript a excepción de los objetos todos los tipos mencionados anteriormente son primitivos, es decir que es data que sólo representa un valor en sí, los tipos no primitivos son los que heredan de objecto (o el mismo objeto) ya que puede ir creciendo su información.

Hay un dicho que dice "Todo en JavaScript es un objeto", y de cierta forma es así, por ejemplo al usar un tipo primitivo con `toString()` seguirá funcionando, por ejemplo `true.toString()`.


## Array.isArray()

Como mencioné anteriormente, los arreglos son objetos, pero si requerimos comprobar si una variable es un arreglo podemos hacer uso de `Array.isArray(nuestroArreglo)`.


## Pass By Value vs Pass By Reference

Para los tipos primitivos el paso siempre será por valor, para los no primitivos siempre será por referencia, esto nos permite ahorrar espacio en memoria, pero si queremos hacer la copia de una variable no primitiva (objeto) podemos usar el **spread operator**.

```javascript
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
var obj3 = {...obj1};

// Copiar objetos de manera profunda (en casi todos los navegadores)
const copia = structuredClone(obj);
```

Es importante tener claro que para copiar objetos sólo se clona el primer nivel (spread operator), pero si tenemos más de un nivel estos también se pasarán por referencia, si necesitamos hacer una copia de todo el objeto en todos los niveles podemos usar `JSON.parse(JSON.stringify(obj))`.

### Comparar 2 objetos en distintas ubicaciones de memoria
```javascript
var user1 = { name: "nerd", org: "dev" };
var user2 = { name: "nerd", org: "dev" };

// Da false porque compara la ubicación en memoria
var eq = user1 == user2;

// Dar true porque compara los valores
var eq = Object.toJSON(user1) == Object.toJSON(user2);

alert(eq);

// Más rápido pero limitado
JSON.stringify(obj1) === JSON.stringify(obj2);
```


## Type Coercion

Esto nos permite hacer comparación entre 2 valores primitivos de distinto tipo dando `true`. Todos los lenguajes tienen **Type Coercion** porque siempre necesitamos convertir tipos entre programas para lograr nuestro objetivo. Esto sucede en JavaScript cuando hacemos la comparación con `==` y no cuando la hacemos con `===`. También si tenemos un `if(1)` JavaScript le hará **Type Coercion** al 1 y lo tomará como un `true`.

Un buen recurso sería el de [GitHub Dorey](https://dorey.github.io/JavaScript-Equality-Table/) o también el de [Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness).

Hay una opción nueva y es `Object.is(a, b)` para comparar 2 tipos de forma estricta, es decir que si usamos `Object.is(-0, +0)` el resultado será `false` a pesar de que usando el `==` o `===` dará `true`.


# The 2 Pillars: Closures and Prototypal Inheritance

## Functions are objects

Cuando creamos una función automáticamente tenemos 2 parámetros, el `this` y `arguments`. Hay varias formas formas de definir e invocar funciones:

```javascript
// Forma 1
function one() {
	return 1;
}

one();

// Forma 2
const obj = {
	two() { // O two: function() {
		return 2;
	}
}

obj.two();

// Forma 3
function three() {
	return 3;
}

three.call();

// Forma 4: Function Constructor
const four = new Function("return 4");
const four1 = new Function("num", "return num");

four();
four1(4);

// Como se vería la función por debajo
function woohooo() {
	console.log("wooohooo");
}

woohooo.yell = "ahhhhhhh";

const specialObj = {
	yell: "ahhhhhhh",
	name: "woohooo",
	(): console.log("wooohooo")
};
```


## Functions are first class citizens in JavaScript

En JavaScript podemos asignar funciones a variables, recibir y ejecutar funciones como parámetros y también retornar funciones dentro de una función.

```javascript
// 1
var stuff = function() {}

// 2
function a(fn) {
	fn();
}

a(function() { console.log("Hi there"); });

// 3
function b() {
	return function c() { console.log("bye"); }
}

b()();
```


## Higher Order Functions

Las funciones de alto orden son simplemente funciones que reciben otras funciones como parámetro o una función que retorna otra función.

```javascript
const giveAccessTo = (name) =>
  'Access Granted to ' + name;

function authenticate(person) {
  let array = [];
  // you can add checks here for person.level
  for (let i = 0; i < 50000; i++) {
    array.push(i);
  }
  return giveAccessTo(person.name);
}

function letPerson(person, fn) { // ++ We now tell the function what data to use when we call it not when we define it + tell it what to do.
  if (person.level === 'admin') {
    return fn(person);
  } else if (person.level === 'user') {
    return fn(person);
  }
}

function sing(person) {
  return 'la la la my name is ' + person.name;
}

letPerson({ level: 'user', name: 'Tim' }, sing);

// Ejemplo 2
const multiply = (number1) => (number2) => number1 * number2;

const multiplyByTwo = multiply(2);
const multiplyByFive = multiply(5);

multiplyByTwo(4);
multiplyByFive(6);
```


## Closures

Es simplemente una combinación de una función y el lexical environment para el cual fue declarada. En otras palabras son funciones anidadas que van haciendo uso de variables declaradas en funciones padres, esto permite que el **Garbage Collector** de JavaScript no elimine dichas variables ya que son necesarias en funciones hijas.

```javascript
function a() {
  let grandpa = 'grandpa';
  return function b() {
    let father = 'father';
    return function c() {
      let son = 'son';
      return `${ grandpa } > ${ father } > ${ son }`;
    }
  }
}

a();

//closures and higher order function
function boo(string) {
  return function(name) {
    return function(name2) {
      console.log(`hi ${ name2 }`);
    }
  }
}

const boo2 = (string) => (name) => (name2) => console.log(`hi ${ name2 }`);

boo('hi')('john')('tanya');

// AHH! HOW DOES IT REMEMBER THIS 5 years from now?
booString = boo2('sing');
booStringName = booString('John');
booStringNameName2 = booStringName('tanya');
```


## Closures and memory and encapsulation

Los **Closures** nos permiten guardar espacio en memoria ya que las variables no se declaran nuevamente debido a que se guardan en el contexto de la función (y el box de los **Closures**) y con la encapsulación  podemos limitar el acceso de funciones y/o variables dentro de nuestra clausura y dar el acceso a sólo lo que queramos.

```javascript
// Memory efficient
function heavyDuty(index) {
	const bigArray = new Array(7000).fill("hi");
	
	console.log("Created!");
	
	return bigArray[index];
}

heavyDuty(688);
heavyDuty(688);
heavyDuty(688);

const getHeavyDuty = heavyDuty2();

getHeavyDuty(688);
getHeavyDuty(700);
getHeavyDuty(800);

function heavyDuty2() {
	const bigArray = new Array(7000).fill("hi");
	console.log("Created!");
	
	
	return function(index) {
		return bigArray[index];
	}
}

// Encapsulation
const makeNuclearButton = () => {
	let timeWithoutDestruction = 0;
	const passTime = () => timeWithoutDestruction++;
	const totalPeaceTime = () => timeWithoutDestruction;
	const launch = () => {
		timeWithoutDestruction = -1;

		return "*";
	}

	setInterval(passTime, 1000);

	return {
		launch,
		totalPeaceTime
	}
}

const ohno = makeNuclearButton();

ohno.totalPeaceTime();
```


## Prototypal Inheritance

Si tenemos un arreglo asignado en una variable y ejecutamos `variable.__proto__` podremos ver todos los métodos disponibles de los arreglos asociados a nuestra variable, lo que significa que podemos ver todo lo que tenemos disponible para el tipo de variable (o función) que estamos consultando. Si queremos validar si un objeto (o cualquier otro tipo) hereda el **prototype** de otra, podemos usar el método `variable.isPrototypeOf(variable2)`.

```javascript
let dragon = {
  name: 'Tanya',
  fire: true,
  fight() {
    return 5;
  },
  sing() {
    if (this.fire) {
      return `I am ${this.name}, the breather of fire`;
    }
  }
}

let lizard = {
  name: 'Kiki',
  fight() {
    return 1;
  }
}

// Don't do this, bad performance. Show with bind.
lizard.__proto__ = dragon;
dragon.isPrototypeOf(lizard);
console.log(lizard.fire);
console.log(lizard.sing());

const lizardFire = dragon.sing.bind(lizard);
console.log(lizardFire());
```

A pesar de que es muy útil es bastante malo para el rendimiento de nuestra aplicación, sin embargo, hay distintas formas de hacer herencia de los **Prototypes**. Aunque menciono que no es buena para el rendimiento (por la asignación de todo el **Prototype**) es buena para nuestro espacio en memoria, ya que lo que se hereda apunta todo a un mismo lugar en memoria, evitando consumir espacio extra de forma innecesaria. En este caso, todos los tipos (primitivos y no primitivos) heredan de `Object`.

```javascript
//Every Prototype chain links to a prototype object{}
function multiplyBy5(num) {
  return num * 5;
}

multiplyBy5.__proto__;
Function.prototype;
multiplyBy5.__proto__.__proto__;
Object.prototype;
multiplyBy5.__proto__.__proto__.__proto__;
typeof Object;
typeof {};
```

Aunque no es eficiente usar el `__proto__` de forma directa tenemos la opción de usar `Object.create(objeto)` para heredar de otro objeto en nuestra variable sin usar el `__proto__`.

```javascript
// Create our own prototypes:
var human = { mortal: true }
var socrates = Object.create(human);

socrates.age = 45; // Funciona

console.log(socrates.mortal); // true

human.isPrototypeOf(socrates); // true
```

Sólo las funciones pueden tener la propiedad `prototype` (`__proto__` es lo que se hereda, pero la propiedad `prototype` es lo que se hereda a los objetos hijos), pero tener en cuenta que `Object` también es una función, por lo que también cuenta con esta propiedad que se hereda a los distintos tipos primitivos y no primitivos. Al final con esto nos damos cuenta que todo en JavaScript es un objeto.


# Object Oriented Programming

OOP y FP son paradigmas de programación, estos nos permiten:
- Tener un código más limpio y entendible.
- Es fácil de extender.
- Es fácil de mantener.
- Eficiente en memoria.
- DRY (Don't Repeat Yourself).


## OOP and FP

En todos los programas hay 2 componentes principales, los datos y el comportamiento (funciones). OOP se basa en tener los datos y su comportamiento en un sólo lugar en memoria (objeto) lo que nos permite entender más fácilmente cómo funciona nuestro código. FP separa los datos y el comportamiento para mayor claridad.

En estos 2 paradigmas son indispensables los 2 pilares de JavaScript que ya se encuentran en la anterior sección, ya que los **Closures** van muy de la mano con FP, mientras que **Prototypal Inheritance** con OOP.


## Factory Functions

Son funciones que crean objetos por nosotros, sin embargo no estamos siendo óptimos con nuestro espacio en memoria por el Execution Context de las funciones.

```javascript
// factory function make/create
function createElf(name, weapon) {
  //we can also have closures here to hide properties from being changed.
  return {
    name,
    weapon,
    atack() {
      return 'atack with ' + weapon
    }
  }
}

const sam = createElf('Sam', 'bow');
const peter = createElf('Peter', 'bow');

sam.atack();
```


## Object.create

Crea un link entre el objeto que estamos usando para crear y la variable nueva, se hace **Prototypal Inheritance**. A pesar de que podemos crear un link con **Prototypes** usando esta opción, en sí no implementa OOP.

```javascript
const elfFunctions = {
  attack: function() {
    return 'attack with ' + this.weapon;
  }
}

function createElf(name, weapon) {
  // Object.create creates __proto__ link
  newElf = Object.create(elfFunctions);
  newElf.name = name;
  newElf.weapon = weapon;
  
  return newElf;
}


const sam = createElf('Sam', 'bow');
const peter = createElf('Peter', 'bow');
sam.attack();
```


## Constructor Functions

Es como el constructor de las clases en ES6, porque podemos redefinir las variables/propiedades de nuestro objeto. Al ser una función tiene acceso a **Prototypes** por lo que podemos ir agregando más funciones entre otras cosas.

```javascript
//Constructor Functions
function Elf(name, weapon) {
  this.name = name;
  this.weapon = weapon;
}

Elf.prototype.attack = function() { 
  return 'attack with ' + this.weapon;
}
const sam = new Elf('Sam', 'bow');
const peter = new Elf('Peter', 'bow');

sam.attack();
```

Esto nos permite tener la función `attack` en un mismo lugar de memoria a pesar de que hay 2 objetos. No olvidemos que para definir una función en **Prototypes** debemos crear la función sin arrow functions, ya que las funciones de flecha tienen Lexical Scope, por lo que terminarán apuntando al Global Scope.


## ES6 Classes

ES6 implementó las clases que conocemos en Java, aquí podemos definir nuestro propio constructor y los métodos que necesitemos. Las clases siguen usando `Prototypal Inheritance`, pero es la mejor forma de implementar la programación orientada a objetos. Por lo tanto, si nos preguntan si JavaScript tiene clases podríamos decir que sí, como azúcar sintáctico, pero las clases siguen siendo **Prototypal Inheritance**.

En una entrevista nos podrían preguntar el por qué los métdos de las clases no se declaran dentro del constructor, y esto es porque cada vez que usamos el `new` en una declaración de una variable (instanciar una clase) el constructor se ejecuta, y asignará lo que tengamos en nuestro constructor a las propiedades de la clase ya que son datos únicos que necesitaremos en cada objeto que se instancie de la clase, mientras que un método de la clase se agregaría al **Prototype** y se compartiría con las instancias de la clase creadas, esto quiere decir que se crearía la función una vez en memoria y todas las instancias accederían a dicha ubicación en memoria, sin definir la misma función para cada una de estas instancias.

```javascript
class Elf {
  constructor(name, weapon) {
    this.name = name;
    this.weapon = weapon;
  }
  
  attack() {
    return 'attack with ' + this.weapon;
  }
}

const fiona = new Elf('Fiona', 'ninja stars');
console.log(fiona instanceof Elf);

const ben = new Elf('Ben', 'bow');

fiona.attack();
```


## This - 4 ways

Hay 4 estrategias para usar la palabra reservada `this`, a continuación se ven:

```javascript
// new binding
function Person(name, age) {
  this.name = name;
  this.age =age;
  
  console.log(this);
}

const person1 = new Person('Xavier', 55);

// implicit binding
const person = {
  name: 'Karen',
  age: 40,
  hi() {
    console.log('hi' + this.name)
  }
}

person.hi();

// explicit binding
const person3 = {
  name: 'Karen',
  age: 40,
  hi: function() {
    console.log('hi' + this.setTimeout);
  }.bind(window)
}

person3.hi();

// arrow functions
const person4 = {
  name: 'Karen',
  age: 40,
  hi: function() {
    var inner = () => {
      console.log('hi ' + this.name);
    }
    
    return inner();
  }
}

person4.hi();
```


## Inheritance

Si necesitamos usar de base las propiedades de una clase y agregar algunas nuevas (o métodos) la herencia podría sernos de mucha utilizar, para seguir haciendo uso de los **Prototypes** y tener una estructura de datos personalizada.

```javascript
class Character {
  constructor(name, weapon) {
    this.name = name;
    this.weapon = weapon;
  }
  
  attack() {
    return 'attack with ' + this.weapon;
  }
}

class Elf extends Character { 
  constructor(name, weapon, type) {
    // console.log('what am i?', this); this gives an error
    super(name, weapon) ;
    console.log('what am i?', this);
    this.type = type;
  }
}

class Ogre extends Character {
  constructor(name, weapon, color) {
    super(name, weapon);
    this.color = color;
  }
  
  makeFort() { // this is like extending our prototype.
    return 'strongest fort in the world made';
  }
}

const houseElf = new Elf('Dolby', 'cloth', 'house');
//houseElf.makeFort() // error
const shrek = new Ogre('Shrek', 'club', 'green');
shrek.makeFort();
```

En el ejemplo anterior al crear la función `makeFort` JavaScript hará algo como `Ogre.prototype.makeFort = ...` para agregar nuestra función al **Prototype** de Ogre. Otra cosa es que si ejecutamos `Ogre.prototype.isPrototypeOf(shref)` el resultado ser+a `true`, lo mismo si ejecutamos `shrek instanceof Ogre`.


## Polymorphism

Es la habilidad de redefinir métodos para clases derivadas.

```javascript
class Character {
  constructor(name, weapon) {
    this.name = name;
    this.weapon = weapon;
  }
  
  attack() {
    return 'atack with ' + this.weapon;
  }
}

class Elf extends Character { 
  constructor(name, weapon, type) {
    // console.log('what am i?', this); this gives an error
    super(name, weapon) ;
    
    console.log('what am i?', this);
    
    this.type = type;
  }
}

class Ogre extends Character {
  constructor(name, weapon, color) {
    super(name, weapon);
    
    this.color = color;
  }
  makeFort() { // this is like extending our prototype.
	super.makeFort(); // execute parent method
    return 'strongest fort in the world made';
  }
}

const houseElf = new Elf('Dolby', 'cloth', 'house');
//houseElf.makeFort() // error
const shrek = new Ogre('Shrek', 'club', 'green');
shrek.makeFort();
```


## Public vs Private

Esto nos permite generar mayor seguridad en nuestras clases, ya que si decidimos que una variable o método debe ser `private` sólo podrán ser usados dentro de la clase, no afuera a pesar de que exista una instancia hacia la clase. Con `public` habilitamos el acceso desde cualquier parte del código.

```javascript
// Example 1
class  Employee  {
	#name = "Test"; // private field
	
	setName(name)  {
		this.#name = name;
	}
}

const emp = new Employee();
emp.#name = 'New'; // error
emp.setName('New'); // ok

// Example 2
class  Employee  {
	#name = "Test";
	
	constructor(name)  {
		this.#setName(name); // ok
	}

	#setName(name) { // Private method
		this.#name = name;
	}
}

const emp =  new Employee('New'); // ok
emp.#setName('New'); // error
```


## OOP in React.js

```javascript
class Toggle extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isToggleOn: true };

		// This binding is necessary to make `this` work in the callback
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.setState(prevState => ({
			isToggleOn: !prevState.isToggleOn
		}));
	}

	render() {
		return (
			<button onClick={this.handleClick}>
				{ this.state.isToggleOn ? 'ON' : 'OFF' }
			</button>
		);
	}
}
```


## 4 pillars of OOP

1. **Encapsulation:** OOP pone las cosas en un contenedor y las organiza en unidades para modelar aplicaciones del mundo real. Esto nos permite tener un código más fácil de mantener y más reusable.
2. **Abstraction:** Se oculta la complejidad del usuario, es decir que el usuario simplemente debe instanciar el objeto, y nosotros le brindaremos todas las propiedades y métodos que puede usar.
3. **Inheritance:** Heredar de otras clases evitamos reescribir el mismo código, al igual que ahorramos espacio en memoria.
4. **Polymorphism:** Nos permite llamar un método de una misma forma y obtener resultados distintos, es decir que en una clase hija podemos sobreescribir un método para darle un tratamiento diferente al objeto en sí, sin afectar el método de la clase padre.


# Functional Programming

Es muy útil para la computación distribuida (cuando hay varias máquinas interactuando con datos) y también para el paralelismo (máquinas trabajando con los mismos datos al mismo tiempo).


## Pillar of FP

1. **Pure Functions:** Se separan los datos de un programa y su comportamiento de nuestro programa. Todos los objetos creados en programación funcional son inmutables (una vez creado no se puede modificar).


## Pure Functions

Una función siempre debe retornar la misma respuesta dado el mismo valor de entrada y la función no puede modificar nada fuera de su scope.

```javascript
// Ejemplo de pure function
// no side effects
// input -> output
const array = [1, 2, 3];

function removeLastItem(arr) {
	const newArray = [].concat(arr);

	newArray.pop();

	return newArray;
}

function multiplyBy2(arr) {
	return arr.map((item) => item * 2);
}

const array2 = removeLastItem(array);
const array3 = multiplyBy2(array);

console.log(array, array2, array3);

// Ejemplo de una no pure function
// No es pure function porque está usando console.log (window), es decir que está afectando cosas fuera de su scope
function a() {
	console.log("hi");
}
```

### Referencial Transparency
Se valida si cambiando algún resultado de una función por el valor en sí el resultado en nuestro código cambia, un ejemplo:

```javascript
function a(num1, num2) {
	return num1 + num2;
}

function b(num) {
	return num * 2;
}

// Comparisons
b(a(3, 4));
b(7);
```

Las funciones puras son más fáciles de probar y evitan muchos bugs porque no hay mutación. Cada función debe tener un objetivo único en nuestro código, debe tener un `return`, deben ser puras, no deben compartir states, tener un state inmutable (no modificamos nuestro state global), deben ser componibles y predecibles.


## Indempotence

Es muy parecido a una función pura, ya que evalúa que dado un valor de entrada siempre tenga el mismo valor de salida, no importa si afecta o se comunica con el contexto global. Es muy importante para la computación distribuida y paralelismo porque hace nuestro código predecible.

```javascript
// Idempotence:
function notGood() {
  return Math.random();
  // new Date();
}

function good() {
  return 5;
}

Math.abs(Math.abs(10));
```


## Imperative vs Declarative

El código imperativo le dice a la máquina qué hacer y cómo hacerlo, el código declarativo qué hacer y qué debería de suceder.

```javascript
// Examples
// Imperative
for(let i = 0; i < 1000; i++) {
	console.log(i);
}

// Declarative
[1, 2, 3].forEach((item) => console.log(item));
```


## Inmutability

Simplemente significa no cambiar los datos del mundo exterior de nuestra función.

```javascript
const obj = { name: 'Andrei' };

function clone(obj) {
  return { ...obj }; // this is pure
}

function updateName(obj) {
  const obj2 = clone(obj);
  
  obj2.name = 'Nana';
  
  return obj2;
}

const updatedObj = updateName(obj);
console.log(obj, updatedObj);
```


## Partial Application

Procesa una función con un pequeño número de parámetros.

```javascript
//Partial Application
const multiply = (a, b, c) => a * b * c;
const partialMultiplyBy5 = multiply.bind(null, 5);

partialMultiplyBy5(10, 20);
```


## Compose and Pipe

Es un principio de diseño de sistemas, que va muy de la mano con la relación entre componentes. Un sistema altamente componible provee componentes que pueden ser seleccionados y armados en varias combinaciones. La diferencia entre Compose y Pipe es que Compose ejecuta las funciones de derecha a izquierda, y Pipe de izquierda a derecha.

```javascript
fn1(fn2(fn3(50)));

compose(fn1, fn2, fn3)(50); // Right to left
pipe(fn3, fn2, fn1)(50); // left to right

const compose = (f, g) => (a) => f(g(a));
const pipe = (f, g) => (a) => g(f(a));
const multiplyBy3AndAbsolute = compose((num) => num*3, Math.abs);
console.log(multiplyBy3AndAbsolute(-50));
```


## Arity

Es el número de argumentos que una función toma. Entre menor sea el **Arity** de una función más fácil será esta de entender, además que será mucho más sencillo construir su **Compose** o su **Pipe**.


# OOP vs FP

La programación funcional se enfoca en **composition** y la programación orientada a objetos se enfoca en **inheritance**. Con la herencia no enfocamos en el "que es" y con la composición en "qué tiene".

Los mayores problemas con OOP es que siempre se heredan todos los métodos y atributos de la superclase, es decir que si en una clase hija sólo necesitáramos un método pero la superclase tiene 3, tendremos todos esos 3 a pesar de que no los vayamos a usar. Para evitar esto podemos usar la composición de FP ya que esta nos permite hacer buenas soluciones a gran escala.


## Tabla de comparación entre ambos

| OOP | FP |
|--|--|
| Muchas operaciones en datos fijos | Pocas operaciones en datos comunes |
| Stateless (inmutable) | Stateful |
| Funciones puras (no se afecta el scope global) | Side effects |
| Declarativo (qué queremos que se haga) | Imperativo (cómo se hacen las cosas) |

### FP
Es muy buena procesando muchos datos de información para las aplicaciones, si estás analizando data o usando un modelo de Machine Learning la programación funcional sería una buena opción ya que funciona muy bien para el alto rendimiento y procesamientos. Si tienes pocas cosas que requieren muchas operaciones, muchas funciones pequeñas también es una buena opción.

### OOP
Si tienes muchas cosas como personajes en un juego con no tantas operaciones, OOP sería una gran solución.