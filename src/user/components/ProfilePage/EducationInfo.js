import React, { useEffect, useState } from 'react';
import { deleteSingleEducationDetails } from '../../services/userService';
import { useNavigate } from 'react-router-dom';

const EducationInfo = (props) => {
  const {user} = props;
  const [educationDetails,setEducationDetails] = useState([]);

  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const deleteUserEducationalDetails = async (id) => {
    try {
      const response = await deleteSingleEducationDetails(id);
      if (response && response.status === 200) {
        // Remove the deleted item from jobDetails
        const updatedEducationDetails = educationDetails.filter((item) => item.id !== id);
        setEducationDetails(updatedEducationDetails); // Update state to trigger a re-render
        setServerError('');
      }
    } catch (error) {
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

  useEffect(()=>{
   if(user){
    setEducationDetails(user&&user.data&&user.data.education);
   }
  },[user])

  return (
    <div id="education-section" className="content-wrapper pt-4">
      <div className="container">
        <div className="card shadow">
        <div className="edit-icon add-more-detail"><a href="#" onClick={()=>navigate('/user/update-education-profile')} title="Add More Detail"><i className="btn btn-outline-info fas fa-plus"></i></a></div>
          <div className="card-body">
          {serverError && <span className='error'>{serverError}</span>}
            <h5 className="fw-3 mb-3">Education Info</h5>
            <div className="row">
            {educationDetails && educationDetails.length > 0 ? (
                educationDetails.map((item, idx) => (
              <div className="col-md-6" key={idx}>
                <div className="card shadow mt-2 mb-2">
                <div className="edit-icon"><a href="#" onClick={()=>navigate(`/user/update-education-profile/${item.id}`)} title="Edit"><i className="fas fa-pencil-alt"></i></a></div>
                <div className="delete-icon"><a href="#" title="Delete"><i className="fa-solid fa-trash" onClick={()=>deleteUserEducationalDetails(item.id)}></i></a></div>
                  <div className="card-body">
                    <div className="w-100 w-lg-75">
                    <div className="mb-2 row">
                        <label htmlFor="" className="col-sm-3 d-inline-flex">Highest Qualification</label>
                        <div className="col-sm-8"><span className="text-muted">{item.highest_qualification}</span></div>
                      </div>
                      <div className="mb-2 row">
                        <label htmlFor="" className="col-sm-3 d-inline-flex">Degree</label>
                        <div className="col-sm-8"><span className="text-muted">{item.degree_title}</span></div>
                      </div>
                      <div className="mb-2 row">
                        <label className="col-sm-3">Study Field</label>
                        <div className="col-sm-8"><span className="text-muted">{item.field_of_study}</span></div>
                      </div>
                      <div className="mb-2 row">
                        <label className="col-sm-3">University</label>
                        <div className="col-sm-8"><span className="text-muted">{item.institution_name}</span></div>
                      </div>
                      <div className="mb-2 row">
                        <label className="col-sm-3">Passing Year</label>
                        <div className="col-sm-8"><span className="text-muted">{item.passing_year}</span></div>
                      </div>
                      <div className="mb-2 row">
                        <label className="col-sm-3">Score Type</label>
                        <div className="col-sm-8"><span className="text-muted">{item.score_type}</span></div>
                      </div>
                      <div className="mb-2 row">
                        <label className="col-sm-3">Score</label>
                        <div className="col-sm-8"><span className="text-muted">{item.score}</span></div>
                      </div>
                      
                      
                    </div>
                  </div>
                </div>
              </div>

            )) ) : (
              <div className="add-more-info hover-pointer ">
                <a onClick={()=>navigate('/user/update-education-profile')} className='btn btn-secondary'>Add Education Info </a>
              </div>
            )}
              

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationInfo;
