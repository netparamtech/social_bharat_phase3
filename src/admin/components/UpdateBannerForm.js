import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const UpdateBannerForm = (props) => {
    const { item,
        changeIsEditableFlag } = props;

    const [bannerUrl, setBannerUrl] = useState("");
    const [section, setSection] = useState('');
    const [page, setPage] = useState('');
    const [featured, setFeatured] = useState('');
    const [status, setStatus] = useState('');
    const [isFeatured, setIsFeatured] = useState(false)

    const [errors, setErrors] = useState('');
    const [message, setMessage] = useState('');
    const [alertClass, setAlertClass] = useState('');

    const [bannerPreview, setBannerPreview] = useState("");

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleBannerImageChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        setBannerUrl(file);
        setBannerPreview(URL.createObjectURL(file));
    };

    const handleFeaturedChange = (e) => {
        setFeatured(e.target.checked ? 1 : 0);
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const formData = new FormData();
            formData.append('banner_url', bannerUrl);
            formData.append('section', section);
            formData.append('page', page);
            formData.append('featured', featured);
            formData.append('status', status);

            console.log(bannerUrl,section,page,featured,status)

           
            // Redirect to the admin dashboard or desired page
        } catch (error) {
            // Handle validation errors
           
        }
    };

    return (
        <div className="container-fluid" style={{ minHeight: '100vh' }}>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Update Banner</h1>
            </div>
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit} className="p-5 w-75">
                        {message && (
                            <div className={`alert ${alertClass}`}>
                                {alertClass === 'alert-success' ? (
                                    <i className="fas fa-check-circle"></i>
                                ) : (
                                    <i className="fas fa-exclamation-triangle"></i>
                                )}
                                {' ' + message}
                            </div>
                        )}


                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label htmlFor="bannerImage">Banner Image</label>

                                    <input
                                        type="file"
                                        className="form-control-file"
                                        id="bannerImage"
                                        onInput={handleBannerImageChange}
                                    />
                                    {errors.banner_url && (
                                        <span className="validation-error">{errors.banner_url}</span>
                                    )}
                                </div>
                            </div>
                            <div className="col-sm-6">
                                {bannerPreview && <img src={bannerPreview} alt="Banner" className="thumbnail-image" />}
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">Section</label>
                            <input
                                type="text"
                                className="form-control"
                                id="section"
                                defaultValue=""
                                onChange={(e) => setSection(e.target.value)}
                                placeholder="Enter Section"
                            />
                            {errors.section && <span className="validation-error">{errors.section}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">Page</label>
                            <input
                                type="text"
                                className="form-control"
                                id="page"
                                defaultValue=""
                                onChange={(e) => setPage(e.target.value)}
                                placeholder="Enter Section"
                            />
                            {errors.page && <span className="validation-error">{errors.page}</span>}
                        </div>

                        <div className="form-group">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="featured"
                                    name="featured"
                                    checked=""
                                    onChange={handleFeaturedChange}
                                />
                                <label className="form-check-label" htmlFor="featured">
                                    Featured
                                </label>
                            </div>
                            {errors.featured && <span className='validation-error'>{errors.featured}</span>}
                        </div>


                        <div className="form-group">
                            <label htmlFor="status">Status</label>
                            <select
                                className="form-control"
                                id="status"
                                defaultValue=""
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="">Select status</option>
                                <option value="Active" >
                                    Active
                                </option>
                                <option value="Inactive" >
                                    Inactive
                                </option>
                            </select>

                        </div>

                        <button type="submit" className="btn btn-primary">
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateBannerForm;