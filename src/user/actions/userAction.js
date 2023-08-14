export const login = (userData, token) => ({
    type: 'USER_LOGIN',
    payload: {user:userData, token},
});

export const logout = () => ({
    type: 'USER_LOGOUT',
    payload: null
});