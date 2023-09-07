const initialState = {
    token:null,
};

const tokenReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'TOKEN': 
            return { token: action.payload.token }
        case 'LOGOUT':
            return { isAuthenticated: false, token: null, user:  null}
        default:
            return state;
    }
}

export default tokenReducer;