import {
  apiConfig,
  apiWithFileHeaders,
  apiWithHeaders,
} from "../axios/apiConfig";

//Create Temp User in temp_user

export const createTempUser = async (data) => {
  try {
    const response = await apiConfig.post("/create-tmp-user", data);
    return response;
  } catch (error) {
    throw error;
  }
};

//Create User in Database

export const createUser = async (data) => {
  try {
    const response = await apiConfig.post("/register", data);
    return response;
  } catch (error) {
    throw error;
  }
};

//attempt login with mobile

export const attemptLoginWithMobile = async (mobile) => {
  try {
    const response = await apiConfig.post("/attempt-login", { mobile });
    return response;
  } catch (error) {
    throw error;
  }
};

//login with otp

export const mobileVarified = async (mobile, otp) => {
  try {
    const response = await apiConfig.post("/login", { mobile, otp });
    return response;
  } catch (error) {
    throw error;
  }
};

//Resend otp

export const resendOtp = async (mobile) => {
  try {
    const response = await apiConfig.post("/resendOTP", { mobile });
    return response;
  } catch (error) {
    throw error;
  }
};

//login with password

export const loginWithPassword = async (mobile, password) => {
  try {
    const response = await apiConfig.post("/login-by-password", {
      mobile,
      password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//getToken
export const getToken = async () => {
  try {
    const response = await apiWithHeaders.get("/get-token");
    return response;
  } catch (error) {
    throw error;
  }
};

//user logout

export const userLogout = async (id) => {
  try {
    const response = await apiWithHeaders.post("/logout", { id });
    return response;
  } catch (error) {
    throw error;
  }
};

//upload image section
export const uploadImage = async (formData) => {
  try {
    const response = await apiWithFileHeaders.post("/upload-image", formData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const uploadMultipleImages = async (formData) => {
  try {
    const response = await apiWithFileHeaders.post(
      "/upload-multiple-images",
      formData
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const uploadMultiplePDFs = async (formData) => {
  try {
    const response = await apiWithFileHeaders.post(
      "/upload-multiple-pdfs",
      formData
    );
    return response;
  } catch (error) {
    throw error;
  }
};

//upload pdf section
export const uploadPdf = async (formData) => {
  try {
    const response = await apiWithFileHeaders.post("/upload-pdf", formData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateBasicProfile = async (data) => {
  try {
    const response = await apiWithHeaders.put(
      "/profile/update-basic-profile",
      data
    );
    return response;
  } catch (error) {
    throw error;
  }
};

//update mobile section
export const updateAttemptMobile = async (mobile) => {
  try {
    const response = await apiWithHeaders.put(
      "/profile/attempt-update-mobile",
      { mobile }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateMobile = async (mobile, otp) => {
  try {
    const response = await apiWithHeaders.put("/profile/update-mobile", {
      mobile,
      otp,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//update contact details
export const updateContactDetail = async (data) => {
  try {
    const response = await apiWithHeaders.put(
      "/profile/update-contact-details",
      data
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getSingleContactDetails = async (id) => {
  try {
    const response = await apiWithHeaders.get(`/user/contacts/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteContact = async (id) => {
  try {
    const response = await apiWithHeaders.delete(`/user/contacts/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};
//create job info
export const createJobDetail = async (data) => {
  try {
    const response = await apiWithHeaders.post(
      "/profile/create-job-details",
      data
    );
    return response;
  } catch (error) {
    throw error;
  }
};

//update job info
export const updateJobDetail = async (data, jobId) => {
  try {
    const response = await apiWithHeaders.put(
      `/profile/${jobId}/update-job-details`,
      data
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getSingleJobDetails = async (id) => {
  try {
    const response = await apiWithHeaders.get(`/user/jobs/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteSingleJobDetails = async (id) => {
  try {
    const response = await apiWithHeaders.delete(`/user/jobs/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUserFullProfile = async () => {
  try {
    const response = await apiWithHeaders.get("/profile");
    return response;
  } catch (error) {
    throw error;
  }
};
//search user full profile
export const getSearchedUserFullProfile = async (id) => {
  try {
    const response = await apiWithHeaders.get(`/user/profile/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

//educational detail update module

export const updateEducationalDetails = async (data) => {
  try {
    const response = await apiWithHeaders.put(
      "/profile/update-educational-details",
      data
    );
    return response;
  } catch (error) {
    throw error;
  }
};
//get single education details
export const getSingleEducationDetails = async (id) => {
  try {
    const response = await apiWithHeaders.get(`/user/educations/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

//delete single education detail
export const deleteSingleEducationDetails = async (id) => {
  try {
    const response = await apiWithHeaders.delete(`/user/educations/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

//update matrimonial profile

export const updateMatrimonialInfo = async (data) => {
  try {
    const response = await apiWithHeaders.put(
      "/profile/update-matrimonial-details",
      data
    );
    return response;
  } catch (error) {
    throw error;
  }
};

//update business profile

export const updateBusinessInfo = async (data, id) => {
  try {
    let response = null;

    if (id) {
      response = await apiWithHeaders.put(
        `/profile/${id}/update-business-details`,
        data
      );
    } else {
      response = await apiWithHeaders.post(
        "/profile/create-business-details",
        data
      );
    }

    return response;
  } catch (error) {
    throw error;
  }
};

//fetch businessInfo by id
export const fetchBusinessByID = async (id) => {
  try {
    const response = await apiWithHeaders.get(`/user/businesses/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

//delete business info
export const deleteBusinessByID = async (id) => {
  try {
    const response = await apiWithHeaders.delete(`/user/businesses/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

//delete matrimonial details
export const deleteMatrimonial = async () => {
  try {
    const response = await apiWithHeaders.delete("/user/matrimonials");
    return response;
  } catch (error) {
    throw error;
  }
};

//fetch all community

export const fetchAllCommunities = async () => {
  try {
    const response = await apiConfig.get("/communities/2");
    return response;
  } catch (error) {
    throw error;
  }
};
// //fetch all active communities
// export const fetchAllActiveCommunities = async () => {
//   try {
//     const response = await apiConfig.get("/communities/1");
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };
//fetch all active communities
export const fetchAllActiveCommunities = async () => {
  try {
    const response = await apiConfig.get("/all-active-communities");
    return response;
  } catch (error) {
    throw error;
  }
};

//fetch all active bharat-mandir
export const fetchAllActiveBharatMandir = async () => {
  try {
    const response = await apiConfig.get("/all-active-bharatMandir");
    return response;
  } catch (error) {
    throw error;
  }
};

//find one community
export const fetchOneCommunity = async () => {
  try {
    const response = await apiWithHeaders.get("/communityBYId");
    return response;
  } catch (error) {
    throw error;
  }
};

//fetch all countries
export const fetchCountries = async () => {
  try {
    const response = await apiWithHeaders.get("/countries");
    return response;
  } catch (error) {
    throw error;
  }
};

//fetch all states
export const fetchAllStatesByCountryID = async (countryID) => {
  try {
    const response = await apiWithHeaders.get(`/states/${countryID}`);
    return response;
  } catch (error) {
    throw error;
  }
};

//fetch all states
export const fetchAllCitiesByStateID = async (stateID) => {
  try {
    const response = await apiWithHeaders.get(`/cities/${stateID}`);
    return response;
  } catch (error) {
    throw error;
  }
};

//update profile image

export const updateProfilePhoto = async (formData) => {
  try {
    const response = await apiWithFileHeaders.post(
      "/profile/update-profile-picture",
      formData
    );
    return response;
  } catch (error) {
    throw error;
  }
};

//search people with searchText
export const searchPeopleWithSearchText = async (
  queryString,
  page,
  size,
  state,
  city
) => {
  try {
    const response = await apiWithHeaders.get(
      `/users/search?q=${queryString}&page=${page}&size=${size}&state=${state}&city=${city}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

//search people
export const searchWithCityState = async (queryString) => {
  try {
    const response = await apiWithHeaders.get(`/users/search?${queryString}`);
    return response;
  } catch (error) {
    throw error;
  }
};

//search business
export const searchBusinessWithSearchText = async (searchText) => {
  try {
    const response = await apiWithHeaders.get(
      `/business/search?q=${searchText}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

//search business
export const searchBusinessWithCityState = async (queryString) => {
  try {
    const response = await apiWithHeaders.get(
      `/business/search?${queryString}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

//search partner
export const searchPartner = async (
  searchText,
  page,
  size,
  id,
  state,
  city,
  gender,
  gotra,
  cast,
  subcastId
) => {
  try {
    const response = await apiWithHeaders.get(
      `/partner/search?q=${searchText}&page=${page}&size=${size}&community_id=${id}&state=${state}&city=${city}&gender=${gender}&gotra=${gotra}&cast=${cast}&subcastId=${subcastId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

//search partner
export const searchPartnerWithSearchText = async (queryString) => {
  try {
    const response = await apiWithHeaders.get(`/partner/search?${queryString}`);
    return response;
  } catch (error) {
    throw error;
  }
};

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
    const response = await apiWithHeaders.get("/degrees");
    return response;
  } catch (error) {
    throw error;
  }
};

//fetch all active business categories
export const fetchAllActiveBusinessCategories = async () => {
  try {
    const response = await apiWithHeaders.get("/business-categories/1");
    return response;
  } catch (error) {
    throw error;
  }
};

//enquiry
export const enquiry = async (data) => {
  try {
    const response = await apiConfig.post("/enquiry", data);
    return response;
  } catch (error) {
    throw error;
  }
};

//testimonial(feedback)
export const userFeedback = async (data) => {
  try {
    const response = await apiWithHeaders.post("/testimonials", data);
    return response;
  } catch (error) {
    throw error;
  }
};

//fetch all active users feedback
export const fetchOldTestimonials = async () => {
  try {
    const response = await apiWithHeaders.get("/user/testimonials");
    return response;
  } catch (error) {
    throw error;
  }
};

//fetch all active users feedback on home page
export const fetchTestimonialsOnHomePage = async () => {
  try {
    const response = await apiConfig.get("/testimonials");
    return response;
  } catch (error) {
    throw error;
  }
};

//Create Event
export const event = async (data) => {
  try {
    const response = await apiWithHeaders.post("/events", data);
    return response;
  } catch (error) {
    throw error;
  }
};

//Update Event
export const updateEvent = async (data, id) => {
  try {
    const response = await apiWithHeaders.put(`/event/${id}`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

//Featured Events
export const featuredEventsByAdmin = async () => {
  try {
    const response = await apiWithHeaders.get("/events/featured/all");
    return response;
  } catch (error) {
    throw error;
  }
};

//Featured Events
export const featuredEvent = async (id) => {
  try {
    const response = await apiWithHeaders.patch(`/event/toggle-featured/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};


//delete Event by id
export const deleteEventByID = async (id) => {
  try {
    const response = await apiWithHeaders.delete(`/events/${id}`);
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
//all events posted by logged user
export const fetchAllEventsByLoggedUser = async () => {
  try {
    const response = await apiWithHeaders.get('/events');
    return response;
  } catch (error) {
    throw error;
  }
}

//fetch all active qualification
export const fetchAllActiveQualifications = async () => {
  try {
    const response = await apiWithHeaders.get("/qualifications");
    return response;
  } catch (error) {
    throw error;
  }
};

//fetch all active qualification
export const fetchAllSiteSettings = async () => {
  try {
    const response = await apiConfig.get("/setting");
    return response;
  } catch (error) {
    throw error;
  }
};

//fetch community with id given
export const fetchCommunityWithNAME = async (name) => {
  try {
    const response = await apiConfig.get(`/bharat-mandir/${name}`);
    return response;
  } catch (error) {
    throw error;
  }
};

//fetch single page cms
export const fetchSinglePageCMS = async (page) => {
  try {
    const response = await apiConfig.get(`/pages/${page}`);
    return response;
  } catch (error) {
    throw error;
  }
};

//fetch all services
export const fetchAllServices = async () => {
  try {
    const response = await apiWithHeaders.get("/user/services");
    return response;
  } catch (error) {
    throw error;
  }
};

//fetch user registered services
export const fetchUserRegisteredServices = async () => {
  try {
    const response = await apiWithHeaders.get("/user/services/registered");
    return response;
  } catch (error) {
    throw error;
  }
};
//fetch user registered single service
export const fetchUserRegisteredSingleService = async (id) => {
  try {
    const response = await apiWithHeaders.get(`/user/service/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

//create user service
export const createUserService = async (data) => {
  try {
    const response = await apiWithHeaders.post("/user/service/create", data);
    return response;
  } catch (error) {
    throw error;
  }
};

//update user service
export const updateUserService = async (data, id) => {
  try {
    const response = await apiWithHeaders.put(
      `/user/service/update/${id}`,
      data
    );
    return response;
  } catch (error) {
    throw error;
  }
};

//fetch users with service title
export const fetchUsersWithServiceTitle = async (data) => {
  try {
    const response = await apiWithHeaders.post("/users/service", data);
    return response;
  } catch (error) {
    throw error;
  }
};

//delete user registered single service
export const deleteUserRegisteredSingleService = async (id) => {
  try {
    const response = await apiWithHeaders.delete(`/user/service/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

//search people in service
export const searchPeopleInService = async (
  queryString,
  state,
  city,
  page,
  size,
  title
) => {
  try {
    const response = await apiWithHeaders.get(
      `/search/users/service?role=user&searchQuery=${queryString}&state=${state}&city=${city}&page=${page}&size=${size}&title=${title}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

//service-rating
export const serviceRating = async (data) => {
  try {
    const response = await apiWithHeaders.post('/user/service/ratings', data);
    return response;
  } catch (error) {
    throw error;
  }
}

//create new job post
export const createNewJobPost = async (data) => {
  try {
    const response = await apiWithHeaders.post("/user/create/new-job", data);
    return response;
  } catch (error) {
    throw error;
  }
};

//fetch jobs
export const fetchAllJobsPosted = async (page, size, state, city, jobType) => {
  try {
    const response = await apiWithHeaders.get(
      `/user/search/jobs?page=${page}&size=${size}&state=${state}&city=${city}&jobType=${jobType}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

//fetch jobs
export const fetchAllJobsByLoggedUser = async (userId, page, size) => {
  try {
    const response = await apiWithHeaders.get(
      `/user/search/myjobs?userId=${userId}&page=${page}&size=${size}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

//update user job posted
export const updateUserJobPosted = async (data, id) => {
  try {
    const response = await apiWithHeaders.put(`/user/update/${id}/job`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

//fetch single job posted
export const fetchSingleJobPosted = async (id) => {
  try {
    const response = await apiWithHeaders.get(`/user/find/${id}/job-posted`);
    return response;
  } catch (error) {
    throw error;
  }
};

//delete user posted single job
export const deleteUserPostedSingleJob = async (id) => {
  try {
    const response = await apiWithHeaders.delete(`/job/${id}/delete`);
    return response;
  } catch (error) {
    throw error;
  }
};

//fetch all featured jobs
export const fetchFeaturedJobs = async () => {
  try {
    const response = await apiWithHeaders.get("/user/search/featured-jobs");
    return response;
  } catch (error) {
    throw error;
  }
};

//toggle job-request-status
export const toggleJobRequest = async (jobId) => {
  try {
    const response = await apiWithHeaders.patch(`/job/${jobId}/toggle-status`);
    return response;
  } catch (error) {
    throw error;
  }
};

//apply for a job
export const applyJob = async (data) => {
  try {
    const response = await apiWithHeaders.post("/user/apply/job", data);
    return response;
  } catch (error) {
    throw error;
  }
};

//check dublication for applied job
export const ifAlreadyAppliedSameJob = async (id) => {
  try {
    const response = await apiWithHeaders.get(`/job/apply/${id}/existance`);
    return response;
  } catch (error) {
    throw error;
  }
};

//get job applicant statistics
export const jobsApplicantStatistics = async () => {
  try {
    const response = await apiWithHeaders.get("/applied-job-statistics");
    return response;
  } catch (error) {
    throw error;
  }
};

//get job applicant for respective job
export const userAppliedForSameJob = async (id) => {
  try {
    const response = await apiWithHeaders.get(
      `/find/all-users/for/${id}/job/applied`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

//fetch all applied jobs
export const fetchAllAppliedJobs = async () => {
  try {
    const response = await apiWithHeaders.get("/users/applied/jobs");
    return response;
  } catch (error) {
    throw error;
  }
};
//upload-resume
export const updateResume = async (data) => {
  try {
    const response = await apiWithHeaders.post('/user/upload/resume', data);
    return response;
  } catch (error) {
    throw error;
  }
};
//find user other-details
export const findOtherdetails = async () => {
  try {
    const response = await apiWithHeaders.get('/user/other-details');
    return response;
  } catch (error) {
    throw error;
  }
};

//toggle status-inactive for applied jobs
export const toggleStatusInactiveForIds = async (data) => {
  try {
    const response = await apiWithHeaders.post('/user/applied/jobs/status-inactive', data);
    return response;
  } catch (error) {
    throw error;
  }
}

//toggle u_status-inactive for applied jobs
export const toggleUStatusInactiveForIds = async (data) => {
  try {
    const response = await apiWithHeaders.post('/user/applied/jobs/u_status-inactive', data);
    return response;
  } catch (error) {
    throw error;
  }
}

//chnage row color for user applied to a job
export const changeRowColorInJobDetails = async (data) => {
  try {
    const response = await apiWithHeaders.post('/user/applied/job/row-color', data);
    return response;
  } catch (error) {
    throw error;
  }
}

//update remark for user applied to a job
export const updateRemarkInJobDetails = async (data) => {
  try {
    const response = await apiWithHeaders.post('/user/applied/job/remark', data);
    return response;
  } catch (error) {
    throw error;
  }
}

//fetch all events
export const fetchAllEvents = async (searchText, page, size, state, city) => {
  try {
    const response = await apiWithFileHeaders.get(
      `/user/events?searchText=${searchText}&page=${page}&size=${size}&state=${state}&city=${city}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
//send email
export const sendEmail = async (data) => {
  try {
    const response = await apiWithHeaders.post('/user/send-mail', data);
    return response;
  } catch (error) {
    throw error;
  }
}
//save email
export const saveEmail = async (data) => {
  try {
    const response = await apiWithHeaders.post('/user/save-mail', data);
    return response;
  } catch (error) {
    throw error;
  }
}
//fetchMails
export const fetchMails = async (data) => {
  try {
    const response = await apiWithHeaders.post('/user/emails', data);
    return response;
  } catch (error) {
    throw error;
  }
}

//fetch all subcasts
export const fetchAllSubcasts = async (communityId) => {
  try {
    const response = await apiWithHeaders.get(
      `/fetch/${communityId}/subcasts`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

//post activities
export const uploadActivity = async (data) => {
  try {
    const response = await apiWithHeaders.post("/user/activity/post", data);
    return response;
  } catch (error) {
    throw error;
  }
};

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

//fetch one activity
export const findActivityWithId = async (id, userId) => {
  try {
    const response = await apiWithHeaders.get(
      `/user/activity/${id}/on/${userId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

//update single activity
export const updateSingleActivityById = async (data, id, userId) => {
  try {
    const response = await apiWithHeaders.put(
      `/user/activity/${id}/update/${userId}`, data
    );
    return response;
  } catch (error) {
    throw error;
  }
};
//update single activity
export const deleteSingleActivityById = async (id, userId) => {
  try {
    const response = await apiWithHeaders.delete(
      `/user/activity/${id}/delete/${userId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

//Chat
export const sendMessage = async (data) => {
  try {
    const response = await apiWithHeaders.post("/chat/send-message", data);
    return response;
  } catch (error) {
    throw error;
  }
};

//chat receive
export const receiveMessage = async (id) => {
  try {
    const response = await apiWithHeaders.get(`/chat/${id}/messages`);
    return response;
  } catch (error) {
    throw error;
  }
};

//toggle-mobile-visiblity
export const toggleMobile = async (id) => {
  try {
    const response = await apiWithHeaders.put(
      "/users/settings/toggle-mobile-visiblity"
    );
    return response;
  } catch (error) {
    throw error;
  }
};
