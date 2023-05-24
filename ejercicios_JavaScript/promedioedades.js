function obtenerPromedio(users) {
    let suma = 0;
    for (let i = 0; i < users.length; i++) {
      suma = suma + users[i].edad; 
    }
    return suma / users.length;
  }
  
  let marc = { Nombre: "John", edad: 25 };
  let nacho = { Nombre: "Pete", edad: 30 };
  let raul = { Nombre: "Mary", edad: 29 };
  
  let arr = [ marc, nacho, raul ];
  
  console.log(arr);
  console.log(obtenerPromedio(arr));