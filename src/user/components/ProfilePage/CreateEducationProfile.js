import { useEffect, useState } from 'react';
import { createEducationalDetails, fetchAllDegrees, updateEducationalDetails } from '../../services/userService';
import HtmlSelect from '../custom/HtmlSelect';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../actions/loaderAction';
import SelectField from '../custom/SelectField';
import InputField from '../custom/InputField';

const CreateEducationProfile = (props) => {
    const { educationDetails } = props;
    const [degrees, setDegrees] = useState([]);
    const [qualification, setQualification] = useState("");
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

    const generatePassingYearOptions = () => {
        const passingYearOptions = [];
        let currentYear = new Date().getFullYear() + 5;
        for (let year = currentYear; year >= currentYear - 50; year--) {
            passingYearOptions.push({ value: year.toString(), label: year.toString() });
        }
        return passingYearOptions;
    };

    const passingYearOptions = generatePassingYearOptions();

    const customOptions = (
        degrees &&
        degrees.map((degree) => ({
            value: degree.id,
            label: degree.title,
        }))
    );
    const scoreOptions = [
        { value: 'PERCENTAGE', label: 'PERCENTAGE' },
        { value: 'GRADE', label: 'GRADE' },
        { value: 'CGPA', label: 'CGPA' },
    ];


    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(setLoader(true));

        const requestData = {
            degree_id: degreeId,
            highest_qualification: qualification,
            field_of_study: studyField,
            institution_name: university,
            score,
            score_type: scoreType,
            passing_year: passingYear
        };

        try {
            const response = await createEducationalDetails(requestData);
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
                <div className={`card ${errors ? 'border-danger' : ''}`}>
                    <div className="">
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-xs-12 p-4">
                                {serverError && <span className='error'>{serverError}</span>}
                                <form onSubmit={handleSubmit} className="w-100 w-lg-75">
                                    <fieldset className="shadow">
                                        <legend>Education Info</legend>
                                        <div className="card p-3">
                                            <div className="row">
                                                <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                                                    <SelectField handleSelectChange={handleDegreeIdChange} isRequired={true} value={degree}
                                                        errorServer={errors.degree_id} placeholder="---Select Degree---" label="Degree"
                                                        options={customOptions} fieldName="Degree" />
                                                </div>
                                                <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                                                    <InputField handleChange={handleStudyFieldChange} isRequired={true} label="Field Of Study"
                                                        errorServer={errors.field_of_study} isAutoFocused={false} placeholder="Enter Study Field"
                                                        fieldName="Field Of Study" maxLength={100} value={studyField} />
                                                </div>
                                            </div>

                                            <div className="row">

                                                <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                                                    <InputField handleChange={handleUniversityChange} isRequired={true} label="Institution" type="neumeric"
                                                        errorServer={errors.institution_name} isAutoFocused={false} placeholder="Enter university name"
                                                        fieldName="Institution" maxLength={100} value={university} />
                                                </div>
                                                <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                                                    <HtmlSelect handleSelectChange={handlePassingYearChange} options={passingYearOptions} value={passingYear} isRequired={true} errorServer={errors.passing_year}
                                                        label="Passing Year" fieldName="Passing Year" />
                                                </div>

                                            </div>

                                            <div className="row">

                                                <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                                                    <HtmlSelect handleSelectChange={handleScoreTypeChange} options={scoreOptions} value={scoreType} isRequired={true} errorServer={errors.score_type}
                                                        label="Score Type" fieldName="Score Type" />
                                                </div>
                                                <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                                                    {
                                                        (scoreType === 'PERCENTAGE' || scoreType === 'CGPA') ? (
                                                            <>
                                                                <InputField handleChange={handleScoreChange} isRequired={true} label="Score" type="numeric"
                                                                    errorServer={errors.score} isAutoFocused={false} placeholder="Enter Score"
                                                                    fieldName="Score" maxLength={3} value={score} min={0} max={100} />
                                                                <p className="warning">Please enter the percentage/cgpa rounded off to the nearest value.</p>
                                                            </>
                                                        ) : (
                                                            <InputField handleChange={handleScoreChange} isRequired={true} label="Score" type="text"
                                                                errorServer={errors.score} isAutoFocused={false} placeholder="Enter Score"
                                                                fieldName="Score" maxLength={2} value={score} />
                                                        )
                                                    }
                                                </div>


                                            </div>
                                        </div>
                                        <div className="row mt-4">
                                            <div className="col-lg-2 col-sm-12 col-xs-12">
                                                <button type="submit" className="btn btn-primary">Update</button>
                                            </div>
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateEducationProfile;
