import React, { useEffect, useRef, useState } from 'react';
import { Card, Button, Input } from 'antd';
import 'antd/dist/antd';

import { updateBasicProfile, updateProfilePicture, uploadImage } from '../services/AdminService';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../actions/authActions';

const ChangeProfilePicture = (props) => {
  const { user } = props;
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [profilePreview, setProfilePreview] = useState(null);
  const [profileTempUrl, setProfileTempUrl] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [errors, setErrors] = useState('');
  const token = useSelector((state) => state.auth.token);

  const fileInputRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setName(user.name||'');
    setEmail(user.email||'');
    setProfilePreview(user.photo || '');
    setProfileTempUrl(user.photo||'');
  }, [user])

  const handlePlusIconClick = () => {
    fileInputRef.current.click();
  };

  const handleProfilePhoto = async (e) => {
    const selectedFile = e.target.files[0];
    setProfilePreview(URL.createObjectURL(selectedFile));

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await uploadImage(formData); // Make an API call to get temporary URL
      if (response && response.status === 200) {
        console.log(response.data.data)
        setProfileTempUrl(response.data.data.image);
      }
    } catch (error) {
      // Handle error or show an error message
    }

    setProfilePhoto(selectedFile);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,email,
      photo:profileTempUrl,
    }

    console.log(data)

    try {
      const response = await updateBasicProfile(data);
      if (response && response.status === 200) {
        dispatch(login(response.data.data, token));
        window.location.href = '/admin/dashboard';
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
      }
      // Unauthorized
      else if (error.response && error.response.status === 401) {
        dispatch(logout());
        navigate('/admin')
      }
      else if (error.response && error.response.status === 500) {
        // dispatch(logout());
        // navigate('/admin')
      }
    }
  }

  return (
    <div className="profile-card-container">
      <Card className="profile-card-image">
        <div className="profile-image" onClick={handlePlusIconClick}>
          <img
            src={profilePreview}
            alt="Profile"
            className="image-container"
          />
          {!profilePreview && <div className="plus-icon">+</div>}
          <input
            type="file"
            ref={fileInputRef}
            className='d-none'
            accept="image/*"
            onChange={handleProfilePhoto}
          />

        </div>

        <div className='mt-5'>
          <Input placeholder="Name" value={name} onChange={handleNameChange} />
          <Input placeholder="Email" value={email} onChange={handleEmailChange} />
          <Button type="primary" onClick={handleSubmit}>Save</Button>
        </div>
      </Card>
    </div>
  );
};

export default ChangeProfilePicture;
