import React, { useEffect, useState } from "react";
import {
  featuredEventsByAdmin,
  fetchAllCitiesByStateID,

  fetchAllEvents,

  fetchAllStatesByCountryID,
} from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import InfiniteScroll from "react-infinite-scroll-component";
import { setLoader } from "../../actions/loaderAction";
import { Carousel } from "react-bootstrap";
import ViewFullEvent from "./ViewFullEvent";

const SearchEvents = () => {
  const user = useSelector((state) => state.userAuth);

  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [defaultImage, setDefaultImage] = useState("/admin/img/download.jpg");

  const [isSearchingPerformed, setIssearchingPerformed] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countryID, setCountryID] = useState(101);
  const [isEventClick, setIsEventClick] = useState(false);
  const [eventId, setEventId] = useState('');

  //to show state and city according to user search

  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const [isFilter, setIsFilter] = useState(true);
  const [isGoClick, setIsGoClick] = useState(false);
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);

  const [isChat, setIsChat] = useState(false);
  const [isRefressed, setIsRefressed] = useState(false);
  const [copyItems, setCopyItems] = useState([]);
  const [isAndroidUsed, setIsAndroidUsed] = useState(false);
  const [featuredEvents, setFeaturedEvents] = useState([]);


  const changeEventClickFlag = (value, id) => {
    setIsEventClick(value);
    setEventId(id);
  };


  useEffect(() => {
    if (items.length > 0) {
      setIssearchingPerformed(true);
    }
  }, [items]);

  const fetchMoreData = () => {
    if (!isLoading && items.length < totalRows) {
      search(searchText, page + 1, 20);
      setPage(page + 1);
    }
  };

  const handleStateChange = (selectedOption) => {
    setIsGoClick(false);
    setPage(1);
    setState(selectedOption.label);
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
    setIsGoClick(false);
    setPage(1);
    setSelectedCity(selectedOption); // Update the state with the selected option object
    setCity(selectedOption.label);
  };

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
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

  const findFeaturedEvents = async () => {
    dispatch(setLoader(true));
    try {
      const response = await featuredEventsByAdmin();
      if (response && response.status === 200) {
        setServerError("");
        setFeaturedEvents(response.data.data);
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
  }

  const search = async (searchText, page, size) => {
    setIsLoading(true);
    dispatch(setLoader(true));
    try {
      const response = await fetchAllEvents(
        searchText,
        page,
        size,
        state,
        city
      );

      if (response && response.status === 200) {
        setTotalRows(response.data.data.totalRowsAffected);
        setServerError("");
        if (response.data.data.events.length === 0) {
          setIssearchingPerformed(false);
        }
        if (searchText || state || city) {
          if (response.data.data.events.length !== 0) {
            if (page === 1) {
              setItems([...new Set([...response.data.data.events])]);
            } else {
              setItems([...new Set([...items, ...response.data.data.events])]);
            }

            setTotalRows(response.data.data.totalRowsAffected);
          } else {
            if (page === 1) {
              setItems([...new Set([...response.data.data.events])]);
            } else {
              setItems([...new Set([...items, ...response.data.data.events])]);
            }
            setTotalRows(response.data.data.totalRowsAffected);
          }
        } else {
          const combinedItems = [...response.data.data.events];
          setItems(combinedItems);
        }
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
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

  const age = (dob) => {
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
      return "N/A";
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

  const handleScrollToUp = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    search("", 1, 20);
  }, [user]);

  useEffect(() => {
    // Check if the component is not just mounted
    search(searchText, page, 20);
  }, [searchText, state, city, page]);

  useEffect(() => {
    setPage(1);
  }, [searchText]);

  useEffect(() => {
    // Check if selectedCountry is already set
    if (selectedCountry) {
      getAllStates();
    }
  }, [selectedCountry]);

  const groupedItems = [];
  for (let i = 0; i < items.length; i += 2) {
    const pair = items.slice(i, i + 2); // Change 3 to 2 here
    groupedItems.push(pair);
  }

  const checkMobileVisibility = (mobileNumber) => {
    const isHidden = /\*/.test(mobileNumber);
    return !isHidden;
  };
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

  useEffect(() => {
    findFeaturedEvents();
  }, [eventId]);

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
    <>
      <div id="searchPeople-section" className="content-wrapper pt-4 mb-4">
        <div className="container">
          <div className="card shadow card-search">
            <Carousel className="">
              {featuredEvents && featuredEvents.map((item, index) => (
                <Carousel.Item>
                  <img
                    src={item.banner_image}
                    height={500}
                    width="100%"
                    onClick={() => changeEventClickFlag(true, item.id)}
                  ></img>
                  <Carousel.Caption>
                    <h3>{item.title}</h3>
                    <div>
                      <button type="button" className="fs-3 hover-pointer-green btn me-1 flex-grow-1"
                        onClick={() => changeEventClickFlag(true, item.id)}>
                        View
                      </button>
                    </div>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
            {
              !isEventClick ? (

                <div className="card-body">
                  {serverError && <span className="error">{serverError}</span>}
                  <div className="d-flex">
                    <h5 className="fw-3 mb-3">Search Events</h5>
                  </div>
                  <div className="filter-content">
                    {city ? (
                      <p>
                        {city}
                        {state && `(${state})`}
                      </p>
                    ) : (
                      <p>{state && `state - ${state}`}</p>
                    )}
                  </div>
                  {!isSearchingPerformed ? (
                    <span className="error">No Data Available</span>
                  ) : (
                    ""
                  )}
                  <div className="filter-icon"></div>
                  <div className="row ms-auto me-auto justify-content-between bg-success">
                    <div className="mb-3 mt-2 col-12 col-sm-6">
                      <label className="form-label text-light">State</label>
                      <Select
                        options={states.map((state) => ({
                          value: state.name,
                          label: state.name,
                        }))}
                        value={selectedState}
                        placeholder="Select State...."
                        onChange={handleStateChange}
                      />
                    </div>
                    <div className="mb-3 mt-2 col-12 col-sm-6">
                      <label className="form-label text-light">City</label>
                      <Select
                        options={cities.map((city) => ({
                          value: city.name,
                          label: city.name,
                        }))}
                        value={selectedCity}
                        placeholder="Select City...."
                        onChange={handleCityChange}
                      />
                    </div>

                  </div>
                  <div className="container-input mb-3 mt-3">
                    <input
                      type="text"
                      placeholder="Search i.e name, mobile,state,city"
                      name="text"
                      className="input form-control border-success"
                      value={searchText}
                      onChange={handleSearchText}
                    />
                    <i className="fas fa-search"></i>
                  </div>
                  <div className=""></div>

                  <div className="row">
                    {/* Repeat the user card structure as needed */}
                    <InfiniteScroll
                      style={{ overflowX: "hidden" }}
                      dataLength={items.length}
                      next={fetchMoreData}
                      hasMore={items.length < totalRows}
                      loader={isLoading && <h4>Loading...</h4>}
                    >
                      <div className="container pw-20">
                        {groupedItems.map((pair, index) => (
                          <div className="row" key={index}>

                            {pair.map((item, innerIndex) => (

                              <div className="col-md-6 mt-2" key={innerIndex}>
                                <div className="card" style={{ borderRadius: '15px' }}>
                                  <div className="card-body p-4">
                                    <div className={`text-black ${isAndroidUsed ? '' : ''}`}>
                                      {
                                        item.banner_image ? (
                                          <div className="col-12 flex-shrink-0">
                                            <img
                                              src={item.banner_image}
                                              alt={item.name}
                                              className="img-fluid"
                                              style={{ width: '100%', borderRadius: '10px' }}
                                              onClick={() => changeEventClickFlag(true, item.id)}
                                            />
                                          </div>
                                        ) : ''
                                      }

                                      <div className="flex-grow-1 ms-3 mt-2">
                                        <h5 className="mb-1">{item.title}</h5>
                                        <p className="mb-2 pb-1" style={{ color: '#2b2a2a' }}>
                                          Posted By : <b>{item.name}</b>
                                        </p>
                                        <div
                                          className="d-flex justify-content-start rounded-3"
                                          style={{ backgroundColor: '#efefef' }}
                                        >
                                          <p>
                                            venue-
                                            {item.venue
                                              ? item.venue
                                              : "N/A"}
                                          </p>
                                        </div>
                                        <div className="d-flex justify-content-start rounded-3 mt-2"
                                          style={{ backgroundColor: '#efefef' }}
                                        >
                                          <p>
                                            City-
                                            {item.city
                                              ? item.city
                                              : "N/A"}
                                          </p>
                                        </div>
                                        <div className="d-flex justify-content-start rounded-3 mt-2"
                                          style={{ backgroundColor: '#efefef' }}
                                        >
                                          <p>Start Date/Time{" "}-{" "}{formatDate(item.start_datetime)}</p>
                                        </div>
                                        <div className="d-flex justify-content-start rounded-3 mt-2"
                                          style={{ backgroundColor: '#efefef' }}
                                        >
                                          <p>End Date/Time{" "}-{" "}{formatDate(item.end_datetime)}</p>
                                        </div>
                                        <div className="d-flex justify-content-start rounded-3 mt-2"
                                          style={{ backgroundColor: '#efefef' }}
                                        >
                                          {
                                            checkMobileVisibility(item.mobile) ? (
                                              <p>
                                                <a href={`tel:${item.mobile}`}>
                                                  {item.mobile}
                                                </a>
                                              </p>
                                            ) : ''
                                          }
                                        </div>
                                        <div>
                                          <button type="button" className="fs-3 hover-pointer-green btn me-1 flex-grow-1"
                                            onClick={() => changeEventClickFlag(true, item.id)}>
                                            View
                                          </button>
                                        </div>

                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </InfiniteScroll>
                  </div>
                </div>
              ) : (
                <ViewFullEvent changeEventClickFlag={changeEventClickFlag} id={eventId} />
              )
            }

          </div>
        </div>
      </div>


    </>
  );
};

export default SearchEvents;
