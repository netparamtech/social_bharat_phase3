import React, { useEffect, useState } from "react";
import {
  fetchAllCitiesByStateID,
  fetchAllStatesByCountryID,
  searchBusinessWithCityState,
  searchBusinessWithSearchText,
} from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Select from "react-select";

const SearchBusiness = () => {
  const user = useSelector((state) => state.userAuth);

  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [defaultImage] = useState("/admin/img/download.png");

  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countryID, setCountryID] = useState(101);

  //to show state and city according to user search

  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  //to show message on top of page

  const [message, setMessage] = useState("");
  const [serverError, setServerError] = useState("");

  const [isFilter, setIsFilter] = useState(true);

  const navigate = useNavigate();

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

  const getAllCities = async (stateID) => {
    try {
      const response = await fetchAllCitiesByStateID(stateID);
      if (response && response.status === 200) {
        setCities(response.data.data);
        setServerError("");
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
                  <div className="col-md-4" key={idx}>
                    <div className="card shadow mb-2">
                      <div className="card-body">
                        <div className="row wow animate__animated animate__zoomIn">
                          <div className="col-4">
                            <img
                              src={item.photo ? item.photo : defaultImage}
                              alt={item.name}
                              title={item.name}
                              className="avatar img-fluid img-circle "
                            />
                          </div>
                          <div className="col-8 user-detail">
                            <h6>{item.business_name}</h6>
                            <p>Category-{item.business_category}</p>
                            <p>Street-{item.street_address}</p>
                            <p>{item.city}</p>
                            <p>{item.state ? `(${item.state})` : ""}</p>
                            <p>
                              Contact Numbers: 
                              <a href={`tel:${item.contact1 }`}>
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
          <i class="fa fa-arrow-up" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  );
};

export default SearchBusiness;
