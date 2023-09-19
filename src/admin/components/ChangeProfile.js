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
        navigate('/admin');
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
        navigate('/admin');
      }
    }
  };

  return (
    <div className="">
      <h1 className="h3 mb-0 text-gray-800">Create Profile</h1>
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
              <div className="col-md-9">
                <div className="form-group">
                  <label>Name</label>
                  <Input
                    placeholder="Name"
                    value={name}
                    onChange={handleNameChange}
                    className="form-control"
                  />
                  <label>Email</label>
                  <Input
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
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
