var expTextAndNumbers = /^[0-9A-Za-z ()]+$/;
// var expDate = /^\d{4}([-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/;

const rules = {
    tReference : [
        {
            minLenght : 1,
            msg : `La referencia debe de tener mas de 1 caracteres.`
        },{
            maxLenght : 10,
            msg : `La referencia debe de tener menos de 10 caracteres.`
        },
        {
            isValid : expTextAndNumbers,
            msg : "La referencia es invalida."
        }
    ],
    tEta : [
        {
            isValid : "array",
            msg : "Debes de ingrasar una eTa"
        }
    ],
    tBl : [
        {
            minLenght : 1,
            msg : "El B/L no debe de tener menos de 1 cracter."
        },{
            maxLenght : 50,
            msg : `El B/L no debe de tener mas de 50 caracteres.`
        },
        {
            isValid : expTextAndNumbers,
            msg : "El B/L es invalido."
        }
    ],
    tImportKey : [
        {
            minLenght : 1,
            msg : "La clave de importacion no debe de tener menos de 1 cracter."
        },{
            maxLenght : 3,
            msg : `La clave de importacion no debe de tener mas de 3 caracteres.`
        },
        {
            isValid : expTextAndNumbers,
            msg : "El B/L es invalido."
        }
    ],
    _idPatent : [
        {
            minLenght : 1,
            msg : "La patente no debe de tener menos de 1 cracter."
        },{
            maxLenght : 20,
            msg : `La patente no debe de tener mas de 20 caracteres.`
        },
        {
            isValid : expTextAndNumbers,
            msg : "La patente es invalida."
        }
    ],
    _idShippingCompany : [
        {
            minLenght : 1,
            msg : "La patente no debe de tener menos de 1 cracter."
        },{
            maxLenght : 20,
            msg : `La patente no debe de tener mas de 20 caracteres.`
        },
        {
            isValid : expTextAndNumbers,
            msg : "La patente es invalida."
        }
    ],
    tImporter : [
        {
            minLenght : 1,
            msg : "El importador no debe de tener menos de 1 cracter."
        },{
            maxLenght : 60,
            msg : `El importador no debe de tener mas de 60 caracteres.`
        },
        {
            isValid : expTextAndNumbers,
            msg : "El formato de importador es invalido."
        }
    ],
    tTariffFraction : [
        {
            minLenght : 1,
            msg : "La fraccion arancelaria no debe de tener menos de 1 cracter."
        },{
            maxLenght : 10,
            msg : `La fraccion arancelaria no debe de tener mas de 10 caracteres.`
        },
        {
            isValid : expTextAndNumbers,
            msg : "El formato de fraccion arancelaria es invalido."
        }
    ],
    tProduct : [
        {
            minLenght : 1,
            msg : "El producto no debe de tener menos de 1 cracter."
        },{
            maxLenght : 100,
            msg : `El producto no debe de tener mas de 100 caracteres.`
        },
        {
            isValid : expTextAndNumbers,
            msg : "El formato de producto es invalido."
        }
    ],
    tDestination : [
        {
            minLenght : 1,
            msg : "El destino no debe de tener menos de 1 cracter."
        },{
            maxLenght : 25,
            msg : `El destino no debe de tener mas de 25 caracteres.`
        },
        {
            isValid : expTextAndNumbers,
            msg : "El formato de destino es invalido."
        }
    ],
    tOrigin : [
        {
            minLenght : 1,
            msg : "El origen no debe de tener menos de 1 cracter."
        },{
            maxLenght : 50,
            msg : `El origen no debe de tener mas de 50 caracteres.`
        },
        {
            isValid : expTextAndNumbers,
            msg : "El formato de origen es invalido."
        }
    ],
    tClient : [
        {
            minLenght : 1,
            msg : "El cliente no debe de tener menos de 1 cracter."
        },{
            maxLenght : 60,
            msg : `El cliente no debe de tener mas de 60 caracteres.`
        },
        {
            isValid : expTextAndNumbers,
            msg : "El formato de cliente es invalido."
        }
    ],
    tContainer : [
        {
            isValid : "array",
            msg : "Debes de ingrasar por lo menos un contenedor"
        }
    ]
}

export default rules;