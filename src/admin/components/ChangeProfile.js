import React, { useEffect, useRef, useState } from "react";
import { Card, Button, Input } from "antd";
import "antd/dist/antd";

import {
  updateBasicProfile,
  uploadImage,
} from "../services/AdminService";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/authActions";

const ChangeProfile = (props) => {
  const { user } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePreview, setProfilePreview] = useState(null);
  const [profileTempUrl, setProfileTempUrl] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [errors, setErrors] = useState("");
  const token = useSelector((state) => state.auth.token);

  const fileInputRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setName(user.name || "");
    setEmail(user.email || "");
    setProfilePreview(user.photo ? user.photo : "/admin/img/user-add-icon.png");
    setProfileTempUrl(user.photo || "");
  }, [user]);

  const handlePlusIconClick = () => {
    fileInputRef.current.click();
  };

  const handleProfilePhoto = async (e) => {
    const selectedFile = e.target.files[0];
    setProfilePreview(URL.createObjectURL(selectedFile));

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await uploadImage(formData); // Make an API call to get temporary URL
      if (response && response.status === 200) {
        setProfileTempUrl(response.data.data.image);
      }
    } catch (error) {
      //Unauthorized
      if (error.response && error.response.status === 401) {
        navigate('/admin');
      }
      else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate('/server/error', { state: { errorMessage} });
      }
    }

    setProfilePhoto(selectedFile);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      photo: profileTempUrl,
    };


    try {
      const response = await updateBasicProfile(data);
      if (response && response.status === 200) {
        setErrors('');
        dispatch(login(response.data.data, token));
       navigate('/admin/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
      }
      // Unauthorized
      else if (error.response && error.response.status === 401) {
        navigate("/admin");
      } else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate('/server/error', { state: { errorMessage} });
      }
    }
  };

  return (
    <div className="">
      <h1 className="h3 mb-0 text-gray-800">Change Profile</h1>
      <div className="card p-3 w-100 mt-3">
        <div className="card-body">
          <form className="">
            <div className="row">
              <div className="col-md-3">
                <div
                  className="profile-image form-group"
                  onClick={handlePlusIconClick}
                >
                  <img
                    src={
                      profilePreview
                        ? profilePreview
                        : "/admin/img/user-add-icon.png"
                    }
                    alt="Profile"
                    className="image-container "
                  />
                  {!profilePreview && <div className="plus-icon"></div>}

                  <input
                    type="file"
                    ref={fileInputRef}
                    className="d-none form-control"
                    accept="image/*"
                    onChange={handleProfilePhoto}
                  />
                </div>
              </div>
              <div className="col-md-9 mb-3">
                <div className="form-group">
                 <div>
                 <label>Name</label>
                  <Input
                    placeholder="Enter Your Name"
                    value={name}
                    onChange={handleNameChange}
                    className="form-control"
                  />
                   {errors.name && <span className='error'>{errors.name}</span>}
                 </div>
                 <div>
                 <label>Email</label>
                  <Input
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={handleEmailChange}
                    className="form-control"
                  />
                   {errors.email && <span className='error'>{errors.email}</span>}
                 </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              onClick={handleSubmit}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangeProfile;
