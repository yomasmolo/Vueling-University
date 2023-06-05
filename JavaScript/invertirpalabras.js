function invertirPalabras(cadena) {
    let separar = cadena.split("");
    console.log(separar);
    let invertir = separar.reverse();
    console.log(invertir);
    let arregloPalabra = invertir.join("");
    console.log(arregloPalabra);

    let separar2 = arregloPalabra.split(" ");
    console.log(separar2);
    let invertir2 = separar2.reverse();
    console.log(invertir2);
    let fraseFinal = invertir2.join(" ");
    console.log(fraseFinal);
}

invertirPalabras("Hola Mundo");