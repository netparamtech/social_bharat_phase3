import React, { useEffect, useRef, useState } from "react";
import {
  uploadActivity,
  uploadMultipleImages,
} from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoader } from "../../actions/loaderAction";
import { toast } from "react-toastify";
import { errorOptions, successOptions } from "../../../toastOption";

const Activity = () => {
  const imageInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState([]);
  const [activityPhotos, setActivityPhotos] = useState([]);
  const [imageTempUrl, setImageTempUrl] = useState([]);
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState("");
  const [defaultImage] = useState(
    "https://images.unsplash.com/photo-1477586957327-847a0f3f4fe3?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8amFpcHVyfGVufDB8fDB8fHww"
  );
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleImageClick = () => {
    imageInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const selectedFiles = e.target.files;
    setActivityPhotos(selectedFiles); // Set the selected files

    const totalFiles = selectedFiles.length;
    if (totalFiles > 5) {
      alert("Total files (including existing ones) cannot exceed 5.");
      e.target.value = null; // Clear the input field
      return;
    }

    const previewUrls = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const previewUrl = URL.createObjectURL(file);
      previewUrls.push(previewUrl);
    }

    const combinedUrls = [...previewUrls];
    console.log(combinedUrls);
    setImagePreview(combinedUrls);

    const formData = new FormData();

    // Append each file to the FormData
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("images", selectedFiles[i]);
    }

    try {
      const response = await uploadMultipleImages(formData); // Make an API call to get temporary URL
      if (response.status === 200) {
        const combineTempUrls = [...response.data.data.files];
        setImageTempUrl(combineTempUrls);
        setServerError("");
      }
    } catch (error) {
      // Handle error
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
      }

      //Unauthorized
      else if (error.response && error.response.status === 401) {
        navigate("/login");
      }
      //Internal Server Error
      else if (error.response && error.response.status === 500) {
        setServerError("Oops! Something went wrong on our server.");
      }
    }
  };

  const handleDeleteImage = (indexToDelete) => {
    // Create copies of the current arrays
    const updatedActivityPreview = [...imagePreview];
    const updatedActivityTempUrl = [...imageTempUrl];

    // Remove the image at the specified index from both arrays
    updatedActivityPreview.splice(indexToDelete, 1);
    updatedActivityTempUrl.splice(indexToDelete, 1);

    // Update the state variables with the updated arrays
    setImagePreview(updatedActivityPreview);
    setImageTempUrl(updatedActivityTempUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      photo: imageTempUrl,
      description,
    };

    if (imageTempUrl.length > 0 || description) {
      dispatch(setLoader(true));
      try {
        const response = await uploadActivity(data);

        if (response && response.status === 201) {
          setErrors("");
          setServerError("");
          toast.success("Uploaded Activity Successfully",successOptions);
          setDescription("");
          setImagePreview([]);
          setImageTempUrl([]);
          window.scroll(0, 0);
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setErrors(error.response.data.errors);
        } else if (error.response && error.response.status === 401) {
          navigate("/login");
        } else if (error.response && error.response.status === 500) {
          setServerError("Oops! Something went wrong on our server.");
        }
      } finally {
        dispatch(setLoader(false));
      }
    } else {
      toast.error("Nothing Is Uploaded",errorOptions);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <div
        id="activity-custom"
      >
        <div className="container">
          <div className="row">
          {imagePreview.length > 0 ? ( <div className="col-4  mb-5">
          <div
            className="card"
            style={{height: "375px" , maxHeight: "700px", overflowY:"scroll" }}
          >
            <div className="card-body">
              <div className="row">
                {imagePreview &&
                  imagePreview.map((item, idx) => (
                    <div className="col-md-4 col-sm-6 col-12" key={idx}>
                      <div className="card mb-3"
                      style={{height: "130px" }}
                      >
                      <div>
                        <img
                          src={item}
                          alt={`Photos ${idx + 1}`}
                          className="card-img-top"
                          style={{objectFit:"contain", height: "95px" }}
                        />
                        </div>
                        <div className="mx-auto">
                          <button
                            type="button"
                            className="btn"
                            onClick={() => handleDeleteImage(idx)}
                          >
                            <i className="text-danger fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>) : ""}
           
            <div className="col-8 mx-auto">
              <div
                id=""
                className="card  content-wrapper pt-4 mb-4"
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-3">
                    <p className="fs-4 fw-2 text-success m-3">Activity</p>
                    <button
                      className=" btn-md btn btn-success hover-pointer btn-post-activity"
                      onClick={() => navigate("/users/activities")}
                    >
                      View All Activities
                    </button>
                  </div>
                  <div className="row">
                    <div className="col-sm-4 col-11 mx-auto">
                      <div className="">
                        <div className="img-container card card-block-md overflow-hidden">
                          <input
                            type="file"
                            ref={imageInputRef}
                            style={{ display: "none" }}
                            className="form-control"
                            accept=".png, .jpg, .jpeg"
                            id="businessPhoto"
                            defaultValue={activityPhotos}
                            onChange={handleImageChange}
                            multiple
                          />
                          <div className="text-profilepic hover-pointer hover-pointer-green">
                            <i
                              className="fas fa-edit fs-6"
                              onClick={handleImageClick}
                            ></i>
                          </div>

                          {imagePreview.length > 0 ? (
                        
                              
                              <img
                                src={imagePreview[imagePreview.length - 1]}
                                className="img-thumbnail img-fluid"
                                alt=""
                                // style={{objectFit:"cover", height: "95px", width:"200px" }}
                              />
                        
                          ) : (
                            <img
                              src={defaultImage}
                              className="img-thumbnail img-fluid"
                              alt=""
                              
                                // style={{objectFit:"cover", height: "95px", width:"200px" }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6 col-11 mx-auto">
                      <textarea
                        className="text-area form-control h-100 mt-2 fs-5"
                        placeholder="Enter Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                      {errors.description && (
                        <span className="error">{errors.description}</span>
                      )}
                    </div>
                    <div className="mx-auto">
                      <button
                        className="btn-md btn w-100 btn-primary mt-4 "
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Activity;
