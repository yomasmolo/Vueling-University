function buscarPalabraLarga(frase) {
    let palabras = frase.split(" ");
    console.log(palabras);
    palabraMasLarga = ""
    palabras.forEach(function(palabra){
    if (palabra.length > palabraMasLarga.length){
        palabraMasLarga = palabra
     };
    });
    return palabraMasLarga;
  }
console.log("La palabra más larga es: " + buscarPalabraLarga("Estoy aprendiendo JavaScript"));