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
        const response = await apiWithHeaders.post('/logout');
        return response;
    }catch(error) {
        throw error;
    }
}

export const updateProfile = async (formData) => {
    try{
        const response = await apiWithHeaders.post('/update-profile',formData);
        return response;
    } catch(error) {
        throw error;
    }
}

export const createCommunity = async (formData) => {
    try{
        const response = await apiWithHeaders.post('/create-community',formData);
        return response;
    } catch(error) {
        throw error;
    }
}

export const fetchAllCommunity = async () => {
    try{
        const response = await apiWithHeaders.post('/fetch-all-communities');
        return response;
    } catch(error) {
        throw error;
    }
}

export const updateCommunity = async (formData) => {
    try{
        const response = await apiWithHeaders.post('/update-community',formData);
        return response;
    } catch(error) {
        throw error;
    }
}

