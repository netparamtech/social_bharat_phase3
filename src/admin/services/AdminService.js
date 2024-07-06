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
export const updatePermissions = async (data, id) => {
    try {
        const response = await apiWithHeaders.put(`/user/update/permissions/${id}`, data);
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
        const response = await apiWithFileHeaders.post('/upload-multiple-images', formData);
        return response;
    } catch (error) {
        throw error;
    }
}

//upload pdf section
export const uploadPdf = async (formData) => {
    try {
        const response = await apiWithFileHeaders.post('/upload-pdf', formData);
        return response;
    } catch (error) {
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
//fetch all active communities
export const fetchAllCommunitiesForAdmin = async () => {
    try {
        const response = await apiConfig.get("/all-communities");
        return response;
    } catch (error) {
        throw error;
    }
};

//fetch all active bharat-mandir
export const fetchAllBharatMandirForAdmin = async () => {
    try {
        const response = await apiConfig.get("/all-bharatMandir");
        return response;
    } catch (error) {
        throw error;
    }
};

//update profile
export const updateBasicProfile = async (data) => {

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

//fetch one active community
export const fetchOneCommunity = async (id) => {
    try {
        const response = await apiWithHeaders.get(`/communities/1/${id}`);
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
//fetch community with id given
export const fetchBharatMandirWithId = async (id) => {
    try {
        const response = await apiWithHeaders.get(`/bharatMandir/2/${id}`);
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
        const response = await apiWithHeaders.post('/banners', data);
        return response;
    } catch (error) {
        throw error;
    }
}

//fetch all registered users
export const fetchAllUsers = async (page, size, searchQuery, searchAdmin, sortField, sortOrder) => {
    try {
        const response = await apiWithHeaders.get(`/users?page=${page}&size=${size}&q=${searchQuery}&isAdmin=${searchAdmin}&sortField=${sortField}&sortOrder=${sortOrder}`);
        return response; // Assuming your API response contains the data directly
    } catch (error) {
        throw error;
    }
};

//fetch all registered users with community
export const fetchAllUsersWithCommunity = async () => {
    try {
        const response = await apiWithHeaders.get('/dashboard-statistics/users/community-wise');
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
//fetch admin by id
export const fetchAdmin = async (id) => {
    try {
        const response = await apiWithHeaders.get(`/user/isAdmin/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

//delete user
export const deleteUser = async (id) => {
    try {
        const response = await apiWithHeaders.delete(`/user/delete/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}
//fetch admin by id
export const toggelAdmin = async (id) => {
    try {
        const response = await apiWithHeaders.patch(`/user/updateAdmin/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}
//fetch permissions by id
export const permissionById = async (id) => {
    try {
        const response = await apiWithHeaders.get(`/user/permission/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

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
export const fetchAllDegrees = async (page, size, searchQuery, sortField, sortOrder, isEditClicked) => {
    if (isEditClicked) {
        return;
    }
    try {
        const response = await apiWithHeaders.get(`/degrees?page=${page}&size=${size}&q=${searchQuery}&sortField=${sortField}&sortOrder=${sortOrder}`);
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
        const response = await apiWithHeaders.patch(`/degrees/${id}/toggle-status`);
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
export const updateDegree = async (id, data) => {
    try {
        const response = await apiWithHeaders.put(`/degrees/${id}`, data);
        return response;
    } catch (error) {
        throw error;
    }
}

//fetch All Business Categories
export const fetchAllCategories = async (page, size, searchQuery, sortField, sortOrder) => {
    try {
        const response = await apiWithHeaders.get(`/business-categories?page=${page}&size=${size}&q=${searchQuery}&sortField=${sortField}&sortOrder=${sortOrder}`);
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
export const updateBusinessCategorie = async (id, data) => {
    try {
        const response = await apiWithHeaders.put(`/business-categories/${id}`, data);
        return response;
    } catch (error) {
        throw error;
    }
}

//update Degree Status
export const updateBusinessStatus = async (id) => {
    try {
        const response = await apiWithHeaders.patch(`/business-categories/${id}/toggle-status`);
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

//fetch Businesses
export const fetchAllBusinesses = async (page, size, searchQuery, state, city) => {
    try {
        const response = await apiWithHeaders.get(`/all/business?page=${page}&size=${size}&searchText=${searchQuery}&state=${state}&city=${city}`);
        return response;
    } catch (error) {
        throw error;
    }
}

//toggle business
export const toggleBusinessPosted = async (id) => {
    try {
        const response = await apiWithHeaders.patch(`/toggle-business/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}
//delete business
export const deleteBusinessPosted = async (id) => {
    try {
        const response = await apiWithHeaders.delete(`/delete-business/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

//fetch All Degrees
export const fetchAllEnquiries = async (page, size, searchQuery, sortField, sortOrder) => {
    try {
        const response = await apiWithHeaders.get(`/enquiries?page=${page}&size=${size}&q=${searchQuery}&sortField=${sortField}&sortOrder=${sortOrder}`);
        return response; // Assuming your API response contains the data directly
    } catch (error) {
        throw error;
    }
};

//delete enquiry
export const deleteEnquiry = async (id) => {
    try {
        const response = await apiWithHeaders.delete(`/enquiries/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

//change toggle-status of enquiry by admin
export const updateToggleStatusForEnquiry = async (clickedUserId) => {
    try {
        const response = await apiWithHeaders.patch(`/enquiries/${clickedUserId}/toggle-status`);
        return response;
    } catch (error) {
        throw error;
    }
}

//change toggle-status of matrimonial by admin
export const updateToggleStatusForMatrimonial = async (matriId) => {
    try {
        const response = await apiWithHeaders.patch(`/profile/matrimonial/toggle-status/${matriId}`);
        return response;
    } catch (error) {
        throw error;
    }
}
//set remark
export const setRemarkForEnquiry = async (id, data) => {
    try {
        const response = await apiWithHeaders.put(`/admin/enquiry/remark/${id}`, data);
        return response;
    } catch (error) {
        throw error;
    }
}

//fetch all testimonials
export const fetchTestimonials = async (page, size, searchQuery, sortField, sortOrder) => {
    try {
        const response = await apiWithHeaders.get(`/testimonials?page=${page}&size=${size}&q=${searchQuery}&sortField=${sortField}&sortOrder=${sortOrder}`);
        return response;
    } catch (error) {
        throw error;
    }
}

//fetch testimonial by id
export const fetchTestimonialByID = async (id) => {
    try {
        const response = await apiWithHeaders.get(`/testimonials/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

//delete testimonial by id
export const deleteTestimonialByID = async (id) => {
    try {
        const response = await apiWithHeaders.delete(`/testimonials/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

//change toggle-status of testimonial by admin
export const updateToggleStatusForTestimonial = async (clickedId) => {
    try {
        const response = await apiWithHeaders.patch(`/testimonials/${clickedId}/toggle-status`);
        return response;
    } catch (error) {
        throw error;
    }
}

//fetch all Event
export const fetchEvents = async (page, size, searchQuery, sortField, sortOrder) => {
    try {
        const response = await apiWithHeaders.get(`/events?page=${page}&size=${size}&q=${searchQuery}&sortField=${sortField}&sortOrder=${sortOrder}`);
        return response;
    } catch (error) {
        throw error;
    }
}

//fetch Event by id
export const fetchEventByID = async (id) => {
    try {
        const response = await apiWithHeaders.get(`/events/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

//delete Event by id
export const deleteEventByID = async (id) => {
    try {
        const response = await apiWithHeaders.delete(`/events/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

//change toggle-status of Event by admin
export const updateToggleStatusForEvent = async (clickedId) => {
    try {
        const response = await apiWithHeaders.patch(`/events/${clickedId}/toggle-status`);
        return response;
    } catch (error) {
        throw error;
    }
}

//change toggle-featured of Event by admin
export const updateToggleFeaturedForEvent = async (clickedId) => {
    try {
        const response = await apiWithHeaders.patch(`/events/${clickedId}/toggle-featured`);
        return response;
    } catch (error) {
        throw error;
    }
}

//fetch All Qualification Categories
export const fetchAllQualifications = async (page, size, searchQuery, sortField, sortOrder) => {
    try {
        const response = await apiWithHeaders.get(`/qualifications?page=${page}&size=${size}&q=${searchQuery}&sortField=${sortField}&sortOrder=${sortOrder}`);
        return response;
    } catch (error) {
        throw error;
    }
}

//fetch qualifications by id
export const fetchQualificationsByID = async (id) => {
    try {
        const response = await apiWithHeaders.get(`/qualifications/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

//change toggle-status of qualifications by admin
export const updateToggleStatusForQualifications = async (clickedId) => {
    try {
        const response = await apiWithHeaders.patch(`/qualifications/${clickedId}/toggle-status`);
        return response;
    } catch (error) {
        throw error;
    }
}

//delete qualifications by id
export const deleteQualificationsByID = async (id) => {
    try {
        const response = await apiWithHeaders.delete(`/qualifications/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

//update qualifications Categories
export const updateQualifications = async (id, data) => {
    try {
        const response = await apiWithHeaders.put(`/qualifications/${id}`, data);
        return response;
    } catch (error) {
        throw error;
    }
}

//create qualifications Categories
export const createQualification = async (data) => {
    try {
        const response = await apiWithHeaders.post('/qualifications', data);
        return response;
    } catch (error) {
        throw error;
    }
}

//create service
export const createService = async (data) => {
    try {
        const response = await apiWithHeaders.post('/services', data);
        return response;
    } catch (error) {
        throw error;
    }
}

//fetch all services
export const fetchAllServices = async () => {
    try {
        const response = await apiWithHeaders.get('/services/0');
        return response;
    } catch (error) {
        throw error;
    }
}

//fetch service by id
export const fetchServiceByID = async (id) => {
    try {
        const response = await apiWithHeaders.get(`/service/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

//change toggle-status of service by admin
export const updateToggleStatusForService = async (clickedId) => {
    try {
        const response = await apiWithHeaders.patch(`/service/${clickedId}/toggle-status`);
        return response;
    } catch (error) {
        throw error;
    }
}

//delete service by id
export const deleteServiceByID = async (id) => {
    try {
        const response = await apiWithHeaders.delete(`/service/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

//update service Categories
export const updateService = async (id, data) => {
    try {
        const response = await apiWithHeaders.put(`/service/${id}`, data);
        return response;
    } catch (error) {
        throw error;
    }
}

//change toggle-status of user service in user_service_details  by admin
export const updateToggleStatusForUserRegisteredService = async (clickedUserId) => {
    try {
        const response = await apiWithHeaders.patch(`/service/${clickedUserId}/toggle-statusforUserRegisteredService`);
        return response;
    } catch (error) {
        throw error;
    }
}

//fetch All Jobs
export const fetchAllJobsPosted = async (page, size, searchQuery, jobType) => {
    try {
        const response = await apiWithHeaders.get(`/search/users/jobs?page=${page}&size=${size}&searchQuery=${searchQuery}&jobType=${jobType}`);
        return response;
    } catch (error) {
        throw error;
    }
}

//get job applicant for respective job
export const userAppliedForSameJob = async (id, searchQuery, page, size) => {
    try {
        const response = await apiWithHeaders.get(
            `/find/all-users/for/${id}/job/applied?searchQuery=${searchQuery}&page=${page}&size=${size}`
        );
        return response;
    } catch (error) {
        throw error;
    }
};

//toggle job post status
export const toggleJobPostStatus = async (id) => {
    try {
        const response = await apiWithHeaders.patch(`/job/${id}/toggle-status`);
        return response;
    } catch (error) {
        throw error;
    }
}

//toggle job post featured
export const toggleJobPostFeatured = async (id) => {
    try {
        const response = await apiWithHeaders.patch(`/job/${id}/toggle-featured`);
        return response;
    } catch (error) {
        throw error;
    }
}

//delete job posted
export const deleteJobsPosted = async (id) => {
    try {
        const response = await apiWithHeaders.delete(`/job/${id}/delete`);
        return response;
    } catch (error) {
        throw error;
    }
}

//find single job details
export const findSingleJobsPosted = async (id) => {
    try {
        const response = await apiWithHeaders.get(`/find/${id}/job-posted`);
        return response;
    } catch (error) {
        throw error;
    }
}

//update single job posted
export const updateSingleJobsPosted = async (data, id) => {
    try {
        const response = await apiWithHeaders.put(`/update/${id}/job-posted`, data);
        return response;
    } catch (error) {
        throw error;
    }
}

//create new job
export const createNewJob = async (data) => {
    try {
        const response = await apiWithHeaders.post('/create/new-job', data);
        return response;
    } catch (error) {
        throw error;
    }
}

//fetch stats
export const fetchAdminDashboardStatistics = async () => {
    try {
        const response = await apiWithHeaders.get('/dashboard-statistics');
        return response;
    } catch (error) {
        throw error;
    }
}

//fetch stats for activities
export const fetchAdminDashboardStatisticsForActivities = async () => {
    try {
        const response = await apiWithHeaders.get('/dashboard-statistics/activity-statistics');
        return response;
    } catch (error) {
        throw error;
    }
}
//fetch stats for activities
export const fetchAdminDashboardStatisticsForBusiness = async () => {
    try {
        const response = await apiWithHeaders.get('/dashboard-statistics/business-statistics');
        return response;
    } catch (error) {
        throw error;
    }
}
//fetch stats for matrimonnial
export const fetchAdminDashboardStatisticsForMatrimonial = async () => {
    try {
        const response = await apiWithHeaders.get('/dashboard-statistics/matrimonial-statistics');
        return response;
    } catch (error) {
        throw error;
    }
}
//fetch stats for admin count info
export const fetchAdminInfoStatistics = async () => {
    try {
        const response = await apiWithHeaders.get('/dashboard-statistics/admin-info-statistics');
        return response;
    } catch (error) {
        throw error;
    }
}
//fetch user posted matrimonial count
export const fetchCountOfMatrimonialPostedUserWiseAsInOneCommunity = async (searchText,page,size,communityId) => {
    try {
        const response = await apiWithHeaders.get(`/dashboard-statistics/admin-matrimonial-info-statistics?searchText=${searchText}&page=${page}&size=${size}&community_id=${communityId}`);
        return response;
    } catch (error) {
        throw error;
    }
}
//delete single matrimonial
export const deleteSingleMatrimonial = async (id) => {
    try {
        const response = await apiWithHeaders.delete(`/profile/matrimonial/delete/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}
//fetch stats for admin count info
export const fetchAllMatrimonialByOneUser = async (id) => {
    try {
        const response = await apiWithHeaders.get(`/fetch-matrimonialByOneUser/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

//create email
export const createMail = async (data) => {
    try {
        const response = await apiWithHeaders.post('/admin/authorized-email', data);
        return response;
    } catch (error) {
        throw error;
    }
}
//get authorized email
export const getAuthorizedEmail = async () => {
    try {
        const response = await apiWithHeaders.get('/admin/find/authorized-email');
        return response;
    } catch (error) {
        throw error;
    }
}

//update Site Setting 
export const updateSetting = async (data) => {
    try {
        const response = await apiWithHeaders.put(`/setting`, data);
        return response;
    } catch (error) {
        throw error;
    }
}

//fetch All Setting
export const fetchAllSetting = async () => {
    try {
        const response = await apiWithHeaders.get('/setting');
        return response;
    } catch (error) {
        throw error;
    }
}

//cms(create or update)
export const updateCMS = async (data) => {
    try {
        const response = await apiWithHeaders.post('/cms/create', data);
        return response;
    } catch (error) {
        throw error;
    }
}

//fetch single page cms
export const fetchSinglePageCMS = async (page) => {
    try {
        const response = await apiWithHeaders.get(`/cms/pages/${page}`);
        return response;
    } catch (error) {
        throw error;
    }
}

//Fetch All Pages Cms
export const fetchAllPagesCMS = async () => {
    try {
        const response = await apiWithHeaders.get('/cms/pages');
        return response;
    } catch (error) {
        throw error;
    }
}

//fetch all users of respective service title
export const searchUsersInService = async (queryString, page, size, title) => {
    try {
        const response = await apiWithHeaders.get(`/search/users/service?role=admin&searchQuery=${queryString}&page=${page}&size=${size}&title=${title}`);
        return response;
    } catch (error) {
        throw error;
    }
}

//fetch all users of respective new service request
export const UsersRequestedForNewService = async (page, size) => {
    try {
        const response = await apiWithHeaders.get(`/admin/fetch-all-new-services?page=${page}&size=${size}`);
        return response;
    } catch (error) {
        throw error;
    }
}
//fetch all subcasts in one community
export const fetchAllSubcastsInOneCommunity = async (communityId) => {
    try {
        const response = await apiWithHeaders.get(`/fetch/${communityId}/subcasts`);
        return response;
    } catch (error) {
        throw error;
    }
}

//create subcast
export const createSubcast = async (data) => {
    try {
        const response = await apiWithHeaders.post('/subcast', data);
        return response;
    } catch (error) {
        throw error;
    }
}

//update subcast
export const updateSubcast = async (data) => {
    try {
        const response = await apiWithHeaders.put('/subcast/update', data);
        return response;
    } catch (error) {
        throw error;
    }
}

//fetch single subcast in one community
export const fetchSingleSubcast = async (subcastId, communityId) => {
    try {
        const response = await apiWithHeaders.get(`/fetch/subcast/${subcastId}/in/${communityId}`);
        return response;
    } catch (error) {
        throw error;
    }
}

//delete single subcast in one community
export const deleteSingleSubcast = async (subcastId) => {
    try {
        const response = await apiWithHeaders.delete(`/subcast/${subcastId}/delete`);
        return response;
    } catch (error) {
        throw error;
    }
}
//toggle single subcast toggle in one community
export const toggleSingleSubcast = async (subcastId) => {
    try {
        const response = await apiWithHeaders.patch(`/subcast/${subcastId}/toggle-status`);
        return response;
    } catch (error) {
        throw error;
    }
}
//toggle activity post status
export const toggleActivityPostStatus = async (id) => {
    try {
        const response = await apiWithHeaders.patch(`/activity/${id}/toggle-status`);
        return response;
    } catch (error) {
        throw error;
    }
}
//single activity
export const oneActivity = async (id) => {
    try {
        const response = await apiWithHeaders.get(`/activity/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}
//delete single activity
export const deleteActivity = async (id) => {
    try {
        const response = await apiWithHeaders.delete(`/activity/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}
//fetch all activities
export const fetchAllActivities = async (searchText, page, size) => {
    try {
        const response = await apiWithHeaders.get(
            `/users/activities?searchQuery=${searchText}&page=${page}&size=${size}`
        );
        return response;
    } catch (error) {
        throw error;
    }
};

//fetch cms by page and section
export const fetchAllCmsByPageSection = async (page, section) => {
    try {
        const response = await apiWithHeaders.get(
            `/cms/${page}/${section}`
        );
        return response;
    } catch (error) {
        throw error;
    }
};
//fetch cms
export const fetchAllCms = async () => {
    try {
        const response = await apiWithHeaders.get(
            '/cms'
        );
        return response;
    } catch (error) {
        throw error;
    }
};
//create new cms
export const createCms = async (data) => {
    try {
        const response = await apiWithHeaders.post(
            '/cms', data
        );
        return response;
    } catch (error) {
        throw error;
    }
};
//update cms
export const updateCmsById = async (id, data) => {
    try {
        const response = await apiWithHeaders.post(
            `/cms/${id}`, data
        );
        return response;
    } catch (error) {
        throw error;
    }
};
//fetch cms by id
export const fetchCmsById = async (id) => {
    try {
        const response = await apiWithHeaders.get(
            `/cms/${id}`
        );
        return response;
    } catch (error) {
        throw error;
    }
};
//fetch toggle status
export const toggleStatusForCms = async (id) => {
    try {
        const response = await apiWithHeaders.patch(
            `/cms/${id}`
        );
        return response;
    } catch (error) {
        throw error;
    }
};
//delete cms by id
export const deleteCmsById = async (id) => {
    try {
        const response = await apiWithHeaders.delete(
            `/cms/${id}`
        );
        return response;
    } catch (error) {
        throw error;
    }
};