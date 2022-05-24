export function isNotEmptyObj (obj) {
    return Object.keys(obj).length > 0;
}

export function isNumber (obj) {
    return /^-?\d+$/.test(obj);;
}