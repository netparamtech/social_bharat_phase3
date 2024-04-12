// loaderReducer.js
const initialState = {
    isLoaderSet: false, // Initial state
    isShowSet:true,
  };
  
  const loaderReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_LOADER':
        return {
          ...state,
          isLoaderSet: action.payload,
        };
        case 'SET_MODEL_SHOW': 
          return {
            ...state,
            isShowSet: action.payload,
          };
      default:
        return state;
    }
  };
  
  export default loaderReducer;
  