import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteSingleJobDetails } from '../../services/userService';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../actions/loaderAction';

const JobInfo = (props) => {
  const { user } = props;
  const initialJobDetails = user?.data?.jobs; // Store initial job details
  const [jobDetails, setJobDetails] = useState(initialJobDetails);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    setJobDetails(initialJobDetails); // Update jobDetails when user changes
  }, [user]);

  const deleteUserJobDetails = async (id) => {
    dispatch(setLoader(true));
    try {
      const response = await deleteSingleJobDetails(id);
      if (response && response.status === 200) {
        // Remove the deleted item from jobDetails
        const updatedJobDetails = jobDetails.filter((item) => item.id !== id);
        setJobDetails(updatedJobDetails); // Update state to trigger a re-render
        setServerError('');
        dispatch(setLoader(false));
      }
    } catch (error) {
      dispatch(setLoader(false));
      //Unauthorized
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
      //Internal Server Error
      else if (error.response && error.response.status === 500) {
        setServerError("Oops! Something went wrong on our server.");
      }
    }
  }

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const [month, day, year] = new Date(dateString)
      .toLocaleDateString('en-GB', options)
      .split('/');
    return `${month}-${day}-${year}`;
  };

  return (
    <div id="job-section" className="content-wrapper pt-4 mb-4">
      <div className="container">
        <div className="card shadow">
          <div className="edit-icon add-more-detail"><a href="#" onClick={() => navigate("/user/update-job-profile")} title="Add More Detail"><i className="btn btn-outline-info fas fa-plus"></i></a></div>
          <div className='card-header'> <h5 className="fw-3 mb-3 text-primary">Job Info</h5></div>
          <div className="card-body">
          {serverError && <span className='error'>{serverError}</span>}
            <div className="row">
              {jobDetails && jobDetails.length > 0 ? (
                jobDetails.map((item, idx) => (
                  <div className="col-md-6" key={idx}>
                    <div className="card shadow mb-2 ">
                      <div className="edit-icon"><a className='hover-pointer' onClick={() => navigate(`/user/update-job-profile/${item.id}`)} title="Edit"><i className="fas fa-pencil-alt"></i></a></div>
                      <div className="delete-icon"><a className='hover-pointer' title="Delete" onClick={(e) => {
                        e.preventDefault();
                        deleteUserJobDetails(item.id)
                      }}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </a>
                      </div>
                      <div className="card-body">
                        <table className="table table-striped wow animate__animated animate__zoomIn">
                          <tbody>
                            <tr>
                              <td>Company Name</td>
                              <td className="text-muted">{item.company_name || 'NA'}</td>
                            </tr>
                            <tr>
                              <td>Designation</td>
                              <td className="text-muted">{item.designation || 'NA'}</td>
                            </tr>
                            <tr>
                              <td>Job Start Date</td>
                              <td className="text-muted">{formatDate(item.job_start_date) || 'NA'}</td>
                            </tr>
                            <tr>
                              <td>Job End Date</td>
                              <td className="text-muted">{formatDate(item.job_end_date) || 'NA'}</td>
                            </tr>
                            <tr>
                              <td>Job Type</td>
                              <td className="text-muted">{item.job_type === 'PART_TIME' ? 'PART TIME' : item.job_type === 'FULL_TIME' ? 'FULL TIME' : ''}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="add-more-info ">
                  <a onClick={() => navigate('/user/update-job-profile')} className='btn btn-secondary hover-pointer'>Add Job Info </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobInfo;
