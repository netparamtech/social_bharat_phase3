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
  const [packageValue, setPackageValue] = useState(''); // Change to null for react-select
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

  const navigate = useNavigate();

  const jobProfile = [
    "Government",
    "Private",
    "Doctor",
    "Engineer",
    "Sales",
    "Marketing",
    // Add more job profiles as needed
  ];

  const handleSubcastChange = (selectedOption) => {
    setSubcast(selectedOption);
    setSubcastId(selectedOption.value);
  };

  const handleUpdateForChange = (selectedOption) => {
    setUpdateFor(selectedOption);

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
  const handleMobileNumberClicked = (e) => {
    setMobile(e.target.value);
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
        setErrors(error.response.data.errors);
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
        setErrors(error.response.data.errors);
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
    dispatch(setLoader(true));

    const trimmedTempProposalPhotoUrl = tempProposalPhotoUrl.map(item => item.trim()).filter((item) => item !== '');
    console.log(trimmedTempProposalPhotoUrl.length, "Check create length")

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
      salary_package: packageValue ? packageValue : '',
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

  const handleDateChange = (e) => {
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
      }
    }
  }

  //state and city change operations
  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);

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

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
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

  //   useEffect(() => {
  //     // Set default values from userMatrimonial prop when it changes
  //     if (userMatrimonial) {
  //       setMatrimonialProfileName(userMatrimonial.matrimonial_profile_name || "N/A")
  //       setFatherName(userMatrimonial.father_name || "N/A");
  //       setMotherName(userMatrimonial.mother_name || "N/A");
  //       setSkinTone(userMatrimonial.skin_tone || "");
  //       setHeightFeet(getFeet(userMatrimonial.height_in_feet) || 0);
  //       setHeightInch(getInches(userMatrimonial.height_in_feet) || 0);
  //       setWeight(userMatrimonial.weight_in_kg || "N/A");
  //       setCast(userMatrimonial.cast || communityName);
  //       setGotraSelf(userMatrimonial.gotra || "N/A");
  //       setMaternalGotra(userMatrimonial.maternal_gotra || "N/A");
  //       setPaternalGotra(userMatrimonial.paternal_gotra || "N/A");
  //       setProposalPhoto(userMatrimonial.proposal_photos || "N/A");
  //       setBrotherCount(userMatrimonial.brother_count);
  //       setSisterCount(userMatrimonial.sister_count);
  //       setPackageValue(userMatrimonial.salary_package);
  //       setDescription(userMatrimonial.description || "");
  //       {
  //         userMatrimonial && userMatrimonial.proposal_photos && (
  //           setTempProposalPhotoUrl(
  //             Array.isArray(userMatrimonial.proposal_photos)
  //               ? userMatrimonial.proposal_photos
  //               : [userMatrimonial.proposal_photos]
  //           )
  //         )
  //       }


  //       {
  //         userMatrimonial &&
  //           userMatrimonial.proposal_photos &&
  //           Array.isArray(userMatrimonial.proposal_photos)
  //           ? setProposalPreview(userMatrimonial.proposal_photos || "")
  //           : setProposalPreview([userMatrimonial.proposal_photos] || "");
  //       }

  //       setBiodataFile(userMatrimonial.biodata || "");
  //       setBiodataPreview(userMatrimonial.biodata || "");
  //       setTempBiodataFileUrl(userMatrimonial.biodata || "");
  //       setSubcast({ value: userMatrimonial.subcast_id, label: userMatrimonial.subcast });
  //       setSubcastId(userMatrimonial.subcast_id);

  //       if (userMatrimonial.brothers_details) {

  //         setBrothersDetails(userMatrimonial.brothers_details);
  //         setShowBrotherDetail(true);
  //       } else {
  //         setIsBrotherDetails(false);
  //       }
  //       if (userMatrimonial.sisters_details) {
  //         setSistersDetails(userMatrimonial.sisters_details);
  //         setShowSisterDetail(true);
  //       } else {
  //         setIsSisterDetails(false);
  //       }

  //       if (userMatrimonial.profile_created_for !== null) {
  //         setUpdateFor({
  //           value: userMatrimonial.profile_created_for,
  //           label: userMatrimonial.profile_created_for,
  //         });
  //         if (userMatrimonial.profile_created_for === 'Self') {
  //           setGender(user.user.gender);

  //           setDOB(yyyyMmDdFormat(user.user.dob));
  //         } else {
  //           setGender(userMatrimonial.matrimonial_profile_gender);
  //           setDOB(yyyyMmDdFormat(userMatrimonial.matrimonial_profile_dob));
  //         }
  //       }

  //       // You can similarly handle the proposalPhoto and biodataFile values here if needed
  //     }

  //   }, [userMatrimonial]);

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
        setSubcastArray(requestedCasts);
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
                          <label className="form-label">For Whom, You are creating profile {" "}<span className="text-danger">*</span></label>
                          <Select
                            value={updateFor}
                            onChange={handleUpdateForChange}
                            options={updateForOptions}
                            placeholder="Select Update For"
                          />
                          {errors && errors.profile_created_for && (
                            <span className="error">{errors.profile_created_for}</span>
                          )}
                          {/* Add error handling if needed */}
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-lg-12 col-sm-12 col-xs-12">
                          <label className="form-label">{nameLabel} {" "}<span className="text-danger">*</span></label>
                          <input
                            type="text"
                            name="fatherName"
                            id="fatherName"
                            placeholder="Enter your full name"
                            className="form-control "
                            autoFocus
                            defaultValue={matrimonialProfileName}
                            onChange={(e) => setMatrimonialProfileName(e.target.value)}
                            disabled={updateFor && maritalStatus && updateFor.label === 'Self' && maritalStatus === 'Married'}

                          />
                          {errors && errors.matrimonial_profile_name && (
                            <span className="error">{errors.matrimonial_profile_name}</span>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <label className="form-label">Father Name {" "}<span className="text-danger">*</span></label>
                          <input
                            type="text"
                            name="fatherName"
                            id="fatherName"
                            placeholder="Enter Father Name"
                            className="form-control "
                            autoFocus
                            defaultValue={fatherName}
                            onChange={(e) => setFatherName(e.target.value)}
                            disabled={updateFor && maritalStatus && updateFor.label === 'Self' && maritalStatus === 'Married'}

                          />
                          {errors && errors.father_name && (
                            <span className="error">{errors.father_name}</span>
                          )}
                        </div>
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <label className="form-label">Mother Name {" "}<span className="text-danger">*</span></label>
                          <input
                            type="text"
                            name="motherName"
                            id="motherName"
                            placeholder="Enter Mother Name"
                            className="form-control"
                            defaultValue={motherName}
                            onChange={(e) => setMotherName(e.target.value)}
                            disabled={updateFor && maritalStatus && updateFor.label === 'Self' && maritalStatus === 'Married'}
                          />
                          {errors && errors.mother_name && (
                            <span className="error">{errors.mother_name}</span>
                          )}
                        </div>
                      </div>

                      <div className="row">

                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <label className="form-label">Gender {" "}<span className="text-danger">*</span></label>
                          <select
                            className="form-select form-control"
                            aria-label="Default select example"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
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

                          />
                          {errors && errors.matrimonial_profile_dob && (
                            <span className="error">{errors.matrimonial_profile_dob}</span>
                          )}
                          {/* Add error handling if needed */}
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <label className="form-label">State</label>

                          <Select
                            className=""
                            options={states.map((state) => ({
                              value: state.name,
                              label: state.name,
                            }))}
                            value={selectedState}
                            onChange={handleStateChange}
                          />
                          {errors.state && (
                            <span className="error">{errors.state}</span>
                          )}


                        </div>

                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <label className="form-label">City</label>

                          <Select
                            options={cities.map((city) => ({
                              value: city.name,
                              label: city.name,
                            }))}
                            value={selectedCity}
                            onChange={handleCityChange}
                          />
                          {errors.city && (
                            <span className="error">{errors.city}</span>
                          )}

                        </div>
                      </div>

                      <div className="row">

                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <label className="form-label">Subcast</label>
                          <Select
                            id="community_id"
                            className="form-control"
                            aria-label="Default select example"
                            value={subcast} // Provide a selected option state
                            onChange={handleSubcastChange} // Your change handler function
                            options={
                              subcastArray &&
                              subcastArray.map((data) => ({
                                value: data.subcast_id,
                                label: data.subcast,
                              }))
                            }
                            placeholder="---Select---"
                          />
                          {errors && errors.subcast_id && (
                            <span className="error">{errors.subcast_id}</span>
                          )}
                        </div>
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <label className="form-label">Paternal Gotra </label>
                          <input
                            type="text"
                            name="gotra"
                            id="gotra"
                            placeholder="Enter Gotra"
                            className="form-control"
                            defaultValue={paternalGotra}
                            onChange={(e) => setPaternalGotra(e.target.value)}
                            disabled={updateFor && maritalStatus && updateFor.label === 'Self' && maritalStatus === 'Married'}
                          />
                          {errors && errors.gotra && (
                            <span className="error">{errors.paternal_gotra}</span>
                          )}
                        </div>

                      </div>

                      <div className="row">
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <label className="form-label">Maternal Gotra</label>
                          <input
                            type="text"
                            name="maternal"
                            id="maternal"
                            placeholder="Enter Maternal Gotra"
                            className="form-control"
                            defaultValue={maternalGotra}
                            onChange={(e) => setMaternalGotra(e.target.value)}
                            disabled={updateFor && maritalStatus && updateFor.label === 'Self' && maritalStatus === 'Married'}
                          />
                          {errors && errors.maternal_gotra && (
                            <span className="error">{errors.maternal_gotra}</span>
                          )}
                        </div>
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <label className="form-label">Manglik</label>
                          <select
                            className="form-select form-control"
                            aria-label="Manglic select"
                            value={manglicStatus}
                            disabled={updateFor && maritalStatus && updateFor.label === 'Self' && maritalStatus === 'Married'}
                            onChange={(e) => setManglicStatus(e.target.value)}
                          >
                            <option value="">---Select Manglic Status---</option>
                            <option value="YES">YES</option>
                            <option value="NO">NO</option>

                          </select>
                          {/* Add error handling if needed */}
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-12 col-md-6">
                          <label className="form-label">Select Education </label>

                          <select className="form-select form-control" aria-label="Education select" placeholder="Select Education..." value={education} onChange={handleEducationChange}>
                            <option value="">Select..</option>
                            <option value="10th">10th</option>
                            <option value="12th">12th</option>
                            <option value="Graduate">Graduate</option>
                            <option value="Post Graduate">Post Graduate</option>
                            <option value="Under Graduate">Under Graduate</option>
                            <option value="Diploma">Diploma</option>
                            <option value="Under Diploma">Under Diploma</option>
                          </select>

                          {errors && errors.matrimonial_profile_occupation && (
                            <span className="error">{errors.matrimonial_profile_occupation}</span>
                          )}
                        </div>
                        <div className="mb-3 col-12 col-md-6">
                          <label className="form-label">Job Profile </label>

                          <select id="jobProfile" name="jobProfile" className="form-select form-control"
                            aria-label="job profile select" value={matrimonialOccupation} onChange={handleMatrimonialOccupation}
                            disabled={updateFor && maritalStatus && updateFor.label === 'Self' && maritalStatus === 'Married'}
                          >
                            <option value="">Select</option>
                            {
                              jobProfile && jobProfile.map((item, index) => (
                                <option value={item}>{item}</option>
                              ))
                            }
                          </select>
                          {errors && errors.matrimonial_profile_occupation && (
                            <span className="error">{errors.matrimonial_profile_occupation}</span>
                          )}
                        </div>
                        <div className="mb-3 col-12">
                          <label className="form-label">Job Description </label>
                          <textarea className="form-control" value={jobProfileDesc} onChange={handleJobProfileDes}></textarea>
                        </div>
                        <div class="mb-3 col-12">
                          <label className="form-label">Contact Detail</label>
                          <div className="form-check">
                            <input className="form-check-input" type="radio" name="contactOption" id="useMyNumber" value={isMyNumber} checked={isMyNumber} onClick={handleIsMyNumberClicked} />
                            <label className="form-check-label" for="useMyNumber">Use My Number</label>
                          </div>
                          <div>
                            <input type="text" className="form-control" placeholder="Enter Mobile Number.." value={mobile} onChange={handleMobileNumberClicked} />
                          </div>
                        </div>


                      </div>

                      <div className="row">
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">

                          <label className="form-label">Number of Brother(s)</label>
                          <select id="numberDropdown" name="numberDropdown" className="form-control"
                            disabled={updateFor && maritalStatus && updateFor.label === 'Self' && maritalStatus === 'Married'} value={brotherCount} onChange={handleBrotherCount}>
                            <option value="0" defaultChecked>0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>

                          </select>
                          {errors && errors.brother_count && (
                            <span className="error">{errors.brother_count}</span>
                          )}
                          {/* Display the current value */}
                        </div>
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <label className="form-label">Number of Sister(s)</label>
                          <select id="numberDropdown" name="numberDropdown" className="form-control"
                            disabled={updateFor && maritalStatus && updateFor.label === 'Self' && maritalStatus === 'Married'} value={sisterCount} onChange={handleSisterCount}>
                            <option value="0" defaultChecked>0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>

                          </select>
                          {errors && errors.sister_count && (
                            <span className="error">{errors.sister_count}</span>
                          )}
                          {/* Display the current value */}
                        </div>
                      </div>

                      <div className="row">
                        <div className={`mb-3 ${isBrotherDetails ? 'col-lg-6' : 'col-lg-12'} col-sm-12 col-xs-12 ${showBrotherDetail ? '' : 'd-none'}`}>
                          <label className="form-label">Brothers Details</label>

                          <textarea
                            type="area"
                            placeholder="Enter Your Brother(s) details"
                            className="form-control mt-2"
                            defaultValue={brothersDetails}
                            onChange={(e) => setBrothersDetails(e.target.value)}
                            disabled={updateFor && maritalStatus && updateFor.label === 'Self' && maritalStatus === 'Married'}
                          />
                          {errors && errors.brothers_details && (
                            <span className="error">{errors.brothers_details}</span>
                          )}
                        </div>

                        <div className={`mb-3 ${isSisterDetails ? 'col-lg-6' : 'col-lg-12'} col-sm-12 col-xs-12 ${showSisterDetail ? '' : 'd-none'}`}>
                          <label className="form-label">Sisters Details</label>
                          <textarea
                            type="area"
                            placeholder="Enter Your Sister(s) details"
                            className="form-control mt-2"
                            defaultValue={sistersDetails}
                            onChange={(e) => setSistersDetails(e.target.value)}
                            disabled={updateFor && maritalStatus && updateFor.label === 'Self' && maritalStatus === 'Married'}
                          />
                          {errors && errors.sisters_details && (
                            <span className="error">{errors.sisters_details}</span>
                          )}
                        </div>
                      </div>


                      <div className="row">
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <label className="form-label">Package</label>
                          <input
                            value={packageValue}
                            className="form-control mt-2"
                            onChange={handlePackageChange}
                            placeholder="Enter Your Income..."
                            disabled={updateFor && maritalStatus && updateFor.label === 'Self' && maritalStatus === 'Married'}
                          />
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
                                max="15"
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
                            accept="images/*"
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
                          <p>upload biodata in pdf format only</p>
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
                          >
                          </textarea>
                        </div>

                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-lg-6 col-sm-12 col-xs-12">
                        <button type="submit" className="btn btn-primary"
                          disabled={updateFor && maritalStatus && updateFor.label === 'Self' && maritalStatus === 'Married'}
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
