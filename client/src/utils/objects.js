export function isNotEmptyObj (obj) {
    return Object.keys(obj).length > 0;
}

export function isNumber (obj) {
    return /^-?\d+$/.test(obj);;
}

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}