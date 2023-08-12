import React, { useState } from 'react';

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

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(name,username,mobile,photo,email)

    const formData = new FormData();
    formData.append('name', name);
    formData.append('username', username);
    formData.append('mobile', mobile);
    formData.append('photo', photo);
    
    formData.append('email', email);
  };



  return (
    <div className="container-fluid" style={{ minHeight: '100vh' }}>
      <div className="d-sm-flex align-items-center justify-content-between mb-2">
        <h1 className="h3 mb-0 text-gray-800">Change Profile</h1>
      </div>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="ps-3 w-50">
            {message && <div className={`alert ${alertClass}`}>
              {alertClass === 'alert-success' ? (<i className="fas fa-check-circle"></i>) : (<i className="fas fa-exclamation-triangle"></i>)}
              {" " + message}
            </div>
            }
            <div className="mb-2">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" value={name} onChange={handleNameChange} />
              {errors.name && <span className='validation-error'>{errors.name}</span>}
            </div>
            <div className="mb-2">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" disabled defaultValue={email} />

            </div>
            <div className="mb-2">
              <label htmlFor="mobile" className="form-label">Mobile Number</label>
              <input type="tel" className="form-control" id="mobile" value={mobile} onChange={handleMobileChange} />
              {errors.mobile && <span className='validation-error'>{errors.mobile}</span>}
            </div>


            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label htmlFor="photo">Photo</label>

                  <input
                    type="file"
                    className="form-control-file"
                    id="photo"
                    onChange={handlePhotoChange}
                  />
                  {errors.photo && (
                    <span className="validation-error">{errors.photo}</span>
                  )}
                </div>
              </div>
              <div className="col-sm-6">
                {photoPreview && <img src={photoPreview} alt="Banner" className="banner-image" />}
              </div>
            </div>

            <div className="mb-2">
              <label htmlFor="username" className="form-label">Username</label>
              <input type="text" className="form-control" id="name" defaultValue={username} onChange={handleUsernameChange} />
              {errors.username && <span className='validation-error'>{errors.username}</span>}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangeProfileForm;
