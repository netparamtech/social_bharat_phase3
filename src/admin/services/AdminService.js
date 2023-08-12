import apiConfig from "../axios/apiConfig"
const login = async (email, password) => {
    try {
        const response = await apiConfig.post('/admin/login', {email, password});  
        return response;
    } catch(error) {
        throw error;
    }
}