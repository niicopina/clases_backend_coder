//el manager debe vivir en una clase en un archivo externo llamado UserManager.js
const fs = require('fs')
class UserManager {
    constructor(path){
        this.users = []   //users va a alojar todos los usuarios
        this.path = path  //path es parametro con la ruta donde debe crear el archivo donde se guardaran los usuarios
        this.init(path)
    }
    init(path){               //init es el metodo que al definirse una instrancia de la clase: crea el arhcivo si no existe
        let file = fs.existsSync(path, '[]')
        if(!file){
            fs.promises.writeFile(path)
                .then(res=>console.log('file created'))
                .catch(err=>console.log(err))
        }
    }
    add_user({name, last_name, age, carts}){
        let data = {name, last_name, age, carts}
        data = JSON.stringify(data, null, 2)
        fs.promises.writeFile(this.path, )
    }
}
let manager = new UserManager('./data/users.json')