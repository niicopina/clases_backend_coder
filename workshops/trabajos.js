//Definir la clase TicketManager, el cual  tendrá un arreglo de eventos que iniciará vacío
//La clase debe contar con una variable privada "gain" que será la ganancia de un ticket (15%)

class TicketManager {
    #gain
    constructor() {
        this.events = []
        this.#gain = 0.15
    }
    getEvents() {
        console.log(this.events)
        return this.events
    }
    getEventById(event_id){
        let one = this.events.find(each => each.id === event_id)
        if(one){
            console.log(one)
            return one
        }
        console.log('not found')
        return null
    }
    addEvent({name, place, price, capacity, date}) {
        capacity = capacity ?? 50
        date = date ?? new Date()
        let id = 0
        if(this.events.length === 0){
            id = 1
        }else{
           let lastEvent = this.events[this.events.length -1]
           id = lastEvent.id + 1
        }
        price = price + this.#gain * price
        let event = {name, place, price, capacity, date, id}
        event.participants = []
        this.events.push(event)
    }
    addParticipant(event_id, user_id, new_name) {
        let found_event = this.getEventById(event_id)
        console.log(found_event.participants)
        if(found_event){
            if(found_event.capacity > found_event.participants.length){
                if(found_event.participants.includes(user_id)) {
                    console.log('Ya está en la lista')
                } else {
                    console.log('Agregando usuario' + user_id)
                    found_event.participants.push(user_id)
                    console.log(found_event.participants)
                }
            } else {
                console.log('No hay más capacidad')
            }
            if(new_name){
                found_event.name = new_name
            }
            return found_event
        }
        return null
    }
    addNewEvent(event_id, new_place, new_date){
        let found_event = this.getEventById(event_id)
        if(found_event) {
            this.addEvent({
                name: found_event.name, 
                place: new_place, 
                price: found_event.price,
                capacity: found_event.capacity,
                date: new_date
            })
        console.log('se creo nuevo evento')
    }}
    deleteEvent(event_id){
        this.events = this.events.filter(each => each.id !== event_id)
        console.log('evento eliminado')
    }
}

let ticket = new TicketManager()
ticket.addEvent({
    name: 'alice',
    place: 'korea',
    price: 23,
    capacity: 200,
    date: undefined
})
ticket.addEvent({
    name: 'brown',
    place: 'usa',
    price: 33,
    capacity: 110,
    date: new Date('04/08/2023')
})
ticket.addEvent({
    name: 'salch',
    place: 'canada',
    price: 63,
    capacity: null,
    date: new Date('06/07/2023')
})
/* ticket.addParticipant(3, 5)
ticket.addParticipant(3, 9)
ticket.addParticipant(3, 15)
ticket.addParticipant(1, 5)
ticket.addParticipant(1, 5)
ticket.addParticipant(1, 5, 'hola')
ticket.getEventById(1) */
//ticket.addNewEvent(3, 'china', new Date('08/20/2023'))
ticket.deleteEvent(1)
ticket.getEvents()