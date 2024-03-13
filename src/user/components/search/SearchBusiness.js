import React, { useEffect, useState } from "react";
import {
  fetchAllCitiesByStateID,
  fetchAllStatesByCountryID,
  searchBusinessWithCityState,
  searchBusinessWithSearchText,
} from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { Carousel } from "react-bootstrap";
import { logout } from "../../actions/userAction";

const SearchBusiness = () => {
  const user = useSelector((state) => state.userAuth);

  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [defaultImage] = useState("/admin/img/download.jpg");

  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countryID, setCountryID] = useState(101);
  const [isAndroidUsed, setIsAndroidUsed] = useState(false);
  const [defaultMap, setDefaultMap] = useState("/user/images/location.png");

  //to show state and city according to user search

  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  //to show message on top of page

  const [message, setMessage] = useState("");
  const [serverError, setServerError] = useState("");

  const [isFilter, setIsFilter] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePromoteBusinessClick = (e) => {
    e.preventDefault();
    navigate("/user/update-business-profile");
  };

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
    setCity("");
    setSelectedCity("");

    if (selectedOption) {
      const selectedStateObject = states.find(
        (state) => state.name === selectedOption.value
      );
      if (selectedStateObject) {
        getAllCities(selectedStateObject.id);
      }
    }
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption); // Update the state with the selected option object
  };

  const handleFilterClicked = () => {
    setIsFilter(!isFilter ? true : false);
  };

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const search = async (searchText) => {
    try {
      const response = await searchBusinessWithSearchText(searchText);
      if (response && response.status === 200) {
        setData(response.data.data);
        setServerError("");
      }
    } catch (error) {
      //Unauthorized
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else if (error.response && error.response.status === 500) {
        setServerError("Oops! Something went wrong on our server.");
      }
    }
  };

  const handleGoButtonClick = async () => {
    const queryParams = {
      q: "",
      state: selectedState ? selectedState.label : "",
      city: selectedCity ? selectedCity.label : "",
      // Add other modal fields to the queryParams
    };

    // Construct the query string from the queryParams object
    const queryString = new URLSearchParams(queryParams).toString();
    try {
      const response = await searchBusinessWithCityState(queryString);
      setData(response.data.data);
      setCity(selectedCity.label ? selectedCity.label : city);
      setState(selectedState.label ? selectedState.label : state);
      setServerError("");
    } catch (error) {
      //Unauthorized
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
      //Internal Server Error
      else if (error.response && error.response.status === 500) {
        setServerError("Oops! Something went wrong on our server.");
      }
    }
  };

  const getAllStates = async () => {
    try {
      const response = await fetchAllStatesByCountryID(countryID);
      if (response && response.status === 200) {
        setStates(response.data.data);
        setServerError("");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(logout());
        navigate("/login");
      } else if (error.response && error.response.status === 500) {
        setServerError("Oops! Something went wrong on our server.");
      } else if (error.response && error.response.status === 404) {
        dispatch(logout());
        navigate('/');
      }
    }
  };

  const getAllCities = async (stateID) => {
    try {
      const response = await fetchAllCitiesByStateID(stateID);
      if (response && response.status === 200) {
        setCities(response.data.data);
        setServerError("");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(logout());
        navigate("/login");
      } else if (error.response && error.response.status === 500) {
        setServerError("Oops! Something went wrong on our server.");
      } else if (error.response && error.response.status === 404) {
        dispatch(logout());
        navigate('/');
      }
    }
  };
  const handleScrollToUp = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setState(user && user.user && user.user.native_place_state);
    setCity(user && user.user && user.user.native_place_city);
  }, [user]);
  useEffect(() => {
    search(searchText);
  }, [searchText]);

  useEffect(() => {
    // Check if selectedCountry is already set
    if (selectedCountry) {
      getAllStates();
    }
  }, [selectedCountry]);
  useEffect(() => {
    setState(selectedState.label);
  }, [city]);
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
  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div id="searchPeople-section" className="content-wrapper pt-4 mb-4">
      <div className="container">
        <div className="card shadow">
          <div className="card-body">

            {serverError && <span className="error">{serverError}</span>}

            <div>
              <h5 className="fw-3 d-none d-sm-block">Search Business</h5>
            </div>
            <div className="filter-content pt-5 d-md-block">
              {city ? (
                <p>
                  {city}
                  {state && `(${state})`}
                </p>
              ) : (
                <p>{state && `state - ${state}`}</p>
              )}
            </div>
            <div className="filter-icon">
              <a
                title="Filter"
                className="btn btn-primary btn-sm me-2 hover-pointer"
                onClick={handleFilterClicked}
              >
                <i className="fas fa-filter me-1"></i>Filter
              </a>
              <a
                title="Add Business"
                className="btn btn-primary"
                onClick={handlePromoteBusinessClick}
              >
                Promote Your Business{" "}
              </a>
            </div>

            <div className="container-input mb-3">
              <input
                type="text"
                placeholder="Search Business"
                name="text"
                className="input form-control"
                onChange={handleSearchText}
              />
              <i className="fas fa-search"></i>
            </div>
            <div className="container">
              <div className={`row ${isFilter ? "" : "d-none"}`}>
                <div className="col-5 mb-3 p-0">
                  <Select
                    options={states.map((state) => ({
                      value: state.name,
                      label: state.name,
                    }))}
                    value={selectedState}
                    onChange={handleStateChange}
                    placeholder="State"
                  />
                </div>
                <div className="col-5 mb-3">
                  <Select
                    options={cities.map((city) => ({
                      value: city.name,
                      label: city.name,
                    }))}
                    value={selectedCity}
                    onChange={handleCityChange}
                    placeholder="City"
                  />
                </div>
                <div className="col-2 mb-3 p-0">
                  <a
                    className="btn btn-set w-100 btn-primary  btn-sm hover-pointer"
                    onClick={handleGoButtonClick}
                  >
                    Go
                  </a>
                </div>
              </div>
            </div>

            <div className="row wow animate__animated animate__zoomIn">
              {/* User Cards */}

              {data &&
                data.map((item, idx) => (

                  <div className="col-md-6 mt-2" key={idx}>
                    <div className="card" style={{ borderRadius: '15px' }}>
                      <div className="card-body p-4">
                        <div className={`text-black ${isAndroidUsed ? '' : ''}`}>
                          <Carousel className="your-custom-carousel-class">
                            {item.business_photos && Array.isArray(item.business_photos) ?
                              item.business_photos.map((value, index) => (
                                <Carousel.Item key={index}>
                                  <img
                                    src={value}
                                    alt={item.business_name}
                                    className="d-block w-100 custom-carousel-item"
                                    height={300}
                                  //onClick={() => changeEventClickFlag(true, item.id)}
                                  />

                                </Carousel.Item>
                              )) : (
                                item.business_photos ? (<img
                                  src={item.business_photos}
                                  alt={item.business_name}
                                  className="d-block w-100 custom-carousel-item"
                                  height={300}
                                //onClick={() => changeEventClickFlag(true, item.id)}
                                />) : ''
                              )}
                          </Carousel>
                          {
                            item.banner_image ? (
                              <div className="col-12 flex-shrink-0">
                                <img
                                  src={item.business_image}
                                  alt={item.name}
                                  className="img-fluid"
                                  style={{ width: '100%', borderRadius: '10px' }}
                                // onClick={() => changeEventClickFlag(true, item.id)}
                                />
                              </div>
                            ) : ''
                          }

                          <div className="flex-grow-1 ms-3 mt-2">
                            <div className="row">
                              <div className="col-6">
                                <h6>{item.business_name}</h6>
                                <p>Category-{item.business_category}</p>
                                <p className="mb-2 pb-1" style={{ color: '#2b2a2a' }}>
                                  Posted By : <b>{item.name}</b>
                                </p>
                              </div>
                              {/* <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.564711619239!2d75.73843147233465!3d26.885567509702245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396dc9787b6e8159%3A0x7162ee3f35dc8f5a!2sNetparam%20Technologies%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin "
                                width="100%"
                                height="300"
                                className="mt-2"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                              ></iframe> */}

                              {
                                item.google_map_link ? (
                                  <div className="col-6">
                                    <a href={item.google_map_link} target="_blank">
                                      <img className="rounded" src={defaultMap} alt="Google Map" width={50} />
                                    </a>
                                  </div>
                                ) : ''
                              }

                            </div>
                            <div
                              className="d-flex justify-content-start rounded-3"
                              style={{ backgroundColor: '#efefef' }}
                            >
                              <p>Street-{item.street_address}</p>
                            </div>
                            <div className="d-flex justify-content-start rounded-3 mt-2"
                              style={{ backgroundColor: '#efefef' }}
                            >

                              <p>{item.city}</p>
                              <p>{item.state ? `(${item.state})` : ""}</p>
                            </div>
                            <div className="d-flex justify-content-start rounded-3 mt-2"
                              style={{ backgroundColor: '#efefef' }}
                            >
                              <p>
                                Contact Numbers:
                                <a href={`tel:${item.contact1}`}>
                                  {item.contact1}
                                </a>
                                {item.contact2 ? (
                                  <>
                                    ,{" "}
                                    <a href={`tel:${item.contact2}`}>
                                      {item.contact2}
                                    </a>
                                  </>
                                ) : (
                                  ""
                                )}
                                {item.contact3 ? (
                                  <>
                                    ,{" "}
                                    <a href={`tel:${item.contact3}`}>
                                      {item.contact3}
                                    </a>
                                  </>
                                ) : (
                                  ""
                                )}
                              </p>{" "}
                            </div>


                          </div>
                        </div>
                      </div>
                      {
                        item && item.description ? (
                          <div className="card-footer">
                            {item.description}</div>
                        ) : ''
                      }
                    </div>
                  </div>
                ))}

              {/* Repeat the user card structure as needed */}
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-to-up">
        <a
          className="btn btn-primary btn-sm me-2 mb-2 hover-pointer"
          id=""
          onClick={handleScrollToUp}
          title="Refresh"
        >
          <i className="fa fa-arrow-up" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  );
};

export default SearchBusiness;
