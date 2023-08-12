import apiConfig from "../axios/apiConfig"

export const login = async (email, password) => {
    try {
        const response = await apiConfig.post('/', {email, password});  
        return response;
    } catch(error) {
        throw error;
    }
}