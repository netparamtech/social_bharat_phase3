import React, { useEffect, useState } from 'react';
import { updateJobDetail } from '../../services/userService';
import { ddmmyyyyFormat, yyyyMmDdFormat } from '../../util/DateConvertor';
import { useNavigate, useParams } from 'react-router-dom';
import { setLoader } from '../../actions/loaderAction';
import { useDispatch } from 'react-redux';
import Select from "react-select";
import InputField from '../custom/InputField';
import HtmlSelect from '../custom/HtmlSelect';
import SelectField from '../custom/SelectField';

const UpdateJobProfile = (props) => {
  const { id } = useParams();
  const { jobDetails } = props;

  const [companyName, setCompanyName] = useState("");
  const [designation, setDesignation] = useState("");
  const [jobStartDate, setJobStartDate] = useState("");
  const [jobEndDate, setJobEndDate] = useState("");
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
  const jobTypeOptions = [
    { value: 'PART TIME', label: 'PART TIME' },
    { value: 'FULL TIME', label: 'FULL TIME' },
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
      const response = await updateJobDetail(jobProfileData, id);
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

  useEffect(() => {
    // Set default values from jobDetails prop when it changes
    if (jobDetails) {
      setCompanyName(jobDetails.company_name);
      setDesignation(jobDetails.designation);
      setJobType(jobDetails.job_type);
      setSelectedExperience({ value: jobDetails.experience, label: jobDetails.experience });

      // Set jobType based on job_type from jobDetails
      if (jobDetails.job_type === "PART_TIME") {
        setJobType("PART TIME");
      } else if (jobDetails.job_type === "FULL_TIME") {
        setJobType("FULL TIME");
      } else {
        setJobType("");
      }
    }
  }, [jobDetails]);

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
                      <InputField handleChange={(e) => setCompanyName(e.target.value)} isRequired={true} label="Company Name"
                        errorServer={errors.company_name} isAutoFocused={true} placeholder="Enter company name" value={companyName}
                        fieldName="Company Name" maxLength={100} />
                    </div>
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <InputField handleChange={(e) => setDesignation(e.target.value)} isRequired={true} label="Designation"
                        errorServer={errors.designation} isAutoFocused={false} placeholder="Enter designation"
                        fieldName="Designation" maxLength={100} value={designation} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-lg-6 col-sm-6 col-xs-12">
                      <HtmlSelect handleSelectChange={(e) => setJobType(e.target.value)} options={jobTypeOptions} value={jobType} isRequired={true} errorServer={errors.job_type}
                        label="Job Type" fieldName="Job Type" />
                    </div>
                    <div className='mb-3 col-lg-6 col-sm-6 col-xs-12'>
                      <SelectField handleSelectChange={handleExperienceChange} isRequired={true} value={selectedExperience}
                        errorServer={errors.experience} placeholder="Select Experience ..." label="Experience"
                        options={experienceOptions} fieldName="Experience" />
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-lg-6 col-sm-12 col-xs-12">
                      <button type="submit" className="btn btn-primary">
                        Update
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

export default UpdateJobProfile;
