import React, { useEffect, useState } from "react";
import {
  createTempUser,
  fetchAllActiveCommunities,
} from "../../services/userService";
import RegisterWithOtp from "../otp/RegisterWithOtp";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [name, setName] = useState("");

  const [mobile, setMobile] = useState("");
  const [community_id, SetCommunity_id] = useState("");
  const [casts, setCasts] = useState([]);

  const [isTempUserCreated, setIsTempUserCreated] = useState(false);
  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();

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

  //fetch all active communities

  const fetchCommunities = async () => {
    try {
      const response = await fetchAllActiveCommunities();
      if (response && response.status === 200) {
        setCasts(response.data.data);
        setServerError('');
      }
    } catch (error) {
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
              <div className="col-md-6 d-none d-md-block">
                <img
                  src="/user/images/signup.png"
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
                      <button type="submit" className="btn btn-primary">
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
