export const login = (userData, token) => ({
    type: 'LOGIN',
    payload: {user:userData, token},
});

export const logout = () => ({
    type: 'LOGOUT',
    payload: null
});