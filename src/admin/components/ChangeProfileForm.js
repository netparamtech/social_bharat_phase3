import React, { useEffect, useRef, useState } from 'react';
import { Card, Input, Button } from 'antd';
import 'antd/dist/antd';

import { updateProfilePicture } from '../services/AdminService';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login,logout } from '../actions/authActions';

const ChangeProfileForm = (props) => {
  const { user } = props;
  const [profilePreview, setProfilePreview] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [errors,setErrors] = useState('');
  const token = useSelector((state) => state.auth.token);

  const fileInputRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setName(user.name || '');
    setEmail(user.email || '');
    setProfilePreview(user.photo || '');
    setProfilePhoto(user.photo);
  }, [user])

  const handlePlusIconClick = () => {
    fileInputRef.current.click();
  };

  const handleProfilePhoto = (e) => {
    const selectedFile = e.target.files[0];
    setProfilePreview(URL.createObjectURL(selectedFile));
    setProfilePhoto(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', profilePhoto);
    try {
      const response = await updateProfilePicture(formData);
      if (response && response.status === 200) {
        dispatch(login(response.data.data, token));
        navigate('/admin/dashboard')
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
      <Card className="profile-card">
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
        {/* <div className="profile-details">
          <Input placeholder="Name" value={name} />
          <Input placeholder="Email" value={email} />
          <Button type="primary" onClick={handleSubmit}>Save</Button>
        </div> */}
        <div className='mt-5'>
        <Button type="primary" onClick={handleSubmit}>Save</Button>
        </div>
      </Card>
    </div>
  );
};

export default ChangeProfileForm;
