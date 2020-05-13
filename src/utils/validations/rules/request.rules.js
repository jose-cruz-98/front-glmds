var expTextAndNumbers = /^[0-9A-Za-z .]+$/;
var expNumbers = /^[0-9 .]+$/;

const rules = {
    tAmount : [
        {
            minLenght : 0,
            msg : `Debes de ingresar una cantidad`
        },{
            maxLenght : 50,
            msg : `La cantidad es demaciado grande.`
        },
        {
            isValid : expNumbers,
            msg : "El formato de monto es invalida"
        }
    ],
    tTypePayment : [
        {
            minLenght : 0,
            msg : `Debes de ingresar un tipo de pago`
        },{
            maxLenght : 50,
            msg : `El tipo de pag es muy largo.`
        },
        {
            isValid : expTextAndNumbers,
            msg : "El formato de tipo de pago es invalido"
        }
    ],
    _tUserTo : [
        {
            minLenght : 0,
            msg : `Debes de seleccionar un usuario`
        },{
            maxLenght : 50,
            msg : `El usuario seleccionado es incorrecto.`
        },
        {
            isValid : expTextAndNumbers,
            msg : "El formato de usuario es invalido"
        }
    ]
}

export default rules;