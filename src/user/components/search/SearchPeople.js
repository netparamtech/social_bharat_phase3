import React, { useEffect, useState } from "react";
import {
  fetchAllCitiesByStateID,
  fetchAllStatesByCountryID,
  searchPeopleWithSearchText,
} from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import InfiniteScroll from "react-infinite-scroll-component";
import { setLoader } from "../../actions/loaderAction";
import NewChat from "../chats/NewChat";
import { logout } from "../../actions/userAction";
import ViewProfileDrawerForMembers from "./ViewProfileDrawerForMembers";

const SearchPeople = () => {
  const user = useSelector((state) => state.userAuth);

  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [defaultImage, setDefaultImage] = useState(
    "/admin/img/download.jpg"
  );

  const [isSearchingPerformed, setIssearchingPerformed] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countryID, setCountryID] = useState(101);

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

  const changeChatFlag = (value) => {
    setIsChat(value);
  };

  const handleChatclick = (item) => {
    setIsChat(true);
    setSelectedUser(item);
  };

  useEffect(() => {
    if (items.length > 0) {
      setIssearchingPerformed(true);
    } else {
      setIssearchingPerformed(false);
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

  const search = async (searchText, page, size) => {
    setIsLoading(true);
    dispatch(setLoader(true));
    try {
      const response = await searchPeopleWithSearchText(
        searchText,
        page,
        size,
        state,
        city
      );

      if (response && response.status === 200) {
        setTotalRows(response.data.data.totalFilteredRecords);
        setServerError("");
        if (response.data.data.length === 0) {
          setIssearchingPerformed(false);
        }
        if (searchText || state || city) {
          if (response.data.data.users.length !== 0) {
            if (page === 1) {
              setItems([...new Set([...response.data.data.users])]);
            } else {
              setItems([...new Set([...items, ...response.data.data.users])]);
            }

            setTotalRows(response.data.data.totalFilteredRecords);
          } else {
            if (page === 1) {
              setItems([...new Set([...response.data.data.users])]);
            } else {
              setItems([...new Set([...items, ...response.data.data.users])]);
            }
            setTotalRows(response.data.data.totalFilteredRecords);
          }
        } else {
          const combinedItems = [...items, ...response.data.data.users];
          const uniqueItems = [];

          for (const item of combinedItems) {
            if (!uniqueItems.some((u) => u.id === item.id)) {
              uniqueItems.push(item);
            }
          }

          setItems(uniqueItems);
        }
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.status === 401) {
        dispatch(logout());
        navigate("/login");
      } else if (error.response && error.response.status === 500) {
        setServerError("Oops! Something went wrong on our server.");
      } else if (error.response && error.response.status === 404) {
        dispatch(logout());
        navigate('/');
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

  const handleScrollToUp = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    search("", 1, 20);
  }, [user, isRefressed]);

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

  return (
    <>
      {isChat ? (
        <NewChat changeChatFlag={changeChatFlag} selectedUser={selectedUser} />
      ) : (
        <div id="searchPeople-section" className="content-wrapper pt-4 mb-4" style={{ overflow: 'hidden' }}>



          <div className="container" >
            <div className="card shadow card-search">
              <div className="card-header mx-auto mt-2 fs-3 fw-bold">Search Members</div>
              <div className="card-body">
                {serverError && <span className="error">{serverError}</span>}
                <div className="d-flex">
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

                <div className="filter-icon">

                </div>
                <div className="row ms-auto me-auto justify-content-between ">
                  <div className="mb-3 mt-2 col-12 col-sm-6">
                    <label className="form-label ">
                      State
                    </label>
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
                    <label className="form-label ">
                      City
                    </label>
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
                  {/* <div className="mb-3 mt-2 col-12 col-sm-2">
                    <a
                      className="btn btn-set w-100  btn-sm  btn-primary"
                      onClick={handleGoButtonClick}
                    >
                      Go
                    </a>
                  </div> */}
                </div>
                <div className="container-input container mb-3 mt-2">
                  <input
                    type="text"
                    placeholder="Search i.e name, mobile,state,city"
                    name="text"
                    className="input form-control"
                    value={searchText}
                    onChange={handleSearchText}
                  />
                  <i className="fas fa-search ps-2"></i>
                </div>
                <div className="">

                </div>

                <div className="row" style={{ height:'500px', overflow: 'scroll' }} id="scrollableDiv">
                  {/* Repeat the user card structure as needed */}
                  <InfiniteScroll
                    style={{ overflowX: "hidden" }}
                    dataLength={items.length}
                    next={fetchMoreData}
                    hasMore={items.length < totalRows}
                    loader={isLoading && <h4>Loading...</h4>}
                    scrollableTarget="scrollableDiv"
                  >
                    <div className="pw-20 mt-3" >
                      {!isSearchingPerformed ? (
                       <div className="mx-auto" style={{width:'300px'}}>
                         <span className="text-danger fs-5" >No Data Available</span>
                       </div>
                      ) : (
                        ""
                      )}
                      {groupedItems.map((pair, index) => (
                        <div className="row" key={index}>
                          {pair.map((item, innerIndex) => (

                            <div className="col-md-6 mt-2" key={innerIndex}>
                              <div className="card" style={{ borderRadius: '15px' }}>
                                <div className="card-body p-4">
                                  <div className={`text-black ${isAndroidUsed ? '' : 'd-flex'}`}>
                                    <div className="flex-shrink-0 m-3">
                                      <img
                                        src={item.photo ? item.photo : defaultImage}
                                        alt={item.name}
                                        className="img-fluid"
                                        style={{ width: '180px', height: '150px', borderRadius: '10px' }}
                                      />
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                      <h5 className="mb-1">{item.name}</h5>
                                      <p className="mb-2 pb-1" style={{ color: '#2b2a2a' }}>
                                        {item.occupation}
                                      </p>
                                      <div
                                        className="d-flex justify-content-start rounded-3"
                                        style={{ backgroundColor: '#efefef' }}
                                      >
                                        Education-{item.highest_qualification ? item.highest_qualification : 'N/A'}
                                      </div>
                                      <div className="d-flex justify-content-start rounded-3 mt-2"
                                        style={{ backgroundColor: '#efefef' }}
                                      >
                                        Age-{age(item.dob)} Years
                                      </div>
                                      <div className="d-flex justify-content-start rounded-3 mt-2"
                                        style={{ backgroundColor: '#efefef' }}
                                      >
                                        <p>City-{item.native_place_city}</p>
                                        <p>
                                          {item.native_place_state
                                            ? `(${item.native_place_state})`
                                            : ""}
                                        </p>
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
                                      <div className="d-flex pt-1">
                                        <div
                                          className="text-start ms-3 mt-2 hover-pointer"
                                          onClick={() => handleChatclick(item)}
                                        >
                                          <img
                                            src="/user/images/chat-icon.jpg"
                                            width="40px"
                                          />
                                        </div>

                                        <button type="button" className="btn me-1 flex-grow-1">
                                          <ViewProfileDrawerForMembers id={item.id} />
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
          </div>
        </div>
      )}
      <div className={`scroll-to-up ${isChat ? "d-none" : ""}`}>
        <a
          className="btn btn-primary btn-sm me-2 mb-2 hover-pointer"
          id=""
          onClick={handleScrollToUp}
          title="Refresh"
        >
          <i className="fa fa-arrow-up" aria-hidden="true"></i>
        </a>
      </div>
    </>
  );
};

export default SearchPeople;
