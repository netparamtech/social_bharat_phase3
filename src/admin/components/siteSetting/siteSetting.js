import { Collapse } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  fetchAllSetting,
  updateSetting,
  uploadImage,
} from "../../services/AdminService";

const SiteSetting = () => {
  const { Panel } = Collapse;

  const { id } = useParams();

  const [instagram, setInstagram] = useState("");
  const [youTube, setYouTube] = useState("");
  const [twitter, setTwitter] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [address, setAddress] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");
  const [logo1, setLogo1] = useState("");
  const [logo2, setLogo2] = useState("");

  const [thumbnailImageTempUrl, setThumbnailImageTempUrl] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const [thumbnailImageTempUrl2, setThumbnailImageTempUrl2] = useState("");
  const [thumbnailPreview2, setThumbnailPreview2] = useState(null);

  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");
  const [alertClass, setAlertClass] = useState("");

  const navigate = useNavigate();

  const handleThumbnailImageChange = async (e) => {
    //setThumbnailImage(e.target.files[0]);
    const selectedFile = e.target.files[0];
    setThumbnailPreview(URL.createObjectURL(selectedFile));
    const formData = new FormData();
    formData.append("image", selectedFile);

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
        navigate("/admin");
      }
      // Internal Server error
      else if (error.response && error.response.status === 500) {
        // let errorMessage = error.response.data.message;
        // navigate('/server/error', { state: { errorMessage} });
      }
    }
  };

  const handleThumbnailImageChange2 = async (e) => {
    //setThumbnailImage(e.target.files[0]);
    const selectedFile = e.target.files[0];
    setThumbnailPreview2(URL.createObjectURL(selectedFile));
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await uploadImage(formData);
      if (response && response.status === 200) {
        setThumbnailImageTempUrl2(response.data.data.image);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
      }
      // Unauthorized
      else if (error.response && error.response.status === 401) {
        navigate("/admin");
      }
      // Internal Server error
      else if (error.response && error.response.status === 500) {
        // let errorMessage = error.response.data.message;
        // navigate('/server/error', { state: { errorMessage} });
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const settingData = {
        social_insta_link: instagram,
        social_youtube_link: youTube,
        social_twitter_link: twitter,
        social_facebook_link: facebook,
        social_linkedin_link: linkedin,
        address,
        phone1,
        phone2,
        email1,
        email2,
        logo1: thumbnailImageTempUrl,
        logo2: thumbnailImageTempUrl2,
      };
      const response = await updateSetting(settingData);

      if (response && response.status === 200) {
        setErrors("");
        setMessage(response.data.message);
        setAlertClass("alert-success");
        window.scrollTo(0, 0);
        navigate("/admin/setting");
      }
      // Redirect to the admin dashboard or desired page
    } catch (error) {
      // Handle validation errors
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
      }
      // Unauthorized
      else if (error.response && error.response.status === 401) {
        navigate("/admin");
      } else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate("/server/error", { state: { errorMessage } });
      }
    }
  };

  const fetchSetting = async () => {
    try {
      const response = await fetchAllSetting();

      if (response && response.status === 200) {
        const settingData = response.data.data;

        setInstagram(settingData.social_insta_link);
        setYouTube(settingData.social_youtube_link);
        setTwitter(settingData.social_twitter_link);
        setFacebook(settingData.social_facebook_link);
        setLinkedin(settingData.social_linkedin_link);
        setAddress(settingData.address);
        setPhone1(settingData.phone1);
        setPhone2(settingData.phone2);
        setEmail1(settingData.email1);
        setEmail2(settingData.email2);
        setLogo2(settingData.setLogo2);

        setThumbnailPreview(settingData.logo1);

        setThumbnailImageTempUrl(settingData.logo1);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/admin");
      } else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate("/server/error", { state: { errorMessage } });
      }
    }
  };

  useEffect(() => {
    fetchSetting();
  }, []);

  return (
    <>
      <div id="setting-url-page" className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Site Settings</h1>
        </div>
        <div id="font-Resize" className="card">
          <div className="card-body mb-5">
            <form onSubmit={handleSubmit}>
              {message && (
                <div className={`alert ${alertClass}`}>
                  {alertClass === "alert-success" ? (
                    <i className="fas fa-check-circle"></i>
                  ) : (
                    <i className="fas fa-exclamation-triangle"></i>
                  )}
                  {" " + message}
                </div>
              )}
              <div className="row">
                <div className="col-md-12">
                  <div className="row ps-3 pe-3 pt-2">
                    <div className="col-md-12">
                      <label className="fw-bold">Instagram URL</label>
                    </div>
                    <div className="col-md-12 form-group">
                      <input
                        type="text"
                        defaultValue={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        placeholder="Instagram Url"
                        className="form-control"
                      />
                      {errors.social_insta_link && (
                        <span className="error">
                          {errors.social_insta_link}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="row ps-3 pe-3">
                    <div className="col-md-12">
                      <label className="fw-bold">YouTube URL</label>
                    </div>
                    <div className="col-md-12 form-group">
                      <input
                        type="text"
                        defaultValue={youTube}
                        onChange={(e) => setYouTube(e.target.value)}
                        placeholder="Youtube Url"
                        className="form-control"
                      />
                      {errors.social_youtube_link && (
                        <span className="error">
                          {errors.social_youtube_link}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="row ps-3 pe-3">
                    <div className="col-md-12">
                      <label className="fw-bold">Twitter URL</label>
                    </div>
                    <div className="col-md-12 form-group">
                      <input
                        type="text"
                        defaultValue={twitter}
                        onChange={(e) => setTwitter(e.target.value)}
                        placeholder="Twitter Url"
                        className="form-control"
                      />
                      {errors.social_twitter_link && (
                        <span className="error">
                          {errors.social_twitter_link}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="row ps-3 pe-3">
                    <div className="col-md-12">
                      <label className="fw-bold">Facebook URL</label>
                    </div>
                    <div className="col-md-12 form-group">
                      <input
                        type="text"
                        defaultValue={facebook}
                        onChange={(e) => setFacebook(e.target.value)}
                        placeholder="Facebook Url"
                        className="form-control"
                      />
                      {errors.social_facebook_link && (
                        <span className="error">
                          {errors.social_facebook_link}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="row ps-3 pe-3">
                    <div className="col-md-12">
                      <label className="fw-bold">Linkedin URL</label>
                    </div>
                    <div className="col-md-12 form-group">
                      <input
                        type="text"
                        defaultValue={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        placeholder="Linkedin Url"
                        className="form-control"
                      />
                      {errors.social_linkedin_link && (
                        <span className="error">
                          {errors.social_linkedin_link}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="row ps-3 pe-3 mb-3">
                    <div className="col-md-12">
                      <label className="fw-bold">Address</label>
                    </div>
                    <div className="col-md-12 form-group">
                      <textarea
                        defaultValue={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Address"
                        className="form-control"
                      />
                      {errors.address && (
                        <span className="error">{errors.address}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-3 ps-3 pe-3">
                <div className="col-md-6">
                  <div className="row ">
                    <div className="col-md-3">
                      <label className="fw-bold">Phone No.-1</label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="number"
                        defaultValue={phone1}
                        onChange={(e) => setPhone1(e.target.value)}
                        placeholder="Phone Number 1"
                        className="form-control"
                      />
                      {errors.phone1 && (
                        <span className="error">{errors.phone1}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-3">
                      <label className="fw-bold">Phone No.-2</label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="number"
                        defaultValue={phone2}
                        onChange={(e) => setPhone2(e.target.value)}
                        placeholder="Phone Number 2"
                        className="form-control"
                      />
                      {errors.phone2 && (
                        <span className="error">{errors.phone2}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-4 ps-3 pe-3">
                <div className="col-md-6">
                  <div className="row ">
                    <div className="col-md-3">
                      <label className="fw-bold">Email- 1</label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="email"
                        defaultValue={email1}
                        onChange={(e) => setEmail1(e.target.value)}
                        placeholder="Email Id First"
                        className="form-control"
                      />
                      {errors.email1 && (
                        <span className="error">{errors.email1}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-3">
                      <label className="fw-bold">Email- 2</label>
                    </div>
                    <div className="col-md-9">
                      <input
                        type="email"
                        defaultValue={email2}
                        onChange={(e) => setEmail2(e.target.value)}
                        placeholder="Email Id Second"
                        className="form-control"
                      />
                      {errors.email2 && (
                        <span className="error">{errors.email2}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row ps-3 pe-3 mb-2">
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-8">
                      <label className="fw-bold">Logo- 1</label>
                      <div className="mb-2">
                        <input
                          type="file"
                          defaultValue={thumbnailImageTempUrl}
                          onInput={handleThumbnailImageChange}
                          className=" form-control"
                        />
                        {errors.logo1 && (
                          <span className="error">{errors.logo1}</span>
                        )}
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="form-group">
                        {thumbnailPreview && (
                          <img
                            src={thumbnailPreview}
                            alt="Logo"
                            title="Logo-1"
                            className="small-img-thumbnail  img-fluid my-2 "
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-8">
                      <label className="fw-bold">Logo- 2</label>
                      <div className="mb-2">
                        <input
                          type="file"
                          defaultValue={thumbnailImageTempUrl2}
                          onInput={handleThumbnailImageChange2}
                          className=" form-control"
                        />
                        {errors.logo1 && (
                          <span className="error">{errors.logo1}</span>
                        )}
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="form-group">
                        {thumbnailPreview2 && (
                          <img
                            src={thumbnailPreview2}
                            alt="Logo"
                            title="Logo-1"
                            className="small-img-thumbnail  img-fluid my-2 "
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row ps-3 pe-3 mb-3 mt-4">
                <div className="col-12">
                  <button type="submit" className="btn btn-primary w-25">
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SiteSetting;
