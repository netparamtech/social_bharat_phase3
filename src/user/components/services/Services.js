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

const Services = () => {
  const [service, setService] = useState([]);
  const [copyService, setCopyService] = useState([]);
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
  const [mobile1, setMobile1] = useState("");
  const [mobile2, setMobile2] = useState("");
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
  };

  //state and city operations
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
        navigate("/login");
      } else if (error.response && error.response.status === 500) {
        setServerError("Oops! Something went wrong on our server.");
      }
    } finally {
      dispatch(setLoader(false));
    }
  };

  const handleSubmit = async () => {
    const data = {
      title: serviceTitle,
      mobile1,
      mobile2,
      experience,
      description,
      status,
      state: selectedState&&selectedState.label ? selectedState.label : '',
      city: selectedCity&&selectedCity.label ? selectedCity.label : '',
    };

    try {
      dispatch(setLoader(true));
      const response = await createUserService(data);
      if (response && response.status === 201) {
        window.scroll(0, 0);
        setErrors("");
        setAlertClass("alert-success");
        setMessage(response.data.message);
        // setSelectedService("");
        // setServiceTitle("");
        // setMobile1("");
        // setMobile2("");
        // setLocation("");
        // setExperience("");
        // setDescription("");
        // setStatus('Active');
        // setDisableServiceTitle(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
        setMessage("");
        setAlertClass("alert-danger");
      } else if (error.response && error.response.status === 401) {
        setMessage("");
        setErrors("");
        setAlertClass("alert-danger");
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
      })),
      { value: "Other", label: "Other" },
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
                  <Search
                    className=""
                    placeholder="Enter Search Text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onChange={handleSearchChange}
                    autoFocus
                  />

                  <div
                    className="row mb-4 sevice-item"
                    style={{ overflowY: "scroll", maxHeight: "600px" }}
                  >
                    {service.map((item, index) => (
                      <div className="col-12 col-sm-4" key={index}>
                        <div className="card card-body mt-2 bg-lightskyblue hover-pointer"
                          onClick={() => navigate(`/users-basedOn-services/${item.title}`)}>
                          {item.title}
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
                    {message && (
                      <div className={`alert ${alertClass}`}>
                        {alertClass === "alert-success" ? (
                          <i className="fas fa-check-circle"></i>
                        ) : (
                          <i className="fas fa-exclamation-triangle"></i>
                        )}
                        {" " + message}
                      </div>
                    )}
                    <div className="form-group mb-4 ">
                      <p className="">
                        अगर आपकी सेवा उपलब्ध नहीं है, तो 'अन्य' (Other) विकल्प
                        चुनें।
                      </p>
                      <Select
                        className="form-control"
                        aria-label="Default select example"
                        options={dropdownOptions}
                        value={selectedService}
                        placeholder="Select Your Service"
                        onChange={handleSelectService}
                      />
                      {!selectedService && (
                        <span className="">
                          Select any service if not, then select 'Other'
                        </span>
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
                      <input
                        type="number"
                        placeholder="Enter Your Mobile Number 1"
                        className="form-control"
                        value={mobile1}
                        onChange={(e) => setMobile1(e.target.value)}
                      />
                      {errors.mobile1 && (
                        <span className="error">{errors.mobile1}</span>
                      )}
                    </div>
                    <div className="form-group mb-4">
                      <input
                        type="number"
                        placeholder="Enter Your Mobile Number 2"
                        className="form-control"
                        value={mobile2}
                        onChange={(e) => setMobile2(e.target.value)}
                      />
                      {errors.mobile2 && (
                        <span className="error">{errors.mobile2}</span>
                      )}
                    </div>
                    <div className="form-group mb-4">
                      <input
                        type="text"
                        placeholder="Enter Experience"
                        className="form-control"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                      />
                      {errors.experience && (
                        <span className="error">{errors.experience}</span>
                      )}
                    </div>
                    <div className="form-group mb-4">

                      <Select
                        className="form-control"
                        options={states.map((state) => ({
                          value: state.name,
                          label: state.name,
                        }))}
                        value={selectedState}
                        onChange={handleStateChange}
                        placeholder="select state..."
                      />
                      {errors.state && (
                        <span className="error">{errors.state}</span>
                      )}


                    </div>

                    <div className="form-group mb-4">

                      <Select
                        className="form-control"
                        options={cities.map((city) => ({
                          value: city.name,
                          label: city.name,
                        }))}
                        value={selectedCity}
                        onChange={handleCityChange}
                        placeholder="select city..."
                      />
                      {errors.city && (
                        <span className="error">{errors.city}</span>
                      )}

                    </div>
                    <div className="form-group mb-4 ">
                      <textarea
                        className="form-control"
                        placeholder="Enter details"
                        id="floatingTextarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                      {errors.description && (
                        <span className="error">{errors.description}</span>
                      )}
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
