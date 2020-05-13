import { toast} from 'react-toastify';

export const validateForm = (form, rules) => {

    let keys = Object.keys(form);

    let isCorrect = keys.map(key => {
        let element  = document.querySelector(`#${key}`);
        let flag = false;
        
        if(element === null){
            flag = true;
        }else{
            if(element.required){
                let value = form[key]
                let msg;

                if(rules[key].length === 1){
                    if(rules[key][0].isValid === "array"){
                        if(Object.keys(value).length === 0){
                            msg = rules[key][0].msg
                            element.focus()
                        }else{
                            flag = true;
                        }
                    }else if(rules[key][0].isValid === "file"){
                        let extension = value.split('.');
                        extension = extension[extension.length - 1];
                        let isCorrect = rules[key][0].type.map(type => {
                            return type === extension ? true : false
                        });

                        isCorrect = isCorrect.indexOf(true);
                        flag = isCorrect === -1 || isCorrect === false ? false : true;
                        msg = rules[key][0].msg
                    }
                }else{
                    if(rules[key][0].minLenght >= value.length){
                        msg = rules[key][0].msg
                        element.focus()
                    }else if(rules[key][1].maxLenght <= value.lenght){
                        msg = rules[key][1].msg
                        element.focus()
                    }else if(!rules[key][2].isValid.test(value)){
                        msg = rules[key][2].msg
                        element.focus()
                    }else{
                        flag = true;
                    }
                }

                if(!flag){
                    if(!toast.isActive()){
                        toast(msg, {
                            autoClose: 3500,
                            type: toast.TYPE.WARNING,
                            toastId : key
                        })
                    }
                }  
            }else{
                flag = true;
            }
        }
        return flag;
    })

    isCorrect = isCorrect.indexOf(false);
    return isCorrect === -1 || isCorrect === false ? true : false
}