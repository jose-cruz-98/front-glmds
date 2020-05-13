var expTextAndNumbers = /^[0-9A-Za-z ]+$/;

const rules = {
    tNote : [
        {
            minLenght : 1,
            msg : `La nota debe de tener mas de 1 caracteres.`
        },{
            maxLenght : 500,
            msg : `La nota debe de tener menos de 500 caracteres.`
        },
        {
            isValid : expTextAndNumbers,
            msg : "La nota es invalido"
        }
    ],
    tFile : [
        {
            isValid : "file",
            msg : "Solo se permiten archivos tipo .jpg, .jpej, .png, .pdf",
            type : ["JPG","JPEG","PNG","PDF"]
        }
    ]
}

export default rules;