import React, { useEffect, useRef, useState } from "react";
import {
  findActivityWithId,
  updateSingleActivityById,
  uploadActivity,
  uploadMultipleImages,
} from "../../services/userService";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../actions/loaderAction";
import { toast } from "react-toastify";
import { errorOptions, successOptions } from "../../../toastOption";
import Select from 'react-select';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const UpdateActivity = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.userAuth.user);
  const imageInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState([]);
  const [isAndroidUsed, setIsAndroidUsed] = useState(false);
  const [activityPhotos, setActivityPhotos] = useState([]);
  const [imageTempUrl, setImageTempUrl] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState('');
  const [defaultImage] = useState(
    "https://images.unsplash.com/photo-1477586957327-847a0f3f4fe3?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8amFpcHVyfGVufDB8fDB8fHww"
  );
  const [description, setDescription] = useState("");
  const [activityDetails, setActivityDetails] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
  const handleImageClick = () => {
    imageInputRef.current.click();
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }
  const handleCategoryChange = (selectedOption) => {
    setCategory(selectedOption);
  }

  const handleImageChange = async (e) => {
    const selectedFiles = e.target.files;

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
    const formData = new FormData();

    // Append each file to the FormData
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("images", selectedFiles[i]);
    }

    try {
      const response = await uploadMultipleImages(formData); // Make an API call to get temporary URL
      if (response.status === 200) {
        setActivityPhotos(selectedFiles); // Set the selected files
        setImagePreview(combinedUrls);
        const combineTempUrls = [...response.data.data.files];
        setImageTempUrl(combineTempUrls);
        setServerError("");
        setMessage('');
      }
    } catch (error) {
      // Handle error
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
        setMessage(error.response.data.message);
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

  const fetchSingleActivity = async (activityId, userId) => {
    try {
      const response = await findActivityWithId(activityId, userId);
      if (response && response.status === 200) {
        console.log(response.data.data);
        setActivityDetails(response.data.data);
        setServerError("");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
      //Internal Server Error
      else if (error.response && error.response.status === 500) {
        setServerError("Oops! Something went wrong on our server.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const htmlContent = draftToHtml(rawContentState);

    const data = {
      photo: imageTempUrl,
      description: htmlContent,
      category: category ? category.label : '',
      title,
    };
    console.log(data);

    if (imageTempUrl.length > 0 || rawContentState.blocks[0].text ||title) {
      console.log("Hello");
      dispatch(setLoader(true));
      try {
        const response = await updateSingleActivityById(data, id, user.id);

        if (response && response.status === 201) {
          setErrors("");
          setServerError("");
          toast.success("Updated Activity Successfully", successOptions);
          navigate("/users/activities");
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
      toast.error("Nothing Is Uploaded", errorOptions);
    }
  };
  useEffect(() => {
    if (user && id) {
      fetchSingleActivity(id, user.id);
    }
  }, [user]);

  useEffect(() => {
    if (activityDetails) {
      setTitle(activityDetails.title);
      setCategory({ value: activityDetails.category, label: activityDetails.category });
      if (activityDetails.description) {
        const blocksFromHTML = convertFromHTML(activityDetails.description);
        const contentState = ContentState.createFromBlockArray(blocksFromHTML);
        const editorStateFromFetchedData = EditorState.createWithContent(contentState);
        setEditorState(editorStateFromFetchedData);

      }

      // Convert photo to array if it's not already an array
      if (activityDetails.photo) {
        console.log(activityDetails.photo, "hhh")
        if (Array.isArray(activityDetails.photo)) {
          setImagePreview(activityDetails.photo);
          setImageTempUrl(activityDetails.photo);
        } else {
          setImagePreview([activityDetails.photo]);
          setImageTempUrl([activityDetails.photo]);
        }
      } else {
        setImagePreview([]);
        setImageTempUrl([]);
      }
    }
  }, [activityDetails]);


  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsAndroidUsed(window.innerWidth < 1000); // Adjust the threshold based on your design considerations
    };

    // Listen for window resize events
    window.addEventListener("resize", handleResize);
    handleResize(); // Call initially to set the correct value

    // Cleanup the event listener when component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div
        id="activity-custom"
      >
        <div className="container">
          <div className="row">
            {imagePreview && imagePreview.length > 0 ? (<div className="col-4  mb-5">
              <div
                className="card"
                style={{ height: "375px", maxHeight: "700px", overflowY: "scroll" }}
              >
                <div className="card-body">
                  <div className="row">
                    {imagePreview && Array.isArray(imagePreview) &&
                      imagePreview.map((item, idx) => (
                        <div className="col-md-4 col-sm-6 col-12" key={idx}>
                          <div className="card mb-3"
                            style={{ height: "130px" }}
                          >
                            <div>
                              <img
                                src={item}
                                alt={`Photos ${idx + 1}`}
                                className="card-img-top"
                                style={{ objectFit: "contain", height: "95px" }}
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
            </div>) : ''}

            <div className={imagePreview && imagePreview.length > 0 ? 'col-8 mx-auto' : 'col-12 mx-auto'}>
              <div
                id=""
                className="card  content-wrapper pt-4 mb-4"
              >
                <div className="card-body">
                  {message && (
                    <span className="error">{message}</span>
                  )}

                  <p className="text-success m-3">Activity</p>
                  <div className="row mb-2" >
                    <div className="col-md-3 col-12 mx-auto ">
                      <button
                        className="btn bg-warning btn-success btn-sm small hover-pointer btn-post-activity"
                        onClick={() => navigate("/users/activities")}
                      >
                        View All Activities
                      </button>
                    </div>
                    <div className="col-md-6 col-12 mt-2" style={{zIndex:1000}}>
                      <Select placeholder="Select Category ...."
                        options={[
                          { value: 'Information Technology (IT)', label: 'Information Technology (IT)' },
                          { value: 'Sales', label: 'Sales' },
                          { value: 'Marketing', label: 'Marketing' },
                          { value: 'Manufacturing', label: 'Manufacturing' },
                          { value: 'Service', label: 'Service' },
                          { value: 'Finance', label: 'Finance' },
                          { value: 'Real Estate', label: 'Real Estate' },
                          { value: 'Healthcare', label: 'Healthcare' },
                          { value: 'Transportation and Logistics', label: 'Transportation and Logistics' },
                          { value: 'Hospitality', label: 'Hospitality' },
                          { value: 'Education', label: 'Education' },
                          { value: 'Nonprofit Organizations', label: 'Nonprofit Organizations' },
                          { value: 'Polity', label: 'Polity' },
                          { value: 'Other', label: 'Other' },
                          // Add other country options here
                        ]}
                        value={category}
                        onChange={handleCategoryChange}
                      />
                    </div>

                  </div>
                  <div className="row">
                    <div className="input-group input-group-sm mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm" >Title</span>
                      </div>
                      <input type="text" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" value={title} onChange={handleTitleChange} />
                      {errors && errors.title && (
                        <span className="error">{errors.title}</span>
                      )}
                    </div>
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
                      <Editor
                        editorState={editorState}
                        onEditorStateChange={onEditorStateChange}
                        wrapperClassName="wrapper-class"
                        editorClassName="editor-class custom-editor-height editor-border p-2"
                        toolbarClassName="toolbar-class toolbar-border"
                      />
                      {errors && errors.description && (
                        <span className="error">{errors.description}</span>
                      )}
                    </div>
                    <div className="mx-auto">
                      <button
                        className="btn-md btn w-100 btn-primary mt-4 "
                        onClick={handleSubmit}
                        disabled={message}
                      >
                        Update
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

export default UpdateActivity;
