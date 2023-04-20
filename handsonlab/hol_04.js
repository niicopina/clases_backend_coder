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

    read_users(quantity){
        //configuramos paginacion por default
        quantity = quantity ?? 4
        let slice_array = this.users.slice(0, quantity)
        console.log(slice_array)
        return slice_array
    }
    read_user(id){
        let one = this.users.find(each => each.id === id)
        if(!one){
            console.log('error: not found')
            return null
        } else {
            console.log('finded user: ' + id)
            return one
        }
    }
    async update_user(id, data){
        //data es el objeto con las propiedades que necesito modificar del usuariuo
        try {
            //busco el usuario
            let one = this.read_user(id) // si no lo encuentra me devuelve un null
            if(!one){
                console.log('error: not found user to update')
                return 'error: not found user to update'
            }
            //Data debe tener propiedades a modificar
            if(Object.keys(data).length === 0){
                console.log('error: insert some values')
                return 'error: insert some values'
            }
            //itero para modificar la propuedad correspondiuente
            for(let prop in data) {
                //verificar que la propiedad es parte de la forma del objeto
                //es decir que la prop pertenece al objeto
                //es decir que viene una prop que existe etc (ej: viene nombre en vez de name)
                if(prop !== 'name' || prop !== 'last_name' || prop !== 'age' || prop !== 'carts'){
                    console.log(`error: ${prop} is not a correct property`)
                    return 'error: insert a correct property'
                }
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
    async destroy_user(id) {
        try {
            //la condicion mas importante a configurar a este metodo es 
            //que el usuario con ese id sea parte del array ya que si no, no existe y no hay nada para borrar
            let one = this.read_user(id)

            this.users = this.users.filter( each => each.id !== id)
            let data_json = JSON.stringify(this.users, null, 2)
            await fs.promises.writeFile(this.path, data_json)
            return 'delete user: ' + id
        } catch(error) {
            return 'error at deleting user'
        }
    }
}
async function manager(){
let manager = new UserManager('./data/users.json')
await manager.add_user({name: 'igna', last_name: 'bibo', age: 32, carts: []})
await manager.add_user({name: 'nico', last_name: 'piña', age: 30, carts: []})
await manager.add_user({name: 'john', last_name: 'piña', age: 30, carts: []})
await manager.update_user(3, {name: 'willy', carts: ['celular']})
await manager.update_user(2, {name: 'agus'})
await manager.destroy_user(1)
await manager.destroy_user(4)
}

