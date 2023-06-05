function frase(n) {
    const palabras = n.split(" ");
    console.log(palabras);

    for (i = 0; i < palabras.length; i++) {
    palabras[i] = palabras[i][0].toUpperCase() + palabras[i].substr(1);
    }

    console.log(palabras.join(" "));
}


frase("El mejor deporte es el futbol");