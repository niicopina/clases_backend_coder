const http = require('http')     //requiero el modulo nativo de node para crear servidores
const moment = require('moment') //requiero el modulo externo de moment para manejar fechas

let currentDate = moment()
let validDate = currentDate.isValid()
validDate = currentDate.format("MMM Do YY")

let bornDate = moment("19950615")
let validBornDate = bornDate.isValid()
let formatBornDate = bornDate.format("MMM Do YY")

let days = currentDate.diff(bornDate, 'days') / 1000
console.log(days)
const server = http.createServer( //creo un servidor
    (req, res) => res.end(`hoy tenes ${days} dias de edad`)  //defino la callback pa la 'vista' del servidor
)

const PORT = 8000               // defino Puerto donde se levantará el servidor
const callback = () => console.log('server ready on PORT: ' + PORT) //defino la callback que se ejecuta cuando se levanta el servidor

server.listen(
    PORT,
    callback
)