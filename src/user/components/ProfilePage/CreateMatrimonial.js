import { useEffect, useState } from "react";
import {
  createMatrimonialInfo,
  fetchAllCitiesByStateID,
  fetchAllStatesByCountryID,
  fetchAllSubcasts,
  updateMatrimonialInfo,
  uploadMultipleImages,
  uploadPdf,
} from "../../services/userService";
import { getFeet, getInches } from "../../util/Conversion";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import { useDispatch, useSelector } from "react-redux";
import { DatePicker } from "antd";
import dayjs from 'dayjs';
import { yyyyMmDdFormat } from "../../util/DateConvertor";
import { setLoader } from "../../actions/loaderAction";
import MobileInput from "../custom/MobileInput";
import InputField from "../custom/InputField";
import SelectField from "../custom/SelectField";
import HtmlSelect from '../custom/HtmlSelect';
import TextAreaField from "../custom/TextAreaField";
import { errorOptions } from "../../../toastOption";
import { toast } from "react-toastify";

const { RangePicker } = DatePicker;
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
const CreateMatrimonial = () => {
  const loggedUser = useSelector((state) => state.userAuth);

  const [userMatrimonial, setUserMatrimonial] = useState();

  const user = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [updateFor, setUpdateFor] = useState(null);
  const updateForOptions = [
    { value: 'Self', label: 'Self' },
    { value: 'Brother', label: 'Brother' },
    { value: 'Sister', label: 'Sister' },
    { value: 'Son', label: 'Son' },
    { value: 'Daughter', label: 'Daughter' },
  ];
  const [maritalStatus, setMaritalStatus] = useState('');
  const [matrimonialProfileName, setMatrimonialProfileName] = useState('');
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [skinTone, setSkinTone] = useState("");
  const [heightFeet, setHeightFeet] = useState(0);
  const [heightInch, setHeightInch] = useState(0);
  const [weight, setWeight] = useState("");
  const [cast, setCast] = useState("");
  const [gotraSelf, setGotraSelf] = useState("");
  const [paternalGotra, setPaternalGotra] = useState("");
  const [maternalGotra, setMaternalGotra] = useState("");

  const [gender, setGender] = useState('');
  const [dob, setDOB] = useState(null);
  const [manglicStatus, setManglicStatus] = useState('No'); // Initial manglic status

  const [numBrothers, setNumBrothers] = useState(0); // Number of brothers
  const [numSisters, setNumSisters] = useState(0); // Number of sisters
  const [brothersDetails, setBrothersDetails] = useState(''); // Details of brothers
  const [sistersDetails, setSistersDetails] = useState('');
  const [packageValue, setPackageValue] = useState(0); // Change to null for react-select
  const [showBrotherDetail, setShowBrotherDetail] = useState(false);
  const [showSisterDetail, setShowSisterDetail] = useState(false);

  const [isBrotherDetails, setIsBrotherDetails] = useState(true);
  const [isSisterDetails, setIsSisterDetails] = useState(true);
  const [community, setCommunity] = useState('');
  const [communityName, setCommunityName] = useState('');
  const [communityId, setCommunityId] = useState('');
  const [subcastArray, setSubcastArray] = useState([]);
  const [subcast_id, setSubcastId] = useState('');
  const [subcast, setSubcast] = useState('');

  const [brotherCount, setBrotherCount] = useState('');
  const [sisterCount, setSisterCount] = useState('');

  const [proposalPhoto, setProposalPhoto] = useState([]);
  const [tempProposalPhotoUrl, setTempProposalPhotoUrl] = useState([]);
  const [proposalPreview, setProposalPreview] = useState([]);

  const [biodataFile, setBiodataFile] = useState("");
  const [tempBiodataFileUrl, setTempBiodataFileUrl] = useState("");
  const [biodataPreview, setBiodataPreview] = useState("");
  const [nameLabel, setNameLabel] = useState('Name');
  const [matrimonialOccupation, setMatrimonialOccupation] = useState('');
  const [education, setEducation] = useState('');

  const [errors, setErrors] = useState("");
  const [messagePhotos, setMessagePhotos] = useState('');
  const [messageBiodata, setMessageBiodata] = useState('');
  const [serverError, setServerError] = useState("");

  //state and city
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countryID, setCountryID] = useState(101);

  const [isMyNumber, setIsMyNumber] = useState(false);
  const [mobile, setMobile] = useState('');
  const [jobProfileDesc, setJobProfileDesc] = useState('');
  const [educaDetails, setEducaDetails] = useState('');
  const [unit, setUnit] = useState(''); // Default unit is "lakh"

  //validation errors
  const [careatedForError, setCreatedForError] = useState('');
  const [nameError, setNameError] = useState('');
  const [fatherNameError, setFatherNameError] = useState('');
  const [motherNameError, setMotherNameError] = useState('');
  const [stateError, setStateError] = useState('');
  const [cityError, setCityError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [subcastError, setSubCastError] = useState('');
  const [dobError, setDobError] = useState('');
  const [genderError, setGenderError] = useState('');

  const handleUnitChange = (event) => {
    console.log(packageValue, unit)
    setUnit(event.target.value);
  };

  const navigate = useNavigate();


  const stateOptions = (
    states &&
    states.map((option) => ({
      value: option.name,
      label: option.name,
    }))
  );
  const cityOptions = (
    cities &&
    cities.map((option) => ({
      value: option.name,
      label: option.name,
    }))
  );
  const manglicOptions = [
    { value: 'YES', label: 'YES' },
    { value: 'NO', label: 'NO' },
  ];
  const educationOptions = [
    { value: '10th', label: '10th' },
    { value: '12th', label: '12th' },
    { value: 'Graduate', label: 'Graduate' },
    { value: 'Post Graduate', label: 'Post Graduate' },
    { value: 'Under Graduate', label: 'Under Graduate' },
    { value: 'Diploma', label: 'Diploma' },
    { value: 'Under Diploma', label: 'Under Diploma' },
  ];
  const jobProfileOptions = [
    { value: 'Government', label: 'Government' },
    { value: 'Private', label: 'Private' },
    { value: 'Doctor', label: 'Doctor' },
    { value: 'Engineer', label: 'Engineer' },
    { value: 'Sales', label: 'Sales' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Business', label: 'Business' },
    // Add more job profiles as needed
  ];
  const currencyOptions = [
    { value: 'lakh', label: 'lakh' },
    { value: 'cr', label: 'cr' },
  ];
  const numberBrotherOptions = [
    { value: '0', label: '0' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' },
  ];


  const handleSubcastChange = (selectedOption, errorMsg) => {
    setSubcast(selectedOption);
    setSubcastId(selectedOption.value);
    setSubCastError(errorMsg);
  };
  const handleEdcacDetails = (e) => {
    setEducaDetails(e.target.value);
  }

  const handleUpdateForChange = (selectedOption, errorMsg) => {
    setUpdateFor(selectedOption);
    setCreatedForError(errorMsg);

    if (selectedOption.label === 'Self' && maritalStatus === 'Married') {
      alert('You cannot update self matrimonial because you are already married.')
    } else if (selectedOption.label === 'Self') {
      setGender(user.user.gender);

      setDOB(user.user.dob ? yyyyMmDdFormat(user.user.dob) : '');
      setMatrimonialProfileName(user.user.name);
      setMatrimonialOccupation(user.user.occupation);

    } else {
      setGender('');
      setDOB('');
      setMatrimonialProfileName('');
      setMatrimonialOccupation('');
    }
  };

  const handleMatrimonialOccupation = (e) => {
    setMatrimonialOccupation(e.target.value);
  }

  const handleEducationChange = (e) => {
    setEducation(e.target.value);
  }
  const handlePackageChange = (e) => {
    setPackageValue(e.target.value);
  };

  const handleBrotherCount = (e) => {
    const value = parseInt(e.target.value, 10);  // Parse the value as an integer
    setBrotherCount(e.target.value);
    if (value === 0) {
      setShowBrotherDetail(false);
      setBrothersDetails('');
    } else {
      setShowBrotherDetail(true);
    }
  }

  const handleSisterCount = (e) => {
    const value = parseInt(e.target.value, 10);  // Parse the value as an integer
    setSisterCount(e.target.value);
    if (value === 0) {
      setShowSisterDetail(false);
      setSistersDetails('');
    } else {
      setShowSisterDetail(true);
    }

  }
  const handleIsMyNumberClicked = () => {
    setIsMyNumber(!isMyNumber);
  }
  const handleMobileNumberClicked = (e, errorMsg) => {
    setMobile(e.target.value);
    setMobileError(errorMsg);
  }
  const handleJobProfileDes = (e) => {
    setJobProfileDesc(e.target.value);
  }

  const handleProposalPhotoChange = async (e) => {
    const selectedFiles = e.target.files;
    setProposalPhoto(selectedFiles); // Set the selected files

    const totalFiles = tempProposalPhotoUrl.length + selectedFiles.length;
    if (totalFiles > 5) {
      alert("Total files (including existing ones) cannot exceed 5.");
      e.target.value = null; // Clear the input field
      return;
    }

    const previewUrls = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const previewUrl = URL.createObjectURL(file);
      previewUrls.push(previewUrl);
    }

    const combinedUrls = [...previewUrls, ...proposalPreview];

    const formData = new FormData();

    // Append each file to the FormData
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("images", selectedFiles[i]);
    }

    try {
      dispatch(setLoader(true));
      const response = await uploadMultipleImages(formData); // Make an API call to get temporary URL
      if (response.status === 200) {
        const combineTempUrls = [
          ...tempProposalPhotoUrl,
          ...response.data.data.files,
        ];
        setTempProposalPhotoUrl(combineTempUrls);
        setProposalPreview(combinedUrls);
        setServerError('');
        setMessagePhotos('');
        dispatch(setLoader(false));
      }
    } catch (error) {
      dispatch(setLoader(false));
      // Handle error
      if (error.response && error.response.status === 400) {
        setMessagePhotos(error.response.data.message);
      }

      //Unauthorized
      else if (error.response && error.response.status === 401) {
        navigate("/login");
      }
      //Internal Server Error
      else if (error.response && error.response.status === 500) {
        setServerError("Oops! Something went wrong on our server.");
      }
    }
  };

  const handleBiodataFileChange = async (e) => {
    const selectedFiles = e.target.files[0];
    if (!(selectedFiles instanceof File)) {
      return;
    }
    setBiodataFile(selectedFiles);

    const formData = new FormData();
    formData.append("pdf", selectedFiles);

    try {
      dispatch(setLoader(true));
      const response = await uploadPdf(formData); // Make an API call to get temporary URL
      if (response && response.status === 200) {
        setTempBiodataFileUrl(response.data.data.file);
        setBiodataPreview(URL.createObjectURL(selectedFiles));
        setServerError('');
        setMessageBiodata('');
        dispatch(setLoader(false));
      }
    } catch (error) {
      // Handle error
      if (error.response && error.response.status === 400) {
        setMessageBiodata(error.response.data.message);
      }

      //Unauthorized
      else if (error.response && error.response.status === 401) {
        navigate("/login");
      }
      //Internal Server Error
      else if (error.response && error.response.status === 500) {
        setServerError("Oops! Something went wrong on our server.");
      }
    } finally {
      dispatch(setLoader(false));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (careatedForError || nameError || fatherNameError || motherNameError || stateError || cityError || mobileError
      || subcastError || dobError || genderError || !updateFor || !matrimonialProfileName || !fatherName || !motherName ||
      !selectedState || !selectedCity || !mobile || !subcast_id || !dob || !gender) {
      toast.error("Please fill in all the required fields before submitting.", errorOptions);
      return;
    }

    dispatch(setLoader(true));

    const trimmedTempProposalPhotoUrl = tempProposalPhotoUrl.map(item => item.trim()).filter((item) => item !== '');
    console.log(trimmedTempProposalPhotoUrl.length, "Check create length")
    console.log(packageValue, unit)

    const matrimonialData = {
      father_name: fatherName,
      mother_name: motherName,
      height_in_feet: `${heightFeet}.${heightInch}`,
      maternal_gotra: maternalGotra,
      paternal_gotra: paternalGotra,
      proposal_photos: trimmedTempProposalPhotoUrl, // Use the temporary URL
      biodata: tempBiodataFileUrl, // Use the temporary URL
      brother_count: brotherCount ? brotherCount : 0,
      sister_count: sisterCount ? sisterCount : 0,
      brothers_details: brothersDetails ? brothersDetails : '',
      sisters_details: sistersDetails ? sistersDetails : '',
      salary_package: packageValue ? (packageValue + " " + unit) : '',
      matrimonial_profile_gender: gender,
      matrimonial_profile_name: matrimonialProfileName,
      matrimonial_profile_dob: dob,
      is_manglik: manglicStatus,
      matrimonial_profile_occupation: matrimonialOccupation,
      education,
      profile_created_for: updateFor && updateFor.label,
      skin_tone: 'DARK',
      subcast_id,
      matrimonial_profile_name: matrimonialProfileName,
      description,
      contact_number: mobile,
      educational_details: educaDetails,
      job_profile_description: jobProfileDesc,
      state: selectedState && selectedState.label,
      city: selectedCity && selectedCity.label,
    };


    try {
      const response = await createMatrimonialInfo(matrimonialData);
      if (response && response.status === 200) {
        dispatch(setLoader(false));
        setErrors("");
        setServerError('');
        navigate("/profile");
      }
    } catch (error) {
      dispatch(setLoader(false));
      // Handle error
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
        setServerError('');
      }

      //Unauthorized
      else if (error.response && error.response.status === 401) {
        navigate("/login");
      }
      //Internal Server Error
      else if (error.response && error.response.status === 500) {
        setServerError("Oops! Something went wrong on our server.");
      }
    }
  };

  const handleDeleteImage = (indexToDelete) => {
    // Create copies of the current arrays
    const updatedProposalPreview = [...proposalPreview];
    const updatedProposalTempUrl = [...tempProposalPhotoUrl];

    // Remove the image at the specified index from both arrays
    updatedProposalPreview.splice(indexToDelete, 1);
    updatedProposalTempUrl.splice(indexToDelete, 1);

    // Update the state variables with the updated arrays
    setProposalPreview(updatedProposalPreview);
    setTempProposalPhotoUrl(updatedProposalTempUrl);
  };

  const ageCalculate = (dob) => {
    if (dob !== null) {
      const dobDate = new Date(dob);
      const currentDate = new Date();

      // Calculate the age in years
      const ageInMilliseconds = currentDate - dobDate;
      const ageInYears = Math.floor(
        ageInMilliseconds / (1000 * 60 * 60 * 24 * 365)
      );
      return ageInYears;
    } else {
      return 0;
    }
  };

  const handleDateChange = (e, errorMsg) => {
    let dateValue = e.target.value;
    if (!isNaN(Date.parse(dateValue))) {
      const age = ageCalculate(dateValue);
      if (age < 18) {
        e.target.value = null;
        alert("You must be at least 18 years old to enter this date.");
      }
      else {
        const changeDate = new Date(dateValue);
        setDOB(changeDate.toISOString().split('T')[0]);
        setDobError(errorMsg);
      }
    }
  }

  //state and city change operations
  const handleStateChange = (selectedOption, errorMsg) => {
    setSelectedState(selectedOption);
    setStateError(errorMsg);

    if (selectedOption) {
      const selectedStateObject = states.find(
        (state) => state.name === selectedOption.value
      );
      if (selectedStateObject) {
        getAllCities(selectedStateObject.id);
      }
    }

    // Update selected city to null when state changes
    setSelectedCity(null);
  };

  const handleCityChange = (selectedOption, errorMsg) => {
    setSelectedCity(selectedOption);
    setCityError(errorMsg);
  };

  const getAllStates = async () => {
    dispatch(setLoader(true));
    try {
      const response = await fetchAllStatesByCountryID(101);
      if (response && response.status === 200) {
        setStates(response.data.data);
        setServerError('');
      }
    } catch (error) {
      //Unauthorized
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
      //Internal Server Error
      else if (error.response && error.response.status === 500) {
        setServerError("Oops! Something went wrong on our server.");
      }
    } finally {
      dispatch(setLoader(false));
    }
  };

  const getAllCities = async (stateID) => {
    dispatch(setLoader(true));
    if (stateID) {
      try {
        const response = await fetchAllCitiesByStateID(stateID);
        if (response && response.status === 200) {
          setCities(response.data.data);
          setServerError('');
        }
      } catch (error) {
        //Unauthorized
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
        //Internal Server Error
        else if (error.response && error.response.status === 500) {
          setServerError("Oops! Something went wrong on our server.");
        }
      } finally {
        dispatch(setLoader(false));
      }
    }
  };

  const onKeyPressPackage = (e) => {
    const char = String.fromCharCode(e.which);
    // Allow backspace, space, and alphabetical characters
    if (e.keyCode === 8 || /[0-9]/.test(char)) {
      return;
    }
    e.preventDefault();
  };
  const minDate = '1900-01-01';
  const maxDate = '2015-12-31';

  useEffect(() => {
    if (selectedState) {
      getAllCities(selectedState.id);
    }
  }, [selectedState]);



  useEffect(() => {
    if (community) {
      setCommunityName(community && community.name);
    }
  }, [community]);

  useEffect(() => {
    if (updateFor && user) {
      if (updateFor.label === 'Self') {
        setNameLabel('Your Name');
      } else if (updateFor.label === 'Brother') {
        setNameLabel('Name Of Brother');
      } else if (updateFor.label === 'Sister') {
        setNameLabel('Name Of Sister');
      } else if (updateFor.label === 'Son') {
        setNameLabel('Name Of Son');
      } else if (updateFor.label === 'Daughter') {
        setNameLabel('Name Of Daughter');
      }
    }
  }, [updateFor])

  //fetch all active subcast communities
  const fetchSubcastsCommunities = async () => {
    dispatch(setLoader(true));
    try {
      const response = await fetchAllSubcasts(communityId);
      if (response && response.status === 200) {
        const requestedCasts = response.data.data.filter((item) => item.status === 'true');

        setSubcastArray([
          ...requestedCasts.map((data) => ({
            value: data.subcast_id,
            label: data.subcast,
          }))
        ]);
      }
    } catch (error) {
      //Unauthorized
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
      //Internal Server Error
      else if (error.response && error.response.status === 500) {
        setServerError("Oops! Something went wrong on our server.");
      }
    } finally {
      dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    if (loggedUser && loggedUser.user) {
      setCommunityId(loggedUser.user.community_id);
      setMaritalStatus(loggedUser && loggedUser.user.marital_status && loggedUser.user.marital_status);
    }
  }, [loggedUser]);

  useEffect(() => {
    if (communityId) {
      fetchSubcastsCommunities();
    }
  }, [communityId]);
  useEffect(() => {
    if (isMyNumber) {
      setMobile(loggedUser && loggedUser.user.mobile);
    } else {
      setMobile('');
    }
  }, [isMyNumber]);

  useEffect(() => {
    getAllStates();
    setServerError('');
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
                    <legend>Matrimonial Info</legend>
                    <div className="card p-3">
                      <div className="row">
                        <div className="mb-3 col-lg-12 col-sm-12 col-xs-12">
                          <SelectField handleSelectChange={handleUpdateForChange} isRequired={true} value={updateFor}
                            errorServer={errors.profile_created_for} placeholder="Select Update For" label="For Whom, You are creating profile"
                            options={updateForOptions} fieldName="Field" />
                          {/* Add error handling if needed */}
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-lg-12 col-sm-12 col-xs-12">
                          <InputField handleChange={(e, errorMsg) => {
                            setMatrimonialProfileName(e.target.value);
                            setNameError(errorMsg);
                          }} isRequired={true} label={nameLabel} type="text"
                            errorServer={errors.matrimonial_profile_name} isAutoFocused={true} placeholder="Enter your full name"
                            isDisabled={updateFor && maritalStatus && updateFor.label === 'Self' && maritalStatus === 'Married'} fieldName="Name" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <InputField handleChange={(e, errorMsg) => {
                            setFatherName(e.target.value);
                            setFatherNameError(errorMsg);
                          }} isRequired={true} label="Father Name" type="text"
                            errorServer={errors.father_name} isAutoFocused={true} placeholder="Enter your father name"
                            isDisabled={updateFor && maritalStatus && updateFor.label === 'Self' && maritalStatus === 'Married'}
                            fieldName="Father name" />
                        </div>
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <InputField handleChange={(e, errorMsg) => {
                            setMotherName(e.target.value);
                            setMotherNameError(errorMsg);
                          }} isRequired={true} label="Mother Name"
                            errorServer={errors.mother_name} isAutoFocused={true} placeholder="Enter your mother name" type="text"
                            isDisabled={updateFor && maritalStatus && updateFor.label === 'Self' && maritalStatus === 'Married'}
                            fieldName="Mother name" />
                        </div>
                      </div>

                      <div className="row">

                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <label className="form-label">Gender {" "}<span className="text-danger">*</span></label>
                          <select
                            className="form-select form-control"
                            aria-label="Default select example"
                            value={gender}
                            onChange={(e, errorMsg) => {
                              setGender(e.target.value);
                              setGenderError(errorMsg);
                            }}
                            disabled={updateFor && maritalStatus && updateFor.label === 'Self' && maritalStatus === 'Married'}
                          >
                            <option value="">---Select Gender---</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                          {errors && errors.matrimonial_profile_gender && (
                            <span className="error">{errors.matrimonial_profile_gender}</span>
                          )}
                        </div>
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <label className="form-label">Date of Birth {" "}<span className="text-danger">*</span></label>
                          <input
                            type="date"
                            name="jobStartDate"
                            id="jobStartDate"
                            placeholder=""
                            className="form-control"
                            defaultValue={dob}
                            onChange={handleDateChange}
                            disabled={updateFor && maritalStatus && updateFor.label === 'Self' && maritalStatus === 'Married'}
                            min={minDate}
                            max={maxDate}

                          />
                          {errors && errors.matrimonial_profile_dob && (
                            <span className="error">{errors.matrimonial_profile_dob}</span>
                          )}
                          {/* Add error handling if needed */}
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <SelectField handleSelectChange={handleStateChange} isRequired={true} value={selectedState}
                            errorServer={errors.state} placeholder="select state..." label="State"
                            options={stateOptions} fieldName="State" />

                        </div>

                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <SelectField handleSelectChange={handleCityChange} isRequired={true} value={selectedCity}
                            errorServer={errors.city} placeholder="select city..." label="City"
                            options={cityOptions} fieldName="City" />
                        </div>
                      </div>

                      <div className="row">

                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <SelectField handleSelectChange={handleSubcastChange} isRequired={true} value={subcast}
                            errorServer={errors.subcast_id} placeholder="Select Your Subcast" label="Subcast"
                            options={subcastArray} fieldName="Subcast" />
                        </div>
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <InputField handleChange={(e) => setPaternalGotra(e.target.value)} label="Paternal Gotra" type="text"
                            errorServer={errors.paternal_gotra} placeholder="Enter your paternal gotra"
                            isDisabled={updateFor && maritalStatus && updateFor.label === 'Self' && maritalStatus === 'Married'} fieldName="Paternal gotra" />

                        </div>

                      </div>

                      <div className="row">
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <InputField handleChange={(e) => setMaternalGotra(e.target.value)} label="Maternal Gotra" type="text"
                            errorServer={errors.maternal_gotra} placeholder="Enter your maternal gotra"
                            isDisabled={updateFor && maritalStatus && updateFor.label === 'Self' && maritalStatus === 'Married'} fieldName="Maternal gotra" />

                        </div>
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">

                          <HtmlSelect handleSelectChange={(e) => setManglicStatus(e.target.value)} options={manglicOptions} value={manglicStatus} isRequired={false}
                            label="Manglik" fieldName="Manglik" disabled={updateFor && maritalStatus && updateFor.label === 'Self' && maritalStatus === 'Married'} />
                          {/* Add error handling if needed */}
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-12 col-md-6">

                          <HtmlSelect handleSelectChange={handleEducationChange} options={educationOptions} value={education} isRequired={false}
                            label="Select Education" fieldName="Select Education" errorServer={errors.matrimonial_profile_occupation}
                            isDisabled={updateFor && maritalStatus && updateFor.label === 'Self' && maritalStatus === 'Married'} />
                        </div>
                        <div className="mb-3 col-12 col-md-6">
                          <HtmlSelect handleSelectChange={handleMatrimonialOccupation} options={jobProfileOptions} value={matrimonialOccupation} isRequired={false}
                            label="Job Profile" fieldName="Job Profile" errorServer={errors.matrimonial_profile_occupation}
                            isDisabled={updateFor && maritalStatus && updateFor.label === 'Self' && maritalStatus === 'Married'} />
                        </div>
                        <div className="row">
                          <div className="mb-3 col-12 col-md-6">
                            <TextAreaField handleChange={handleJobProfileDes} placeholder="Enter Your Job Details" label="Job Description"
                              fieldName="Job Description" value={jobProfileDesc} maxLength={400} isRequired={false} isDisabled={updateFor && maritalStatus && updateFor.label === 'Self' && maritalStatus === 'Married'} />
                          </div>
                          <div className="mb-3 col-12 col-md-6">

                            <TextAreaField handleChange={handleEdcacDetails} placeholder="Enter Your Educational Details" label="Educational Details"
                              fieldName="Educational Details" value={educaDetails} maxLength={400} isRequired={false} isDisabled={updateFor && maritalStatus && updateFor.label === 'Self' && maritalStatus === 'Married'} />
                          </div>
                        </div>
                        <div class="mb-3 col-12">
                          <label className="form-label">Contact Detail {" "}<span className="text-danger">*</span></label>
                          <div className="form-check">
                            <input className="form-check-input" type="radio" name="contactOption" id="useMyNumber" value={isMyNumber} checked={isMyNumber} onClick={handleIsMyNumberClicked}
                              isDisabled={updateFor && maritalStatus && updateFor.label === 'Self' && maritalStatus === 'Married'} />
                            <label className="form-check-label" for="useMyNumber">Use My Number</label>
                          </div>
                          <div>
                            <MobileInput handleMobileChange={handleMobileNumberClicked} value={mobile}
                              errorServer={errors.contact_number} isRequired={true}
                              placeholder="Enter your mobile number" isDisabled={updateFor && maritalStatus && updateFor.label === 'Self' && maritalStatus === 'Married'} />
                          </div>

                        </div>


                      </div>

                      <div className="row">
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <HtmlSelect handleSelectChange={handleBrotherCount} options={numberBrotherOptions} value={brotherCount} isRequired={false}
                            label="Number of Brother(s)" fieldName="Number of Brother(s)" errorServer={errors.brother_count}
                            isDisabled={updateFor && maritalStatus && updateFor.label === 'Self' && maritalStatus === 'Married'} />
                          {/* Display the current value */}
                        </div>
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <HtmlSelect handleSelectChange={handleSisterCount} options={numberBrotherOptions} value={sisterCount} isRequired={false}
                            label="Number of Sister(s)" fieldName="Number of Sister(s)" errorServer={errors.sister_count}
                            isDisabled={updateFor && maritalStatus && updateFor.label === 'Self' && maritalStatus === 'Married'} />

                          {/* Display the current value */}
                        </div>
                      </div>

                      <div className="row">
                        <div className={`mb-3 ${isBrotherDetails ? 'col-lg-6' : 'col-lg-12'} col-sm-12 col-xs-12 ${showBrotherDetail ? '' : 'd-none'}`}>
                          <TextAreaField handleChange={(e) => setBrothersDetails(e.target.value)} placeholder="Enter Your Brother(s) details" label="Brothers Details" serverError={errors.brothers_details}
                            fieldName="Brothers Details" value={brothersDetails} maxLength={400} isRequired={false} isDisabled={updateFor && maritalStatus && updateFor.label === 'Self' && maritalStatus === 'Married'} />
                        </div>
                        <div className={`mb-3 ${isSisterDetails ? 'col-lg-6' : 'col-lg-12'} col-sm-12 col-xs-12 ${showSisterDetail ? '' : 'd-none'}`}>
                          <TextAreaField handleChange={(e) => setSistersDetails(e.target.value)} placeholder="Enter Your Sister(s) details" label="Sister Details" serverError={errors.sisters_details}
                            fieldName="Sisters Details" value={sistersDetails} maxLength={400} isRequired={false} isDisabled={updateFor && maritalStatus && updateFor.label === 'Self' && maritalStatus === 'Married'} />
                        </div>
                      </div>


                      <div className="row">
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12 package-container position-relative">
                          <InputField handleChange={handlePackageChange} label="Package (Annual)" type="numeric" value={packageValue}
                            placeholder="Enter Your Income..." maxLength={3} classname="mt-2"
                            isDisabled={updateFor && maritalStatus && updateFor.label === 'Self' && maritalStatus === 'Married'} fieldName="Package" />

                          <HtmlSelect handleSelectChange={handleUnitChange} options={currencyOptions} value={unit} isRequired={packageValue ? true : false}
                            fieldName="Select Unit" errorServer={errors.matrimonial_profile_occupation}
                            isDisabled={updateFor && maritalStatus && updateFor.label === 'Self' && maritalStatus === 'Married'} classname='position-absolute form-control' />


                          <p style={{ fontSize: '12px' }}>(Only allow numeric value.)</p>
                          {errors && errors.salary_package && (
                            <span className="error">{errors.salary_package}</span>
                          )}
                          {/* Add error handling if needed */}
                        </div>
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <label className="form-label">Height</label>
                          <div className="d-flex">
                            <div>
                              <label
                                htmlFor="feet"
                                className="col-lg-6 col-sm-12 col-xs-12 text-secondary"
                              >
                                Feet:
                              </label>
                              <input
                                type="range"
                                name=""
                                id=""
                                min="1"
                                max="9"
                                value={heightFeet}
                                disabled={updateFor && maritalStatus && updateFor.label === 'Self' && maritalStatus === 'Married'}
                                onChange={(e) =>
                                  setHeightFeet(parseInt(e.target.value, 10))
                                }
                              />

                              <span>{heightFeet}</span>{" "}
                              {/* Display the current value */}
                            </div>
                            <div>
                              <label
                                htmlFor="inch"
                                className="col-lg-6 col-sm-12 col-xs-12 text-secondary"
                              >
                                Inches:
                              </label>
                              <input
                                type="range"
                                name=""
                                id=""
                                min="0"
                                max="12"
                                value={heightInch}
                                disabled={updateFor && maritalStatus && updateFor.label === 'Self' && maritalStatus === 'Married'}
                                onChange={(e) =>
                                  setHeightInch(parseInt(e.target.value, 10))
                                }
                              />
                              <span>{heightInch}</span>{" "}
                              {/* Display the current value */}
                            </div>

                            {errors && errors.height_in_feet && (
                              <span className="error">{errors.height_in_feet}</span>
                            )}
                          </div>
                        </div>

                      </div>

                      <div className="row">
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <label className="form-label">Proposal Photo</label>
                          <p>Add atleast 2 and maximum 5 photos(should be in png, jpg, jpeg format)</p>
                          <input
                            type="file"
                            className="form-control"
                            accept="image/jpeg, image/png"
                            id="proposalPhoto"
                            defaultValue={proposalPhoto}
                            onChange={handleProposalPhotoChange}
                            multiple
                            disabled={updateFor && maritalStatus && updateFor.label === 'Self' && maritalStatus === 'Married'}
                          />
                          {messagePhotos && <span className="error">{messagePhotos}</span>}
                          {errors && errors.proposal_photos && (
                            <span className="error">{errors.proposal_photos}</span>
                          )}
                          <div className="proposal-Photo d-flex">
                            {proposalPreview &&
                              proposalPreview.map((item, idx) => (
                                <div className="m-2" key={idx}>
                                  {
                                    item.trim() !== '' && (
                                      <>
                                        <img src={item} alt={`Photos ${idx + 1}`} />
                                        <button
                                          type="button"
                                          className="btn"
                                          onClick={() => handleDeleteImage(idx)}
                                        >
                                          <i className="fas fa-trash"></i>
                                        </button>
                                      </>
                                    )
                                  }
                                </div>
                              ))}
                          </div>
                        </div>

                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <label className="form-label">Biodata</label>
                          <p>Upload biodata (in pdf format only)</p>
                          <input
                            type="file"
                            className="form-control"
                            accept=".pdf, .doc"
                            id="biodata"
                            onChange={handleBiodataFileChange}
                            multiple
                            disabled={updateFor && maritalStatus && updateFor.label === 'Self' && maritalStatus === 'Married'}
                          />
                          {messageBiodata && <span className="error">{messageBiodata}</span>}
                          {errors && errors.biodata && (
                            <span className="error">{errors.biodata}</span>
                          )}
                          <div className="proposal-Photo d-flex">
                            <span>{biodataPreview ? "file selected" : ""}</span>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <textarea
                            className="text-area form-control mt-2"
                            placeholder="Enter Other Details If Any..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            isDisabled={updateFor && maritalStatus && updateFor.label === 'Self' && maritalStatus === 'Married'}
                          >
                          </textarea>
                        </div>

                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-lg-6 col-sm-12 col-xs-12">
                        <button type="submit" className="btn btn-primary"
                          disabled={
                            (
                              (updateFor && maritalStatus && updateFor.label === 'Self' && maritalStatus === 'Married')
                            )
                          }
                        >
                          Submit
                        </button>

                        <button type="button" className="btn btn-primary m-2" onClick={(e) => {
                          e.preventDefault();
                          navigate('/profile');
                        }}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div >
      </div >
    </div >
  );
};

export default CreateMatrimonial;
