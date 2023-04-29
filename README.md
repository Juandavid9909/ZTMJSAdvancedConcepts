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