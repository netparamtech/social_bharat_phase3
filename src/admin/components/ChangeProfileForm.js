import React, { useState } from 'react';
import Dropzone from 'react-dropzone';

const ChangeProfileForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [username, setUsername] = useState('');
  const [photo, setPhoto] = useState("");

  const [photoPreview, setPhotoPreview] = useState('');

  const [errors, setErrors] = useState('');
  const [message, setMessage] = useState('');
  const [alertClass, setAlertClass] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleDropBanner = async (acceptedFiles) => {
    const bannerFile = acceptedFiles[0];
    setPhoto(bannerFile);

    try {

    } catch (error) {
      // Handle fetch error
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(name, username, mobile, photo, email)

    const formData = new FormData();
    formData.append('name', name);
    formData.append('username', username);
    formData.append('mobile', mobile);
    formData.append('photo', photo);

    formData.append('email', email);
  };



  return (
    <div>
      <div className="d-sm-flex align-items-center justify-content-between mb-2">
        <h1 className="h3 mb-0 text-gray-800">Change Profile</h1>
      </div>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="w-auto">
            {message && <div className={`alert ${alertClass}`}>
              {alertClass === 'alert-success' ? (<i className="fas fa-check-circle"></i>) : (<i className="fas fa-exclamation-triangle"></i>)}
              {" " + message}
            </div>
            }

            <div className="row form-group">

              <Dropzone
                accept="image/*"
                onDrop={handleDropBanner}
              >
                {({ getRootProps, getInputProps, acceptedFiles }) => (
                  <div className="dropzone w-75 mx-auto p-5 border-success" {...getRootProps()}>
                    <input {...getInputProps()} />
                    {acceptedFiles.length > 0 ? (
                      <img src={URL.createObjectURL(acceptedFiles[0])} alt="Banner" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    ) : (
                      <p>Drag & drop a profile image here, or click to select one</p>
                    )}
                  </div>
                )}
              </Dropzone>
              {errors.banner_image && (
                <span className="validation-error">{errors.banner_image}</span>
              )}
            </div>
            <div className="row form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control w-50 mx-auto"
                id="name"
                defaultValue=""
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
              />
              {errors.name && <span className="validation-error">{errors.name}</span>}
            </div>

            <div className="row form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control w-50 mx-auto" id="email" disabled defaultValue={email} />

            </div>
            <div className="row form-group">
              <label htmlFor="mobile" className="form-label">Mobile Number</label>
              <input type="tel" className="form-control w-50 mx-auto" id="mobile" value={mobile} onChange={handleMobileChange} />
              {errors.mobile && <span className='validation-error'>{errors.mobile}</span>}
            </div>

            <div className="row form-group">
              <label htmlFor="username" className="form-label">Username</label>
              <input type="text" className="form-control w-50 mx-auto" id="name" defaultValue={username} onChange={handleUsernameChange} />
              {errors.username && <span className='validation-error'>{errors.username}</span>}
            </div>
            <button type="submit" className="btn btn-primary w-25">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangeProfileForm;
