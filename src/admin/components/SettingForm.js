import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SettingForm = () => {
    const admin = useSelector((state) => state.admin)
    const [socialInstaLink, setSocialInstaLink] = useState('');
    const [socialYoutubeLink, setSocialYoutubeLink] = useState('');
    const [socialTwitterLink, setSocialTwitterLink] = useState('');
    const [socialFacebookLink, setSocialFacebookLink] = useState('');
    const [socialLinkedinLink, setSocialLinkedinLink] = useState('');
    const [address, setAddress] = useState('');
    const [phone1, setPhone1] = useState('');
    const [phone2, setPhone2] = useState('');
    const [email1, setEmail1] = useState('');
    const [email2, setEmail2] = useState('');
    const [logo1, setLogo1] = useState("");
    const [logo2, setLogo2] = useState("");
    const [logo3, setLogo3] = useState("");

    const [errors, setErrors] = useState('');
    const [message, setMessage] = useState('');
    const [alertClass, setAlertClass] = useState('');

    const [logo1Preview, setLogo1Preview] = useState(logo1 || null);
    const [logo2Preview, setLogo2Preview] = useState(logo2 || null);
    const [logo3Preview, setLogo3Preview] = useState(logo3 || null);

    const dispatch = useDispatch();


    const handleSocialInstaLinkChange = (e) => {
        const value = e.target.value;
        setSocialInstaLink(value);
    };

    const handleSocialYoutubeLinkChange = (e) => {
        const value = e.target.value;
        setSocialYoutubeLink(value);
    };

    const handleSocialTwitterLinkChange = (e) => {
        const value = e.target.value;
        setSocialTwitterLink(value);
    };

    const handleSocialFacebookLinkChange = (e) => {
        const value = e.target.value;
        setSocialFacebookLink(value);
    };

    const handleSocialLinkedinLinkChange = (e) => {
        const value = e.target.value;
        setSocialLinkedinLink(value);
    };

    const handleAddressChange = (e) => {
        const value = e.target.value;
        setAddress(value);
    };

    const handlePhone1Change = (e) => {
        const value = e.target.value;
        setPhone1(value);
    };
    const handlePhone2Change = (e) => {
        const value = e.target.value;
        setPhone2(value);
    };

    const handleEmail1Change = (e) => {
        const value = e.target.value;
        setEmail1(value);
    };

    const handleEmail2Change = (e) => {
        const value = e.target.value;
        setEmail2(value);
    };

    const handleLogo1Change = (e) => {
        const file = e.target.files[0];
        console.log(file);
        setLogo1(file);
        setLogo1Preview(URL.createObjectURL(file));
    };

    const handleLogo2Change = (e) => {
        const file = e.target.files[0];
        console.log(file);
        setLogo2(file);
        setLogo2Preview(URL.createObjectURL(file));
    };

    const handleLogo3Change = (e) => {
        const file = e.target.files[0];
        console.log(file);
        setLogo3(file);
        setLogo3Preview(URL.createObjectURL(file));
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('social_insta_link', socialInstaLink);
        formData.append('social_youtube_link', socialYoutubeLink);
        formData.append('social_twitter_link', socialTwitterLink);
        formData.append('social_facebook_link', socialFacebookLink);
        formData.append('social_linkedin_link', socialLinkedinLink);
        formData.append('address', address);
        formData.append('phone1', phone1);
        formData.append('phone2', phone2);
        formData.append('email1', email1);
        formData.append('email2', email2);
        formData.append('logo1', logo1);
        formData.append('logo2', logo2);
        formData.append('logo3', logo3);


    };



   
    return (
        <div className="container-fluid">

            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Setting</h1>

            </div>
            <div className="card h-100 p-4 shadow">
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
                        <label htmlFor="socialInstaLink">Instagram Link</label>
                        <input
                            type="text"
                            className="form-control"
                            id="socialInstaLink"
                            name="socialInstaLink"
                            defaultValue={socialInstaLink}
                            onChange={handleSocialInstaLinkChange}
                            placeholder="Enter Instagram link"
                        />
                        {errors.social_insta_link && <span className="validation-error">{errors.social_insta_link}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="socialYoutubeLink">YouTube Link</label>
                        <input
                            type="text"
                            className="form-control"
                            id="socialYoutubeLink"
                            name="socialYoutubeLink"
                            defaultValue={socialYoutubeLink}
                            onChange={handleSocialYoutubeLinkChange}
                            placeholder="Enter Social Youtube link"
                        />
                        {errors.social_youtube_link && <span className="validation-error">{errors.social_youtube_link}</span>}

                    </div>

                    <div className="form-group">
                        <label htmlFor="socialTwitterLink">Twitter Link</label>
                        <input
                            type="text"
                            className="form-control"
                            id="socialTwitterLink"
                            name="socialTwitterLink"
                            defaultValue={socialTwitterLink}
                            onChange={handleSocialTwitterLinkChange}
                            placeholder="Enter Twitter link"
                        />
                        {errors.social_twitter_link && <span className="validation-error">{errors.social_twitter_link}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="socialFacebookLink">Facebook Link</label>
                        <input
                            type="text"
                            className="form-control"
                            id="socialFacebookLink"
                            name="socialFacebookLink"
                            defaultValue={socialFacebookLink}
                            onChange={handleSocialFacebookLinkChange}
                            placeholder="Enter Facebook link"
                        />
                        {errors.social_facebook_link && <span className="validation-error">{errors.social_facebook_link}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="socialLinkedinLink">LinkedIn Link</label>
                        <input
                            type="text"
                            className="form-control"
                            id="socialLinkedinLink"
                            name="socialLinkedinLink"
                            defaultValue={socialLinkedinLink}
                            onChange={handleSocialLinkedinLinkChange}
                            placeholder="Enter Linkedin link"
                        />
                        {errors.social_linkedin_link && <span className="validation-error">{errors.social_linkedin_link}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            defaultValue={address}
                            onChange={handleAddressChange}
                            placeholder="Enter Your Address"
                        />
                        {errors.address && <span className="validation-error">{errors.address}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone1">Phone 1</label>
                        <input
                            type="text"
                            className="form-control"
                            id="phone1"
                            name="phone1"
                            defaultValue={phone1}
                            onChange={handlePhone1Change}
                            placeholder="Enter Your Phono 1 No."
                        />
                        {errors.phone1 && <span className="validation-error">{errors.phone1}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone2">Phone 2</label>
                        <input
                            type="text"
                            className="form-control"
                            id="phone2"
                            name="phone2"
                            defaultValue={phone2}
                            onChange={handlePhone2Change}
                            placeholder="Enter Your Phono 2 No."
                        />
                        {errors.phone2 && <span className="validation-error">{errors.phone2}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email1">Email 1</label>
                        <input
                            type="text"
                            className="form-control"
                            id="email1"
                            name="email1"
                            defaultValue={email1}
                            onChange={handleEmail1Change}
                            placeholder="Enter Your Email 1 No."
                        />
                        {errors.email1 && <span className="validation-error">{errors.email1}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email2">Email 2</label>
                        <input
                            type="text"
                            className="form-control"
                            id="email2"
                            name="email2"
                            defaultValue={email2}
                            onChange={handleEmail2Change}
                            placeholder="Enter Your Email 2 No."
                        />
                        {errors.email2 && <span className="validation-error">{errors.email2}</span>}
                    </div>

                    <div className="row mt-2">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="logo1">Logo 1</label>

                                <input
                                    type="file"
                                    className="form-control-file"
                                    id="logo1"
                                    onChange={handleLogo1Change}
                                />
                                {errors.logo1 && (
                                    <span className="validation-error">{errors.logo1}</span>
                                )}
                            </div>
                        </div>
                        <div className="col-sm-6">
                            {logo1Preview && <img src={logo1Preview} alt="Logo1" className="banner-image" />}
                        </div>
                    </div>

                   

                    <div className="row mt-5">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="logo2">Logo 2</label>

                                <input
                                    type="file"
                                    className="form-control-file"
                                    id="logo2"
                                    onChange={handleLogo2Change}
                                />
                                {errors.logo2 && (
                                    <span className="validation-error">{errors.logo2}</span>
                                )}
                            </div>
                        </div>
                        <div className="col-sm-6">
                            {logo2Preview && <img src={logo2Preview} alt="Logo2" className="banner-image" />}
                        </div>
                    </div>

                    <div className="row mt-5">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label htmlFor="logo3">Logo 3</label>

                                <input
                                    type="file"
                                    className="form-control-file"
                                    id="logo3"
                                    onChange={handleLogo3Change}
                                />
                                {errors.logo3 && (
                                    <span className="validation-error">{errors.logo3}</span>
                                )}
                            </div>
                        </div>
                        <div className="col-sm-6">
                            {logo3Preview && <img src={logo3Preview} alt="Logo3" className="banner-image" />}
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            </div>
        </div>
    );
};

export default SettingForm;