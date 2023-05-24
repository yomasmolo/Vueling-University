function multiplicarValores(arr) {
    console.log(arr);
    let numeros = [];
    multiplicar = 2;
    for (var i = 0; i < arr.length; i++){
      numeros.push(multiplicar * arr[i]);
    }
    return numeros;
  }
console.log(multiplicarValores([2, 4, 5]));

function multiplicarPalabras(palabras) {
  console.log(palabras);
  for (let i = 0; i < palabras.length; i++) {
    palabras[i] = palabras[i].repeat(2);
  }
  console.log(palabras);
}
console.log(multiplicarPalabras(["hola", "adios"]));
