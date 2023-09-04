import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { fetchCommunityWithId, updateCommunity, uploadImage } from '../../services/AdminService';
import { logout } from '../../actions/authActions';

const CommunityUpdateForm = () => {
    const { id } = useParams();

    const [name, setName] = useState('');
    const [thumbnailImage, setThumbnailImage] = useState('');
    const [bannerImage, setBannerImage] = useState('');
    const [status, setStatus] = useState('');

    const [thumbnailImageTempUrl, setThumbnailImageTempUrl] = useState('');
    const [bannerImageTempUrl, setBannerImageTempUrl] = useState('');

    const [errors, setErrors] = useState('');
    const [message, setMessage] = useState('');
    const [alertClass, setAlertClass] = useState('');

    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [bannerPreview, setBannerPreview] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleThumbnailImageChange = async (e) => {

        //setThumbnailImage(e.target.files[0]);
        const selectedFile = e.target.files[0];
        setThumbnailPreview(URL.createObjectURL(selectedFile));
        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await uploadImage(formData);
            if (response && response.status === 200) {
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
        setBannerPreview(URL.createObjectURL(selectedFile));
        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await uploadImage(formData);
            if (response && response.status === 200) {
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
                name, status,
                thumbnail_image: thumbnailImageTempUrl,
                banner_image: bannerImageTempUrl
            }
            console.log(communityData)
            const response = await updateCommunity(id, communityData);

            if (response && response.status === 200) {
                setErrors('');
                setMessage(response.data.message);
                setAlertClass('alert-success');
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

    const fetchCommunities = async () => {
        try {
            const response = await fetchCommunityWithId(id);
            if (response && response.status === 200) {
                const communityData = response.data.data[0]; // Assuming the fetched data is in the format { name, thumbnail_image, banner_image, status }
                setName(communityData.name);
                setThumbnailImageTempUrl(communityData.thumbnail_image);
                setBannerImageTempUrl(communityData.banner_image);
                setStatus(communityData.status);

                setThumbnailPreview(communityData.thumbnail_image);
                setBannerPreview(communityData.banner_image);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                dispatch(logout());
                navigate('/admin')
            }
        }
    }

    useEffect(() => {
        fetchCommunities();
    }, [])

    return (
        <div className="container-fluid" style={{ minHeight: '100vh' }}>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Update Community</h1>
            </div>
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit} className="p-5 w-75">
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
                                defaultValue={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter community name"
                            />
                            {errors.name && <span className="error">{errors.name}</span>}
                        </div>

                        <div className="row mt-5">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label htmlFor="thumbnailImage">Thumbnail Image</label>

                                    <input
                                        type="file"
                                        className="form-control-file"
                                        id="thumbnailImage"
                                        onInput={handleThumbnailImageChange}
                                    />
                                    {errors.thumbnail_image && (
                                        <span className="error">{errors.thumbnail_image}</span>
                                    )}
                                </div>
                            </div>
                            <div className="col-sm-6">
                                {thumbnailPreview && <img src={thumbnailPreview} alt="Thumbnail" className="small-img-thumbnail" />}
                            </div>
                        </div>


                        <div className="row mt-5">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label htmlFor="bannerImage">Banner Image</label>

                                    <input
                                        type="file"
                                        className="form-control-file"
                                        id="bannerImage"
                                        onChange={handleBannerImageChange}
                                    />
                                    {errors.banner_image && (
                                        <span className="error">{errors.banner_image}</span>
                                    )}
                                </div>
                            </div>
                            <div className="col-sm-6">
                                {bannerPreview && <img src={bannerPreview} alt="Banner" className="small-img-thumbnail" />}
                            </div>
                        </div>


                        <div className="form-group">
                            <label htmlFor="status">Status</label>
                            <select
                                className="form-control"
                                id="status"
                                defaultValue={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="">Select status</option>
                                <option value="Active" selected={status === 'Active' ? true : false}>
                                    Active
                                </option>
                                <option value="Inactive" selected={status === 'Inactive' ? true : false}>
                                    Inactive
                                </option>
                            </select>
                            {errors.status && (
                                <span className="error">{errors.status}</span>
                            )}

                        </div>

                        <button type="submit" className="btn btn-primary">
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </div>


    );
};

export default CommunityUpdateForm;
