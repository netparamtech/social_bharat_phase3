import React, { useEffect, useRef, useState } from "react";
import { updateProfilePhoto } from "../../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";

const BasicProfile = (props) => {
  const loggedUser = useSelector((state) => state.userAuth);

  const { user } = props;
  const [profileImage, setProfileImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const imageInputRef = useRef(null);
  const [token, setToken] = useState("");

  const [errors, setErrors] = useState();

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
      const response = await updateProfilePhoto(formData);
      setProfileImage(response.data.data.photo);
      setImagePreview(URL.createObjectURL(file));
      dispatch(login(response.data.data, token));
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
      }

      //Unauthorized
      else if (error.response && error.response.status === 401) {
        navigate("/login");
      }
      //Internal Server Error
      else if (error.response && error.response.status === 500) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    setProfileImage(user?.data?.photo || "/user/images/OIP.jpg");
    setToken(loggedUser.token);
  });

  return (
    <div id="basic-profile-section" className="content-wrapper pt-4">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="card shadow">
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
                  src={imagePreview || profileImage}
                  alt=""
                  title=""
                  onClick={handleImageClick}
                />

                <div className="middle-profilepic text-center card-img-overlay d-none flex-column justify-content-center">
                  <div className="text-profilepic text-success">
                    <i
                      className="fas fa-camera fs-6"
                      onClick={handleImageClick}
                    ></i>
                    <div className="text-profilepic fs-6">
                      <a
                        href="#"
                        className="text-decoration-none text-success"
                        onClick={handleImageClick}
                      >
                        Edit
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-body mx-auto">
                <p className="card-text text-center mb-0">
                  {user && user.data && user.data.name}
                </p>
               
                <img 
                  className="img-fluid max-width-100 me-2  rounded-circle community-img" 
                  src={imagePreview || profileImage}
                  alt=""
                  title=""
                  onClick={handleImageClick}
                />
                <span >Community Name</span>
              </div>
              
            </div>
          </div>
          <div className="col-md-9">
            <div className="card shadow">
              <div className="edit-icon">
                <a
                  href="#"
                  onClick={() => navigate("/user/update-basic-profile")}
                  title="Edit"
                >
                  <i className="fas fa-pencil-alt"></i>
                </a>
              </div>
              <div className="card-body ">
                <div className="w-100 w-lg-75">
                  <div className="mb-2 row">
                    <label htmlFor="" className="col-sm-3">
                      Name
                    </label>
                    <div className="col-sm-8">
                      <span className="text-muted">
                        {user && user.data && user.data.name}
                      </span>
                    </div>
                  </div>

                  <div className="mb-2 row">
                    <label className="col-sm-3">Email </label>
                    <div className="col-sm-8">
                      <span className="text-muted">
                        {user && user.data && user.data.email}
                      </span>
                    </div>
                  </div>

                  <div className="mb-2 row">
                    <label className="col-sm-3 ">Gender</label>
                    <div className="col-sm-8">
                      <span className="text-muted">
                        {user && user.data && user.data.gender}
                      </span>
                    </div>
                  </div>

                  <div className="mb-2 row">
                    <label className="col-sm-3">Community </label>
                    <div className="col-sm-8">
                      <span className="text-muted">
                        {user &&
                          user.data &&
                          user.data.community &&
                          user.data.community.name}
                      </span>
                    </div>
                  </div>

                  <div className="mb-2 row">
                    <label className="col-sm-3">Mobile No</label>
                    <div className="col-sm-8">
                      <span className="text-muted">
                        {user && user.data && user.data.mobile}
                      </span>

                      <a href="#" onClick={() => navigate("/update-mobile")}>
                        <button className="btn btn-outline-info btn-sm ms-2">
                          Update
                        </button>
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
  );
};

export default BasicProfile;
