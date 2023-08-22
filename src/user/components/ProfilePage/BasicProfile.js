import React, { useRef, useState } from 'react';

const BasicProfile = (props) => {
  const { user } = props;
  const image = user&&user.user&&user.user.photo&&user.user.photo;
  const [profileImage, setProfileImage] = useState(image?image:'/user/images/OIP.jpg');
  const imageInputRef = useRef(null);

  const handleImageClick = () => {
    imageInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div id="basic-profile-section" className="content-wrapper pt-4">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="card shadow">
              <input
                type="file"
               ref={imageInputRef}
                style={{ display: 'none' }}
                accept="image/*"
               onChange={handleImageChange}
              />

              <img
                className="img-fluid img-circle profile-picture mt-3"
                src={profileImage}
                alt=""
                title=""
                onClick={handleImageClick}
              />
              <div className="card-body ">
                <p className="card-text text-center mb-0">{user && user.data && user.data.name}</p>
                <p className="card-text text-center text-muted">Jaipur - Software Developer</p>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="card shadow">
              <div class="edit-icon"><a href="/update-basic-profile" title="Edit"><i className="fas fa-pencil-alt"></i></a></div>
              <div className="card-body ">
                <div className="w-100 w-lg-75">
                  <div className="mb-2 row">
                    <label htmlFor="" className="col-sm-3">Name</label>
                    <div className="col-sm-8"><span className="text-muted">{user && user.data && user.data.name}</span></div>
                  </div>

                  <div className="mb-2 row">
                    <label className="col-sm-3">Email </label>
                    <div className="col-sm-8"><span className="text-muted">{user && user.data && user.data.email}</span></div>
                  </div>

                  <div className="mb-2 row">
                    <label className="col-sm-3 ">Gender</label>
                    <div className="col-sm-8"><span className="text-muted">{user && user.data && user.data.gender}</span></div>
                  </div>

                  <div className="mb-2 row">
                    <label className="col-sm-3">Community </label>
                    <div className="col-sm-8"><span className="text-muted">{user && user.data && user.data.community.name}</span></div>
                  </div>

                  <div className="mb-2 row">
                    <label className="col-sm-3">Mobile No</label>
                    <div className="col-sm-8"><span className="text-muted">{user && user.data && user.data.mobile}</span></div>
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
