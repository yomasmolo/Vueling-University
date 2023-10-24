// Variables
let cantidadLluvia = 95; // Cambia este valor para simular diferentes cantidades de lluvia
let compuertasAbiertas = false;

// Verificar la cantidad de lluvia
if (cantidadLluvia > 90) {
  console.log("Llueve más de 90 litros. Pueblo en peligro.");
  if (!compuertasAbiertas) {
    console.log("Compuertas cerradas. Abriendo compuertas...");
    compuertasAbiertas = true;
  }
} else {
  console.log("Llueve menos de 90 litros.");
  if (compuertasAbiertas) {
    console.log("Compuertas abiertas. Cerrando compuertas...");
    compuertasAbiertas = false;
  } else {
    console.log("Compuertas ya están cerradas.");
  }
}

// Estado final de las compuertas
if (compuertasAbiertas) {
  console.log("Las compuertas están abiertas.");
} else {
  console.log("Las compuertas están cerradas.");
}
