import { useEffect, useState } from 'react';
import { fetchAllActiveBusinessCategories, fetchAllCitiesByStateID, fetchAllStatesByCountryID, updateBusinessInfo, updateMatrimonialInfo, uploadMultipleImages, uploadPdf } from '../../services/userService';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../actions/loaderAction';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import MobileInput from '../custom/MobileInput';
import InputField from '../custom/InputField';
import SelectField from '../custom/SelectField';
import TextAreaField from '../custom/TextAreaField';
import { toast } from 'react-toastify';
import { errorOptions } from '../../../toastOption';

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
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

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
  //validation errors
  const [bnameError, setBnameError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [countryError, setCountryError] = useState('');
  const [stateError, setStateError] = useState('');
  const [cityError, useCityError] = useState('');
  const [contact1Error, setContact1Error] = useState('');
  const [contact2Error, setContact2Error] = useState('');
  const [contact3Error, setContact3Error] = useState('');
  const [businessEmailError, setBusinessEmailError] = useState('');
  const [websiteError, setWebsiteError] = useState('');
  const [googleMapLinkError, setGoogleMapLinkError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const businessCatOptions = [
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
  ]

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
    if(bnameError||categoryError||addressError||countryError||stateError||
      cityError||contact1Error||contact2Error||contact3Error||businessEmailError||websiteError||
      googleMapLinkError||!businessName||!businessType||!streetAddress||!selectedCountry||!selectedState||!selectedCity||
      !contact1
    ){
      toast.error("Please fill in all the required fields before submitting.",errorOptions);
      return;
    }
    dispatch(setLoader(true));
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const htmlContent = draftToHtml(rawContentState);

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
      business_photos: tempBusinessPhotoUrl.length > 0 ? tempBusinessPhotoUrl : '',
      status: status,
      description: htmlContent,
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
      if (businessDetails.DESCRIPTION) {
        const blocksFromHTML = convertFromHTML(businessDetails.DESCRIPTION);
        const contentState = ContentState.createFromBlockArray(blocksFromHTML);
        const editorStateFromFetchedData = EditorState.createWithContent(contentState);
        setEditorState(editorStateFromFetchedData);

      }
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
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: '5px',
    }),
    // You can add more styles overrides for other parts of the select component
  };

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

                          <InputField errorServer={errors.business_name} label="Business Name" handleChange={(e, errorMsg) => {
                            setBusinessName(e.target.value);
                            setBnameError(errorMsg);
                          }}
                            placeholder="Enter Business Name" value={businessName} isRequired={true} isAutoFocused={true}
                            maxLength={200} fieldName="Business name" />
                        </div>

                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <SelectField handleSelectChange={handleBusinessType} isRequired={true} value={businessType}
                            errorServer={errors.business_category} placeholder="Select business field..." label="Business Type"
                            options={businessCatOptions} fieldName="Business type" />
                        </div>
                      </div>

                      <div className="row">
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">

                          <InputField errorServer={errors.street_address} label="Street Address" handleChange={(e, errorMsg) => {
                            setStreetAddress(e.target.value);
                            setAddressError(errorMsg);
                          }}
                            placeholder="Enter Street Address" value={streetAddress} isRequired={true}
                            maxLength={100} fieldName="Street address" />
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
                            styles={customStyles}
                          />


                          {errors.country && <span className='error'>{errors.country}</span>}
                        </div>
                      </div>

                      <div className="row">
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <label className="form-label">State{" "}<span className="text-danger">*</span></label>

                          <Select
                            options={states.map(state => ({ value: state.name, label: state.name }))}
                            value={selectedState} styles={customStyles}
                            onChange={handleStateChange}
                          />

                          {errors.state && <span className='error'>{errors.state}</span>}
                          
                        </div>
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <label className="form-label">City{" "}<span className="text-danger">*</span></label>

                          <Select
                            options={cities.map(city => ({ value: city.name, label: city.name }))}
                            value={selectedCity} styles={customStyles}
                            onChange={handleCityChange}
                          />
                          {errors.city && <span className='error'>{errors.city}</span>}

                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <MobileInput handleMobileChange={(e,errorMsg) => {
                            setContact1(e.target.value);
                            setContact1Error(errorMsg);
                          }} value={contact1} errorServer={errors.contact1} label="Contact 1" isRequired={true}
                            placeholder="Enter your contact number 1" />
                        </div>
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <MobileInput handleMobileChange={(e,errorMsg) => {
                            setContact2(e.target.value);
                            setContact2Error(errorMsg);
                          }} value={contact2} errorServer={errors.contact2} label="Contact 2"
                            placeholder="Enter your contact number 2" />
                        </div>
                      </div>

                      <div className="row">
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <MobileInput handleMobileChange={(e,errorMsg) => {
                            setContact3(e.target.value);
                            setContact3Error(errorMsg);
                          }} value={contact3} errorServer={errors.contact3} label="Contact 3"
                            placeholder="Enter your contact number 3" />
                        </div>
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <label className="form-label">Business Photos{" "}<span className="text-danger">*</span></label>
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

                          <InputField errorServer={errors.business_email} label="Business Email" handleChange={(e, errorMsg) => {
                            setBusinessEmail(e.target.value);
                            setBusinessEmailError(errorMsg);
                          }}
                            placeholder="Enter Email" value={businessEmail} isRequired={false} boxFor="email"
                            maxLength={255} fieldName="Business email" />
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
                          <p>(Please add your business website link if any.)</p>
                          <TextAreaField handleChange={(e, errorMsg) => {
                            setBusinessWebsite(e.target.value);
                            setWebsiteError(errorMsg);
                          }} placeholder="Enter Business Website Link" label="Business Website" boxFor="link"
                            fieldName="Business website" value={businessWebsite} maxLength={255}
                            errorServer={errors.business_website} isRequired={false} />

                        </div>
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <p>(Please add your business location  link.)</p>
                          <TextAreaField handleChange={(e, errorMsg) => {
                            setGoogleMapLink(e.target.value);
                            setGoogleMapLinkError(errorMsg);
                          }} placeholder="Enter Google Map URL" label="Set Google Map" boxFor="link"
                            fieldName="Google map" value={googleMapLink} maxLength={400}
                            errorServer={errors.business_website} isRequired={false} />
                        </div>

                      </div>
                      <div className='row'>
                        <div className="mb-3 col-lg-12 col-sm-12 col-xs-12">
                          <label className="form-label">Description</label>
                          <p>(Please add your business details and links if any.)</p>

                          <Editor
                            editorState={editorState}
                            onEditorStateChange={onEditorStateChange}
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class custom-editor-height editor-border p-2"
                            toolbarClassName="toolbar-class toolbar-border"
                          />
                          {errors.description && <span className='error'>{errors.description}</span>}
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
