import { useEffect, useState } from 'react';
import { fetchAllActiveBusinessCategories, fetchAllCitiesByStateID, fetchAllStatesByCountryID, updateBusinessInfo, updateMatrimonialInfo, uploadMultipleImages, uploadPdf } from '../../services/userService';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../actions/loaderAction';

const UpdateBusinessProfile = (props) => {
  const { businessDetails } = props;
  const [businessName, setBusinessName] = useState('');
  const [businessCategory, setBusinessCategory] = useState('');
  const [businessType, SetBusinessType] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [contact1, setContact1] = useState('');
  const [contact2, setContact2] = useState('');
  const [contact3, setContact3] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [businessWebsite, setBusinessWebsite] = useState('');
  const [status, setStatus] = useState('');
  const [businessId, setBusinessId] = useState('');
  const [description, setDescription] = useState('');

  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countryID, setCountryID] = useState('101');

  const [businessCategories, setBusinessCategories] = useState([]);

  const [businessPhoto, setBusinessPhoto] = useState([]);
  const [tempBusinessPhotoUrl, setTempBusinessPhotoUrl] = useState([]);
  const [businessPreview, setBusinessPreview] = useState([]);
  const [googleMapLink, setGoogleMapLink] = useState('');

  const [errors, setErrors] = useState('');
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBusinessPhotoChange = async (e) => {
    const selectedFiles = e.target.files;
    setBusinessPhoto(selectedFiles); // Set the selected files

    const totalFiles = tempBusinessPhotoUrl.length + selectedFiles.length;
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

    const combinedUrls = [...previewUrls, ...businessPreview];
    setBusinessPreview(combinedUrls);

    const formData = new FormData();

    // Append each file to the FormData
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('images', selectedFiles[i]);
    }

    try {
      const response = await uploadMultipleImages(formData); // Make an API call to get temporary URL
      if (response.status === 200) {
        const combineTempUrls = [...tempBusinessPhotoUrl, ...response.data.data.files];
        setTempBusinessPhotoUrl(combineTempUrls);
        setServerError('');
      }
    } catch (error) {
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

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption); // Update the state with the selected option object
    if (selectedOption.value === "India") {
      setCountryID(101);
    }
    setSelectedState(''); // Reset state when country changes
  };

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);

    if (selectedOption) {
      const selectedStateObject = states.find((state) => state.name === selectedOption.value);
      if (selectedStateObject) {
        getAllCities(selectedStateObject.id);
      }
    }
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption); // Update the state with the selected option object
  };

  const handleSelectCategoryChange = (selectedOption) => {
    setBusinessCategory(selectedOption);
  };

  const handleBusinessType = (selectedOption) => {
    SetBusinessType(selectedOption);
  }


  const handleStatusChange = (e) => {
    setStatus(e.target.value === "Active" ? "Active" : "Inactive");
  };

  const handleSubmit = async (event) => {

    event.preventDefault();
    dispatch(setLoader(true));
    const businessData = {
      id: parseInt(businessId),
      business_name: businessName,
      business_category: businessType.label,
      street_address: streetAddress,
      country: selectedCountry.label,
      state: selectedState.label,
      city: selectedCity.label,
      contact1: contact1,
      contact2: contact2,
      contact3: contact3,
      business_website: businessWebsite,
      business_email: businessEmail,
      business_photos: tempBusinessPhotoUrl,
      status: status,
      description,
      google_map_link: googleMapLink,
    };


    try {
      const response = await updateBusinessInfo(businessData, businessId);
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

  }

  const handleDeleteImage = (indexToDelete) => {
    // Create copies of the current arrays
    const updatedBusinessPreview = [...businessPreview];
    const updatedBusinessTempUrl = [...tempBusinessPhotoUrl];

    // Remove the image at the specified index from both arrays
    updatedBusinessPreview.splice(indexToDelete, 1);
    updatedBusinessTempUrl.splice(indexToDelete, 1);

    // Update the state variables with the updated arrays
    setBusinessPreview(updatedBusinessPreview);
    setTempBusinessPhotoUrl(updatedBusinessTempUrl);
  };

  const getAllStates = async () => {
    dispatch(setLoader(true));
    try {
      const response = await fetchAllStatesByCountryID(countryID);
      if (response && response.status === 200) {
        setStates(response.data.data);
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

  const getAllCities = async (stateID) => {
    dispatch(setLoader(true));
    try {
      const response = await fetchAllCitiesByStateID(stateID);
      if (response && response.status === 200) {
        setCities(response.data.data);
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
    // Set default values from businessDetails prop when it changes
    if (businessDetails) {
      setBusinessName(businessDetails.business_name || '');
      SetBusinessType({ value: businessDetails.business_category, label: businessDetails.business_category })
      setStreetAddress(businessDetails.street_address || '');
      setCountryID(businessDetails.country === 'India' ? 101 : ''); // Set the countryID accordingly
      setSelectedCountry({ value: businessDetails.country, label: businessDetails.country }); // Set the selected country as an object
      setSelectedState({ value: businessDetails.state, label: businessDetails.state }); // Set the selected state as an object
      setSelectedCity({ value: businessDetails.city, label: businessDetails.city }); // Set the selected city as an object
      setContact1(businessDetails.contact1 || '');
      setContact2(businessDetails.contact2 || '');
      setContact3(businessDetails.contact3 || '');
      setBusinessEmail(businessDetails.business_email || '');
      setBusinessWebsite(businessDetails.business_website || '');
      setBusinessPhoto(businessDetails.business_photos || '');
      setStatus(businessDetails.status || '');
      setBusinessId(businessDetails.id);
      setGoogleMapLink(businessDetails.google_map_link || '');
      setDescription(businessDetails.description || '');
      {
        businessDetails && businessDetails.business_photos && Array.isArray(businessDetails.business_photos) ?
          (setTempBusinessPhotoUrl(businessDetails.business_photos || '')) : (businessDetails.business_photos ? setTempBusinessPhotoUrl([businessDetails.business_photos]) : setTempBusinessPhotoUrl([]))
      }

      {
        businessDetails && businessDetails.business_photos && Array.isArray(businessDetails.business_photos) ? (setBusinessPreview(businessDetails.business_photos || ''))
          :
          (businessDetails.business_photos ?
            setBusinessPreview([businessDetails.business_photos]) : setBusinessPreview([]))
      }

      // You can similarly handle the proposalPhoto and biodataFile values here if needed
    }
  }, [businessDetails]);

  useEffect(() => {
    // Check if selectedCountry is already set
    if (countryID) {
      getAllStates();
    }
  }, []);

  useEffect(() => {
    setSelectedCountry({ value: "India", label: "India" });
  }, []);

  useEffect(() => {
    if (states && businessDetails) {
      const selectedStateObject = states.find((state) => state.name === businessDetails.state);
      if (selectedStateObject) {
        getAllCities(selectedStateObject.id);
      }
    }
  }, [states]);


  return (
    <div id="auth-wrapper" className="pt-5 pb-5">
      <div className="container">
        <div className={`card shadow ${errors ? 'border-danger' : ''}`}>
          <div className="card-body">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12 p-4">
                {serverError && <span className='error'>{serverError}</span>}
                <form onSubmit={handleSubmit} className="w-100 w-lg-75">
                  <fieldset className="shadow">
                    <legend>Business Info</legend>
                    <div className="card p-3">

                      <div className="row">
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <label className="form-label">Business Name{" "}<span className="text-danger">*</span></label>
                          <input type="text"
                            name="businessName"
                            id="businessName"
                            placeholder="Enter Business Name"
                            className="form-control"
                            autoFocus
                            defaultValue={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                          />
                          {errors.business_name && <span className='error'>{errors.business_name}</span>}
                        </div>
                        {/* <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">*Business Category</label>
                      <Select
                        id="business_category"
                        className=""
                        value={businessCategory} // Provide a selected option state
                        onChange={handleSelectCategoryChange} // Your change handler function
                        options={businessCategories && businessCategories.map((category) => ({ value: category.id, label: category.title }))}
                        placeholder="---Select Business Category---"
                      />
                      {errors.business_category && <span className='error'>{errors.business_category}</span>}
                    </div> */}
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <label className="form-label">Business Type{" "}<span className="text-danger">*</span></label>
                          <Select
                            options={[
                              { value: 'Information Technology (IT)', label: 'Information Technology (IT)' },
                              { value: 'Sales', label: 'Sales' },
                              { value: 'Marketing', label: 'Marketing' },
                              { value: 'Manufacturing', label: 'Manufacturing' },
                              { value: 'Service', label: 'Service' },
                              { value: 'Finance', label: 'Finance' },
                              { value: 'Real Estate', label: 'Real Estate' },
                              { value: 'Healthcare', label: 'Healthcare' },
                              { value: 'Transportation and Logistics', label: 'Transportation and Logistics' },
                              { value: 'Hospitality', label: 'Hospitality' },
                              { value: 'Education', label: 'Education' },
                              { value: 'Nonprofit Organizations', label: 'Nonprofit Organizations' },
                              // Add other country options here
                            ]}
                            value={businessType}
                            onChange={handleBusinessType}
                          />

                          {errors.business_category && <span className='error'>{errors.business_category}</span>}
                        </div>
                      </div>

                      <div className="row">
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <label className="form-label">Street Address{" "}<span className="text-danger">*</span></label>
                          <input type="text"
                            name="stressAddress"
                            id="stressAddress"
                            placeholder="Enter Street Address"
                            className="form-control"
                            defaultValue={streetAddress}
                            onChange={(e) => setStreetAddress(e.target.value)}
                          />
                          {errors.street_address && <span className='error'>{errors.street_address}</span>}
                        </div>

                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <label className="form-label">Country{" "}<span className="text-danger">*</span></label>

                          <Select
                            options={[
                              { value: 'India', label: 'India' },
                              // Add other country options here
                            ]}
                            value={selectedCountry}
                            onChange={handleCountryChange}
                          />


                          {errors.country && <span className='error'>{errors.country}</span>}
                        </div>
                      </div>

                      <div className="row">
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <label className="form-label">State{" "}<span className="text-danger">*</span></label>

                          <Select
                            options={states.map(state => ({ value: state.name, label: state.name }))}
                            value={selectedState}
                            onChange={handleStateChange}
                          />

                          {errors.state && <span className='error'>{errors.state}</span>}
                        </div>
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <label className="form-label">City{" "}<span className="text-danger">*</span></label>

                          <Select
                            options={cities.map(city => ({ value: city.name, label: city.name }))}
                            value={selectedCity}
                            onChange={handleCityChange}
                          />
                          {errors.city && <span className='error'>{errors.city}</span>}

                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <label className="form-label">Contact 1{" "}<span className="text-danger">*</span></label>
                          <input type="text"
                            name="contact1"
                            id="contact1"
                            placeholder="Enter Contact 1"
                            className="form-control"
                            defaultValue={contact1}
                            onChange={(e) => setContact1(e.target.value)}
                          />
                          {errors.contact1 && <span className='error'>{errors.contact1}</span>}
                        </div>
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <label className="form-label">Contact 2</label>
                          <input type="text"
                            name="contact2"
                            id="contact2"
                            placeholder="Enter Contact 2"
                            className="form-control"
                            defaultValue={contact2}
                            onChange={(e) => setContact2(e.target.value)}
                          />
                          {errors.contact2 && <span className='error'>{errors.contact2}</span>}
                        </div>
                      </div>

                      <div className="row">
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <label className="form-label">Contact 3</label>
                          <input type="text"
                            name="contact3"
                            id="contact3"
                            placeholder="Enter Contact 3"
                            className="form-control"
                            defaultValue={contact3}
                            onChange={(e) => setContact3(e.target.value)}
                          />
                          {errors.contact3 && <span className='error'>{errors.contact3}</span>}
                        </div>
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <label className="form-label">Business Photos </label>
                          <input
                            type="file"
                            className="form-control"
                            accept=".png, .jpg, .jpeg"
                            id="businessPhoto"
                            defaultValue={businessPhoto}
                            onChange={handleBusinessPhotoChange}
                            multiple
                          />
                          {errors.business_photos && <span className='error'>{errors.business_photos}</span>}
                          <div className='proposal-Photo d-flex'>
                            {businessPreview && businessPreview.length > 0 &&
                              businessPreview.map((item, idx) => (
                                <div className='m-2' key={idx}>
                                  <img src={item} alt={`Photos ${idx + 1}`} />
                                  <button type='button' className='btn' onClick={() => handleDeleteImage(idx)}>
                                    <i className="fas fa-trash"></i>
                                  </button>
                                </div>
                              ))}
                          </div>
                        </div>

                      </div>

                      <div className="row">
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <label className="form-label">Business Email</label>
                          <input type="email"
                            name="email"
                            id="email"
                            placeholder="Enter Email"
                            className="form-control"
                            defaultValue={businessEmail}
                            onChange={(e) => setBusinessEmail(e.target.value)}
                          />
                          {errors.business_email && <span className='error'>{errors.business_email}</span>}
                        </div>

                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <label htmlFor="status">Status{" "}<span className="text-danger">*</span></label>
                          <select
                            className="form-control"
                            id="status"
                            name="status"
                            value={status}
                            onChange={handleStatusChange}
                          >
                            <option value="">Select Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                          {errors.status && (
                            <span className="error">{errors.status}</span>
                          )}
                        </div>

                      </div>
                      <div className='row'>
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <label className="form-label">Business Website</label>
                          <p>(Please add your business website link if any.)</p>
                          <textarea type="text"
                            name="businessWebsite"
                            id="businessWebsite"
                            placeholder="Enter Business Website Link"
                            className="form-control"
                            defaultValue={businessWebsite}
                            onChange={(e) => setBusinessWebsite(e.target.value)}
                          />
                          {errors.business_website && <span className='error'>{errors.business_website}</span>}
                        </div>
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <label className="form-label">Description</label>
                          <p>(Please add your business details and links if any.)</p>
                          <textarea type="text"
                            name="businessWebsite"
                            id="businessWebsite"
                            placeholder="Enter Business Website Link"
                            className="form-control"
                            defaultValue={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                          {errors.description && <span className='error'>{errors.description}</span>}
                        </div>

                      </div>
                      <div className='row'>
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <label className="form-label">Set Google Map</label>
                          <p>(Please add your business location  link.)</p>
                          <textarea type="text"
                            name="businessWebsite"
                            id="businessWebsite"
                            placeholder="Enter Business Website Link"
                            className="form-control"
                            defaultValue={googleMapLink}
                            onChange={(e) => setGoogleMapLink(e.target.value)}
                          />
                          {errors.business_website && <span className='error'>{errors.business_website}</span>}
                        </div>
                      </div>
                    </div>


                    <div className="row mt-4">
                      <div className="col-lg-6 col-sm-12 col-xs-12">
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
    </div >
  );
};

export default UpdateBusinessProfile;
