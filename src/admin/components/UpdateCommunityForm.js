import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UpdateCommunityForm = () => {

    const [name, setName] = useState('');
    const [thumbnailImage, setThumbnailImage] = useState('');
    const [bannerImage, setBannerImage] = useState('');
    const [status, setStatus] = useState('');

    const [errors, setErrors] = useState('');
    const [message, setMessage] = useState('');
    const [alertClass, setAlertClass] = useState('');

    const [thumbnailPreview, setThumbnailPreview] = useState('');
    const [bannerPreview, setBannerPreview] = useState('');

    const handleThumbnailImageChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        setThumbnailImage(file);
        setThumbnailPreview(URL.createObjectURL(file));
    };

    const handleBannerImageChange = (e) => {
        const file = e.target.files[0];
        setBannerImage(file);
        setBannerPreview(URL.createObjectURL(file));
    };

    useEffect(() => {
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('thumbnail_image', thumbnailImage);
        formData.append('banner_image', bannerImage);
        formData.append('status', status);
        console.log(name, bannerImage, status, thumbnailImage)
    };

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
                                defaultValue=""
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter community name"
                            />
                            {errors.name && <span className="validation-error">{errors.name}</span>}
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
                                        <span className="validation-error">{errors.thumbnail_image}</span>
                                    )}
                                </div>
                            </div>
                            <div className="col-sm-6">
                                {thumbnailPreview && <img src={thumbnailPreview} alt="Thumbnail" className="thumbnail-image" />}
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
                                        <span className="validation-error">{errors.banner_image}</span>
                                    )}
                                </div>
                            </div>
                            <div className="col-sm-6">
                                {bannerPreview && <img src={bannerPreview} alt="Banner" className="banner-image" />}
                            </div>
                        </div>


                        <div className="form-group">
                            <label htmlFor="status">Status</label>
                            <select
                                className="form-control"
                                id="status"
                                defaultValue=""
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

export default UpdateCommunityForm;
