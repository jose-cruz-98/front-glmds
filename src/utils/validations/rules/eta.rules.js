var expDate = /^\d{4}([-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/;
const rules = {
    tEta : [
        {
            minLenght : 1,
            msg : `Debes de ingresar una fecha.`
        },{
            maxLenght : 30,
            msg : `La fecha es incorrecta.`
        },
        {
            isValid : expDate,
            msg : "La eTA es invalida."
        }
    ]
}

export default rules;