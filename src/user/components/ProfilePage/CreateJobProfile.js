import React, { useEffect, useState } from 'react';
import { createJobDetail } from '../../services/userService';
import { useNavigate, useParams } from 'react-router-dom';
import { setLoader } from '../../actions/loaderAction';
import { useDispatch } from 'react-redux';
import Select from "react-select";

const CreateJobProfile = () => {

  const [companyName, setCompanyName] = useState("");
  const [designation, setDesignation] = useState("");
  const [jobType, setJobType] = useState("");
  const [selectedExperience, setSelectedExperience] = useState('');
  const experienceOptions = [
    { value: "0-6 months", label: "0-6 months" },
    { value: "1 year", label: "1 year" },
    { value: "2 years", label: "2 years" },
    { value: "3 years", label: "3 years" },
    { value: "4 years", label: "4 years" },
    { value: "5 years", label: "5 years" },
    { value: "6 years", label: "6 years" },
    { value: "7 years", label: "7 years" },
    { value: "8 years", label: "8 years" },
    { value: "9 years", label: "9 years" },
    { value: "10 years", label: "10 years" },
    // Add more options as needed
  ];
  const [errors, setErrors] = useState("");
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleExperienceChange = (option) => {
    setSelectedExperience(option);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoader(true));

    // Map the selected job type back to "PART_TYPE" or "FULL_TYPE"
    const mappedJobType =
      jobType === "PART TIME"
        ? "PART_TIME"
        : jobType === "FULL TIME"
          ? "FULL_TIME"
          : "";

    const jobProfileData = {
      company_name: companyName,
      designation,
      job_type: mappedJobType,
      experience: selectedExperience && selectedExperience.label,
    };

    try {
      const response = await createJobDetail(jobProfileData);
      if (response && response.status === 200) {
        setErrors('');
        setServerError('');
        navigate('/profile');
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
        navigate('/login');
      } else if (error.response && error.response.status === 500) {
        setServerError("Oops! Something went wrong on our server.");
      }
    }
  };

  return (
    <div id="auth-wrapper" className="pt-5 pb-5">
      <div className="container">
        <div className={`card shadow ${errors ? 'border-danger' : ''}`}>
          <div className="card-body">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12 p-4">
                {serverError && <span className='error'>{serverError}</span>}
                <div className="card-title">
                  <h3 className="mb-3">Job Info</h3>
                </div>
                <form className="w-100 w-lg-75" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Company Name{" "}<span className="text-danger">*</span></label>
                      <input
                        type="text"
                        name="companyName"
                        id="companyName"
                        placeholder="Enter company name"
                        className="form-control"
                        defaultValue={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                      {errors.company_name && (
                        <span className="error">{errors.company_name}</span>
                      )}
                    </div>
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Designation{" "}<span className="text-danger">*</span></label>
                      <input
                        type="text"
                        name="designation"
                        id="designation"
                        placeholder="Enter designation"
                        className="form-control"
                        defaultValue={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                      />
                      {errors.designation && (
                        <span className="error">{errors.designation}</span>
                      )}
                    </div>
                  </div>

                  {/* <div className="row">
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Job Start Date {" "}<span className="text-danger">*</span></label>
                      <input
                        type="date"
                        name="jobStartDate"
                        id="jobStartDate"
                        placeholder=""
                        className="form-control"
                        defaultValue={jobStartDate}
                        onChange={(e) => setJobStartDate(e.target.value)}
                      />
                      {errors.job_start_date && (
                        <span className="error">{errors.job_start_date}</span>
                      )}
                    </div>
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Job End Date {" "}<span className="text-danger">*</span></label>
                      <input
                        type="date"
                        name="jobEndDate"
                        id="jobEndDate"
                        placeholder=""
                        className="form-control"
                        defaultValue={jobEndDate}
                        onChange={(e) => setJobEndDate(e.target.value)}
                      />
                      {errors.job_end_date && (
                        <span className="error">{errors.job_end_date}</span>
                      )}
                    </div>
                  </div> */}

                  <div className="row">
                    <div className="mb-3 col-lg-6 col-sm-6 col-xs-12">
                      <label className="form-label">Job Type{" "}<span className="text-danger">*</span></label>
                      <select
                        className="form-select form-control"
                        aria-label="Default select example"
                        value={jobType}
                        onChange={(e) => setJobType(e.target.value)}
                      >
                        <option value="">--- Job Type ---</option>
                        <option value="PART TIME">PART TIME</option>
                        <option value="FULL TIME">FULL TIME</option>
                      </select>
                      {errors.job_type && (
                        <span className="error">{errors.job_type}</span>
                      )}
                    </div>
                    <div className='mb-3 col-lg-6 col-sm-6 col-xs-12'>
                      <label className="form-label">Experience</label>
                      <Select
                        options={experienceOptions}
                        value={selectedExperience}
                        onChange={handleExperienceChange}
                        placeholder="Select..."
                      />
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-lg-6 col-sm-12 col-xs-12">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateJobProfile;
