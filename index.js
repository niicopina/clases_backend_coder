/* let nombre = "nico";
let edad = 27;
let precio = 1231;
const series = [
    "Sherlock",
    "Mr Robot",
    "Hellsing"
];
console.log(nombre)
console.log(edad)
console.log(precio)
console.log(series)

edad++;

series.push("House of Cards");

console.log(series);
console.log(edad); */

let dividBien = (num1, num2) => {
    return new Promise ((resolve, reject) => {
        let resultado
        if(num2===0){
            resultado = reject('no se puede')
        }else{
            resultado = resolve(num1 / num2)
        }
        return resultado
    }
    )   
}


