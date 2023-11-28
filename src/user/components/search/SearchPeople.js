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
import { Image } from "antd";
import NewChat from "../chats/NewChat";

const SearchPeople = () => {
  const user = useSelector((state) => state.userAuth);

  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [defaultImage, setDefaultImage] = useState(
    "/admin/img/download.png"
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
    }
  }, [items]);

  const fetchMoreData = () => {
    if (!isLoading && items.length < totalRows) {
      search(searchText, page + 1, 20);
      setPage(page + 1);
    }
  };

  const handleFilterClicked = () => {
    setPage(1);
    setIsFilter(!isFilter ? true : false);
    setIsGoClick(false);
    setSelectedState("");
    setSelectedCity("");
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

  const handleGoButtonClick = () => {
    setPage(1);
    setIsGoClick(true);
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

      setIsRefressed(false);

      if (response && response.status === 200) {
        setServerError("");
        setTotalRows(response.data.data.totalFilteredRecords);
        if (response.data.data.users.length === 0) {
          setIssearchingPerformed(false);
        }
        if (searchText) {
          if (response.data.data.users.length !== 0) {
            if (page === 1) {
              setItems([...new Set([...response.data.data.users])]);
            } else {
              setItems([...new Set([...items, ...response.data.data.users])]);
            }
            setTotalRows(response.data.data.totalFilteredRecords);
          } else {
            setItems([...response.data.data.users]);
            setTotalRows(response.data.data.totalFilteredRecords);
          }
        } else {
          if (isGoClick) {
            if (page === 1) {
              setItems([...new Set([...response.data.data.users])]);
              setCopyItems([...new Set([...response.data.data.users])]);
            } else {
              setItems([...new Set([...items, ...response.data.data.users])]);
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
        dispatch(setLoader(false));
      }
      setIsLoading(false);
    } catch (error) {
      dispatch(setLoader(false));
      setIsLoading(false);
      //Unauthorized
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else if (error.response && error.response.status === 500) {
        setServerError("Oops! Something went wrong on our server.");
      }
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

  const handleRefressClicked = () => {
    if (!isRefressed) {
      setItems([]);
      setIsRefressed(true);
    }
  };

  const handleRefress = () => {
    if (isRefressed) {
      setItems(copyItems);
      setSearchText("");
      setIsFilter(false);
      setSelectedState(null);
      setSelectedCity(null);
    }
  };

  const handleScrollToUp = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    handleRefress();
    setState(
      user && user.user && user.user.native_place_state
        ? user.user.native_place_state
        : ""
    );
    setCity(
      user && user.user && user.user.native_place_city
        ? user.user.native_place_city
        : ""
    );
    search("", 1, 20);
  }, [user, isRefressed]);

  useEffect(() => {
    // Check if the component is not just mounted
    if (page > 1 || searchText || isGoClick) {
      search(searchText, page, 20);
    }
  }, [searchText, isGoClick, page]);

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

  return (
    <>
      {isChat ? (
        <NewChat changeChatFlag={changeChatFlag} selectedUser={selectedUser} />
      ) : (
        <div id="searchPeople-section" className="content-wrapper pt-4 mb-4">
          <div className="container">
            <div className="card shadow card-search">
              <div className="card-body">
                {serverError && <span className="error">{serverError}</span>}
                <div className="d-flex">
                  <h5 className="fw-3 mb-3">Search People</h5>
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
                <div className="filter-icon">
                  <a
                    title="Filter"
                    className="btn btn-primary btn-sm me-2"
                    onClick={handleFilterClicked}
                  >
                    <i className="fas fa-filter me-1"></i>Filter
                  </a>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    id="btn-chat"
                    onClick={handleRefressClicked}
                    title="Refresh"
                  >
                    <i className="fa fa-refresh" aria-hidden="true"></i>
                  </button>
                </div>
                <div className="container-input mb-3">
                  <input
                    type="text"
                    placeholder="Search"
                    name="text"
                    className="input form-control"
                    value={searchText}
                    onChange={handleSearchText}
                  />
                  <i className="fas fa-search"></i>
                </div>
                <div className="">
                  <div className={`row ${isFilter ? "" : "d-none"}`}>
                    <div className="col-5 mb-3 ">
                      <Select
                        options={states.map((state) => ({
                          value: state.name,
                          label: state.name,
                        }))}
                        value={selectedState}
                        placeholder="State"
                        onChange={handleStateChange}
                      />
                    </div>
                    <div className="col-5 mb-3 ps-0">
                      <Select
                        options={cities.map((city) => ({
                          value: city.name,
                          label: city.name,
                        }))}
                        value={selectedCity}
                        placeholder="City"
                        onChange={handleCityChange}
                      />
                    </div>
                    <div className="col-2 mb-3 ps-0">
                      <a
                        className="btn btn-set w-100  btn-sm  btn-primary"
                        onClick={handleGoButtonClick}
                      >
                        Go
                      </a>
                    </div>
                  </div>
                </div>

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
                            <div className="col-md-6" key={innerIndex}>
                              <div className="card shadow mb-2">
                                <div className="card-body">
                                  <div className="row wow animate__animated animate__zoomIn">
                                    <div className="col-4">
                                      <Image
                                        src={
                                          item.photo ? item.photo : defaultImage
                                        }
                                        alt={item.name}
                                        title={item.name}
                                        className="avatar img-fluid img-circle"
                                      />

                                      <div
                                        className="text-start ms-3 mt-2 hover-pointer"
                                        onClick={() => handleChatclick(item)}
                                      >
                                        <img
                                          src="/user/images/chat-icon.jpg"
                                          width="40px"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-5 user-detail">
                                      <h6>{item.name}</h6>
                                      <p>
                                        Occupation-
                                        {item.occupation
                                          ? item.occupation
                                          : "N/A"}
                                      </p>

                                      <p>
                                        Education-
                                        {item.highest_qualification
                                          ? item.highest_qualification
                                          : "N/A"}
                                      </p>
                                      <p>Age-{age(item.dob)} Years</p>
                                      <p>City-{item.native_place_city}</p>
                                      <p>
                                        {item.native_place_state
                                          ? `(${item.native_place_state})`
                                          : ""}
                                      </p>

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
