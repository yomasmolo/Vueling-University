function isPrime(inpNum) {
  if (inpNum <= 1) {return false;}
  for (let index = 2; index < inpNum; index++) {
      if (inpNum % index === 0) {
          return false;
      }
  }
  return true;
}

for (let index = 0; index < 30; index++) {
  console.log("El num "+index+" es primo? "+isPrime(index));
}