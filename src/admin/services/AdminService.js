import { apiConfig, apiWithFileHeaders, apiWithHeaders } from "../axios/apiConfig"

export const login = async (email, password) => {
    try {
        const response = await apiConfig.post('/login', { email, password });
        return response;
    } catch (error) {
        throw error;
    }
}

export const logout = async () => {
    try {
        const response = await apiWithHeaders.post('/logout');
        return response;
    } catch (error) {
        throw error;
    }
}

export const updateProfile = async (formData) => {
    try {
        const response = await apiWithHeaders.post('/update-profile', formData);
        return response;
    } catch (error) {
        throw error;
    }
}

//upload single image
export const uploadImage = async (formData) => {
    try {
        const response = await apiWithFileHeaders.post('/upload-image', formData);
        return response;
    } catch (error) {
        throw error;
    }
}

//update profile picture
export const updateProfilePicture = async (formData) => {
    try {
        const response = await apiWithFileHeaders.post('/update-profile-picture', formData);
        return response;
    } catch (error) {
        throw error;
    }
}

//upload multiple images
export const uploadMultipleImages = async (formData) => {
    try {
        const response = await apiWithFileHeaders.post('/upload-multiple-images',formData);  
        return response;
    } catch(error) {
        throw error;
    }
}

export const createCommunity = async (data) => {
    try {
        const response = await apiWithHeaders.post('/communities', data);
        return response;
    } catch (error) {
        throw error;
    }
}

//update profile
export const updateBasicProfile= async (data) => {
    console.log(data)
    try {
        const response = await apiWithHeaders.put('/update-profile', data);
        return response;
    } catch (error) {
        throw error;
    }
}
export const fetchAllCommunity = async () => {
    try {
        const response = await apiWithHeaders.get('/communities');
        return response;
    } catch (error) {
        throw error;
    }
}

export const updateCommunity = async (id, data) => {
    try {
        const response = await apiWithHeaders.put(`/communities/${id}`, data);
        return response;
    } catch (error) {
        throw error;
    }
}

//fetch community with id given
export const fetchCommunityWithId = async (id) => {
    try {
        const response = await apiWithHeaders.get(`/communities/2/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

//update Community Status
export const updateCommunityStatus = async (id) => {
    try {
        const response = await apiWithHeaders.patch(`/communities/${id}/toggle-status`);
        return response;
    } catch (error) {
        throw error;
    }
}

//delete community
export const deleteCommunity = async (id) => {
    try {
        const response = await apiWithHeaders.delete(`/communities/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

//fetch All Banners
export const fetchAllBanners = async () => {
    try {
        const response = await apiWithHeaders.get('/banners');
        return response;
    } catch (error) {
        throw error;
    }
}

//create banner 
export const createBanner = async (data) => {
    try {
        const response = await apiWithHeaders.post('/banners',data);
        return response;
    } catch (error) {
        throw error;
    }
}

export const fetchAllUsers = async (page, size) => {
    try {
        const response = await apiWithHeaders.get(`/users?page=${page}&size=${size}`);
        return response; // Assuming your API response contains the data directly
    } catch (error) {
        throw error;
    }
};

//fetch banner according to page and section
export const fetchBannerWithPageAndSection = async (page, section) => {
    try {
        const response = await apiWithHeaders.get(`/banners/${page}/${section}`);
        return response; // Assuming your API response contains the data directly
    } catch (error) {
        throw error;
    }
};

//update Banner Status
export const updateBannerToggleStatus = async (id) => {
    try {
        const response = await apiWithHeaders.patch(`/banners/${id}/toggle-status`);
        return response;
    } catch (error) {
        throw error;
    }
}


//view user on click
export const fetchUserDetailsByClick = async (clickedUserId) => {
    try {
        const response = await apiWithHeaders.get(`/users/${clickedUserId}/profile`);
        return response;
    } catch (error) {
        throw error;
    }
}

//change toggle-status of user by admin
export const updateToggleStatus = async (clickedUserId) => {
    try {
        const response = await apiWithHeaders.patch(`/users/${clickedUserId}/toggle-status`);
        return response;
    } catch (error) {
        throw error;
    }
}

//update password
export const updatePassword = async (password, confirm_password) => {
    try {
        const response = await apiWithHeaders.put('/update-password', { password, confirm_password });
        return response;
    } catch (error) {
        throw error;
    }
}

//fetch All Degrees
export const fetchAllDegrees = async () => {
    try {
        const response = await apiWithHeaders.get('/degrees');
        return response;
    } catch (error) {
        throw error;
    }
}

//create Degree 
export const createDegree = async (data) => {
    try {
        const response = await apiWithHeaders.post('/degrees', data);
        return response;
    } catch (error) {
        throw error;
    }
}

//delete degree
export const deleteDegree = async (id) => {
    try {
        const response = await apiWithHeaders.delete(`/degrees/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

//update Degree Status
export const updateDegreeStatus = async (id) => {
    try {
        const response = await apiWithHeaders.patch(`/degree/${id}/toggle-status`);
        return response;
    } catch (error) {
        throw error;
    }
}

//fetch Degree with id given
export const fetchDegreeWithId = async (id) => {
    try {
        const response = await apiWithHeaders.get(`/degrees/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

//update Degree
export const updateDegree = async (id,data) => {
    try {
        const response = await apiWithHeaders.put(`/degrees/${id}`,data);
        return response;
    } catch (error) {
        throw error;
    }
}

//fetch All Business Categories
export const fetchAllCategories = async () => {
    try {
        const response = await apiWithHeaders.get('/business-categories');
        return response;
    } catch (error) {
        throw error;
    }
}

//create Business Categories
export const CreateBusinessCategorie = async (data) => {
    try {
        const response = await apiWithHeaders.post('/business-categories/', data);
        return response;
    } catch (error) {
        throw error;
    }
}

//delete Business Categories
export const deleteBusinessCategorie = async (id) => {
    try {
        const response = await apiWithHeaders.delete(`/business-categories/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

//update Business Categories
export const updateBusinessCategorie = async (id,data) => {
    try {
        const response = await apiWithHeaders.put(`/business-categories/${id}`,data);
        return response;
    } catch (error) {
        throw error;
    }
}

//fetch Business Categories with id given
export const fetchBusinessCategorieWithId = async (id) => {
    try {
        const response = await apiWithHeaders.get(`/business-categories/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}