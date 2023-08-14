const initialState = {
    isAuthenticated: false,
    token: null,
    user: null,
};

const userAuthReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'USER_LOGIN': 
            return { isAuthenticated: true, token: action.payload.token ,user:  action.payload.user}
        case 'USER_LOGOUT':
            return { isAuthenticated: false, token: null, user:  null}
        default:
            return state;
    }
}

export default userAuthReducer;