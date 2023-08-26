export const encode = (value) => {
    return btoa(value)
}

export const decode = (value) => {
    return atob(value);
}