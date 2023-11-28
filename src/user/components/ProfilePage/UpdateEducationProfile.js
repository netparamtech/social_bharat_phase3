import { useEffect, useState } from 'react';
import { fetchAllActiveQualifications, fetchAllDegrees, updateEducationalDetails } from '../../services/userService';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../actions/loaderAction';

const UpdateEducationProfile = (props) => {
  const { educationDetails } = props;
  const [degrees, setDegrees] = useState([]);
  const [qualification,setQualification] = useState("");
  const [degreeId, setDegreeId] = useState('');
  const [degree, setDegree] = useState('');
  const [studyField, setStudyField] = useState('');
  const [university, setUniversity] = useState('');
  const [score, setScore] = useState('');
  const [scoreType, setScoreType] = useState('');
  const [passingYear, setPassingYear] = useState('');

  const [errors, setErrors] = useState('');
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle onChange for each input field
  const handleDegreeIdChange = (selectedOption) => {
    setDegreeId(selectedOption.value);
    setDegree(selectedOption); // Update the degree state with the selected option
  };

  const handleStudyFieldChange = (e) => {
    setStudyField(e.target.value);
  };

  const handleUniversityChange = (e) => {
    setUniversity(e.target.value);
  };

  const handleScoreChange = (e) => {
    setScore(e.target.value);
  };

  const handleScoreTypeChange = (e) => {
    setScoreType(e.target.value);
  };

  const handlePassingYearChange = (e) => {
    setPassingYear(e.target.value);
  };

  const passingYearOptions = [];
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= currentYear - 50; year--) {
    passingYearOptions.push(
      <option key={year} value={year}>
        {year}
      </option>
    );
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoader(true));

    const requestData = {
      degree_id: degreeId,
      highest_qualification:qualification,
      field_of_study: studyField,
      institution_name: university,
      score,
      score_type: scoreType,
      passing_year: passingYear
    };

    try {
      const response = await updateEducationalDetails(requestData);
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
      }
      //Internal Server Error
      else if (error.response && error.response.status === 500) {
        setServerError("Oops! Something went wrong on our server.");
      }
    }
  };

  const fetchDegrees = async () => {
    dispatch(setLoader(true));
    try {
      const response = await fetchAllDegrees();
      if (response && response.status === 200) {
        setDegrees(response.data.data.degrees);
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

  useEffect(() => {
    fetchDegrees();
  }, []);

  useEffect(() => {
    // Set default values from educationDetails prop when it changes
    if (educationDetails) {
      setDegreeId(educationDetails.degree_id || '');
      setStudyField(educationDetails.field_of_study || '');
      setUniversity(educationDetails.institution_name || '');
      setScore(educationDetails.score || '');
      setScoreType(educationDetails.score_type || '');
      setPassingYear(educationDetails.passing_year || '');

      // Find the corresponding degree's title based on degreeId
      const selectDegree = degrees.find((degree) => degree.id === educationDetails.degree_id);
      if (selectDegree) {
        setDegree({
          value: selectDegree.id,
          label: selectDegree.title
        });
      }
    }
  }, [educationDetails]);

  useEffect(() => {
    setServerError('');
    setErrors('');
  }, []);

  return (
    <div id="auth-wrapper" className="pt-5 pb-5">
      <div className="container">
        <div className={`card shadow ${errors ? 'border-danger':''}`}>
          <div className="card-body">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12 p-4">
                {serverError && <span className='error'>{serverError}</span>}
                <div className="card-title">
                  <h3 className="mb-3">Education Info</h3>
                </div>
                <form onSubmit={handleSubmit} className="w-100 w-lg-75">
                  <div className="card p-3">
                    <div className="row">
                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <label className="form-label">Degree{" "}<span className="text-danger">*</span></label>
                        <Select
                          id="degree"
                          className="form-control"
                          value={degree} // Use the degree prop directly as the default value
                          onChange={handleDegreeIdChange}
                          options={
                            degrees &&
                            degrees.map((degree) => ({
                              value: degree.id,
                              label: degree.title,
                            }))
                          }
                          placeholder="---Select Degree---"
                        />
                        {errors.degree_id && <span className='error'>{errors.degree_id}</span>}
                      </div>
                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <label className="form-label">Field Of Study{" "}<span className="text-danger">*</span></label>
                        <input
                          type="text"
                          name="university"
                          id="university"
                          placeholder="Enter Study Field"
                          className="form-control"
                          defaultValue={studyField}
                          onChange={handleStudyFieldChange}
                        />
                        {errors.field_of_study && <span className='error'>{errors.field_of_study}</span>}
                      </div>
                    </div>

                    <div className="row">
                    
                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <label className="form-label">University/Institution{" "}<span className="text-danger">*</span></label>
                        <input
                          type="text"
                          name="university"
                          id="university"
                          placeholder="Enter university name"
                          className="form-control"
                          defaultValue={university}
                          onChange={handleUniversityChange}
                        />
                        {errors.institution_name && <span className='error'>{errors.institution_name}</span>}
                      </div>
                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <label className="form-label">Passing Year{" "}<span className="text-danger">*</span></label>
                        <select
                          name="year"
                          id="year"
                          className="form-control"
                          value={passingYear}
                          onChange={handlePassingYearChange}
                        >
                          <option value="" >---Select Passing Year---</option>
                          {passingYearOptions}
                        </select>
                        {errors.passing_year && <span className='error'>{errors.passing_year}</span>}
                      </div>

                    </div>

                    <div className="row">
                     
                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <label className="form-label">Score Type{" "}<span className="text-danger">*</span></label>
                        <select className="form-select form-control" aria-label="Default select example"
                          onChange={handleScoreTypeChange}
                          value={scoreType}
                        >
                          <option value="">---Select Score Type---</option>
                          <option value="PERCENTAGE">PERCENTAGE</option>
                          <option value="GRADE">GRADE</option>
                        </select>
                        {errors.score_type && <span className='error'>{errors.score_type}</span>}
                      </div>
                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <label className="form-label">Score{" "}<span className="text-danger">*</span></label>
                        <input
                          type="text"
                          name="Score"
                          id="Score"
                          placeholder="Enter Score"
                          className="form-control"
                          defaultValue={score}
                          onChange={handleScoreChange}
                        />
                        {errors.score && <span className='error'>{errors.score}</span>}
                      </div>


                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-lg-2 col-sm-12 col-xs-12">
                      <button type="submit" className="btn btn-primary">Update</button>
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

export default UpdateEducationProfile;
