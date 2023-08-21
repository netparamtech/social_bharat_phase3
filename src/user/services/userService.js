import {apiConfig, apiWithFileHeaders, apiWithHeaders} from '../axios/apiConfig';

//Create Temp User in temp_user

export const createTempUser = async (data) => {
    try {
        const response = await apiConfig.post('/create-tmp-user',data);  
        return response;
    } catch(error) {
        throw error;
    }
}

//Create User in Database

export const createUser = async (data) => {
    try {
        const response = await apiConfig.post('/register',data);
        return response;
    } catch(error) {
        throw error;
    }
}

//attempt login with mobile

export const attemptLoginWithMobile = async (mobile) => {
    try {
        const response = await apiConfig.post('/attempt-login',{mobile});  
        return response;
    } catch(error) {
        throw error;
    }
}

//login with otp

export const mobileVarified = async (mobile,otp) => {
    try {
        const response = await apiConfig.post('/login',{mobile,otp});  
        return response;
    } catch(error) {
        throw error;
    }
}

//Resend otp

export const resendOtp = async (mobile) => {
    try {
        const response = await apiConfig.post('/resendOTP',{mobile});  
        return response;
    } catch(error) {
        throw error;
    }
}

//login with password

export const loginWithPassword = async (mobile,password) => {
   
    try {
        const response = await apiConfig.post('/login-by-password',{mobile,password});  
        return response;
    } catch(error) {
        throw error;
    }
}

//upload image section
export const uploadImage = async (formData) => {
    try {
        const response = await apiWithFileHeaders.post('/upload-image',formData);  
        return response;
    } catch(error) {
        throw error;
    }
}

//upload pdf section
export const uploadPdf = async (formData) => {
    try {
        const response = await apiWithFileHeaders.post('/upload-pdf',formData);  
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

//update contact details
export const updateContactDetail = async (data) => {
   
    try {
        const response = await apiWithHeaders.put('/profile/update-contact-details',data);  
        return response;
    } catch(error) {
        throw error;
    }
}

//update job info 
export const updateJobDetail = async (data) => {
   
    try {
        const response = await apiWithHeaders.put('/profile/update-job-details',data);  
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

//update matrimonial profile

export const updateMatrimonialInfo = async (data) => {
    try {
        const response = await apiWithHeaders.put('/profile/update-matrimonial-details',data);
        return response;
    } catch(error) {
        throw error;
    }
}

//fetch all community

export const fetchAllActiveCommunities = async () => {
    try {
        const response = await apiConfig.get('/communities/1');  
        return response;
    } catch(error) {
        throw error;
    }
}

//fetch all states
export const fetchStates = async() => {
    try {
        const response = await apiConfig.get('https://api.countrystatecity.in/v1/countries/IN/states');
        return response;
    } catch (error) {
        throw error;
    }
}