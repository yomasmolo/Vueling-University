// Factorial de un número:
function factorial(n) {
    if (n === 0) {
      return 1; // Caso base: factorial de 0 es 1
    } else {
      return n * factorial(n - 1); // Llamada recursiva: factorial de n es n * factorial(n - 1)
    }
  }
  console.log(factorial(5)); // Devuelve 120 (5! = 5 * 4 * 3 * 2 * 1)

  
// Cuenta Atras:
let cuentaAtras = numero => {
    if (numero === 0) {
        return;
    }
    console.log(numero);
    return cuentaAtras(numero - 1);
};
console.log(cuentaAtras(5)) // 5, 4, 3, 2, 1


/* Este ejercicio de recursividad comprueba en una lista de numeros, que si el numero coincide
con su posicion en la lista, lo guarde en un array.*/

lista = [];

function indice(listaNumeros, posicionLista){
    if (posicionLista == listaNumeros.length-1){
        console.log(lista);
    }
    else{
        if (listaNumeros[posicionLista] == posicionLista){
            lista.push(posicionLista);
            indice(listaNumeros, posicionLista+1);
        }   
        else{
            indice(listaNumeros, posicionLista+1);
        } 
    }
};

indice([1, 1, 2, 3, 1, 12, 15, 12, 1, 3, 3, 6, 13, 13, 15], 0);
//      x  v  v  v  x   x   x   x  x  x  x  x   x   v   x