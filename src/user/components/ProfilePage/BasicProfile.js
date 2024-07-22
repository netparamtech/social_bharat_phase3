import React, { useEffect, useRef, useState } from "react";
import {
  fetchOneCommunity,
  updateProfilePhoto,
} from "../../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";
import { Image } from "antd";
import { setLoader } from "../../actions/loaderAction";

const BasicProfile = (props) => {
  const loggedUser = useSelector((state) => state.userAuth);

  const { user } = props;

  const [profileImage, setProfileImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const imageInputRef = useRef(null);
  const [token, setToken] = useState("");
  const [community, setCommunity] = useState({});

  const defaultPhoto = "/user/images/user.png";

  const [errors, setErrors] = useState();
  const [serverError, setServerError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageClick = () => {
    imageInputRef.current.click();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("image", file);

    try {
      dispatch(setLoader(true))
      const response = await updateProfilePhoto(formData);

      setProfileImage(response.data.data.photo);
      setImagePreview(URL.createObjectURL(file));

      dispatch(login(response.data.data, token));
      setServerError("");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
        setServerError("");
      }

      //Unauthorized
      else if (error.response && error.response.status === 401) {
        navigate("/login");
      }
      //Internal Server Error
      else if (error.response && error.response.status === 500) {
        setServerError("Oops! Something went wrong on our server.");
      }
    } finally {
      dispatch(setLoader(false));
    }
  };

  const fetchLoggedUserCommunity = async () => {
    dispatch(setLoader(true));
    try {
      const response = await fetchOneCommunity();
      if (response && response.status === 200) {
        setCommunity(response.data.data);
        setServerError("");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else if (error.response && error.response.status === 500) {
        setServerError("Oops! Something went wrong on our server.");
      }
    } finally {
      dispatch(setLoader(false));
    }
  };

  const formatDate = (dateString) => {
    if (dateString === null) {
      return "";
    }
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const [month, day, year] = new Date(dateString)
      .toLocaleDateString("en-GB", options)
      .split("/");
    return `${month}-${day}-${year}`;
  };

  useEffect(() => {
    console.log(loggedUser)
    setProfileImage(
      (user && user.data && user.data.photo) || "/user/images/OIP.jpg"
    );
    setToken(loggedUser.token);
    fetchLoggedUserCommunity();
  }, [user]);

  return (
    <div id="basic-profile-section" className="content-wrapper pt-4">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="card shadow">
              {serverError && <span className="error">{serverError}</span>}
              <div className="container-profilepic mx-auto card card-block-md overflow-hidden ">
                <input
                  type="file"
                  ref={imageInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleImageChange}
                />

                <img
                  className="img-fluid max-width-100"
                  src={profileImage}
                  alt=""
                  title=""

                />

                <div className="middle-profilepic text-center card-img-overlay d-none flex-column justify-content-center">
                  <div className="text-profilepic text-success">
                    <i
                      className="fas fa-camera fs-6"
                      onClick={handleImageClick}
                    ></i>
                    <div className="text-profilepic fs-6">
                      <a
                        className="text-decoration-none text-success hover-pointer"
                        onClick={handleImageClick}
                      >
                        Edit
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-body mx-auto text-center">
                <p className="card-text mb-0 text-wrap-break-word">
                  {(user && user.data && user.data.name) || "N/A"}
                </p>

                {community && community.thumbnail_image ? (
                  <Image
                    className="img-fluid max-width-100  community-img"
                    src={
                      community.thumbnail_image
                        ? community.thumbnail_image
                        : defaultPhoto
                    }
                    alt=""
                    title=""
                  />
                ) : (
                  <span>{community && community.name || "N/A"}</span>
                )}
                {/* {
                  community && <span>{community.name || ""}</span>
                } */}
              </div>
            </div>
          </div>
          
          <div className="col-md-9">
            <div className="card shadow">
              <div className="col-1 ms-auto me-4 mt-2 icon-edit">
                <a
                  className="hover-pointer"
                  onClick={() => navigate("/user/update-basic-profile")}
                  title="Edit"
                >
                  <i className="fas fa-pencil-alt"></i>
                </a>
              </div>
              <div className="card-body ">
                <div className="w-100 w-lg-75">
                  <div className="mb-2 row">
                    <label htmlFor="" className="col-4">
                      Name
                    </label>
                    <div className="col-8">
                      <span className="text-muted">
                        {(user && user.data && user.data.name) || "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="mb-2 row">
                    <label className="col-4">Email </label>
                    <div className="col-8">
                      <span className="text-muted">
                        {(user && user.data && user.data.email) || "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="mb-2 row">
                    <label className="col-4">Date Of Birth </label>
                    <div className="col-8">
                      <span className="text-muted">
                        {formatDate(user && user.data && user.data.dob) ||
                          "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="mb-2 row">
                    <label className="col-4">Highest Qualification </label>
                    <div className="col-8">
                      <span className="text-muted">
                        {user && user.data && user.data.highest_qualification ||
                          "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="mb-2 row">
                    <label className="col-4">Occupation </label>
                    <div className="col-8">
                      <span className="text-muted">
                        {user && user.data && user.data.occupation ||
                          "N/A"}
                      </span>
                    </div>
                  </div>
                  {
                    user && user.data && user.data.job_type?
                    <div className="mb-2 row">
                    <label className="col-4">Job Sector </label>
                    <div className="col-8">
                      <span className="text-muted">
                        {user && user.data && user.data.job_type ||
                          "N/A"}
                      </span>
                    </div>
                  </div>:''
                  }

                  <div className="mb-2 row">
                    <label className="col-4">Marital Status </label>
                    <div className="col-8">
                      <span className="text-muted">
                        {(user && user.data && user.data.marital_status) ||
                          "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="mb-2 row">
                    <label className="col-4 ">Gender</label>
                    <div className="col-8">
                      <span className="text-muted">
                        {(user && user.data && user.data.gender) || "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="mb-2 row">
                    <label className="col-4">Community </label>
                    <div className="col-8">
                      <span className="text-muted">
                        {(user &&
                          user.data &&
                          user.data.community &&
                          user.data.community.name) ||
                          "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="p-0 m-0">
                    <div className="card-footer p-0 m-0">
                      <div className="py-1 row">
                        <label className="col-4">Mobile No</label>
                        <div className="col-8">
                          <span className="text-muted">
                            {(loggedUser && loggedUser.user && loggedUser.user.mobile) || "N/A"}
                          </span>
                          <a
                            className="update-mobile btn ms-2"
                            title="Update Mobile No."
                            onClick={() => navigate("/update-mobile")}
                          >
                            <i className="fas fa-edit text-success"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicProfile;
