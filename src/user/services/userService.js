import {apiConfig, apiWithFileHeaders, apiWithHeaders} from '../axios/apiConfig';
//login with password

export const loginWithPassword = async (mobile,password) => {
   
    try {
        const response = await apiConfig.post('/login-by-password',{mobile,password});  
        return response;
    } catch(error) {
        throw error;
    }
}

//update image section
export const updateImage = async (formData) => {
    try {
        const response = await apiWithFileHeaders.post('/upload-image',formData);  
        return response;
    } catch(error) {
        throw error;
    }
}

export const updateBasicProfile = async (data) => {
   
    try {
        const response = await apiWithHeaders.put('/profile/update-basic-profile',data);  
        return response;
    } catch(error) {
        throw error;
    }
}

//update mobile section
export const updateAttemptMobile = async (mobile) => {
    try {
        const response = await apiWithHeaders.put('/profile/attempt-update-mobile',{mobile});  
        return response;
    } catch(error) {
        throw error;
    }
}

export const updateMobile = async (mobile,otp) => {
   
    try {
        const response = await apiWithHeaders.put('/profile/update-mobile',{mobile,otp});  
        return response;
    } catch(error) {
        throw error;
    }
}

export const updateContactDetail = async (data) => {
   
    try {
        const response = await apiWithHeaders.put('/profile/update-contact-details',data);  
        return response;
    } catch(error) {
        throw error;
    }
}

export const getUserFullProfile = async () => {
   
    try {
        const response = await apiWithHeaders.get('/profile');  
        return response;
    } catch(error) {
        throw error;
    }
}


//educational detail update module

export const updateEducationalDetails = async (data) => {
   
    try {
        const response = await apiWithHeaders.put('/profile/update-educational-details',data);  
        return response;
    } catch(error) {
        throw error;
    }
}