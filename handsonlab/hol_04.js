//el manager debe vivir en una clase en un archivo externo llamado UserManager.js
const fs = require('fs')
class UserManager {
    constructor(path){
        this.users = []   //users va a alojar todos los usuarios
        this.path = path  //path es parametro con la ruta donde debe crear el archivo donde se guardaran los usuarios
        this.init(path)
    }
    init(path){           //init es el metodo que al definirse una instrancia de la clase: crea el arhcivo si no existe
        let file = fs.existsSync(path)
        if(!file){
            fs.promises.writeFile(path, '[]')
                .then(res=>console.log('file created'))
                .catch(err=>console.log(err))
        } else {
            fs.promises.readFile(path, 'utf-8')
                .then(res=> this.users = JSON.parse(res))
                .catch(err=>console.log(err))
        }
    }
    /* add_user({name, last_name, age, carts}){
        let data = {name, last_name, age, carts}
        data.id = 1
        this.users.push(data)                               //agrego algo a la memoria del programa (usuario)
        let data_json = JSON.stringify(this.users, null, 2) //luego se stringify
        fs.promises.writeFile(this.path, data_json)              //luego se sobreescribe el arvchibo
            .then(res=>console.log('user created'))
            .catch(err=>console.log(err))
    } */

    read_users(){
        return this.users
    }
    read_user(id){
        let one = this.users.find(each => each.id === id)
        return one
    }
    async update_user(id, data){
        //data es el objeto con las propiedades que necesito modificar del usuariuo
        try {
            //busco el usuario
            let one = this.read_user(id)
            //itero para modificar la propuedad correspondiuente
            for(let prop in data) {
                one[prop] = data[prop]
            }
            //convierto a texto plano el array
            let data_json = JSON.stringify(this.users, null, 2)
            //sobreescribo el archivo
            await fs.promises.writeFile(this.path, data_json)
            return 'updated user: ' + id
        } catch(error){
            return 'error at updating user'
        }
    }
}
let manager = new UserManager('./data/users.json')
manager.add_user({name: 'igna', last_name: 'bibo', age: 32, carts: []})
manager.add_user({name: 'nico', last_name: 'piña', age: 30, carts: []})
manager.add_user({name: 'maty', last_name: 'lopez', age: 40, carts: []})
manager.add_user({name: 'nati', last_name: 'ada', age: 20, carts: []})
manager.add_user({name: 'agus', last_name: 'sasa', age: 22, carts: []})
manager.add_user({name: 'mili', last_name: 'bava', age: 24, carts: []})
manager.add_user({name: 'sabri', last_name: 'adhasda', age: 26, carts: []})


