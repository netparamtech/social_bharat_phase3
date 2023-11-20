import React, { useEffect, useState } from 'react';
import { updateJobDetail } from '../../services/userService';
import { ddmmyyyyFormat, yyyyMmDdFormat } from '../../util/DateConvertor';
import { useNavigate } from 'react-router-dom';
import { setLoader } from '../../actions/loaderAction';
import { useDispatch } from 'react-redux';

const UpdateJobProfile = (props) => {
  const { jobDetails } = props;

  const [companyName, setCompanyName] = useState("");
  const [designation, setDesignation] = useState("");
  const [jobStartDate, setJobStartDate] = useState("");
  const [jobEndDate, setJobEndDate] = useState("");
  const [jobType, setJobType] = useState("");

  const [errors, setErrors] = useState("");
  const [serverError,setServerError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      job_start_date: ddmmyyyyFormat(jobStartDate),
      job_end_date: ddmmyyyyFormat(jobEndDate),
      job_type: mappedJobType,
    };

    try {
      const response = await updateJobDetail(jobProfileData);
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
      setCompanyName(jobDetails.company_name || "N/A");
      setDesignation(jobDetails.designation || "N/A");
      setJobStartDate(yyyyMmDdFormat(jobDetails.job_start_date) || "N/A");
      setJobEndDate(yyyyMmDdFormat(jobDetails.job_end_date) || "N/A");
      setJobType(jobDetails.job_type || "N/A");

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
        <div className="card shadow">
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

                  <div className="row">
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
                  </div>

                  <div className="row">
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
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
