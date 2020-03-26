import { toast} from 'react-toastify';

export const validateForm = (form, rules) => {

    let keys = Object.keys(form);

    let isCorrect = keys.map(key => {
        let element  = document.querySelector(`#${key}`);
        let flag = false;

        if(element.required){
            let value = form[key]
            let msg;

            if(rules[key][0].minLenght >= value.length){
                msg = rules[key][0].msg
            }else if(rules[key][1].maxLenght <= value.lenght){
                msg = rules[key][1].msg
            }else if(!rules[key][2].isValid.test(value)){
                msg = rules[key][2].msg
            }else{
                flag = true;
            }

            element.focus()

            if(!flag){
                if(!toast.isActive()){
                    toast(msg, {
                        autoClose: 3500,
                        type: toast.TYPE.WARNING,
                        toastId : key
                    })
                }
            }


            
        }
        return flag;
    })

    isCorrect = isCorrect.indexOf(false);
    return isCorrect === -1 || isCorrect === false ? true : false
}