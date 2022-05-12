// estas funciones son genéricas: agregan la clase "success" en caso
// el inputData cumpla con su criterio de validación y "error"
// en caso contrario.
export function minLengthValidation (inputData, minLength) {
    const {value} = inputData;

    removeClassErrorSuccess(inputData)

    if(value.length >= minLength) {
        inputData.classList.add('success')
        return true
    } else {
        inputData.classList.add('error')
        return false
    }
}

export function emailValidation(inputData) {
    // expresion regular para validar emails
    const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const {value} = inputData;

    removeClassErrorSuccess(inputData)

    const resultValidation = emailValid.test(value); //para esta RegularExp, esta cadena cumple?´
    console.log(resultValidation)
    if(resultValidation) {
        inputData.classList.add('success')
        return true
    } else {
        inputData.classList.add('error')
        return false
    }
}
export function maxLengthValidation(inputData,maxLength){
    const {value}=inputData;
    
    removeClassErrorSuccess(inputData);

    if(value.length <=maxLength){
        inputData.classList.add("success");
        return true;
    }else{
        inputData.classList.add("error");
        return false;
    }
}

export function numberValidation(inputData){
    const numberValidation = /^([-]?[\s]?[0-9])+$/i;
    const {value} = inputData;
    removeClassErrorSuccess(inputData)

    const resultValidation = numberValidation.test(value) //para esta RegularExp, esta cadena cumple?
    if(resultValidation) {
        inputData.classList.add('success')
        return true
    } else {
        inputData.classList.add('error')
        return false
    }
}

function removeClassErrorSuccess(inputData) {
    inputData.classList.remove('success')
    inputData.classList.remove('error')
}