const initialState = {
    token:null,
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_AUTH_TOKEN': 
            return { }
        case 'LOGOUT':
            return { isAuthenticated: true,token: null, user:  null}
        default:
            return state;
    }
}

export default authReducer;