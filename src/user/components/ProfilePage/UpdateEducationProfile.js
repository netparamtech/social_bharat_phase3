import React, { useState, useEffect } from 'react';
import { getUserFullProfile, updateEducationalDetails } from '../../services/userService';
import { useNavigate } from 'react-router-dom';

const UpdateEducationProfile = () => {
  const [educationDetails, setEducationDetails] = useState([]);
  const [errors, setErrors] = useState('');
  const [message, setMessage] = useState('');
  const [alertClass, setAlertClass] = useState('');

  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();


  const handleChange = (index, field, value) => {
    const updatedDetails = [...educationDetails];
    updatedDetails[index][field] = value;
    setEducationDetails(updatedDetails);
  };


  const fetchEducationDetails = async () => {
    try {
      const response = await getUserFullProfile();
      if (response.data && response.data.data.education && Array.isArray(response.data.data.education)) {
        setEducationDetails(response.data.data.education);
      }
    } catch (error) {
      console.error('Error fetching education details:', error);
    }
  };

  const updateEducationDetail = async (index) => {
    const updatedDetail = educationDetails[index]; // Get the detail for the specified index
    try {
      const response = await updateEducationalDetails(updatedDetail);
      if (response && response.status === 200) {
        setIsError(false);
        setErrors('');
        setMessage(response.data.message);
        setAlertClass('alert-success');
      }
    } catch (error) {
      setIsError(true);
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
        setMessage(error.response.data.message);
        setAlertClass('alert-danger');
      }
      // Internal Server Error
      else if (error.response && error.response.status === 500) {
        setMessage(error.response.data.message);
        setAlertClass('alert-danger');
        setErrors('')
      }
      // Unauthorized
      else if (error.response && error.response.status === 401) {
        navigate('/login')
      }
      else if (error.response && error.response.status === 404) {
        setMessage(error.response.data.message);
        setAlertClass('alert-danger');
        setErrors('')

      }
    }
  };

  const deleteEducationDetail = async (index) => {
    try {
      // Make delete API call for educationDetails[index]
      // Update educationDetails state after successful delete
    } catch (error) {
      console.error('Error deleting education detail:', error);
    }
  };

  const addNewRow = () => {
    const newRow = {
      degree: '',
      field_of_study: '',
      institution_name: '',
      score: '',
      score_type: '',
      passing_year: '',
    };
    if(!isError){
      setErrors('');
      setMessage('');
      setAlertClass('');
      setEducationDetails([...educationDetails, newRow]);
    }
  };

  const handleDelete = (index) => {
    const updatedDetails = [...educationDetails];
    updatedDetails.splice(index, 1);
    setEducationDetails(updatedDetails);
  };

  // Fetch education details on page load
  useEffect(() => {
    fetchEducationDetails();
  }, []);

  return (
    <div className="card">
      <div className="card-body tab-content border-0 bg-white-smoke">
        <div className="tab-pane active" id="educationInfo">
          <form action="#" className="repeater">
            {message && <div className={`alert ${alertClass} mt-2`}>
              {alertClass === 'alert-success' ? (<i className="fas fa-check-circle"></i>) : (<i className="fas fa-exclamation-triangle"></i>)}
              {" " + message}
            </div>
            }
            <h1 className="d-inline-flex">Education Info</h1>
            <i
              onClick={addNewRow}
              className="mt-3 float-end fa-solid fa-user-plus fs-5"
            ></i>

            <div className="table-responsive">
              <table className="table table-striped" data-repeater-list="tasks">
                <thead>
                  <tr className="text-center">
                    <th>Degree</th>
                    <th>Study Field</th>
                    <th>University/Institution</th>
                    <th>Score</th>
                    <th>Score Type</th>
                    <th>Passing Year</th>
                  </tr>
                </thead>
                <tbody>
                  {educationDetails.map((detail, index) => (
                    <tr key={index} data-repeater-item>
                      <td><input type="text" className="form-control" value={detail.degree} onChange={(e) => handleChange(index, 'degree', e.target.value)} />
                        {errors.degree && <span className='validation-error'>{errors.degree}</span>}
                      </td>

                      <td><input type="text" className="form-control" defaultValue={detail.field_of_study} onChange={(e) => handleChange(index, 'field_of_study', e.target.value)} />
                        {errors.field_of_study && <span className='validation-error'>{errors.field_of_study}</span>}

                      </td>
                      <td><input type="text" className="form-control" defaultValue={detail.institution_name} onChange={(e) => handleChange(index, 'institution_name', e.target.value)} />
                        {errors.institution_name && <span className='validation-error'>{errors.institution_name}</span>}

                      </td>
                      <td><input type="text" className="form-control" defaultValue={detail.score} onChange={(e) => handleChange(index, 'score', e.target.value)} />
                        {errors.score && <span className='validation-error'>{errors.score}</span>}

                      </td>

                      <td><input type="text" className="form-control" defaultValue={detail.score_type} onChange={(e) => handleChange(index, 'score_type', e.target.value)} />
                        {errors.score_type && <span className='validation-error'>{errors.score_type}</span>}

                      </td>
                      <td><input type="text" className="form-control" defaultValue={detail.passing_year} onChange={(e) => handleChange(index, 'passing_year', e.target.value)} />
                        {errors.passing_year && <span className='validation-error'>{errors.passing_year}</span>}

                      </td>
                      <td>
                        <a
                          type="button"
                          className="btn btn-success"
                          onClick={() => updateEducationDetail(index, detail)}
                        >
                          Save
                        </a>
                        <button
                          type="button"
                          className="btn btn-green-lg"
                          onClick={() => handleDelete(index)}
                        >
                          <i className="fas fa-trash" style={{ color: "red" }}></i>
                        </button>
                      </td>
                    </tr>

                  ))}
                </tbody>
              </table>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateEducationProfile;
