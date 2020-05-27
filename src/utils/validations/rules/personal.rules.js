var expTextAndNumbers = /^[0-9A-Za-z ]+$/;

const rules = {
    tCategory : [
        {
            minLenght : 1,
            msg : `La categoria debe de tener mas de 1 caracteres.`
        },{
            maxLenght : 200,
            msg : `La categoria debe de tener menos de 200 caracteres.`
        },
        {
            isValid : expTextAndNumbers,
            msg : "El formato de categoria es invalido"
        }
    ]
}

export default rules;