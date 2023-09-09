import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../actions/userAction';
import { deleteSingleJobDetails } from '../../services/userService';

const JobInfo = (props) => {
  const { user } = props;
  const initialJobDetails = user?.data?.jobs; // Store initial job details
  const [jobDetails, setJobDetails] = useState(initialJobDetails);

  const dispatch = useDispatch();

  useEffect(() => {
    setJobDetails(initialJobDetails); // Update jobDetails when user changes
  }, [user]);

  const deleteUserJobDetails = async (id) => {
    try {
      const response = await deleteSingleJobDetails(id);
      if (response && response.status === 200) {
        // Remove the deleted item from jobDetails
        const updatedJobDetails = jobDetails.filter((item) => item.id !== id);
        setJobDetails(updatedJobDetails); // Update state to trigger a re-render
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(logout());
        window.location.href = '/login';
      } else if (error.response && error.response.status === 500) {
        dispatch(logout());
        window.location.href = '/login';
      }
    }
  }

  return (
    <div id="job-section" className="content-wrapper pt-4 mb-4">
      <div className="container">
        <div className="card shadow">
          <div className="edit-icon add-more-detail"><a href="/user/update-job-profile" title="Add More Detail"><i className="btn btn-outline-info fas fa-plus"></i></a></div>
          <div className="card-body">
            <h5 className="fw-3 mb-3">Job Info</h5>
            <div className="row">
              {jobDetails && jobDetails.length > 0 ? (
                jobDetails.map((item, idx) => (
                  <div className="col-md-6" key={idx}>
                    <div className="card shadow">
                      <div className="edit-icon"><a href={`/user/update-job-profile/${item.id}`} title="Edit"><i className="fas fa-pencil-alt"></i></a></div>
                      <div className="delete-icon"><a href="" title="Delete" onClick={(e) => {
                        e.preventDefault();
                        deleteUserJobDetails(item.id)
                      }}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </a>
                      </div>
                      <div className="card-body">
                        <table className="table table-striped">
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
                              <td className="text-muted">{item.job_start_date || 'NA'}</td>
                            </tr>
                            <tr>
                              <td>Job End Date</td>
                              <td className="text-muted">{item.job_end_date || 'NA'}</td>
                            </tr>
                            <tr>
                              <td>Job Type</td>
                              <td className="text-muted">{ item.job_type === 'PART_TIME' ? 'PART TIME' : item.job_type === 'FULL_TIME' ? 'FULL TIME' : ''}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="add-more-info ">
                <a href='/user/update-job-profile' className='btn btn-secondary'>Add Job Info </a>
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
