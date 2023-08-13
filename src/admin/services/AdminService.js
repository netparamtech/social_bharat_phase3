import {apiConfig, apiWithHeaders} from "../axios/apiConfig"

export const login = async (email, password) => {
    try {
        const response = await apiConfig.post('/login', {email, password});  
        return response;
    } catch(error) {
        throw error;
    }
}

export const logout = async () => {
    try{
        const response = await apiWithHeaders.post('/logout')
        return response;
    }catch(error) {
        throw error;
    }
}

