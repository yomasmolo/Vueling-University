const primes = [];

function isPrime(inpNum) {
  if (inpNum <= 1) {
    return false;
  }

  for (let index = 2; index < inpNum; index++) {
    if (inpNum % index === 0) {
      return false;
    }
  }

  return true;
}

function pushIntoArray() {
  for (let index = 0; primes.length < 10; index++) {
    if (isPrime(index)) {
      primes.push(index);
    }
  }
  return primes;
}

console.log("Los números primos son: ", pushIntoArray());