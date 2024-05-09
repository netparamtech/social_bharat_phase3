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
import { Divider, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { setLoader } from "../../actions/loaderAction";

const SearchBusiness = () => {
  const user = useSelector((state) => state.userAuth);

  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [defaultImage] = useState("/admin/img/download.jpg");
  const [totalRows, setTotalRows] = useState(1);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [loading, setLoading] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countryID, setCountryID] = useState(101);
  const [isAndroidUsed, setIsAndroidUsed] = useState(false);
  const [defaultMap, setDefaultMap] = useState("/user/images/location.png");
  const [isDetails, setIsDetails] = useState(false);

  //to show state and city according to user search

  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  //to show message on top of page

  const [message, setMessage] = useState("");
  const [serverError, setServerError] = useState("");

  const [isFilter, setIsFilter] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleIsDetailsClicked = (index) => {
    setIsDetails(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  }

  const loadMoreData = () => {
    setLoading(false);
    if (data.length < totalRows) {
      if (loading) {
        return;
      }
      setLoading(true);

      const state = selectedState ? selectedState.label : "";
      const city = selectedCity ? selectedCity.label : "";
      fetchJobs(size, page, state, city, searchText);
    }
  };

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

  const fetchJobs = async (size, page, state, city, searchText) => {

    dispatch(setLoader(false));
    try {
      const response = await searchBusinessWithSearchText(size, page, state, city, searchText);
      if (response && response.status === 200) {
        console.log(response.data.data.result, response.data.data.totalRowsAffected)
        setTotalRows(response.data.data.totalRowsAffected);
        if (page === 1) {
          setData([...new Set([...response.data.data.result])]);
        } else {
          setData([...new Set([...data, ...response.data.data.result])]);
        }

        setPage(page + 1);
        setLoading(false);
        setServerError("");
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
      setLoading(false);
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
  useEffect(() => {
    loadMoreData();
  }, []);


  useEffect(() => {
    const state = selectedState ? selectedState.label : "";
    const city = selectedCity ? selectedCity.label : "";
    fetchJobs(size, 1, state, city, searchText);
  }, [searchText, selectedState, selectedCity]);
  const handleScrollToUp = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setState(user && user.user && user.user.native_place_state);
    setCity(user && user.user && user.user.native_place_city);
  }, [user]);

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
  const checkArray = (value) => {
    if (Array.isArray(value)) {
      return value;
    }
    return [value];
  }
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
      <div className="">
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


            <div className="">
              <div className={`row ${isFilter ? "" : "d-none"}`}>
                <div className="col-12 col-md-3 mb-3">
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
                <div className="col-12 col-md-3 mb-3">
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

                <div className="col-12 col-md-6 mb-3 position-relative">
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Search Business by name, category, state, city, user name, address, google map"
                      name="text"
                      className="input form-control"
                      value={searchText}
                      onChange={handleSearchText}
                    />
                    <span className="input-group-text">
                      <i className="fas fa-search ps-2"></i>
                    </span>
                  </div>
                </div>

              </div>
            </div>

            <div className="" id="scrollableDiv"
              style={{
                height: 500,
                overflow: 'auto',


              }}>
              {/* User Cards */}
              <InfiniteScroll
                dataLength={data.length}
                next={loadMoreData}
                hasMore={data.length < totalRows}
                loader={
                  <Skeleton
                    avatar
                    paragraph={{
                      rows: 1,
                    }}
                    active
                  />
                }
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                scrollableTarget="scrollableDiv"
              >

                <div className="row">
                  {data &&
                    data.map((item, idx) => (

                      <div className="col-md-4" key={idx} >
                        <div className="card" style={{ borderRadius: '15px' }}>
                          <div className="card-body p-4">
                            <div className={`text-black ${isAndroidUsed ? '' : ''}`}>
                              {
                                item.business_photos && <Carousel className="your-custom-carousel-class">
                                  {
                                    checkArray(item.business_photos).map((value, index) => (
                                      <Carousel.Item key={index}>
                                        <div className="carousel-image-container">
                                          <img
                                            src={value}
                                            alt={item.business_name}
                                            className="d-block w-100 custom-carousel-item"

                                          />
                                        </div>
                                      </Carousel.Item>
                                    ))
                                  }
                                </Carousel>
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
                                    {
                                      isDetails[idx] ? (<>
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
                                      </>) : ''
                                    }
                                  </p>{" "}
                                </div>


                              </div>
                            </div>
                          </div>
                          {
                            isDetails[idx] ? (
                              <>
                                {
                                  item && item.description ? (
                                    <div className="card-footer">
                                      {item.description}</div>
                                  ) : ''
                                }
                              </>
                            ) : ''
                          }
                          <a className="btn over-pointer-g-effect mx-auto m-2 btn-toggle" onClick={() => handleIsDetailsClicked(idx)}>{!isDetails[idx] ? "Show More" : "Show Less"}</a>
                        </div>
                      </div>
                    ))}
                </div>

              </InfiniteScroll>



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
