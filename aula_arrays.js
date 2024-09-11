// Um único objeto
let meta = {
    value: 'Beber Água',
    checked: true
}

// Objeto com outros objetos dentro
let metas = [
    meta,
    {
        value: 'Caminhar 20 minutos todos os Dias',
        checked: false
    }
]

// Acessa os atributos dos objetos com base no índice
console.log(metas[1].value);