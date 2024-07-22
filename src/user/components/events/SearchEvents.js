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
import { Divider } from "antd";

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
  const [isFilter, setIsFilter] = useState(!isAndroidUsed ? false : true);


  const changeEventClickFlag = (value, id) => {
    setIsEventClick(value);
    setEventId(id);
  };

  const handleIsFilterChange = () => {
    setIsFilter(!isFilter);
  }


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
    setPage(1);
    setSearchText(e.target.value);
  };
  const handlePostEventClick = () => {
    navigate('/event');
  }

  const handleMyEventsClick = () => {
    navigate('/user/my-events');
  }

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
        console.log(response.data.data.totalRowsAffected, "response.data.data.totalRowsAffected")
        setTotalRows(response.data.data.totalRowsAffected);
        setServerError("");
        if (response.data.data.events.length === 0) {
          setIssearchingPerformed(false);
        }
        if (searchText || state || city) {

          if (response.data.data.events.length !== 0) {
            if (page === 1) {
              console.log("Hello")
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
              console.log("else called")
            }
            setTotalRows(response.data.data.totalRowsAffected);
          }
        } else {
          const combinedItems = [...items, ...response.data.data.events];
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
    if (user) {
      search("", 1, 20);
    }
  }, [user]);

  useEffect(() => {
    // Check if the component is not just mounted
    search(searchText, page, 20);
  }, [searchText, state, city]);

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
      <div id="searchPeople-section" className="content-wrapper pt-4">
        <div className="container">
          <div className="card-search ">
            {
              !isEventClick && featuredEvents.length > 0 ? <Carousel className="your-custom-carousel-class">
                {featuredEvents &&
                  featuredEvents.map((item, index) => (
                    <Carousel.Item key={index}>
                      <div className="mb-2" style={{ top: '0', left: '0', width: '100%', height: '100%', borderRadius: '10px', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={item.banner_image} style={{ width: '100%', height: '400px', borderRadius: '10px' }} onClick={() => changeEventClickFlag(true, item.id)} />
                      </div>
                    </Carousel.Item>
                  ))}
              </Carousel> : ''
            }
            {
              !isEventClick ? (

                <div className="card">
                  <div className="card-body">
                    {serverError && <span className="error">{serverError}</span>}
                    <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                      <h5 className="fw-bold mb-0">Search Events</h5>
                      <div className="d-flex">
                        <button className="btn btn-success mx-2" onClick={handlePostEventClick}>
                          Post Your Event
                        </button>
                        <button className="btn btn-success mx-2" onClick={handleMyEventsClick}>
                          My Events
                        </button>
                      </div>
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
                    {
                      !isFilter ? (
                        <div className="row ">
                          <div className="mb-3 mt-2 col-12 col-sm-4">
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
                          <div className="mb-3 mt-2 col-12 col-sm-4">
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
                          <div className="mb-3 mt-2 col-12 col-sm-4 position-relative">
                            <label className="form-label text-light">Search</label>
                            <div className="input-group">
                              <input
                                type="text"
                                placeholder="search by name, event title, state and city...."
                                name="text"
                                className="input form-control border-success"
                                value={searchText}
                                onChange={handleSearchText}
                              />
                              <span className="input-group-text">
                                <i className="fas fa-search"></i>
                              </span>
                            </div>
                          </div>


                        </div>
                      ) : ''
                    }
                    {
                      isAndroidUsed ? (
                        <div className="mx-auto">
                          <button className="btn mb-2 btn-success" onClick={handleIsFilterChange}>{!isFilter ? 'Hide Filter' : 'Filter'}</button>
                        </div>
                      ) : ''
                    }

                    <div className=""></div>

                    <div className="" id="scrollableDiv"
                      style={{
                        height: 400,
                        overflow: 'auto',
                        fontSize: ''


                      }}>
                      {/* Repeat the user card structure as needed */}
                      <InfiniteScroll
                        style={{ overflowX: "hidden" }}
                        dataLength={items.length}
                        next={fetchMoreData}
                        hasMore={items.length < totalRows}
                        loader={isLoading && <h4>Loading...</h4>}
                        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                        scrollableTarget="scrollableDiv"
                      >
                        <div className="container pw-20">
                          {groupedItems.map((pair, index) => (
                            <div className="row" key={index}>

                              {pair.map((item, innerIndex) => (

                                <div className="col-md-6 mt-2" key={innerIndex}>
                                  <div className="card text-wrap-break-word" style={{ borderRadius: '15px', height: isAndroidUsed ? '' : '', fontSize: '14px', lineHeight: '16px' }}>
                                    <div className="card-body p-4 search-partner-cards">
                                      <div className={`text-black ${isAndroidUsed ? '' : ''}`} style={{ flexDirection: 'column', display: isAndroidUsed ? '' : 'flex' }}>
                                        {item.banner_image && (
                                          <div className="col-12 flex-shrink-0 mb-3">
                                            <img
                                              src={item.banner_image}
                                              alt={item.name}
                                              className="img-fluid rounded-3"
                                              style={{ top: '0', left: '0', width: '100%', height: '200px', justifyContent: 'center', alignItems: 'center', borderRadius: '20px' }}
                                              onClick={() => changeEventClickFlag(true, item.id)}
                                            />
                                          </div>
                                        )}

                                        <div className={`flex-grow-1 ms-3 mt-2 ${isAndroidUsed ? '' : 'd-flex'} align-items-center justify-content-center flex-column`}>
                                          <div className="p-3 bg-light rounded-3 shadow-sm mb-3">
                                            <h5 className="mb-1 text-truncate" style={{ maxHeight: '100px', overflow: 'hidden', width: '100%', maxWidth: '300px' }}>
                                              {item.title}
                                            </h5>
                                            <p className="mb-2 pb-1 text-muted">
                                              <i className="fa-solid fa-user me-2 text-primary"></i>
                                              Posted By: <b>{item.name}</b>
                                            </p>
                                            <p className="mb-2 pb-1 text-muted">
                                              <i className="fa-solid fa-users me-2 text-primary"></i>
                                              Event For: <b>{item.event_type === 'Communited' ? 'Communited' : 'For all Communities'}</b>
                                            </p>
                                            <div className="d-flex align-items-center mb-2">
                                              <i className="fa-solid fa-map-marker-alt me-2 text-primary"></i>
                                              <p className="mb-0 text-truncate" style={{ maxHeight: '40px', overflow: 'hidden' }}>
                                                Venue: {item.venue ? item.venue : "N/A"}
                                              </p>
                                            </div>
                                            <div className="d-flex flex-column align-items-start bg-white p-3 rounded-3 shadow-sm">
                                              <div className="d-flex align-items-center mb-2">
                                                <i className="fa-solid fa-calendar-alt text-primary me-2"></i>
                                                <p className="mb-0">
                                                  <strong>Start Date/Time:</strong> {formatDate(item.start_datetime)}
                                                </p>
                                              </div>
                                              <div className="d-flex align-items-center">
                                                <i className="fa-solid fa-calendar-alt text-primary me-2"></i>
                                                <p className="mb-0">
                                                  <strong>End Date/Time:</strong> {formatDate(item.end_datetime)}
                                                </p>
                                              </div>
                                            </div>
                                          </div>

                                          <div className="d-flex justify-content-start align-items-center bg-light p-3 rounded-3 shadow-sm mb-3">
                                            <p className="mb-0 me-3">
                                              <strong>State:</strong> {item.state ? item.state : "N/A"}
                                            </p>
                                            <p className="mb-0">
                                              <strong>City:</strong> {item.city ? item.city : "N/A"}
                                            </p>
                                          </div>

                                          {checkMobileVisibility(item.mobile) && (
                                            <div className="d-flex justify-content-start align-items-center bg-light p-3 rounded-3 shadow-sm mb-3">
                                              <i className="fa-solid fa-phone text-primary me-2"></i>
                                              <p className="mb-0">
                                                <a href={`tel:${item.mobile}`} className="text-dark text-decoration-none">
                                                  {item.mobile}
                                                </a>
                                              </p>
                                            </div>
                                          )}

                                          <div className="text-center">
                                            <button className="btn btn-success" onClick={() => changeEventClickFlag(true, item.id)}>
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
