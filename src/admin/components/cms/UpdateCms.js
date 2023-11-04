import { Collapse, Divider } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState, convertFromHTML } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { updateCMS, uploadMultipleImages } from "../../services/AdminService";
import { useDispatch } from "react-redux";
import { setLoader } from "../../actions/loaderAction";

const UpdateCms = (props) => {
    const { homeCms } = props;
    const [initialEditorValue, setInitialEditorValue] = useState([EditorState.createEmpty()])
    const [editorStates, setEditorStates] = useState(initialEditorValue);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const [proposalPhoto, setProposalPhoto] = useState([]);
    const [tempProposalPhotoUrl, setTempProposalPhotoUrl] = useState([]);
    const [proposalPreview, setProposalPreview] = useState([]);

    const [page, setPage] = useState("");
    const [about, setAbout] = useState({
        title: "",
        subtitle: "",
        content: "",
        images: [],
    });
    const [serviceTitle, setServiceTitle] = useState("");
    const [services, setServices] = useState({
        section_title: "",
        items: [],
    });

    const [errors, setErrors] = useState("");
    const [message, setMessage] = useState("");
    const [alertClass, setAlertClass] = useState("");

    const [items, setItems] = useState([]);

    const [numRows, setNumRows] = useState(1);

    const dispatch = useDispatch();


    const handleAboutChange = (e) => {
        const { name, value } = e.target;
        setAbout({ ...about, [name]: value });
    };

    const handleProposalPhotoChange = async (e) => {
        const selectedFiles = e.target.files;
        setProposalPhoto(selectedFiles); // Set the selected files

        const totalFiles = tempProposalPhotoUrl.length + selectedFiles.length;
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

        const combinedUrls = [...previewUrls, ...tempProposalPhotoUrl];
        setProposalPreview(combinedUrls);

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
                    ...tempProposalPhotoUrl,
                    ...response.data.data.files,
                ];
                setTempProposalPhotoUrl(combineTempUrls);
                dispatch(setLoader(false));
            }
        } catch (error) {
            dispatch(setLoader(false));
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
                let errorMessage = error.response.data.message;
                navigate('/server/error', { state: { errorMessage } });
            }
        }
    };

    const addNewRow = () => {
        setNumRows(numRows + 1);

        // Clone the existing items array
        const updatedItems = [...services.items];

        // Create a new item object for the new row
        const newItem = {
            title: "",
            content: "",
            icon: "",
        };

        // Insert the new item after the current index
        updatedItems.splice(numRows + 1, 0, newItem);

        // Update the items array
        setServices({
            ...services,
            items: updatedItems,
        });
    };



    const navigate = useNavigate();

    const onEditorStateChanges = (editorState, index) => {
        const updatedEditorStates = [...editorStates];
        updatedEditorStates[index] = editorState;
        setEditorStates(updatedEditorStates);
    };

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    };

    const updateRowData = (index, key, value) => {
        const updatedRowData = [...items];
        if (!updatedRowData[index]) {
            updatedRowData[index] = {};
        }
        updatedRowData[index][key] = value;
        setItems(updatedRowData);
    };

    const htmlFormet = (editorState) => {

        const contentState = editorState.getCurrentContent();
        const rawContentState = convertToRaw(contentState);
        const htmlContent = draftToHtml(rawContentState);
        return htmlContent;
    };

    const handleSubmit = async () => {
        console.log(items, "items")
        try {
            const itemsWithEditorState = items.map((row, index) => ({
                ...row,

                content: htmlFormet(editorStates[index]), // Include the editor state in the item
            }));

            console.log(itemsWithEditorState, "itemsWithEditorState")

            about.content = htmlFormet(editorState);
            about.images = tempProposalPhotoUrl;
            services.section_title = serviceTitle ? serviceTitle : services.section_title
            services.items = itemsWithEditorState.length === 0 ? services.items : itemsWithEditorState;

            const data = {
                page: "Home",
                about,
                services,
            };

            const response = await updateCMS(data);
            if (response && response.status === 200) {
                setErrors("");
                setMessage(response.data.message);
                setAlertClass("alert-success");
                window.scrollTo(0, 0);
                setTimeout(() => {
                    setMessage("");
                }, 2000);
            }

            // Update the items state with the new data
            setItems(itemsWithEditorState);

            console.log(itemsWithEditorState, about); // Print the data including editor state to the console
        } catch (error) {
            // Handle validation errors
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data.errors);
                setMessage("");
                setAlertClass("");
            }
            // Unauthorized
            else if (error.response && error.response.status === 401) {
                navigate("/admin");
            } else if (error.response && error.response.status === 500) {
                let errorMessage = error.response.data.message;
                navigate("/server/error", { state: { errorMessage } });
            }
        }
    };

    const handleDeleteImage = (indexToDelete) => {
        // Create copies of the current arrays
        const updatedProposalPreview = [...proposalPreview];
        const updatedProposalTempUrl = [...tempProposalPhotoUrl];

        // Remove the image at the specified index from both arrays
        updatedProposalPreview.splice(indexToDelete, 1);
        updatedProposalTempUrl.splice(indexToDelete, 1);

        // Update the state variables with the updated arrays
        setProposalPreview(updatedProposalPreview);
        setTempProposalPhotoUrl(updatedProposalTempUrl);
    };


    useEffect(() => {
        console.log(homeCms.about)
        if (homeCms && homeCms.about) {
            setAbout(homeCms.about);
            if (homeCms.about.images) {
                setTempProposalPhotoUrl(homeCms.about.images);
                setProposalPreview(homeCms.about.images);
            }
        }
        if (homeCms && homeCms.about &&
            homeCms.about.content && homeCms.about.content) {
            const blocksFromHTML = convertFromHTML(homeCms.about.content);
            const contentState = ContentState.createFromBlockArray(blocksFromHTML);
            const editorStateFromFetchedData = EditorState.createWithContent(contentState);
            setEditorState(editorStateFromFetchedData);
        }


        setServices(homeCms && homeCms.services && homeCms.services);
    }, [homeCms]);

    useEffect(() => {
        if (services && services.items) {
            const initialEditorStates = services.items.map((item) => {
                return EditorState.createWithContent(
                    ContentState.createFromBlockArray(
                        convertFromHTML(item && item.content)
                    )
                );
            });
            setEditorStates(initialEditorStates);
        }
    }, [services]);

    const { Panel } = Collapse;

    return (
        <>
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
            <Collapse idaccordion className="mb-3" id="font-Resize">
                <Panel
                    header={<label className="text-primary">What Social Bharat Do</label>}
                >
                    <div className="row">
                        <form>
                            <div className="col-md-12 p-3">
                                <div className="row  mb-3">
                                    <div className="col-md-12 ">
                                        <label className="fw-bold">Title</label>
                                    </div>

                                    <div className="col-md-12">
                                        <input
                                            type="text"
                                            name="title"
                                            className="form-control"
                                            defaultValue={about && about.title}
                                            onChange={handleAboutChange}
                                        />
                                    </div>
                                </div>
                                <div className="row  mb-3">
                                    <div className="col-md-12">
                                        <label className="fw-bold">Sub Title</label>
                                    </div>

                                    <div className="col-md-12">
                                        <input
                                            type="text"
                                            name="subtitle"
                                            className="form-control"
                                            defaultValue={about && about.subtitle}
                                            onChange={handleAboutChange}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-12">
                                        <label className="fw-bold">Section Content</label>
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
                                <div className="row  mb-2">
                                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                                        <label className="form-label">Section Image(s) </label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            accept=".png, .jpg, .jpeg"
                                            id="proposalPhoto"
                                            defaultValue={proposalPhoto}
                                            onChange={handleProposalPhotoChange}
                                            multiple
                                        />
                                        {errors.images && (
                                            <span className="error">{errors.images}</span>
                                        )}
                                        <div className="proposal-Photo d-flex">
                                            {proposalPreview &&
                                                proposalPreview.map((item, idx) => (
                                                    <div className="m-2" key={idx}>
                                                        <img src={item} alt={`Photos ${idx + 1}`} />
                                                        <button
                                                            type="button"
                                                            className="btn"
                                                            onClick={() => handleDeleteImage(idx)}
                                                        >
                                                            <i className="fas fa-trash"></i>
                                                        </button>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ps-3">
                                <button
                                    type="button"
                                    className="btn btn-primary w-25"
                                    onClick={handleSubmit}
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </Panel>
            </Collapse>

            <Collapse idaccordion className="mb-3" id="font-Resize">
                <Panel header={<label className="text-primary">Service</label>}>
                    <div>
                        <div className="row">
                            <div className="col-md-11">
                                <label className="fw-bold">Section Title</label>
                            </div>
                            <div className="col-md-1 mb-2">
                                <button type="button" className="btn btn-outline-primary " title="Add More " onClick={() => addNewRow()}>
                                    <i class="fa fa-plus" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div className="col-md-12">
                                <input
                                    type="text"
                                    className="form-control"
                                    defaultValue={services && services.section_title}
                                    onChange={(e) => setServiceTitle(e.target.value)}
                                />
                            </div>
                        </div>
                        {
                            services && services.items && services.items.map((data, index) => (

                                <div className="row p-3" key={index}>
                                    <form>
                                        <div className="col-md-12">
                                            <div className="row  mb-3">
                                                <div className="col-md-12">
                                                    <label className="fw-bold">Title</label>
                                                </div>
                                                <div className="col-md-12">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        defaultValue={data && data.title && data.title}
                                                        onChange={(e) =>
                                                            updateRowData(index, "title", e.target.value)
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            <div className="row  mb-3">
                                                <div className="col-md-12">
                                                    <label className="fw-bold">Section Content</label>
                                                </div>
                                                <div className="col-md-12">
                                                    <Editor
                                                        editorState={editorStates[index]}
                                                        onEditorStateChange={(editorState) =>
                                                            onEditorStateChanges(editorState, index)
                                                        }
                                                        wrapperClassName="wrapper-class"
                                                        editorClassName="editor-class custom-editor-height editor-border p-2"
                                                        toolbarClassName="toolbar-class toolbar-border"
                                                    />
                                                </div>
                                            </div>
                                            <div className="row  mb-3">
                                                <div className="col-md-12">
                                                    <label className="fw-bold">Section Icon</label>
                                                </div>
                                                <div className="col-md-12 form-group">
                                                    <a href="https://fontawesome.com/icons" target="_blank"> Click here to choose icon</a>
                                                </div>
                                                <div className="col-md-12 form-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Paste selected icon here"
                                                        defaultValue={data && data.icon && data.icon}
                                                        onChange={(e) =>
                                                            updateRowData(index, "icon", e.target.value)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="ps-3">
                                            <button
                                                type="button"
                                                className="btn btn-primary w-25"
                                                onClick={handleSubmit}
                                            >
                                                Save
                                            </button>
                                        </div>

                                        <Divider />
                                    </form>
                                </div>


                            ))
                        }

                    </div>
                </Panel>
            </Collapse>
        </>
    );
};

export default UpdateCms;
