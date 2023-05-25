// Factorial de un número:
function factorial(n) {
    if (n === 0) {
      return 1; // Caso base: factorial de 0 es 1
    } else {
      return n * factorial(n - 1); // Llamada recursiva: factorial de n es n * factorial(n - 1)
    }
  }
  console.log(factorial(5)); // Devuelve 120 (5! = 5 * 4 * 3 * 2 * 1)
