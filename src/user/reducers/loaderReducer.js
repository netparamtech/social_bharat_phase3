// loaderReducer.js
const initialState = {
    isLoaderSet: false, // Initial state
  };
  
  const loaderReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_LOADER':
        return {
          ...state,
          isLoaderSet: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default loaderReducer;
  