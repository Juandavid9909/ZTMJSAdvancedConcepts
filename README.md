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

```
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

```
let array = [];

for(let i = 5; i > 1; i++) {
	array.push(i - 1);
}
```

## Single Thread

JavaScript es Single Threaded, esto significa que ejecuta una función a la vez, por ejemplo si ejecutamos la instrucción `alert("Hola");` veremos que JavaScript bloqueará incluso el scroll de la página.

## Hoisting

JavaScript tiene Hoisting, es decir que tiene la capacidad de no romper la ejecución de código cuando llamamos a una variable o una función antes de su inicialización, para las variables sólo funciona con `var`, también tiene en cuenta la reasignación con `var` de una misma variable, de ser así no declara una segunda variable sino que reescribe el valor de la primera.

```
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

```
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

```
var canada = function() {
	console.log("cold");
}
```

### Function Declaration
Cuando simplemente creamos una función, tal como:

```
function india() {
	console.log("warm");
}
```

Puedes tener **Function Invocation/Call/Execution** haciendo algo como `canada()`. La importancia de tener las **Function Expression** y **Function Declaration** es que las expresiones de funciones se declaran en tiempo de ejecución, mientras que las declaraciones de funciones se declaran cuando el compilador está revisando el código antes de ejecutarlo. Aquí también existe un contexto, el **Execution Context** donde tenemos acceso a las palabras reservadas `arguments` y `this`.


## Arguments keyword

No existe en el contexto global, sólo en el contexto de las funciones, para usarlo se debe ejecutar de la siguiente manera:

```
function marry(person1, person2) {
	console.log("arguments", arguments);
	console.log(Array.from(arguments));

	return `${ person1 } is now married to ${ person2 }`;
}

marry("Tim", "Tina");
```

Sin embargo, no es la forma recomendada de generar un arreglo (se debe hacer la conversión porque llega como un objeto) con todos los parámetros de la función, si ese es nuestro objetivo podemos utilizar el **spread operator** de JavaScript para hacerlo.

```
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

```
var heyhey = function doodle() {
	doodle();

	return "heyhey";
}

heyhey();
```

Su comportamiento es extraño porque la función se crea a sí misma en su contexto, por lo que se puede llamar usando el nombre *doodle* a pesar de que la variable que contiene la función se llama *heyhey*.


## Function Scope vs Block Scope

El scope de funciones es cuando creamos variables dentro de funciones, ya que tendrán un scope local, es decir que en scope global dichas variables no serán accesibles. El scope de bloque  es dentro de alguna condición, for, etc (es decir dentro de unas {}) usando `let` y/o `const` ya que tampoco serán accesibles las variables que se encuentren dentro de las llaves actuales, en cambio si usamos `var` sí serían accesibles.