import React, { useEffect, useState } from "react";
import {
  fetchAllCitiesByStateID,
  fetchAllStatesByCountryID,
  searchPeopleInService,
} from "../../services/userService";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import InfiniteScroll from "react-infinite-scroll-component";
import { setLoader } from "../../actions/loaderAction";
import NewChat from "../chats/NewChat";
import ViewProfileDrawer from "../search/ViewProfileDrawer";
import Comment from "./Comment";

const SearchUsersWithService = () => {
  const { title } = useParams();
  const user = useSelector((state) => state.userAuth);

  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countryID, setCountryID] = useState(101);

  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [defaultImage, setDefaultImage] = useState(
    "/admin/img/download.jpg"
  );
  const [isAndroidUsed, setIsAndroidUsed] = useState(false);

  const [isSearchingPerformed, setIssearchingPerformed] = useState(false);
  const [isFeedbackClicked, setIsFeedbackClicked] = useState(false);

  //to show state and city according to user search

  const [isGoClick, setIsGoClick] = useState(false);
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);

  const [isChat, setIsChat] = useState(false);

  const changeChatFlag = (value) => {
    setIsChat(value);
  };

  const handleFeedbackFlag = (value) => {
    setIsFeedbackClicked(value);
  }

  const handleChatclick = (item) => {
    setIsChat(true);
    setSelectedUser(item);
  };

  //state and city operations
  //state and city change operations
  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);

    if (selectedOption) {
      const selectedStateObject = states.find(
        (state) => state.name === selectedOption.value
      );
      console.log(selectedStateObject.id)
      if (selectedStateObject.id !== undefined) {
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
      let response;
      if (stateID) {
        response = await fetchAllCitiesByStateID(stateID);
      }
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



  useEffect(() => {
    if (items.length > 0) {
      setIssearchingPerformed(true);
    }
  }, [items]);

  const fetchMoreData = () => {
    if (!isLoading && items.length < totalRows) {
      const state = selectedState ? selectedState.label : '';
      const city = selectedCity ? selectedCity.label : '';
      search(page + 1, 20, state, city);
      setPage(page + 1);
    }
  };

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const search = async (page, size, state, city) => {
    setIsLoading(true);
    dispatch(setLoader(true));
    try {
      const response = await searchPeopleInService(
        searchText,
        state,
        city,
        page,
        size,
        title
      );

      if (response && response.status === 200) {
        setItems(response.data.data.users);
        setTotalRows(response.data.data.totalRowsAffected);
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

  const handleScrollToUp = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const state = selectedState ? selectedState.label : '';
    const city = selectedCity ? selectedCity.label : '';
    search(1, 20, state, city);
  }, [user]);

  useEffect(() => {
    // Check if the component is not just mounted
    if (page > 1 || searchText || !searchText) {
      const state = selectedState ? selectedState.label : '';
      const city = selectedCity ? selectedCity.label : '';
      search(page, 20, state, city);
    }
  }, [searchText, isGoClick, page, selectedState, selectedCity]);

  useEffect(() => {
    setPage(1);
  }, [searchText]);

  useEffect(() => {
    // Check if selectedCountry is already set
    getAllStates();
  }, []);

  useEffect(() => {
    if (selectedState) {
      getAllCities(selectedState.id);
    }
  }, [selectedState]);

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
        <div id="searchPeoples-section" className="content-wrapper pt-4 mb-4">
          <div id="" className="container">
            <div className="card shadow card-search">
              <div className="card-header bg-darkskyblue">
                {title}
                <div className="d-sm-flex align-items-center float-right">

                  <a className="d-sm-inline-block btn btn-sm btn-primary shadow-sm hover-pointer me-1 mb-2 mt-2"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/user/user-registered-services')
                    }}
                  >
                    My Registered Services
                  </a>
                  <a className="d-sm-inline-block btn btn-sm btn-primary shadow-sm hover-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/user/search/service')
                    }}
                  >
                    View All Services/Create
                  </a>
                </div>
              </div>
              <div className="card-body">
                {serverError && <span className="error">{serverError}</span>}


                {!isSearchingPerformed ? (
                  <span className="error">No Data Available</span>
                ) : (
                  ""
                )}

                <div className="row">
                  <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                    <label className="form-label">State</label>

                    <Select
                      className=""
                      options={states.map((state) => ({
                        value: state.name,
                        label: state.name,
                      }))}
                      value={selectedState}
                      onChange={handleStateChange}
                    />
                  </div>

                  <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                    <label className="form-label">City</label>

                    <Select
                      options={cities.map((city) => ({
                        value: city.name,
                        label: city.name,
                      }))}
                      value={selectedCity}
                      onChange={handleCityChange}
                    />
                  </div>
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

                <div className="row">
                  {/* Repeat the user card structure as needed */}
                  <InfiniteScroll
                    style={{ overflowX: "hidden" }}
                    dataLength={items.length}
                    next={fetchMoreData}
                    hasMore={items.length < totalRows}
                    loader={isLoading && <h4>Loading...</h4>}
                  >
                    {groupedItems.map((pair, index) => (
                      <div className="row" key={index}>
                        {pair.map((item, innerIndex) => (

                          <div className="col-md-6 mt-2" key={innerIndex}>
                            <div className="card" style={{ borderRadius: '15px' }}>
                              <div className="card-body p-4">
                                {
                                  !isFeedbackClicked?(
                                    <div className={`text-black ${isAndroidUsed ? '' : 'd-flex'}`}>
                                  <div className="flex-shrink-0">
                                    <img
                                      src={item.photo ? item.photo : defaultImage}
                                      alt={item.name}
                                      className="img-fluid"
                                      style={{ width: '180px', borderRadius: '10px' }}
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
                                      Experience-{item.experience ? item.experience : 'N/A'}
                                    </div>
                                    <div className="d-flex justify-content-start rounded-3 mt-2"
                                      style={{ backgroundColor: '#efefef' }}
                                    >
                                      {/* Age-{age(item.matrimonial_profile_dob)} Years */}
                                    </div>
                                    <div className="d-flex justify-content-start rounded-3 mt-2"
                                      style={{ backgroundColor: '#efefef' }}
                                    >
                                      <p>Service At - {item.city}</p>
                                      <p>
                                        {item.state
                                          ? `(${item.state})`
                                          : ""}
                                      </p>
                                    </div>
                                    <div
                                      className="d-flex justify-content-start rounded-3"
                                      style={{ backgroundColor: '#efefef' }}
                                    >
                                      <p className="">
                                        Contact Numbers:
                                        <a href={`tel:${item.mobile1}`}>
                                          {item.mobile1}
                                        </a>
                                        {item.mobile2 ? (
                                          <>
                                            ,{" "}
                                            <a href={`tel:${item.mobile2}`}>
                                              {item.mobile2}
                                            </a>
                                          </>
                                        ) : (
                                          ""
                                        )}
                                        {
                                          checkMobileVisibility(item.masked_mobile) ? (
                                            <p>
                                              <a href={`tel:${item.masked_mobile}`}>
                                                ,{item.masked_mobile}
                                              </a>
                                            </p>
                                          ) : ''
                                        }

                                      </p>{" "}
                                    </div>
                                    <div className=" comment-text" style={{ width: isAndroidUsed ? '250px' : '300px', overflow: 'scroll' }}>
                                      Description :
                                      <p
                                      >{item.description}</p>

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
                                        <ViewProfileDrawer id={item.id} />
                                      </button>
                                      <button type="button" className="btn me-1 flex-grow-1 nav-link text-success hover-pointer d-inline" onClick={()=>handleFeedbackFlag(true)} >
                                        FEEDBACK
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                  ):(
                                    <Comment handleFeedbackFlag = {handleFeedbackFlag} data = {item} />
                                  )
                                }
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
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

export default SearchUsersWithService;
