import React, { useEffect, useState } from "react";
import {
  createTempUser,
  fetchAllCommunities,
  fetchBannerWithPageAndSection,
} from "../../services/userService";
import RegisterWithOtp from "../otp/RegisterWithOtp";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoader } from "../../actions/loaderAction";
import EnquiryModel from "./EnquiryModel";

const RegisterForm = () => {
  const [name, setName] = useState("");

  const [mobile, setMobile] = useState("");
  const [community_id, SetCommunity_id] = useState("");
  const [casts, setCasts] = useState([]);

  const [isTempUserCreated, setIsTempUserCreated] = useState(false);
  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");
  const [serverError, setServerError] = useState("");

  const [imageUrls, setImageUrls] = useState([]);
  const [defaultImage, setDefaultImage] = useState("/user/images/signup.png");
  const [isEnquiry, setIsEnquiry] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
  };

  const handleSelectChange = (selectedOption) => {
    SetCommunity_id(selectedOption.value);
  };

  const tempUserCreated = () => {
    setIsTempUserCreated(true);
  };
  const toggleEnquiry = () => {
    setIsEnquiry(!isEnquiry);
  }

  //fetch all active communities

  const fetchCommunities = async () => {
    dispatch(setLoader(true));
    try {
      const response = await fetchAllCommunities();
      if (response && response.status === 200) {
        const requestedCasts = response.data.data.filter((item) => item && item.community_archive === '');
        setCasts(requestedCasts);
        setServerError('');
        dispatch(setLoader(false));
      }
    } catch (error) {
      dispatch(setLoader(false));
      //Unauthorized
      if (error.response && error.response.status === 401) {
        setServerError('');
        navigate("/login");
      } else if (error.response && error.response.status === 500) {
        setServerError("Oops! Something went wrong on our server.");
      }
    }
  };

  //action on submit form

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanMobile = mobile.replace(/^0+/, '');

    //converting first letter in upper case in name
    const arrayName = name.split(' ');
    const modifiedName = arrayName.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
    setName(modifiedName);
    const userData = {
      name: modifiedName,
      mobile: cleanMobile,
      community_id,
    };
    try {
      const response = await createTempUser(userData);
      if (response && response.status === 201) {
        setErrors("");
        setServerError('');
        setMessage(response.data.message);
        tempUserCreated();
      }
    } catch (error) {
      // Handle validation errors
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
        setServerError('');
      }
      //Unauthorized
      else if (error.response && error.response.status === 401) {
        navigate("/login");
      } else if (error.response && error.response.status === 500) {
        setServerError("Oops! Something went wrong on our server.");
      }
    }
  };

  const fetchBanners = async () => {
    dispatch(setLoader(true));

    try {
      const response = await fetchBannerWithPageAndSection('Register', 'Register');

      const activeBanners = response.data.data.filter((banner) => banner.status === 'Active');
      if (!Array.isArray(activeBanners[0].banner_urls)) {
        const updatedBannerUrls = [activeBanners[0].banner_urls];
        activeBanners[0].banner_urls = updatedBannerUrls;
      }
      setImageUrls(activeBanners[0].banner_urls);
      dispatch(setLoader(false));

    } catch (error) {
      dispatch(setLoader(false));

      if (error.response && error.response.status === 401) {
        navigate('/login');
      } else if (error.response && error.response.status === 500) {
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  useEffect(() => {
    fetchCommunities();
  }, []);

  return (
    <div id="auth-wrapper" className="pt-5 pb-5">
      <div className="container">
        <div className="card shadow">
          <div className="card-body">
            {serverError && <span className='error'>{serverError}</span>}
            <div className="row">
              <div className="col-md-6 d-none d-md-block  wow animate__animated animate__zoomIn">
                <img
                  src={imageUrls && imageUrls[0] ? imageUrls[0] : defaultImage}
                  className="img-fluid"
                  alt="Sign Up"
                />
              </div>
              <div className="col-md-6 col-sm-12 col-xs-12 p-5">
                <div className="card-title">
                  <h3 className="mb-3">Sign up</h3>
                </div>

                {!isTempUserCreated ? (
                  <form
                    action="/dashboard"
                    className="w-100 w-lg-75"
                    onSubmit={handleSubmit}
                  >
                    <div className="row mb-3">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter your name"
                        className="form-control"
                        onChange={handleNameChange}
                        autoFocus
                      />
                      {errors.name && (
                        <span className="error">{errors.name}</span>
                      )}
                    </div>
                    <div className="row mb-3">
                      <input
                        type="number"
                        name="mobile"
                        id="mobile"
                        placeholder="Enter your mobile number"
                        className="form-control"
                        maxLength="10" // Limit to 10 characters
                        onInput={(e) => {
                          // Trim the input to 10 characters
                          e.target.value = e.target.value.slice(0, 10);
                        }}
                        onChange={handleMobileChange}
                        autoFocus
                      />
                      {errors.mobile && (
                        <span className="error">{errors.mobile}</span>
                      )}
                    </div>
                    <div className="row mb-3">
                      <Select
                        id="community_id"
                        className=""
                        defaultValue={community_id} // Provide a selected option state
                        onChange={handleSelectChange} // Your change handler function
                        options={
                          casts &&
                          casts.map((cast) => ({
                            value: cast.id,
                            label: cast.name,
                          }))
                        }
                        placeholder="---Select Community---"
                      />

                      {errors.community_id && (
                        <span className="error">{errors.community_id}</span>
                      )}
                    </div>
                    <div className="row mb-3">
                      <button type="submit" className="btn-custom btn-primary-custom">
                        Register
                      </button>
                    </div>
                    <div className="row mt-3">
                      <p className="fw-lighter fs-6">
                        Already User?{" "}
                        <a
                          className="text-primary text-decoration-none hover-pointer"
                          onClick={() => navigate("/login")}
                        >
                          Login
                        </a>
                        .
                      </p>
                    </div>
                    <p className="fw-lighter fs-6">
                      If you encounter any issues during the registration process, please{" "}
                      <a
                        className="text-primary text-decoration-none hover-pointer"
                        onClick={() => toggleEnquiry()} // Add onClick event handler
                      >
                        click here
                      </a>{" "}
                      for assistance with your queries.
                    </p>
                    {
                      isEnquiry && <div className="row mx-auto">
                        <div className="col-12 col-md-5 card bg-info scale-on-hover m-2 hover-pointer" onClick={()=>navigate('/contact')}>
                          <div className="card-body text-light">
                            General Enquiry
                          </div>
                        </div>
                        <div className="col-12 col-md-5 card bg-lightorange scale-on-hover m-2 hover-pointer">
                          <div className="card-body ">
                            <EnquiryModel />
                          </div>
                        </div>

                      </div>
                    }
                  </form>
                ) : (
                  <RegisterWithOtp
                    userDetail={{ mobile, name, community_id }}
                    message={message}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
