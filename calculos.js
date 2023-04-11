// CALCULADORA POSITIVA

function suma(n1, n2){
    return new Promise(
        (resolve, reject) => {
            let verificarN1 = esNumero(n1)
            console.log(verificarN1)

            let verificarN2 = esNumero(n2)
            console.log(verificarN2)

            if(verificarN1.number && verificarN2.number){
                let verificarSumaMayorACero = verificarN1.number + verificarN2.number
            }else{
                reject({
                    error1: verificarN1.message, 
                    error2: verificarN2.message
                })
            }

            if(verificarN1 && verificarN2){
                resolve('OK')
            }else{
                reject('Not Ok')
            }
        }
    )
}
/* suma(5,10)
suma(0, 8) */
suma('hola', 23).then(res=>console.log(res)).catch(err=>console.log(err))


function esNumero(num){
    if (isNaN(num)) {
        let message = 'Solo números'
        return { success: false, message }
    } else if (num===0) {
        let message = 'Operación innecesaria'
        return { success: false, message }
    } else {
        return { success: true, number: num }
    }
}
async function calculos(num1,num2,operacion){
    try {
        let calculo = await operacion(num1,num2)
        console.log(calculo)
        return calculo
    } catch(error) {
        console.log(error)
        return error
    }
}
