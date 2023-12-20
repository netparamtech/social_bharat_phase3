import { useState } from "react";
import Select from "react-select";
import React from 'react';
import dayjs from 'dayjs';
import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

const CreateJob = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [jobSector, setJobSector] = useState('');
    const [jobType, setJobType] = useState("");
    const [subHeading, setSubHeading] = useState('');
    const [location, setLocation] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const [previewSelectedFile, setPreviewSelectedFile] = useState('');
    const [logo, setLogo] = useState("");
    const [logoPreview, setLogoPreview] = useState("");
    const [description, setDescription] = useState('');
    const [isActive, setIsActive] = useState('active');
    const [isApplyForm, setIsApplyForm] = useState('false');


    const jobTypeOption = [
        { value: "Part Time", label: "Part Time" },
        { value: "Full Time", label: "Full Time" },
        { value: "Freelance", label: "Freelance" },
    ];

    const jobSectorOption = [
        { value: "Private Jobs", label: "Private Jobs" },
        { value: "Government Jobs", label: "Government Jobs" },
        { value: "Other", label: "Other" },
    ];


    const handleJobTypeChange = (selectedOption) => {
        setJobType(selectedOption);
    }
    const handleJobSectorChange = (selectedOption) => {
        setJobSector(selectedOption);
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
    const handleLogoChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            // Set the selected file in state
            setLogo(file);

            // Optionally, you can also generate a preview URL for the selected file
            const previewUrl = URL.createObjectURL(file);
            setLogoPreview(previewUrl);
        }
    }
    const handleActiveChange = (event) => {
        setIsActive(event.target.value);
    };
    const handleApplyFormChange = (event) => {
        setIsApplyForm(event.target.value);
    }

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
                        <label>Job Sector:</label>
                        <Select
                            className=""
                            options={jobSectorOption}
                            value={jobSector}
                            onChange={handleJobSectorChange}
                            placeholder="Select Job Type..."
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
                                    <label>Logo Image(Optional):</label>
                                    <input type="file"
                                        className="form-control"
                                        accept=".jpg,.jpeg,.png"
                                        defaultValue={logo}
                                        onChange={handleLogoChange}
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
                                            onChange={handleActiveChange}
                                        />
                                        Active
                                    </label>

                                    <label className="form-control">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            value="inactive"
                                            checked={isActive === 'inactive'}
                                            onChange={handleActiveChange}
                                        />
                                        Inactive
                                    </label>


                                </div>

                                <div className="form-check mt-2">
                                    <p>Need a apply form to Apply ?</p>
                                    <label className="form-control">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            value="true"
                                            checked={isApplyForm === 'true'}
                                            onChange={handleApplyFormChange}
                                        />
                                        Yes
                                    </label>

                                    <label className="form-control">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            value="false"
                                            checked={isApplyForm === 'false'}
                                            onChange={handleApplyFormChange}
                                        />
                                        No
                                    </label>
                                </div>
                                <div className="form-check mt-2">
                                    <label className="row bg-info fs-5 m-2 rounded">
                                        <Space direction="vertical" size={12} className="mt-2">
                                            <div className="d-flex">
                                                <DatePicker className="col-8" size={12} placeholder="Start Date" />
                                                <p className="col-4 fs-6 text-light">Hello</p>
                                            </div>
                                            <div className="d-flex">
                                                <DatePicker className="col-8" size={12} placeholder="Start Date" />
                                                <p className="col-4 fs-6 text-light">Hello</p>
                                            </div>
                                        </Space>
                                        <p>Please Select Job Start And End Date</p>
                                    </label>
                                </div>

                                <div className="col-3 mx-auto mt-3 submit-btn">
                                    <button type="submit" className="btn btn-success border-danger" >submit</button>
                                </div>

                            </div>
                            <div className="col-md-3 col-sm-12 mt-2" style={{ height: '600px', border: '1px solid #ccc' }}>
                                {selectedFile && selectedFile.type === 'application/pdf' && (
                                    <div >
                                        <embed src={previewSelectedFile} type="application/pdf" width="100%" height="400px" />

                                    </div>
                                )}

                            </div>
                            <div className="col-md-3 col-sm-12 mt-2" style={{ height: '600px', border: '1px solid #ccc' }}>
                                {logo && (
                                    <div >
                                        <img src={logoPreview} width={250} height={600} />

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