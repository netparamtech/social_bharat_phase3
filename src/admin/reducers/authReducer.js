const initialState = {
    isAuthenticated: false,
    token: null,
    user: null,
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LOGIN': 
            return { isAuthenticated: true, token: action.payload.token ,user:  action.payload.user}
        case 'LOGOUT':
            return null;
        default:
            return state;
    }
}

export default authReducer;