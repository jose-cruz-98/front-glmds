var expTextAndNumbers = /^[0-9A-Za-z ]+$/;

const rules = {
    tNote : [
        {
            minLenght : 1,
            msg : `La nota debe de tener mas de 1 caracteres.`
        },{
            maxLenght : 200,
            msg : `La nota debe de tener menos de 200 caracteres.`
        },
        {
            isValid : expTextAndNumbers,
            msg : "El formato de nota es invalido"
        }
    ]
}

export default rules;