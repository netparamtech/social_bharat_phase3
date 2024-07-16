import React, { useEffect, useState } from "react";
import {
  fetchAllCitiesByStateID,
  fetchAllCommunities,
  fetchAllStatesByCountryID,
  fetchAllSubcasts,
  searchPartner,
} from "../../services/userService";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { setLoader } from "../../actions/loaderAction";
import { Divider } from "antd";
import { logout } from "../../actions/userAction";
import GenerateBiodata from "../ProfilePage/GenerateBiodata";
import MatrimonialCard from "../ProfilePage/MatrimonialCard";
import MatriChat from "../chats/MatriChat";

const SearchPartner = () => {
  const handlePartnerClick = (e) => {
    e.preventDefault();
    navigate("/user/create-matrimonial-profile");
  };

  const user = useSelector((state) => state.userAuth);
  const [loggedUserID, setLoggedUserID] = useState("");
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [communities, setCommunities] = useState([]);
  const [defaultImage, setDefaultImage] = useState(
    "/user/images/default5.jpg"
  );

  const [isSaveClicked, setIsSaveClicked] = useState(false);
  const [isFilter, setIsFilter] = useState(false);

  const [gender, setGender] = useState("");
  const [community_id, setCommunity_id] = useState("");
  const [subcast_id, setSubcastId] = useState('');
  const [subcast, setSubcast] = useState('');
  const [communityName, setCommunityName] = useState("");
  const [occupation, setOccupation] = useState('');
  const [cast, setCast] = useState("");

  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countryID, setCountryID] = useState(101);

  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [clearValue, setClearValue] = useState('');
  const [isClear, setisClear] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [serverError, setServerError] = useState("");

  const [isSearchingPerformed, setIssearchingPerformed] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const [isChat, setIsChat] = useState(false);
  const [isAndroidUsed, setIsAndroidUsed] = useState(false);

  const occupationOptions = [
    "Government",
    "Private",
    "Doctor",
    "Engineer",
    "Sales",
    "Marketing",
    "Business"
  ]

  const handleClear = (value) => {
    if (value === 'city') {
      setSelectedCity(null);
    }
    if (value === 'search') {
      setSearchText('');
    }
    setClearValue(value);
    setisClear(!isClear);
  }

  const changeChatFlag = (value) => {
    setIsChat(value);
  };

  const handleChatclick = (item) => {
    setIsChat(true);
    setSelectedUser(item);
  };

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleOccupationChange = (e) => {
    setOccupation(e.target.value);
  };
  const handleSubcastChange = (selectedOption) => {
    setSubcastId(selectedOption.value);
    setSubcast(selectedOption);
  };

  const handleStateChange = (selectedOption) => {
    if (selectedOption) {
      setSelectedState(selectedOption);
      setState(selectedOption.label);
      setCity('');
      setSelectedCity('');
      const selectedStateObject = states.find(
        (state) => state.name === selectedOption.value
      );
      if (selectedStateObject) {
        getAllCities(selectedStateObject.id);
      }
    }
  };

  const handleCityChange = (selectedOption) => {
    if (selectedOption) {
      setSelectedCity(selectedOption); // Update the state with the selected option object
      setCity(selectedOption.label);
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

  const search = async (
    searchText,
    page,
    size,
    community_id,
    state,
    city,
    gender,
    occupation,
    cast,
    subcast_id
  ) => {
    setIsLoading(true);
    dispatch(setLoader(true));
    try {
      const response = await searchPartner(
        searchText,
        page,
        20,
        community_id,
        state,
        city,
        gender,
        occupation,
        cast,
        subcast_id
      );

      if (response && response.status === 200) {
        setIsLoading(false);
        setTotalRows(response.data.data.totalFilteredRecords);
        setServerError("");
        if (response.data.data.length === 0) {
          setIssearchingPerformed(false);
        }
        if (community_id || searchText || state || city || gender || cast || occupation || subcast_id) {
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
    } finally {
      dispatch(setLoader(false));
    }
  };

  //fetch all active subcast communities
  const fetchSubcastsCommunities = async () => {
    dispatch(setLoader(true));
    try {
      const response = await fetchAllSubcasts(community_id);
      if (response && response.status === 200) {
        const requestedCasts = response.data.data.filter((item) => item.status === 'true');
        setCommunities(requestedCasts);
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
    } finally {
      dispatch(setLoader(false));
    }
  };

  const fetchMoreData = () => {
    if (!isLoading && items.length < totalRows) {
      search(
        searchText,
        page + 1,
        20,
        community_id,
        state,
        city,
        gender,
        occupation,
        cast,
        subcast_id
      );
      setPage(page + 1);
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
    }
    return "N/A";
  };

  const handleScrollToUp = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (items.length > 0) {
      setIssearchingPerformed(true);
    }
  }, [items]);

  useEffect(() => {
    // Check if selectedCountry is already set
    if (selectedCountry) {
      getAllStates();
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (states && selectedState) {
      const selectedStateObject = states.find(
        (state) => state.name === selectedState.label
      );
      if (selectedStateObject) {
        getAllCities(selectedStateObject.id);
      }
    }
  }, [states]);

  useEffect(() => {
    setCommunity_id(user && user.user && user.user.community_id);
  }, [user]);

  useEffect(() => {
    if (community_id) {
      setPage(1);
      search(
        searchText,
        page,
        20,
        community_id,
        state,
        city,
        gender,
        occupation,
        cast,
        subcast_id
      );
    }
  }, [searchText, community_id, gender, city, state, cast, occupation, subcast_id]);

  useEffect(() => {
    setPage(1);
  }, [isFilter]);

  useEffect(() => {
    if (community_id) {
      fetchSubcastsCommunities();
    }
  }, [community_id]);


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
    if (clearValue === 'gender') setGender('');
    if (clearValue === 'occupation') setOccupation('');
    if (clearValue === 'subcast') {
      setSubcastId("");
      setSubcast('');
    }
    if (clearValue === 'state') {
      setSelectedState("");
      setState('');
      setCity('');
      setCities([]);
      setSelectedCity("");

    }
  }, [isClear]);
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
        <MatriChat changeChatFlag={changeChatFlag} selectedUser={selectedUser} />
      ) : (
        <div id="searchPeoples-section" className="content-wrapper">
          <div className="mt-3">

            <div className="card shadow">
              <div className={`card-header mt-2 fs-3 fw-bold d-flex justify-content-between ${isAndroidUsed ? '' : 'mx-auto'}`}>
                {isAndroidUsed ? (
                  <>
                    <img src="/user/images/matri.jpg" width={40} height={40} />
                    <h4 className="text-info fw-bold">Search Partner</h4>
                    <img src="/user/images/addicon.png" width={30} height={30} onClick={handlePartnerClick} />
                  </>
                ) :
                  <h5 className="text-info fw-bold">Search Partner</h5>
                }
              </div>
              <div className="card-body">
                <div className="container matrimonial-header">
                  {
                    !isFilter && (
                      <div className={`row ${isAndroidUsed ? '' : 'transition-filter'}`}>
                        <div className="col-md-7 ps-0">
                          {serverError && (
                            <span className="error">{serverError}</span>
                          )}

                        </div>

                        <div className="row ms-auto me-auto justify-content-between">

                          <div className="mt-3 col-11 col-sm-2 custom-bottom-margin-search-partner">
                            <label className="form-label ">
                              Interested In
                            </label>
                            <select
                              className="form-select form-control"
                              aria-label="job profile select"
                              value={gender}
                              onChange={handleGenderChange}
                            >
                              <option value="">--- Gender---</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>

                          </div>
                          <div className="mt-5 col-1 col-sm-1 custom-bottom-margin-search-partner">
                            {
                              gender && <img className="hover-pointer" src="/user/images/delete2.png" width={40} style={{ marginLeft: '-20px' }} onClick={() => handleClear("gender")} />
                            }
                          </div>


                          <div className="custom-bottom-margin-search-partner mt-3 col-11 col-sm-2">
                            <label className="form-label">State</label>
                            <Select
                              className="form-control"
                              aria-label="Default select example"
                              options={states && states.map((state) => ({
                                value: state.name,
                                label: state.name,
                              }))}
                              value={selectedState}
                              onChange={handleStateChange}
                            />
                          </div>
                          <div className="mt-5 col-1 col-sm-1 custom-bottom-margin-search-partner">
                            {
                              selectedState && <img className="hover-pointer" src="/user/images/delete2.png" width={40} style={{ marginLeft: '-20px' }} onClick={() => handleClear("state")} />
                            }
                          </div>
                          <div className="custom-bottom-margin-search-partner mt-3 col-11 col-sm-2">
                            <label className="form-label ">City</label>
                            <Select
                              className="form-control"
                              aria-label="Default select example"
                              options={cities.map((city) => ({
                                value: city.name,
                                label: city.name,
                              }))}
                              value={selectedCity}
                              onChange={handleCityChange}
                            />
                          </div>
                          <div className="mt-5 col-1 col-sm-1 custom-bottom-margin-search-partner">
                            {
                              selectedCity && <img className="hover-pointer" src="/user/images/delete2.png" width={40} style={{ marginLeft: '-20px' }} onClick={() => handleClear("city")} />
                            }
                          </div>
                          <div className="custom-bottom-margin-search-partner mt-3 col-11 col-sm-2">
                            <label className="form-label">Subcast</label>
                            <Select
                              id="community_id"
                              className="form-control"
                              aria-label="Default select example"
                              value={subcast} // Provide a selected option state
                              onChange={handleSubcastChange} // Your change handler function
                              options={
                                communities &&
                                communities.map((data) => ({
                                  value: data.subcast_id,
                                  label: data.subcast,
                                }))
                              }
                              placeholder="Subcast"
                            />
                          </div>
                          <div className="mt-5 col-1 col-sm-1 custom-bottom-margin-search-partner">
                            {
                              subcast && <img className="hover-pointer" src="/user/images/delete2.png" width={40} style={{ marginLeft: '-20px' }} onClick={() => handleClear("subcast")} />
                            }
                          </div>
                          <div className="custom-bottom-margin-search-partner mt-3 col-11 col-sm-2">
                            <label className="form-label">Occupation</label>

                            <select id="jobProfile" name="jobProfile" className="form-select form-control"
                              aria-label="job profile select" value={occupation} onChange={handleOccupationChange}
                            >
                              <option value="">Select</option>
                              {
                                occupationOptions && occupationOptions.map((item, index) => (
                                  <option value={item}>{item}</option>
                                ))
                              }
                            </select>
                          </div>
                          <div className="mt-5 col-1 col-sm-1 custom-bottom-margin-search-partner">
                            {
                              occupation && <img className="hover-pointer" src="/user/images/delete2.png" width={40} style={{ marginLeft: '-20px' }} onClick={() => handleClear("occupation")} />
                            }
                          </div>

                        </div>
                        <div className="row ms-auto me-auto mb-2 justify-content-between" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginTop: '30px' }}>
                          <div className="col-11 col-md-9 d-flex position-relative">
                            <input type="text" className="form-control" name="search" value={searchText} autoFocus onChange={handleSearchText} />

                            <button type="button" style={{ borderRadius: '0px 10px 10px 0px', borderWidth: '0px 0px 0px 0px' }}>Search</button>
                            {
                              searchText && <img src="/user/images/Xicon.png" width={15}
                                style={{ position: 'absolute', right: '100px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
                                onClick={() => handleClear("search")}
                              />}
                          </div>
                          <div className="col-md-3 col-11">
                            {
                              !isAndroidUsed && <a
                                title="Add Business"
                                className="btn btn-secondary w-100 btn-sm mb-2"
                                onClick={handlePartnerClick}
                                style={{ width: '100%', maxWidth: '200px', height: '40px' }}
                              >
                                ADD MATRIMONIAL
                              </a>
                            }
                          </div>
                        </div>

                      </div>
                    )
                  }
                  <div className="search-partner-filter-container mt-2 wow animate__animated animate__zoomIn">
                    <a
                      title="Filter"
                      className="btn btn-primary btn-sm me-2 hover-pointer search-partner-filter"
                      onClick={() => setIsFilter(!isFilter)}
                    >
                      <i className="fas fa-filter me-1"></i>{!isFilter ? 'Hide Filter' : 'Show Filter'}
                    </a>
                  </div>
                </div>


                <div className="filter-content pt-3 d-md-block ">
                  {isSaveClicked && (
                    <p>
                      {isSaveClicked && "Searching for "}
                      {gender && `Gender-${gender}, `}
                      {communityName && `Community-${communityName}, `}
                      {occupation && `Occupation-${occupation}, `}
                      {cast && `Cast-${cast}, `}{" "}
                      {(selectedCity && "in") || (selectedState && "in")}
                      {selectedCity && selectedCity.label && ` ${selectedCity.label}`}
                      {selectedState && selectedState.label && ` (${selectedState.label})`}
                    </p>
                  )}
                </div>

                {!isSearchingPerformed ? (
                  <span className="error">No Data Available</span>
                ) : (
                  ""
                )}

                <div className="container scrollableDiv" id="scrollableDiv"
                  style={{
                    height: 400,
                    overflow: 'auto',


                  }}>
                  <InfiniteScroll
                    style={{ overflowX: "hidden" }}
                    dataLength={items.length}
                    next={fetchMoreData}
                    hasMore={items.length < totalRows}
                    loader={isLoading && <h4>Loading...</h4>}
                    endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                    scrollableTarget="scrollableDiv"
                  >
                    {groupedItems.map((pair, index) => (
                      <div className="row" key={index}>
                        {pair.map((item, innerIndex) => (

                          <div className="col-md-6 mt-2" key={innerIndex}>
                            <div className="card" style={{ borderRadius: '15px', height: isAndroidUsed ? '' : '550px' }}>
                              <div className="card-body p-4 search-partner-cards">
                                <div className={`text-black ${isAndroidUsed ? '' : 'd-flex'}`}>
                                  <div className="flex-shrink-0">

                                    {
                                      item.proposal_photos && item.proposal_photos.length > 0 ?
                                        (
                                          Array.isArray(item.proposal_photos) ? <img
                                            src={item.proposal_photos[0]}
                                            alt={item.matrimonial_profile_name}
                                            className="img-fluid"
                                            style={{ width: '180px', height: '150px', borderRadius: '10px' }}
                                          /> : <img
                                            src={item.proposal_photos}
                                            alt={item.matrimonial_profile_name}
                                            className="img-fluid"
                                            style={{ width: '180px', height: '150px', borderRadius: '10px' }}
                                          />
                                        ) : <img
                                          src={defaultImage}
                                          alt={item.matrimonial_profile_name}
                                          className="img-fluid"
                                          style={{ width: '180px', height: '150px', borderRadius: '10px' }}
                                        />
                                    }

                                  </div>
                                  <div className="flex-grow-1 ms-3">

                                    <h5 className="mb-1  text-wrap-break-word">{item.matrimonial_profile_name}</h5>
                                    <p className="mb-2 pb-1" style={{ color: '#2b2a2a' }}>
                                      Job Type-{item.matrimonial_profile_occupation ? (item.matrimonial_profile_occupation.length > 50 ? item.matrimonial_profile_occupation.slice(0, 50) : item.matrimonial_profile_occupation) : 'N/A'}
                                    </p>

                                    <p className="mb-2 pb-1 justify-content-start text-wrap-break-word " style={{ color: '#2b2a2a' }}>
                                      Job Details-{item.job_profile_description ? item.job_profile_description.length > 50 ? (
                                        item.job_profile_description.slice(0, 50) + "...."
                                      ) : (item.job_profile_description) : ''}
                                    </p>
                                    <div
                                      className="d-flex justify-content-start rounded-3"
                                    >
                                      Education-{item.education ? item.education : 'N/A'}
                                    </div>
                                    <p className="mb-2 pb-1 justify-content-start text-wrap-break-word" style={{ color: '#2b2a2a' }}>
                                      Education Details-{item.educational_details ? item.educational_details.length > 50 ? (
                                        item.educational_details.slice(0, 50) + "...."
                                      ) : (item.educational_details) : ''}
                                    </p>
                                    <div className="d-flex justify-content-start rounded-3 mt-2"
                                    >
                                      Age-{age(item.matrimonial_profile_dob)} Years
                                    </div>
                                    <div className="d-flex justify-content-start rounded-3 mt-2"
                                    >
                                      <p>City-{item.city}</p>
                                      <p>
                                        {item.state
                                          ? `(${item.state})`
                                          : ""}
                                      </p>
                                    </div>
                                    <div className="d-flex justify-content-start rounded-3 mt-2"
                                    >
                                      {
                                        item.contact_number ? (
                                          <a href={`tel:${item.contact_number}`}>
                                            {item.contact_number}
                                          </a>
                                        ) : checkMobileVisibility(item.mobile) ? (
                                          <p>
                                            <a href={`tel:${item.mobile}`}>
                                              {item.mobile}
                                            </a>
                                          </p>
                                        ) : ''
                                      }


                                    </div>
                                    <div className="card-footer pt-1" style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>


                                      <div
                                        className="text-start ms-3 mt-2 hover-pointer"
                                        onClick={() => handleChatclick(item)}
                                        style={{ flex: 1, justifyContent: 'space-between' }}
                                      >

                                        <img className=""
                                          src="/user/images/chat-icon.jpg"
                                          width="50px"
                                        />
                                      </div>

                                      <MatrimonialCard item={item} />
                                      <div className="mt-3">
                                        {item && <GenerateBiodata userData={item} />}
                                      </div>

                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </InfiniteScroll>

                  {/* Repeat the user card structure as needed */}
                </div>
              </div>
            </div>
          </div>
        </div >
      )}
      {/* <div className={`scroll-to-up ${isChat ? "d-none" : ""}`}>
        <a
          className="btn btn-primary btn-sm me-2 mb-2 hover-pointer"
          id=""
          onClick={handleScrollToUp}
          title="Refresh"
        >
          <i className="fa fa-arrow-up" aria-hidden="true"></i>
        </a>
      </div> */}
    </>
  );
};

export default SearchPartner;
