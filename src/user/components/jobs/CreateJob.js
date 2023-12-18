import { useState } from "react";
import Select from "react-select";

const CreateJob = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [jobType, setJobType] = useState("");
    const [subHeading, setSubHeading] = useState('');
    const [location, setLocation] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const [previewSelectedFile, setPreviewSelectedFile] = useState('');
    const [description, setDescription] = useState('');
    const [isActive, setIsActive] = useState('active');


    const jobTypeOption = [
        { value: "Professional Jobs", label: "Professional Jobs" },
        { value: "Domestic Jobs", label: "Domestic Jobs" },
        { value: "Blue-Collar Jobs", label: "Blue-Collar Jobs" },
        { value: "White-Collar Jobs", label: "White-Collar Jobs" },
        { value: "Skilled Trades", label: "Skilled Trades" },
        { value: "Service Industry Jobs", label: "Service Industry Jobs" },
        { value: "Freelance or Gig Jobs", label: "Freelance or Gig Jobs" },
        { value: "Government Jobs", label: "Government Jobs" },
        { value: "Academic Jobs", label: "Academic Jobs" },
        { value: "Technical Jobs", label: "Technical Jobs" },
    ];


    const handleJobTypeChange = (selectedOption) => {
        setJobType(selectedOption);
    }
    const handleAttachmentChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            // Set the selected file in state
            setSelectedFile(file);

            // Optionally, you can also generate a preview URL for the selected file
            const previewUrl = URL.createObjectURL(file);
            setPreviewSelectedFile(previewUrl);
        }
    }
    const handleStatusChange = (event) => {
        setIsActive(event.target.value);
    };

    return (
        <div id="auth-wrapper" className="pt-5 pb-4">

            <div className="col-10 card shadow mx-auto rounded">
                <div className="row card-header bg-primary text-light rounded">Create New Job</div>
                <div className="card-body">
                    <div className="form-group">
                        <label>Job Title:</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Enter Job Title"
                            defaultValue={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Job Type:</label>
                        <Select
                            className=""
                            options={jobTypeOption}
                            value={jobType}
                            onChange={handleJobTypeChange}
                            placeholder="Select Job Type..."
                        />
                    </div>

                    <div className="form-group">
                        <label>Other Subheading(optional):</label>
                        <input type="text"
                            className="form-control"
                            placeholder="i.e. company name or organization or other"
                            defaultValue={subHeading}
                            onChange={(e) => setSubHeading(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Location:</label>
                        <input type="text"
                            className="form-control"
                            placeholder="i.e. company name or organization or other"
                            defaultValue={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <div>
                                    <label>Attachment:</label>
                                    <input type="file"
                                        className="form-control"
                                        accept=".pdf"
                                        defaultValue={selectedFile}
                                        onChange={handleAttachmentChange}
                                    />
                                </div>
                                <div>
                                    <label>Description</label>
                                    <textarea type="text"
                                        className="form-control"
                                        placeholder="Enter Description"
                                        defaultValue={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                                <div className="form-check mt-2">
                                    <p className={`btn ${isActive === 'active' ? 'btn-success' : 'btn-danger'}`}>
                                        {isActive === 'active' ?
                                            (<span>On submission of this job a request will be send to admin to 'active' to show on job search portal.</span>
                                            ) : ((<span>On submission of this job a request will be send to admin to 'deactive' and not show on job search portal.
                                            </span>))}</p>
                                    <label className="form-control">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            value="active"
                                            checked={isActive === 'active'}
                                            onChange={handleStatusChange}
                                        />
                                        Active
                                    </label>

                                    <label className="form-control">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            value="inactive"
                                            checked={isActive === 'inactive'}
                                            onChange={handleStatusChange}
                                        />
                                        Inactive
                                    </label>


                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12 mt-2" style={{ height: '400px', border: '1px solid #ccc' }}>
                                {selectedFile && selectedFile.type === 'application/pdf' && (
                                    <div >
                                        <embed src={previewSelectedFile} type="application/pdf" width="100%" height="400px" />
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
}
export default CreateJob;