var expTextAndNumbers = /^[0-9A-Za-z ]+$/;
var expNum = /^[0-9 ]+$/;

const rules = {
    tCarrier : [
        {
            minLenght : 1,
            msg : `La transportista debe de tener mas de 1 caracteres.`
        },{
            maxLenght : 30,
            msg : `La transportista debe de tener menos de 30 caracteres.`
        },
        {
            isValid : expTextAndNumbers,
            msg : "La transportista es invalida."
        }
    ],
    tLicensePlate : [
        {
            minLenght : 1,
            msg : "La placa debe de tener mas de 1 caracteres."
        },{
            maxLenght : 30,
            msg : `La placa no debe de tener mas de 30 caracteres.`
        },
        {
            isValid : expTextAndNumbers,
            msg : "La placa es invalido."
        }
    ],
    tOperator : [
        {
            minLenght : 1,
            msg : "El operador debe de tener mas de 1 caracteres."
        },{
            maxLenght : 60,
            msg : `El operador no debe de tener mas de 60 caracteres.`
        },
        {
            isValid : expTextAndNumbers,
            msg : "La operador es invalido."
        }
    ],
    tContact : [
        {
            minLenght : 1,
            msg : "El contacto debe de tener mas de 1 caracteres."
        },{
            maxLenght : 15,
            msg : `El contacto no debe de tener mas de 15 caracteres.`
        },
        {
            isValid : expNum,
            msg : "El contacto es invalido."
        }
    ],
    tCaat : [
        {
            minLenght : 1,
            msg : "El CAAT debe de tener mas de 1 caracteres."
        },{
            maxLenght : 30,
            msg : `El CAAT no debe de tener mas de 30 caracteres.`
        },
        {
            isValid : expTextAndNumbers,
            msg : "El CAAT es invalido."
        }
    ],
    tTypeCarrier : [
        {
            minLenght : 1,
            msg : "El tipo de transporte no debe de tener menos de 1 cracter."
        },{
            maxLenght : 20,
            msg : `El tipo de transporte no debe de tener mas de 20 caracteres.`
        },
        {
            isValid : expTextAndNumbers,
            msg : "El tipo de transporte es invalida."
        }
    ]
}

export default rules;