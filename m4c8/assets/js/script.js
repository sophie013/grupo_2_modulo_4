// ==================================================
// DEFINICIONES BÁSICAS
// ==================================================

// Variable:
// Espacio en memoria donde guardamos un dato.

// const:
// Se usa cuando el valor NO va a cambiar.

// let:
// Se usa cuando el valor SÍ puede cambiar.

// Arreglo (Array):
// Estructura de datos que almacena múltiples valores
// en una sola variable, ordenados por posición (índice).
// Los índices comienzan en 0.

// Índice:
// Posición numérica de un elemento dentro de un arreglo.

// Método:
// Función que pertenece a un objeto o estructura.
// Ej: push(), pop(), filter().


// ==================================================
// 1. ARREGLOS
// ==================================================

const frutas = ["Manzana", "Pera", "Plátano", "Naranja", "Uva"];
// Creamos un arreglo con 5 elementos.

// Acceder a un elemento:
// Usamos el índice entre corchetes [].
console.log("Tercer elemento:", frutas[2]);
// frutas[2] significa:
// ve al índice 2 del arreglo frutas.

// push():
// Método que agrega un elemento al final del arreglo.
frutas.push("Mango");
console.log("Después de push:", frutas);

// pop():
// Método que elimina el último elemento del arreglo.
frutas.pop();
console.log("Después de pop:", frutas);


// ==================================================
// 2. CICLOS (BUCLES)
// ==================================================

// Ciclo:
// Estructura que repite un bloque de código
// mientras una condición sea verdadera.

// --- FOR ---
// Se usa cuando sabemos cuántas veces queremos repetir.

console.log("Recorrido con for:");

for (let i = 0; i < frutas.length; i++) {
    // i = contador
    // frutas.length = cantidad de elementos del arreglo
    console.log(frutas[i]);
}

// --- forEach() ---
// Método propio de los arreglos.
// Ejecuta una función por cada elemento.

console.log("Recorrido con forEach:");

frutas.forEach(function(fruta) {
    console.log(fruta);
});

// Diferencia conceptual:
// for → control manual del índice.
// forEach → el arreglo se encarga del recorrido.


// ==================================================
// 3. OPERACIONES CON ARREGLOS
// ==================================================

const numerosA = [5, 10, 15, 20];
const numerosB = [10, 20, 30, 40];

// Spread operator (...):
// Expande los elementos de un arreglo.
const union = [...numerosA, ...numerosB];
console.log("Unión:", union);

// filter():
// Método que crea un nuevo arreglo
// con los elementos que cumplen una condición.

const diferencia = numerosA.filter(numero => 
    !numerosB.includes(numero)
);
// includes():
// Verifica si un valor existe dentro de un arreglo.
// ! significa "NO".

console.log("Diferencia (A - B):", diferencia);

// concat():
// Une dos arreglos en uno nuevo.
const concatenado = numerosA.concat(numerosB);
console.log("Concatenado:", concatenado);

// Filtrar mayores a 10
const mayoresA10 = concatenado.filter(numero => numero > 10);
console.log("Mayores a 10:", mayoresA10);


// ==================================================
// 4. WHILE Y DO/WHILE
// ==================================================

// while:
// Ejecuta el bloque mientras la condición sea verdadera.

let contador = 1;
let sumaTotal = 0;

while (contador <= 10) {
    sumaTotal += contador;
    contador++;
}

console.log("Suma del 1 al 10:", sumaTotal);

// do/while:
// Ejecuta el bloque al menos una vez,
// luego evalúa la condición.

let numero = 5;

do {
    console.log("do/while:", numero);
    numero++;
} while (numero <= 15);


// ==================================================
// 5. FOR ANIDADO
// ==================================================

// For anidado:
// Un ciclo dentro de otro ciclo.
// Se usa para combinaciones o estructuras tipo tabla.

console.log("Tabla de multiplicar del 1 al 5:");

for (let i = 1; i <= 5; i++) {
    for (let j = 1; j <= 5; j++) {
        console.log(`${i} x ${j} = ${i * j}`);
    }
}  