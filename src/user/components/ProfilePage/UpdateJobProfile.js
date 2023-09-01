import React, { useEffect, useState } from 'react';
import { updateJobDetail } from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import { ddmmyyyyFormat, yyyyMmDdFormat } from '../../util/DateConvertor';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/userAction';

const UpdateJobProfile = (props) => {
  const {jobDetails} = props;

  const [companyName, setCompanyName] = useState('');
  const [designation, setDesignation] = useState('');
  const [jobStartDate, setJobStartDate] = useState('');
  const [jobEndDate, setJobEndDate] = useState('');
  const [jobType, setJobType] = useState('');

  const [errors, setErrors] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobProfileData = {
      company_name: companyName,
      designation,
      job_start_date: ddmmyyyyFormat(jobStartDate),
      job_end_date: ddmmyyyyFormat(jobEndDate),
      job_type: jobType,
    };
    console.log(jobProfileData)

    try {
      const response = await updateJobDetail(jobProfileData);
      if (response && response.status === 200) {
        setErrors('');
        navigate('/profile')
      }
    } catch (error) {
      // Handle error
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);

      }

      //Unauthorized
      else if (error.response && error.response.status === 401) {
        dispatch(logout());
        navigate('/login');
      }
    }

  };

  useEffect(() => {
    // Set default values from jobDetails prop when it changes
    if (jobDetails) {
      setCompanyName(jobDetails.company_name || '');
      setDesignation(jobDetails.designation || '');
      setJobStartDate(yyyyMmDdFormat(jobDetails.job_start_date) || '');
      setJobEndDate(yyyyMmDdFormat(jobDetails.job_end_date) || '');
      setJobType(jobDetails.job_type || '');
    }
  }, [jobDetails]);

  return (
    <div id="auth-wrapper" className="pt-5 pb-5">
      <div className="container">
        <div className="card shadow">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12 p-5">
                <div className="card-title">
                  <h3 className="mb-3">Job Info</h3>
                </div>
                <form onSubmit={handleSubmit} className="w-100 w-lg-75">
                  <div className="row">
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Company Name</label>
                      <input
                        type="text"
                        name="companyName"
                        id="companyName"
                        placeholder="Enter company name"
                        className="form-control"
                        defaultValue={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                      {errors.company_name && <span className='error'>{errors.company_name}</span>}
                    </div>
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Designation</label>
                      <input
                        type="text"
                        name="designation"
                        id="designation"
                        placeholder="Enter designation"
                        className="form-control"
                        defaultValue={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                      />
                      {errors.designation && <span className='error'>{errors.designation}</span>}
                    </div>
                  </div>

                  <div className="row">
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Job Start Date</label>
                      <input
                        type="date"
                        name="jobStartDate"
                        id="jobStartDate"
                        placeholder=""
                        className="form-control"
                        defaultValue={jobStartDate}
                        onChange={(e) => setJobStartDate(e.target.value)}
                      />
                      {errors.job_start_date && <span className='error'>{errors.job_start_date}</span>}
                    </div>
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Job End Date</label>
                      <input
                        type="date"
                        name="jobEndDate"
                        id="jobEndDate"
                        placeholder=""
                        className="form-control"
                        defaultValue={jobEndDate}
                        onChange={(e) => setJobEndDate(e.target.value)}
                      />
                      {errors.job_end_date && <span className='error'>{errors.job_end_date}</span>}
                    </div>
                  </div>

                  <div className="row">
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Job Type</label>
                      <select
                        className="form-select form-control"
                        aria-label="Default select example"
                        value={jobType}
                        onChange={(e) => setJobType(e.target.value)}
                      >
                        <option value="">--- Job Type ---</option>
                        <option value="PART_TIME">PART_TIME</option>
                        <option value="FULL_TIME">FULL_TIME</option>
                      </select>
                      {errors.job_type && <span className='error'>{errors.job_type}</span>}
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
