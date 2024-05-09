import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { createCms, createCommunity, uploadImage, uploadMultipleImages } from "../../services/AdminService";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import AdminLayout from "../../layouts/AdminLayout";
import { useDispatch } from "react-redux";
import { setLoader } from "../../actions/loaderAction";
import { toast } from "react-toastify";
import { successOptions } from "../../../toastOption";


const CreateCms = () => {
    const [page, setPage] = useState('');
    const [section, setSection] = useState('');
    const [status, setStatus] = useState("");
    const [cmsImageTempUrl, setCmsImageTempUrl] = useState([]);
    const [cmsPhotos, setCmsPhotos] = useState([]);
    const [sectionArchive, setSectionArchive] = useState('');
    const [icon, setIcon] = useState('');
    const [subheading, setSubheading] = useState('');
    const [photosPreview, setPhotosPreview] = useState([]);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const [errors, setErrors] = useState("");
    const [message, setMessage] = useState("");
    const [messagePhotos, setMessagePhotos] = useState('');
    const [serverError, setServerError] = useState("");
    const [alertClass, setAlertClass] = useState("");

    const ImageRef = useRef(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    };

    const handleSave = () => {
        const contentState = editorState.getCurrentContent();
        const rawContentState = convertToRaw(contentState);
        const htmlContent = draftToHtml(rawContentState);
        setSectionArchive(htmlContent);
    };


    const handlePhotoChange = async (e) => {
        const selectedFiles = e.target.files;
        setCmsPhotos(selectedFiles); // Set the selected files

        const totalFiles = cmsImageTempUrl.length + selectedFiles.length;
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

        const combinedUrls = [...previewUrls, ...photosPreview];
        

        const formData = new FormData();

        // Append each file to the FormData
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append("images", selectedFiles[i]);
        }

        try {
            dispatch(setLoader(true));
            const response = await uploadMultipleImages(formData); // Make an API call to get temporary URL
            if (response.status === 200) {
                const combineTempUrls = [
                    ...cmsImageTempUrl,
                    ...response.data.data.files,
                ];
                setCmsImageTempUrl(combineTempUrls);
                setPhotosPreview(combinedUrls);
                setServerError('');
                setMessagePhotos('');
                dispatch(setLoader(false));
            }
        } catch (error) {
            dispatch(setLoader(false));
            // Handle error
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data.errors);
                setMessagePhotos(error.response.data.message);
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const contentState = editorState.getCurrentContent();
        const rawContentState = convertToRaw(contentState);
        const htmlContent = draftToHtml(rawContentState);
        try {
            const cmsData = {
                page,
                status,
                photos: cmsImageTempUrl,
                icons: icon,
                section:section,
                section_subheading: subheading,
                section_archives: htmlContent,
            };
            const response = await createCms(cmsData);

            if (response && response.status === 201) {
                setErrors("");
                setServerError('');
                toast.success(response.data.message,successOptions);
                setPage('');
                setSection('');
                setSubheading('');
                setEditorState(EditorState.createEmpty());
                setStatus('');
                setIcon('');
                setPhotosPreview(null);

                // Reset file inputs
                ImageRef.current.value = null;

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

            } else if (error.response && error.response.status === 403) {
                setServerError(error.response.data.message);

            } else if (error.response && error.response.status === 500) {
                let errorMessage = error.response.data.message;
                navigate('/server/error', { state: { errorMessage } });
            }
        }
    };
    const handleDeleteImage = (indexToDelete) => {
        // Create copies of the current arrays
        const updatedPreview = [...photosPreview];
        const updatedTempUrl = [...cmsImageTempUrl];

        // Remove the image at the specified index from both arrays
        updatedPreview.splice(indexToDelete, 1);
        updatedTempUrl.splice(indexToDelete, 1);

        // Update the state variables with the updated arrays
        setPhotosPreview(updatedPreview);
        setCmsImageTempUrl(updatedTempUrl);
    };


    return (
        <AdminLayout>
            <div className="container-fluid" id="font-Resize">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Create CMS</h1>
                    {serverError && <span className='error'>{serverError}</span>}
                    <a
                        href=""
                        className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/admin/cms')
                        }}
                    >
                        View All CMS
                    </a>
                </div>
                <div className="card">
                    <div className="card-body">
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
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="fw-bold">Page</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="page"
                                            value={page}
                                            onChange={(e) => setPage(e.target.value)}
                                            placeholder="Select Page .."
                                        />
                                        {errors.page && <span className="error">{errors.page}</span>}
                                    </div>

                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="fw-bold">Section</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="section"
                                            value={section}
                                            onChange={(e) => setSection(e.target.value)}
                                            placeholder="Select Section.."
                                        />
                                        {errors.section && <span className="error">{errors.section}</span>}
                                    </div>

                                </div>

                            </div>
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <div className="form-group">
                                        <label className="fw-bold">Sub-Section</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="subheading"
                                            value={subheading}
                                            onChange={(e) => setSubheading(e.target.value)}
                                            placeholder="Select Section.."
                                        />
                                        {errors.section_subheading && <span className="error">{errors.section_subheading}</span>}
                                    </div>

                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="form-group">
                                        <label className="fw-bold">Icon</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="icon"
                                            value={icon}
                                            onChange={(e) => setIcon(e.target.value)}
                                            placeholder="Select Section.."
                                        />
                                        {errors.icons && <span className="error">{errors.icons}</span>}
                                    </div>

                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="fw-bold">Images</label>
                                        <div className="input-group mb-3">
                                            <div className="custom-file">
                                                <input
                                                    type="file"
                                                    className="custom-file-input community-images"
                                                    id="cmsImage"
                                                    ref={ImageRef}
                                                    accept="image/jpeg,image/jpg,image/png"
                                                    multiple
                                                    onChange={handlePhotoChange}
                                                />
                                                <label className="custom-file-label" htmlFor="inputGroupFile01">
                                                    Choose file
                                                </label>
                                            </div>
                                           
                                        </div>

                                        {errors.thumbnail_image && (
                                            <span className="error">{errors.thumbnail_image}</span>
                                        )}

                                    </div>


                                </div>
                                <div className="form-group col-md-6">
                                    <label className="fw-bold">Status</label>
                                    <select
                                        className="form-control"
                                        id="status"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="">Select status</option>
                                        <option value='1'>Active</option>
                                        <option value='0'>Inactive</option>
                                    </select>
                                    {errors.status && (
                                        <span className="error">{errors.status}</span>
                                    )}
                                </div>
                                <div className="row">
                                                {photosPreview &&
                                                    photosPreview.map((item, idx) => (
                                                        <div className="col-2 m-2" key={idx}>
                                                            {
                                                                item.trim() !== '' && (
                                                                    <>
                                                                        <img src={item} alt={`Photos ${idx + 1}`} width={200} height={100} />
                                                                        <button
                                                                            type="button"
                                                                            className="btn"
                                                                            onClick={() => handleDeleteImage(idx)}
                                                                        >
                                                                            <i className="fas fa-trash"></i>
                                                                        </button>
                                                                    </>
                                                                )
                                                            }
                                                        </div>
                                                    ))}
                                            </div>
                            </div>
                           
                            <div className="row ps-3 mb-4">
                                <div className="col-md-12">
                                    <label className="fw-bold">Section Archieve</label>
                                </div>
                                <div className="col-md-12">

                                    <Editor
                                        editorState={editorState}
                                        onEditorStateChange={onEditorStateChange}
                                        wrapperClassName="wrapper-class"
                                        editorClassName="editor-class custom-editor-height editor-border p-2"
                                        toolbarClassName="toolbar-class toolbar-border"
                                    />
                                </div>

                            </div>

                            <button type="submit" className="btn btn-primary w-25 ">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div >
        </AdminLayout >
    );
};

export default CreateCms