import React, { useEffect, useRef, useState } from "react";
import { uploadActivity, uploadMultipleImages } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoader } from "../../actions/loaderAction";
import { toast } from "react-toastify";

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
        console.log(combinedUrls)
        setImagePreview(combinedUrls);

        const formData = new FormData();

        // Append each file to the FormData
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('images', selectedFiles[i]);
        }

        try {
            const response = await uploadMultipleImages(formData); // Make an API call to get temporary URL
            if (response.status === 200) {
                const combineTempUrls = [...response.data.data.files];
                setImageTempUrl(combineTempUrls);
                setServerError('');
            }
        } catch (error) {
            // Handle error
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data.errors);
            }

            //Unauthorized
            else if (error.response && error.response.status === 401) {
                navigate('/login');
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
                    toast.success("Uploaded Activity Successfully");
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
            toast.error("Nothing Is Uploaded");
        }
    };

    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    return (
        <>
            <div id="searchPeople-section"
                style={{
                    backgroundImage: `url(${defaultImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
               
                <div className="container mt-5" style={{ maxHeight: "600px", overflowY: "auto" }}>

                    <div className="row">
                        {imagePreview &&
                            imagePreview.map((item, idx) => (
                                <div className="col-md-4 col-sm-6 col-12" key={idx}>
                                    <div className="card mb-3">
                                        <img
                                            src={item}
                                            alt={`Photos ${idx + 1}`}
                                            className="card-img-top"
                                            style={{ height: "200px", width: "100%", objectFit: "cover" }}
                                        />
                                        <div className="card-body">
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() => handleDeleteImage(idx)}
                                            >
                                                <i className="fas fa-trash"></i> Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
                <div id="auth-wrapper" className="form-activity content-wrapper pt-4 mb-4">

                    <div className="d-flex justify-content-between">
                        <p className="fs-2 fw-2 text-light m-3">Activity</p>
                        <button className="btn bg-darkskyblue btn-success hover-pointer btn-post-activity" onClick={() => navigate('/users/activities')}>View All Activities</button>
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

                                    {
                                        imagePreview.length > 0 ? (
                                            <p> <img
                                                src={imagePreview[imagePreview.length - 1]}
                                                className="img-set"
                                                alt=""
                                            /></p>
                                        ) : (
                                            <img
                                                src={defaultImage}
                                                className="img-set"
                                                alt=""
                                            />
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-11 mx-auto">
                            <textarea
                                className="text-area form-control mt-2"
                                placeholder="Enter Description..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                            {errors.description && (
                                <span className="error">{errors.description}</span>
                            )}
                            <div className="mx-auto">
                                <button
                                    className="text-area btn btn-primary mt-3 mx-auto"
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Activity;
