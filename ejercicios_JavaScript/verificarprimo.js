function esPrimo(numero) {
    let primo = true;
    if (numero <= 1) {
        primo = false;
    }
    for (let i = 2; i < numero; i++) {
        if (numero % i === 0) {
            primo = false;
        }
      return true;
    }
}
  
  function añadirPrimos() {
    let lista = [];
    let numero = 2;
    
    while (lista.length < 10) {
      if (primo(numero)) {
        lista.push(numero)
      }
      numero++;
    }
    return lista;
  }
  
  console.log(añadirPrimos());