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

//user logout

export const userLogout = async (id) => {
    try {
        const response = await apiWithHeaders.post('/logout',{id});  
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

export const uploadMultipleImages = async (formData) => {
    try {
        const response = await apiWithFileHeaders.post('/upload-multiple-images',formData);  
        return response;
    } catch(error) {
        throw error;
    }
}

export const uploadMultiplePDFs = async (formData) => {
    try {
        const response = await apiWithFileHeaders.post('/upload-multiple-pdfs',formData);  
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

export const getSingleContactDetails = async (id) => {
    try {
        const response = await apiWithHeaders.get(`/user/contacts/${id}`);
        return response;
    } catch(error) {
        throw error;
    }
}

export const deleteContact = async (id) => {
    try {
        const response = await apiWithHeaders.delete(`/user/contacts/${id}`);
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

export const getSingleJobDetails = async (id) => {
    try {
        const response = await apiWithHeaders.get(`/user/jobs/${id}`);
        return response;
    } catch(error) {
        throw error;
    }
}

export const deleteSingleJobDetails = async (id) => {
    try {
        const response = await apiWithHeaders.delete(`/user/jobs/${id}`);
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
//get single education details
export const getSingleEducationDetails = async (id) => {
    try {
        const response = await apiWithHeaders.get(`/user/educations/${id}`);
        return response;
    } catch(error) {
        throw error;
    }
}

//delete single education detail
export const deleteSingleEducationDetails = async (id) => {
    try {
        const response = await apiWithHeaders.delete(`/user/educations/${id}`);
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

//update business profile

export const updateBusinessInfo = async (data) => {
    try {
        const response = await apiWithHeaders.put('/profile/update-business-details',data);
        return response;
    } catch(error) {
        throw error;
    }
}

//fetch businessInfo by id
export const fetchBusinessByID = async (id) => {
    try {
        const response = await apiWithHeaders.get(`/user/businesses/${id}`);
        return response;
    } catch(error) {
        throw error;
    }
}

//delete business info
export const deleteBusinessByID = async (id) => {
    try {
        const response = await apiWithHeaders.delete(`/user/businesses/${id}`);
        return response;
    } catch(error) {
        throw error;
    }
}



//delete matrimonial details
export const deleteMatrimonial = async () => {
    try {
        const response = await apiWithHeaders.delete('/user/matrimonials');
        return response;
    } catch (error) {
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

//find one community
export const fetchOneCommunity = async () => {
    try {
        const response = await apiWithHeaders.get('/community');  
        return response;
    } catch(error) {
        throw error;
    }
}

//fetch all countries
export const fetchCountries = async() => {
    try {
        const response = await apiWithHeaders.get('/countries');
        return response;
    } catch (error) {
        throw error;
    }
}

//fetch all states
export const fetchAllStatesByCountryID = async(countryID) => {
    try {
        const response = await apiWithHeaders.get(`/states/${countryID}`);
        return response;
    } catch (error) {
        throw error;
    }
}

//fetch all states
export const fetchAllCitiesByStateID = async(stateID) => {
    try {
        const response = await apiWithHeaders.get(`/cities/${stateID}`);
        return response;
    } catch (error) {
        throw error;
    }
}


//update profile image

export const updateProfilePhoto = async(formData) => {

    try{
        const response = await apiWithFileHeaders.post('/profile/update-profile-picture',formData);
        return response;
    } catch(error) {
        throw error;
    }
}

//search people with searchText
export const searchPeopleWithSearchText = async(queryString) => {
    try{
        const response = await apiWithHeaders.get(`/users/search?q=${queryString}`);
        return response;
    } catch(error) {
        throw error;
    }
}

//search people
export const searchWithCityState = async(queryString) => {
    try{
        const response = await apiWithHeaders.get(`/users/search?${queryString}`);
        return response;
    } catch(error) {
        throw error;
    }
}

//search business
export const searchBusinessWithSearchText = async(searchText) => {
    try{
        const response = await apiWithHeaders.get(`/business/search?q=${searchText}`);
        return response;
    } catch(error) {
        throw error;
    }
}

//search business
export const searchBusinessWithCityState = async(queryString) => {
    try{
        const response = await apiWithHeaders.get(`/business/search?${queryString}`);
        return response;
    } catch(error) {
        throw error;
    }
}

//search partner
export const searchPartner = async(id) => {
    try{
        const response = await apiWithHeaders.get(`/users/search?community_id=${id}`);
        return response;
    } catch(error) {
        throw error;
    }
}




//search partner
export const searchPartnerWithSearchText = async(queryString) => {
    try{
        const response = await apiWithHeaders.get(`/partner/search?${queryString}`);
        return response;
    } catch(error) {
        throw error;
    }
}

//fetch banner according to page and section
export const fetchBannerWithPageAndSection = async (page, section) => {
    try {
        const response = await apiConfig.get(`/banners/${page}/${section}`);
        return response;
    } catch (error) {
        throw error;
    }
};

//fetch all degrees
export const fetchAllDegrees = async () => {
    try {
        const response = await apiWithHeaders.get('/degrees');
        return response;
    } catch (error) {
        throw error;
    }
};

//fetch all active business categories
export const fetchAllActiveBusinessCategories = async () => {
    try {
        const response = await apiWithHeaders.get('/business-categories/1');  
        return response;
    } catch(error) {
        throw error;
    }
}

//enquiry
export const enquiry = async (data) => {
    try {
        const response = await apiConfig.post('/enquiry',data);
        return response;
    } catch (error) {
        throw error;
    }
}


//testimonial(feedback)
export const userFeedback = async (data) => {
    try {
        const response = await apiWithHeaders.post('/testimonials',data);
        return response;
    } catch (error) {
        throw error;
    }
}

//fetch all active users feedback
export const fetchOldTestimonials = async () => {
    try {
        const response = await apiWithHeaders.get('/user/testimonials');
        return response;
    } catch(error) {
        throw error;
    }
}

//fetch all active users feedback on home page
export const fetchTestimonialsOnHomePage = async () => {
    try {
        const response = await apiConfig.get('/testimonials');
        return response;
    } catch(error) {
        throw error;
    }
}

//Event
export const event = async (data) => {
    try {
        const response = await apiWithHeaders.post('/events',data);
        return response;
    } catch (error) {
        throw error;
    }
}
//fetch all active qualification
export const fetchAllActiveQualifications = async () => {
    try {
        const response = await apiWithHeaders.get('/qualifications');
        return response;
    } catch(error) {
        throw error;
    }
}

//fetch all active qualification
export const fetchAllSiteSettings = async () => {
    try {
        const response = await apiConfig.get('/setting');
        return response;
    } catch(error) {
        throw error;
    }
}
