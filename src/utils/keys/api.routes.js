const HOST = "http://localhost:1010/api/v1";

// 192.168.1.126

export const api = {
    HOST : "http://localhost:3000",
    API : "http://localhost:1010/api/v1",
    ENDPOINT : "http://localhost:1010/",
    POST : {
        SINGIN : `${HOST}/users/singin`,
        ADD_IMPORT_REFERENCE : `${HOST}/references/reference-import`,
        ADD_DOCUMETNS : `${HOST}/documents/document`,
        ADD_REQUEST : `${HOST}/payments/request`,
        ADD_REQUEST_FILE : `${HOST}/payments/request-file`,
        ADD_NOTE_DOCUMENT : `${HOST}/documents/note`,
        ADD_EVENT : `${HOST}/events/event`,
        ADD_CARRIER : `${HOST}/carriers/carrier`,
        ADD_IMAGEN_MONITORING : `${HOST}/carriers/imagen-monitoring`
    },
    GET : {
        GET_PATENTS : `${HOST}/patents/patent`,
        GET_SHIPPING_COMPANIES : `${HOST}/shipping-companies/shipping-company`,
        GET_IMPORT_REFERENCE : `${HOST}/references/reference-import`,
        GET_DOCUMETNS : `${HOST}/documents/document`,
        GET_USERS_ROLE : `${HOST}/users/user-by-role`,
        GET_REQUEST : `${HOST}/payments/request`,
        GET_PAYMENTS : `${HOST}/payments/payment`,
        GET_EVENTS : `${HOST}/events/event`,
        GET_CARRIER : `${HOST}/carriers/carrier`,
        // GET_FILE : `${HOST}/documents`
    },
    PUT : {
        UPD_IMPORT_REFERENCE : `${HOST}/references/reference-import`,
        UPD_ETA : `${HOST}/references/eta`,
        UPD_IMPORT_REFERENCE_STATE : `${HOST}/references/reference-import-state`,
        UPD_RETURNED_DOCUMENT_REQUEST : `${HOST}/payments/returned-document`,
        UPD_REQUEST_AND_DELETE : `${HOST}/payments/complete-and-delete`
    },
    DELETE : {
        DEL_DOCUMENT : `${HOST}/documents/document`,
        DEL_REQUEST : `${HOST}/payments/request`,
        DEL_PAYMENT : `${HOST}/payments/payment`
    }
}