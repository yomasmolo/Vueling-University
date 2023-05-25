const primos = [];

function esPrimo(inpNum) {
  if (inpNum <= 1) {
    return false;
  }

  for (let i = 2; i < inpNum; i++) {
    if (inpNum % i === 0) {
      return false;
    }
  }

  return true;
}

function PonerEnArray() {
  for (let i = 0; primos.length < 10; i++) {
    if (esPrimo(i)) {
      primos.push(i);
    }
  }
  return primos;
}

console.log("Los números primos son: ", PonerEnArray());