let marc = { Nombre: "Marc", edad: 25 };
let nacho = { Nombre: "Nacho", edad: 30 };
let raul = { Nombre: "Raul", edad: 29 };
let adri = { Nombre: "Adri", edad: 17 };
let arr = [ marc, nacho, raul, adri];
console.log(arr);

function obtenerPromedio(users) {
  let suma = 0;
  let mayores = [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].edad >= 18) {
      mayores.push(users[i].edad);
    } 
  }
  console.log(mayores);
  mayores.forEach(function(a){suma += a;});
  return suma / mayores.length;
}

console.log(obtenerPromedio(arr));
