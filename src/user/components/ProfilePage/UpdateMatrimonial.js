import { useEffect, useState } from "react";
import {
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
const UpdateMatrimonial = (props) => {
  const { userMatrimonial } = props;

  const user = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();

  const [updateFor, setUpdateFor] = useState(null);
  const updateForOptions = [
    { value: 'Self', label: 'Self' },
    { value: 'Brother', label: 'Brother' },
    { value: 'Sister', label: 'Sister' },
    { value: 'Son', label: 'Son' },
    { value: 'Daughter', label: 'Daughter' },
  ];

  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [skinTone, setSkinTone] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInch, setHeightInch] = useState("");
  const [weight, setWeight] = useState("");
  const [cast, setCast] = useState("");
  const [gotraSelf, setGotraSelf] = useState("");
  const [paternalGotra, setPaternalGotra] = useState("");
  const [maternalGotra, setMaternalGotra] = useState("");

  const [gender, setGender] = useState('');
  const [dob, setDOB] = useState(null);
  const [manglicStatus, setManglicStatus] = useState(0); // Initial manglic status

  const [numBrothers, setNumBrothers] = useState(0); // Number of brothers
  const [numSisters, setNumSisters] = useState(0); // Number of sisters
  const [brothersDetails, setBrothersDetails] = useState(''); // Details of brothers
  const [sistersDetails, setSistersDetails] = useState('');
  const [packageValue, setPackageValue] = useState(null); // Change to null for react-select
  const [showBrotherDetail, setShowBrotherDetail] = useState(false);
  const [showSisterDetail, setShowSisterDetail] = useState(false);

  const packageOptions = [
    { value: '0-2lakh', label: '0 - 2 lakh' },
    { value: '2-5lakh', label: '2 - 5 lakh' },
    { value: '5-7lakh', label: '5 - 7 lakh' },
    { value: '7-10lakh', label: '7 - 10 lakh' },
    { value: '10-15lakh', label: '10 - 15 lakh' },
    { value: '15-20lakh', label: '15 - 20 lakh' },
    { value: 'morethan20lakh', label: 'More than 20 lakh' },
  ];

  const [brotherCount, setBrotherCount] = useState('');
  const [sisterCount, setSisterCount] = useState('');

  const [proposalPhoto, setProposalPhoto] = useState([]);
  const [tempProposalPhotoUrl, setTempProposalPhotoUrl] = useState([]);
  const [proposalPreview, setProposalPreview] = useState([]);

  const [biodataFile, setBiodataFile] = useState("");
  const [tempBiodataFileUrl, setTempBiodataFileUrl] = useState("");
  const [biodataPreview, setBiodataPreview] = useState("");

  const [errors, setErrors] = useState("");
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();

  const handleUpdateForChange = (selectedOption) => {
    setUpdateFor(selectedOption);

    if (selectedOption.label === 'Self') {
      setGender(user.user.gender);

      setDOB(yyyyMmDdFormat(user.user.dob));
    } else {
      setGender('');
      setDOB(dayjs().add(0, 'day'));
    }
  };



  const handlePackageChange = (selectedOption) => {
    setPackageValue(selectedOption);
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

    const combinedUrls = [...previewUrls, ...tempProposalPhotoUrl];
    setProposalPreview(combinedUrls);

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
        setServerError('');
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
    setBiodataPreview(URL.createObjectURL(selectedFiles));

    const formData = new FormData();
    formData.append("pdf", selectedFiles);

    try {
      dispatch(setLoader(true));
      const response = await uploadPdf(formData); // Make an API call to get temporary URL
      if (response && response.status === 200) {
        setTempBiodataFileUrl(response.data.data.file);
        setServerError('');
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
        navigate("/login");
      }
      //Internal Server Error
      else if (error.response && error.response.status === 500) {
        setServerError("Oops! Something went wrong on our server.");
      }
    }
  };

  const handleDOBChange = (isoDateString) => {
    setDOB(isoDateString);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(setLoader(true));

    const matrimonialData = {
      father_name: fatherName,
      mother_name: motherName,
      height_in_feet: `${heightFeet}.${heightInch}`,
      maternal_gotra: maternalGotra,
      paternal_gotra: paternalGotra,
      cast: cast,
      proposal_photos: tempProposalPhotoUrl, // Use the temporary URL
      biodata: tempBiodataFileUrl, // Use the temporary URL
      brother_count: brotherCount ? brotherCount : 0,
      sister_count: sisterCount ? sisterCount : 0,
      brothers_details: brothersDetails ? brothersDetails : '',
      sisters_details: sistersDetails ? sistersDetails : '',
      salary_package: packageValue ? packageValue.label : '',
      matrimonial_profile_gender: gender,
      matrimonial_profile_dob: dob,
      is_manglik: manglicStatus,
      profile_created_for: updateFor && updateFor.label,
      skin_tone: 'DARK',
    };


    try {
      const response = await updateMatrimonialInfo(matrimonialData);
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

  useEffect(() => {
    // Set default values from userMatrimonial prop when it changes
    if (userMatrimonial) {
      setFatherName(userMatrimonial.father_name || "N/A");
      setMotherName(userMatrimonial.mother_name || "N/A");
      setSkinTone(userMatrimonial.skin_tone || "");
      setHeightFeet(getFeet(userMatrimonial.height_in_feet) || "N/A");
      setHeightInch(getInches(userMatrimonial.height_in_feet) || "N/A");
      setWeight(userMatrimonial.weight_in_kg || "N/A");
      setCast(userMatrimonial.cast || "N/A");
      setGotraSelf(userMatrimonial.gotra || "N/A");
      setMaternalGotra(userMatrimonial.maternal_gotra || "N/A");
      setPaternalGotra(userMatrimonial.paternal_gotra || "N/A");
      setProposalPhoto(userMatrimonial.proposal_photos || "N/A");
      setBrotherCount(userMatrimonial.brother_count);
      setSisterCount(userMatrimonial.sister_count);

      setPackageValue({
        value: userMatrimonial.salary_package,
        label: userMatrimonial.salary_package,
      });
      {
        userMatrimonial &&
          userMatrimonial.proposal_photos &&
          Array.isArray(userMatrimonial.proposal_photos)
          ? setTempProposalPhotoUrl(userMatrimonial.proposal_photos || "")
          : setTempProposalPhotoUrl([userMatrimonial.proposal_photos] || "");
      }

      {
        userMatrimonial &&
          userMatrimonial.proposal_photos &&
          Array.isArray(userMatrimonial.proposal_photos)
          ? setProposalPreview(userMatrimonial.proposal_photos || "")
          : setProposalPreview([userMatrimonial.proposal_photos] || "");
      }

      setBiodataFile(userMatrimonial.biodata || "");
      setBiodataPreview(userMatrimonial.biodata || "");
      setTempBiodataFileUrl(userMatrimonial.biodata || "");

      if (userMatrimonial.brothers_details) {
        setBrothersDetails(userMatrimonial.brothers_details);
        setShowBrotherDetail(true);
      }
      if (userMatrimonial.sisters_details) {
        setSistersDetails(userMatrimonial.sisters_details);
        setShowSisterDetail(true);
      }

      if (userMatrimonial.profile_created_for !== null) {
        setUpdateFor({
          value: userMatrimonial.profile_created_for,
          label: userMatrimonial.profile_created_for,
        });
        if (userMatrimonial.profile_created_for === 'Self') {
          setGender(user.user.gender);
          setDOB(yyyyMmDdFormat(user.user.dob));
        } else {
          setGender(userMatrimonial.matrimonial_profile_gender);
          setDOB(yyyyMmDdFormat(userMatrimonial.matrimonial_profile_dob));
        }
      }

      // You can similarly handle the proposalPhoto and biodataFile values here if needed
    }

  }, [userMatrimonial]);

  useEffect(() => {
    setServerError('');
  }, []);

  return (
    <div id="auth-wrapper" className="pt-5 pb-5">
      <div className="container">
        <div className="card shadow">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12 p-4">
                {serverError && <span className='error'>{serverError}</span>}
                <div className="card-title">
                  <h3 className="mb-3">Matrimonial Info</h3>
                </div>
                <form onSubmit={handleSubmit} className="w-100 w-lg-75">
                  <div className="row">
                    <div className="mb-3 col-lg-12 col-sm-12 col-xs-12">
                      <label className="form-label">For Whom, You are creating profile</label>
                      <Select
                        value={updateFor}
                        onChange={handleUpdateForChange}
                        options={updateForOptions}
                        placeholder="Select Update For"
                      />
                      {/* Add error handling if needed */}
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Father Name</label>
                      <input
                        type="text"
                        name="fatherName"
                        id="fatherName"
                        placeholder="Enter Father Name"
                        className="form-control"
                        autoFocus
                        defaultValue={fatherName}
                        onChange={(e) => setFatherName(e.target.value)}
                      />
                      {errors.father_name && (
                        <span className="error">{errors.father_name}</span>
                      )}
                    </div>
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Mother Name</label>
                      <input
                        type="text"
                        name="motherName"
                        id="motherName"
                        placeholder="Enter Mother Name"
                        className="form-control"
                        defaultValue={motherName}
                        onChange={(e) => setMotherName(e.target.value)}
                      />
                      {errors.mother_name && (
                        <span className="error">{errors.mother_name}</span>
                      )}
                    </div>
                  </div>

                  <div className="row">

                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Gender</label>
                      <select
                        className="form-select form-control"
                        aria-label="Default select example"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        disabled={updateFor && updateFor.label === 'Self'}
                      >
                        <option value="">---Select Gender---</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                      {errors.gender && (
                        <span className="error">{errors.gender}</span>
                      )}
                    </div>
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Date of Birth</label>
                      <input
                        type="date"
                        name="jobStartDate"
                        id="jobStartDate"
                        placeholder=""
                        className="form-control"
                        defaultValue={dob}
                        onChange={(e) => setDOB(e.target.value)}
                        disabled={updateFor && updateFor.label === 'Self'}
                      />
                      {errors.dob && (
                        <span className="error">{errors.dob}</span>
                      )}
                      {/* Add error handling if needed */}
                    </div>
                  </div>

                  <div className="row">
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Cast</label>
                      <input
                        type="text"
                        name="cast"
                        id="cast"
                        placeholder="Enter Cast"
                        className="form-control"
                        defaultValue={cast}
                        onChange={(e) => setCast(e.target.value)}
                      />
                      {errors.cast && (
                        <span className="error">{errors.cast}</span>
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
                      />
                      {errors.gotra && (
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
                      />
                      {errors.maternal_gotra && (
                        <span className="error">{errors.maternal_gotra}</span>
                      )}
                    </div>
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Manglik</label>
                      <select
                        className="form-select form-control"
                        aria-label="Manglic select"
                        value={manglicStatus === 1 ? 'YES' : 'NO'}
                        onChange={(e) => setManglicStatus(e.target.value === 'YES' ? 1 : 0)}
                      >
                        <option value="">---Select Manglic Status---</option>
                        <option value="YES">YES</option>
                        <option value="NO">NO</option>
                      </select>
                      {/* Add error handling if needed */}
                    </div>

                    <div className="row">
                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        
                        <label className="form-label">Number of Brother(s)</label>
                        <select id="numberDropdown" name="numberDropdown" className="form-control" value={brotherCount} onChange={handleBrotherCount}>
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
                        {errors.brother_count && (
                          <span className="error">{errors.brother_count}</span>
                        )}
                        {/* Display the current value */}
                      </div>
                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <label className="form-label">Number of Sister(s)</label>
                        <select id="numberDropdown" name="numberDropdown" className="form-control" value={sisterCount} onChange={handleSisterCount}>
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
                        {errors.sister_count && (
                          <span className="error">{errors.sister_count}</span>
                        )}
                        {/* Display the current value */}
                      </div>
                    </div>

                    <div className="row">
                      <div className={`mb-3 col-lg-6 col-sm-12 col-xs-12 ${showBrotherDetail ? '' : 'd-none'}`}>
                        <label className="form-label">Brothers Details</label>

                        <input
                          type="area"
                          placeholder="Enter Your Brother(s) details"
                          className="form-control mt-2"
                          defaultValue={brothersDetails}
                          onChange={(e) => setBrothersDetails(e.target.value)}
                        />
                        {errors.brothers_details && (
                          <span className="error">{errors.brothers_details}</span>
                        )}
                      </div>

                      <div className={`mb-3 col-lg-6 col-sm-12 col-xs-12 ${showSisterDetail ? '' : 'd-none'}`}>
                        <label className="form-label">Sisters Details</label>
                        <input
                          type="area"
                          placeholder="Enter Your Sister(s) details"
                          className="form-control mt-2"
                          defaultValue={sistersDetails}
                          onChange={(e) => setSistersDetails(e.target.value)}
                        />
                        {errors.sisters_details && (
                          <span className="error">{errors.sisters_details}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Package</label>
                      <Select
                        value={packageValue}
                        onChange={handlePackageChange}
                        options={packageOptions}
                        placeholder="Select Package"
                      />
                      {errors.salary_package && (
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
                            defaultValue={heightFeet}
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
                            min="1"
                            max="12"
                            defaultValue={heightInch}
                            onChange={(e) =>
                              setHeightInch(parseInt(e.target.value, 10))
                            }
                          />
                          <span>{heightInch}</span>{" "}
                          {/* Display the current value */}
                        </div>

                        {errors.height_in_feet && (
                          <span className="error">{errors.height_in_feet}</span>
                        )}
                      </div>
                    </div>

                  </div>

                  <div className="row">
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Proposal Photo </label>
                      <input
                        type="file"
                        className="form-control"
                        accept=".png, .jpg, .jpeg"
                        id="proposalPhoto"
                        defaultValue={proposalPhoto}
                        onChange={handleProposalPhotoChange}
                        multiple
                      />
                      {errors.proposal_photos && (
                        <span className="error">{errors.proposal_photos}</span>
                      )}
                      <div className="proposal-Photo d-flex">
                        {proposalPreview &&
                          proposalPreview.map((item, idx) => (
                            <div className="m-2" key={idx}>
                              <img src={item} alt={`Photos ${idx + 1}`} />
                              <button
                                type="button"
                                className="btn"
                                onClick={() => handleDeleteImage(idx)}
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Biodata </label>
                      <input
                        type="file"
                        className="form-control"
                        accept=".pdf ,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        id="biodata"
                        onChange={handleBiodataFileChange}
                        multiple
                      />
                      {errors.biodata && (
                        <span className="error">{errors.biodata}</span>
                      )}
                      <div className="proposal-Photo d-flex">
                        <span>{biodataPreview ? "file selected" : ""}</span>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-lg-6 col-sm-12 col-xs-12">
                      <button type="submit" className="btn btn-primary">
                        Update
                      </button>
                      <button type="button" className="btn btn-primary m-2" onClick={(e) => {
                        e.preventDefault();
                        navigate('/profile');
                      }}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div >
      </div >
    </div >
  );
};

export default UpdateMatrimonial;
