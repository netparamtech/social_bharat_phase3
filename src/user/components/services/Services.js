import React, { useEffect, useState } from "react";
import "../../pages/css/ourPartner.css";
import { Input, Table } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import {
  createUserService,
  fetchAllCitiesByStateID,
  fetchAllServices,
  fetchAllStatesByCountryID,
} from "../../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../actions/loaderAction";
import { useNavigate } from "react-router-dom";
import Search from "antd/es/input/Search";
import DropdownOnServices from "./DropdownOnServices";
import Select from "react-select";
import { logout } from "../../actions/userAction";
import { Select as AntSelect, Space } from 'antd';
import { toast } from "react-toastify";
import MobileInput from "../custom/MobileInput";
import InputField from "../custom/InputField";
import SelectField from "../custom/SelectField";
import TextAreaField from "../custom/TextAreaField";

const Services = () => {
  const [service, setService] = useState([]);
  const [copyService, setCopyService] = useState([]);
  const [category, setCategory] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isAndroidUsed, setIsAndroidUsed] = useState(false);
  const [serverError, setServerError] = useState("");

  const [searchData, setSearchData] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(7);
  const [totalRows, setTotalRows] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [serviceTitle, setServiceTitle] = useState("");
  const [mobile1, setMobile1] = useState('');
  const [mobile2, setMobile2] = useState('');
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");
  const [disableServiceTitle, setDisableServiceTitle] = useState(true);

  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countryID, setCountryID] = useState(101);

  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");
  const [alertClass, setAlertClass] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePageSizeChange = (current, pageSize) => {
    setSize(pageSize);
  };

  const handleSearchChange = (e) => {
    setPage(1);
    setSearchQuery(e.target.value);
  };

  const handleFilterData = () => {
    const filteredData = copyService.filter((item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setService(filteredData);
  };

  const handleSelectService = (selectedOption) => {
    setMessage("");
    setAlertClass("");
    setSelectedService(selectedOption);
    let result = selectedOption.category.split(',');
    setCategory(result);
  };

  const handleChange = (value) => {
    setSelectedCategory(value);
  };

  //state and city operations
  //state and city change operations
  const handleStateChange = (selectedOption) => {
    setSelectedCity('');
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
        dispatch(logout());
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
          dispatch(logout());
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


  const columns = [
    {
      // title: 'Services', dataIndex: 'title', className: 'bg-secondary  fs-4 text-white',
      render: (text, record) => (
        <div
          className="card shadow mb-2 services-hover hover-pointer"
          onClick={() => navigate(`/users-basedOn-services/${record.title}`)}
        >
          <div className="card-body   rounded">
            <div className="row wow animate__animated animate__zoomIn">
              <div className="">{record.title}</div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const fetchServices = async () => {
    dispatch(setLoader(false));
    try {
      const response = await fetchAllServices();
      if (response && response.status === 200) {
        const filteredFetch = response.data.data.filter(
          (item) => item && item.status === "Active"
        );
        setService(filteredFetch);
        setCopyService(filteredFetch);
        setServerError("");
      }
    } catch (error) {
      //Unauthorized
      if (error.response && error.response.status === 401) {
        dispatch(logout());
        navigate("/login");
      } else if (error.response && error.response.status === 500) {
        setServerError("Oops! Something went wrong on our server.");
      }
    } finally {
      dispatch(setLoader(false));
    }
  };

  const handleSubmit = async () => {
    if (selectedCategory) {
      const result = selectedCategory.toString();
      setSelectedCategory(result);
    }
    const data = {
      title: serviceTitle,
      mobile1,
      mobile2,
      experience,
      description,
      status,
      category: selectedCategory ? selectedCategory : '',
      state: selectedState && selectedState.label ? selectedState.label : '',
      city: selectedCity && selectedCity.label ? selectedCity.label : '',
    };

    try {
      dispatch(setLoader(true));
      const response = await createUserService(data);
      if (response && response.status === 201) {
        window.scroll(0, 0);
        setErrors("");
        setAlertClass("alert-success");
        toast.success("You have successfully registered in service.")
        setMessage(response.data.message);

      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
        setMessage("");
        setAlertClass("alert-danger");
      } else if (error.response && error.response.status === 401) {
        dispatch(logout());
        setMessage("");
        setErrors("");
        navigate('/login');
      } else if (error.response && error.response.status === 500) {
        setMessage(error.response.data.message);
        setErrors("");
        setAlertClass("alert-danger");
      }
    } finally {
      dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    if (category) {
      let options = [];
      category.map((item, index) => {
        options.push({
          label: item,
          value: item,
        });
      })
      setOptions(options);
    }
  }, [category]);

  useEffect(() => {
    // Check if selectedCountry is already set
    getAllStates();
  }, []);

  useEffect(() => {
    if (selectedState) {
      getAllCities(selectedState.id);
    }
  }, [selectedState]);

  useEffect(() => {
    // Update the dropdownOptions whenever copyService changes
    setDropdownOptions([
      ...copyService.map((state) => ({
        value: state.title,
        label: state.title,
        category: state.category,
      })),
      { value: "Other", label: "Other", category: "Other" },
    ]);
  }, [copyService]);

  useEffect(() => {
    const filteredData = copyService.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setService(filteredData);
  }, [searchQuery]);

  useEffect(() => {
    if (selectedService) {
      if (selectedService.label !== "Other") {
        setServiceTitle(selectedService.label);
        setDisableServiceTitle(true);
        setStatus("Active");
      } else {
        setServiceTitle("");
        setDisableServiceTitle(false);
        setStatus("Inactive");
      }
    }
  }, [selectedService]);

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsAndroidUsed(window.innerWidth < 1000); // Adjust the threshold based on your design considerations
    };

    // Listen for window resize events
    window.addEventListener("resize", handleResize);
    handleResize(); // Call initially to set the correct value

    // Cleanup the event listener when component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const cardStyles = {
    boxShadow: "0 0.15rem 1.75rem 0 rgba(33, 40, 50, 0.15)",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "50px",
    borderBottomLeftRadius: "30px",
    borderBottomRightRadius: "10px",
    width: "300px",
  };
  const imageStyles = {
    width: "100%",
    objectFit: "cover", // Ensures the image covers the entire container while maintaining aspect ratio
  };

  const stateOptions = (
    states &&
    states.map((option) => ({
      value: option.name,
      label: option.name,
    }))
  )
  const cityOptions = (
    cities &&
    cities.map((option) => ({
      value: option.name,
      label: option.name,
    }))
  )

  return (
    <div id="service-section" className="content-wrapper pt-4 mb-5">
      <div className="container">
        <div className="card shadow card-search">
          <div className="card-header bg-darkskyblue">
            <div className="d-sm-flex align-items-center justify-content-between ">
              ALL SERVICES
              <DropdownOnServices />
            </div>
          </div>
          <div className="card-body">
            {serverError && <span className="error">{serverError}</span>}
            <div className="row">
              <div className="col-12 col-sm-8 rounded mb-3">
                <div className="card shadow p-3">
                  <div className="row">
                    <div className="">

                      <Search
                        classNames="w-100"
                        placeholder="input search text"
                        allowClear
                        enterButton="Search"
                        size="large"
                        onChange={handleSearchChange}

                      />
                    </div>

                  </div>

                  <div
                    className="row mb-4 sevice-item"
                    style={{ overflowY: "scroll", maxHeight: isAndroidUsed ? '400px' : '700px' }}
                  >
                    {service.map((item, index) => (
                      <div className="col-12 col-sm-12" key={index}>
                        <div className="card card-body mt-2 bg-lightskyblue hover-pointer" style={{ fontSize: '12px' }}
                          onClick={() => navigate(`/users-basedOn-services/${item.title}`)}>
                          <h6 className="fw-bold"> {item.title} </h6>
                          <p className="text-mute">{item.category}</p>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-4">
                <div
                  className={`card shadow mb-2 ${errors ? "border-danger" : ""
                    }`}
                >
                  <div className="card-header bg-all text-light">
                    ADD SERVICE
                  </div>
                  <div className="card-body">

                    <div className="form-group mb-4 ">
                      <p className="">
                        अगर आपकी सेवा उपलब्ध नहीं है, तो 'अन्य' (Other) विकल्प
                        चुनें।
                      </p>

                      <SelectField handleSelectChange={handleSelectService} isRequired={true} value={selectedService}
                        errorServer={errors.category} placeholder="Select Your Service"
                        options={dropdownOptions} fieldName="Service category" />
                      {!selectedService && (
                        <> {errors.category && <br />}
                          <span className="">
                            Select any service if not, then select 'Other'
                          </span></>
                      )}
                    </div>
                    <div className="form-group mb-4">
                      <input
                        type="text"
                        placeholder="Enter Service Title"
                        className="form-control"
                        value={serviceTitle}
                        onChange={(e) => setServiceTitle(e.target.value)}
                        disabled={disableServiceTitle}
                      />
                      {errors.title && (
                        <span className="error">{errors.title}</span>
                      )}
                    </div>

                    <div className="form-group mb-4">
                      <Space
                        style={{
                          width: '100%',
                        }}
                        direction="vertical"
                      >
                        <AntSelect
                          mode="multiple"
                          allowClear
                          style={{
                            width: '100%',
                            height: '60px'
                          }}
                          placeholder="Please select categories..."
                          onChange={handleChange}
                          options={options}
                        />
                      </Space>
                      {errors.category && (
                        <span className="error">{errors.category}</span>
                      )}

                    </div>
                    <div className="form-group mb-4">

                      <MobileInput handleMobileChange={(e) => setMobile1(e.target.value)} value={mobile1}
                        errorServer={errors.mobile1} isRequired={true}
                        placeholder="Enter your mobile number 1" />
                    </div>
                    <div className="form-group mb-4">
                      <MobileInput handleMobileChange={(e) => setMobile2(e.target.value)} value={mobile2}
                        errorServer={errors.mobile2} isRequired={false}
                        placeholder="Enter your mobile number 2" />
                    </div>
                    <div className="form-group mb-4">
                      <InputField handleChange={(e) => setExperience(e.target.value)}
                        errorServer={errors.experience} placeholder="Enter your experience"
                        fieldName="experience" value={experience} maxLength={30} isRequired={true} />
                    </div>
                    <div className="form-group mb-4">
                      <SelectField handleSelectChange={handleStateChange} isRequired={true} value={selectedState}
                        errorServer={errors.state} placeholder="select state..."
                        options={stateOptions} fieldName="State" />

                    </div>

                    <div className="form-group mb-4">
                      <SelectField handleSelectChange={handleCityChange} isRequired={true} value={selectedCity}
                        errorServer={errors.city} placeholder="select city..."
                        options={cityOptions} fieldName="City" />

                    </div>
                    <div className="form-group mb-4 ">
                      <TextAreaField handleChange={(e) => setDescription(e.target.value)} placeholder="Enter details (limit 400)"
                        fieldName="Description" value={description} maxLength={400} errorServer={errors.description} isRequired={true} />
                    </div>

                    <div className="row mt-4">
                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Services;
