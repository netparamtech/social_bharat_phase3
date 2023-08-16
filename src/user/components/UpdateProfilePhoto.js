import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { updateBasicProfile, updateImage } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userAction";

const UpdateProfilePhoto = () => {

  const user = useSelector((state) => state.userAuth.user);

  const [name, setName] = useState(user&&user.name);
  const [gender, setGender] = useState(user&&user.gender);
  const [tempImageUrl, setTempImageUrl] = useState('');

  const [profileImage, setProfileImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const [errors, setErrors] = useState('');
  const [message, setMessage] = useState('');
  const [alertClass, setAlertClass] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  }


  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: 'image/png',
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setProfileImage(file);
      setPreviewImage(""); // Clear previous preview image
      setPreviewImage(URL.createObjectURL(file));
    },
  });


  const filesPreview = acceptedFiles.map((file) => (
    <img key={file.path} src={URL.createObjectURL(file)} alt={file.name} className="profile-image" />
  ));

  //api call to get temp_image_path
  const getTempImageUrl = async () => {
    const formData = new FormData();
    formData.append('image', profileImage);
    console.log(profileImage,"profile photo")
    try {
      const response = await updateImage(formData);

      if (response && response.status === 200) {
        setTempImageUrl(response.data.data.image);
        setErrors('');

      }
      // Redirect to the admin dashboard or desired page
    } catch (error) {
      //Handle validation errors
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);

      }

      // Unauthorized
      else if (error.response && error.response.status === 401) {
        navigate('/login')
      }

    };
  }

  //form submit handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: name,
      gender: gender,
      tmp_image_path: tempImageUrl,
    }

    try {

      const response = await updateBasicProfile(data);
      // Handle success response here
      if (response && response.status === 200) {
        setErrors('');
        setMessage(response.data.message);
        setAlertClass('alert-success');
        dispatch(login(response.data.data));
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);

      }
      // Redirect to the admin dashboard or desired page
    } catch (error) {
      //Handle validation errors
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
        setMessage(error.response.data.message);
        setAlertClass('alert-danger');
      }
      // Internal Server Error
      else if (error.response && error.response.status === 500) {
        setMessage(error.response.data.message);
        setAlertClass('alert-danger');
        setErrors('')
      }
      // Unauthorized
      else if (error.response && error.response.status === 401) {
        navigate('/login')
      }
      else if (error.response && error.response.status === 404) {
        setMessage(error.response.data.message);
        setAlertClass('alert-danger');
        setErrors('')

      }
    };
  };

  useEffect(() => {
    if (profileImage) {
      setPreviewImage(URL.createObjectURL(profileImage));
      getTempImageUrl();
    }
  }, [profileImage]);

  return (
    <div className="col-lg-12 col-md-8 mt-4 ">
      <div>
        <div className="card">
          <div className="card-body tab-content border-0">
            <div className="d-sm-flex align-items-center justify-content-between">
              <h1 className="h3 mb-0 text-gray-800 pt-3">Upload files</h1>
            </div>
            <div className="fullscreen-dropzone">
              <div {...getRootProps({ className: 'dropzone' })}>
                <div className="row">
                  <div className="col-lg-12">
                    <input {...getInputProps()} />
                    <h2><b>Drag or drop an image file here or click</b></h2>
                  </div>
                  <div className="uploadIcon col-lg-12">
                    <i className="bi bi-cloud-upload-fill"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <aside>
            <div>
              <h1 className="h5 mb-0 text-gray-800">{filesPreview.length > 0 ? "Preview" : ""}</h1>
            </div>
            <div>
              {filesPreview}
            </div>
          </aside>

          <div className="mx-auto mt-3">
            <form id="otpForm" onSubmit={handleFormSubmit}>
              {message && <div className={`alert ${alertClass}`}>
                {alertClass === 'alert-success' ? (<i className="fas fa-check-circle"></i>) : (<i className="fas fa-exclamation-triangle"></i>)}
                {" " + message}
              </div>
              }
              <input type="text" id="name" className="mb-3 form-control" name='name' placeholder="Enter your name" defaultValue={name} onChange={handleNameChange} />
              {errors.name && <span className="validation-error">{errors.name}</span>}
              <select
                className="form-control"
                id="gender"
                value={gender}
                onChange={handleGenderChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && <span className="validation-error">{errors.gender}</span>}

              <div className="mx-auto mt-3">

                <button className="btn btn-green w-100 mb-3">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfilePhoto;
