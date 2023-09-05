import axios from 'axios';
import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { createCommunity, uploadImage } from '../../services/AdminService';
import { logout } from '../../actions/authActions';

const CreateCommunityForm = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  
  const [thumbnailImageTempUrl,setThumbnailImageTempUrl] = useState('');
  const [bannerImageTempUrl,setBannerImageTempUrl] = useState('');

  const [errors, setErrors] = useState('');
  const [message, setMessage] = useState('');
  const [alertClass, setAlertClass] = useState('');

  const thumbnailImageRef = useRef(null);
  const bannerImageRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleThumbnailImageChange = async (e) => {

    //setThumbnailImage(e.target.files[0]);
    const selectedFile = e.target.files[0];
    const formData = new FormData();
    formData.append('image',selectedFile);

    try {
      const response = await uploadImage(formData);
      if(response && response.status === 200) {
        setThumbnailImageTempUrl(response.data.data.image);
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
    }

  };

  const handleBannerImageChange = async (e) => {
     const selectedFile = e.target.files[0];
     const formData = new FormData();
     formData.append('image',selectedFile);
 
     try {
       const response = await uploadImage(formData);
       if(response && response.status === 200) {
         setBannerImageTempUrl(response.data.data.image);
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
     }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
     const communityData = {
        name,status,
        thumbnail_image:thumbnailImageTempUrl,
        banner_image: bannerImageTempUrl
     }
      const response = await createCommunity(communityData);

      if (response && response.status === 200) {
        setErrors('');
        setMessage(response.data.message);
        setAlertClass('alert-success');
        setName('');
        setStatus('');

        // Reset file inputs
        thumbnailImageRef.current.value = null;
        bannerImageRef.current.value = null;
       setTimeout(()=>{
        window.location.href = '/admin/communities';
       },1000);
      }
      // Redirect to the admin dashboard or desired page
    } catch (error) {
      // Handle validation errors
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
      }
      // Unauthorized
      else if (error.response && error.response.status === 401) {
        dispatch(logout());
        navigate('/admin')
      } 
      else if (error.response && error.response.status === 500) {
        dispatch(logout());
        navigate('/admin')
      } 
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Create Community</h1>
        <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        onClick={(e)=>{
          e.preventDefault();
          window.location.href = '/admin/communities';
        }}
        >
          See All Communities
        </a>
      </div>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {message && (
              <div className={`alert ${alertClass}`}>
                {alertClass === 'alert-success' ? (
                  <i className="fas fa-check-circle"></i>
                ) : (
                  <i className="fas fa-exclamation-triangle"></i>
                )}
                {' ' + message}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter community name"
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="thumbnailImage">Thumbnail Image</label>
              <input
                type="file"
                className="form-control-file community-images"
                id="thumbnailImage"
                ref={thumbnailImageRef}
                onChange={handleThumbnailImageChange}
              />
              {errors.thumbnail_image && (
                <span className="error">{errors.thumbnail_image}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="bannerImage">Banner Image</label>
              <input
                type="file"
                className="form-control-file community-images"
                id="bannerImage"
                ref={bannerImageRef}
                onChange={handleBannerImageChange}
              />
              {errors.banner_image && <span className="error">{errors.banner_image}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                className="form-control"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              {errors.status && <span className="error">{errors.status}</span>}
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCommunityForm;
