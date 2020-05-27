var expEmail = RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,4})+$/);
var expPassword = RegExp(/^(?=.*\d)(?=.*[!+<>-@.])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/);

const rules = {
    tEmail : [
        {
            minLenght : 3,
            msg : `El correo debe de tener mas de 3 caracteres.`
        },{
            maxLenght : 50,
            msg : `El correo debe de tener menos de 50 caracteres.`
        },
        {
            isValid : expEmail,
            msg : "El correo es invalido"
        }
    ],
    tPassword : [
        {
            minLenght : 8,
            msg : `La contraseña debe de tener mas de 7 caracteres.`
        },{
            maxLenght : 16,
            msg : `La contraseña debe de tener menos de 17 caracteres.`
        },
        {
            isValid : expPassword,
            msg : "La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico."
        }
    ]
}

export default rules;