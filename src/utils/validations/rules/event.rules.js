var expTextAndNumbers = /^[0-9A-Za-z ]+$/;
var expDate = /^\d{4}([-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/;

const rules = {
    tTitle : [
        {
            minLenght : 1,
            msg : `El titulo debe de tener mas de 1 caracteres.`
        },{
            maxLenght : 10,
            msg : `El titulo debe de tener menos de 10 caracteres.`
        },
        {
            isValid : expTextAndNumbers,
            msg : "El titulo es invalida."
        }
    ],
    tStart : [
        {
            minLenght : 1,
            msg : "Debes de ingresar una fecha."
        },{
            maxLenght : 15,
            msg : `La fecha no debe de tener mas de 15 caracteres.`
        },
        {
            isValid : expDate,
            msg : "La fecha es invalido."
        }
    ]
}

export default rules;