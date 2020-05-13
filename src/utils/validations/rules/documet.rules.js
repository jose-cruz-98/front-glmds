var expTextAndNumbers = /^[0-9A-Za-z ]+$/;

const rules = {
    tName : [
        {
            minLenght : 1,
            msg : `El nombre debe de tener mas de 1 caracteres.`
        },{
            maxLenght : 50,
            msg : `El nombre debe de tener menos de 50 caracteres.`
        },
        {
            isValid : expTextAndNumbers,
            msg : "El nombre es invalido"
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