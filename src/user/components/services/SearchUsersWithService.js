import React, { useEffect, useState } from "react";
import {
  fetchAllCitiesByStateID,
  fetchAllStatesByCountryID,
  fetchCategoryByTitle,
  searchPeopleInService,
} from "../../services/userService";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import InfiniteScroll from "react-infinite-scroll-component";
import { setLoader } from "../../actions/loaderAction";
import Comment from "./Comment";
import { Divider, Rate } from "antd";
import ServiceChat from "../chats/ServiceChat";
import FlatRentServiceBannerDrawer from "./FlatRentServiceBannerDrawer";
import ViewProfileDrawerForMembers from "../search/ViewProfileDrawerForMembers";
import CardData from "./CardData";

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

  const [data, setData] = useState('');
  const [category, setCategory] = useState('');
  const [cList, setClist] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [defaultImage, setDefaultImage] = useState(
    "/admin/img/download.jpg"
  );
  const [isAndroidUsed, setIsAndroidUsed] = useState(false);

  const [isSearchingPerformed, setIssearchingPerformed] = useState(false);
  const [isFeedbackClicked, setIsFeedbackClicked] = useState(false);
  const [index, setIndex] = useState(0);
  const [isViewMore, setIsViewMore] = useState(false);

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

  const handleViewClick = (item) => {
    localStorage.setItem("data", JSON.stringify(item));
    navigate(`/user/service/info/${item.id}`);
  }

  const handleFeedbackFlag = (value, index, item) => {
    setIndex(index);
    setData(item);
    setIsFeedbackClicked(value);
  }
  useEffect(() => {
    if (index) {
      setIndex(index)
    }
  }, [index])

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

  const getCategory = async () => {
    try {
      let response;
      if (title) {
        response = await fetchCategoryByTitle(title);
      }
      if (response && response.status === 200) {
        setCategory(response.data.category);
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
    }
  };

  const getArray = (value) => {
    const items = value.split(',').map(item => item.trim());
    return items;
  }

  useEffect(() => {
    if (items.length > 0) {
      setIssearchingPerformed(true);
    } else {
      setIssearchingPerformed(false);
    }
  }, [items]);
  const handleClearButton = () => {
    setSearchText('');
    setSelectedState('');
    setSelectedCity('');
  }

  const fetchMoreData = () => {
    if (!isLoading && items.length < totalRows) {
      const state = selectedState ? selectedState.label : '';
      const city = selectedCity ? selectedCity.label : '';
      search(page + 1, 200, state, city);
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
    search(1, 200, state, city);
  }, [user]);

  useEffect(() => {
    // Check if the component is not just mounted
    if (page > 1 || searchText || !searchText) {
      const state = selectedState ? selectedState.label : '';
      const city = selectedCity ? selectedCity.label : '';
      search(page, 200, state, city);
    }
  }, [searchText, isGoClick, page, selectedState, selectedCity]);

  useEffect(() => {
    setPage(1);
  }, [searchText]);

  useEffect(() => {
    getCategory();
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
    if (category) {
      const list = category.split(',');
      setClist(list);
    }
  }, [category]);
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
  const UserCard = ({ item, isAndroidUsed, handleChatclick, handleFeedbackFlag, innerIndex }) => {
    return (
      <div className={`text-black${isAndroidUsed ? '' : 'd-flex'}`}>


        <div className="row">

          <div className="col-md-5 col-sm-12">
            <img
              src={item.photo ? item.photo : defaultImage}
              alt={item.name}
              className="img-fluid m-2"
              style={{ width: '100px', height: '100px', borderRadius: '10px' }}
            />
            <p className="fs-4 m-2">{item.name.toUpperCase()}</p>
            <Rate className="m-2" allowHalf defaultValue={parseFloat(item.avg_rating)} disabled />
            <p className="fw-bold fs-4 m-2">{item.avg_rating}</p>
            <h5 className="m-2">Rating</h5>
            <p className="m-2">Total Participate - {item.total_participating}</p>
            {/* ... other content ... */}
            <div className=" comment-text m-2" style={{ width: isAndroidUsed ? '250px' : '300px' }}>
              Description :
              <p
              >{item.description ? (item.description.length > 200 ? (<div>
                <p>{item.description.slice(0, 200).concat(isViewMore ? '' : '....')}
                  {isViewMore ? item.description.slice(300) : ''}</p>
                <button type="button" onClick={() => setIsViewMore(!isViewMore)}>{isViewMore ? 'Show Less' : 'View More'}</button>
              </div>) : item.description) : ''}</p>

            </div>

          </div>
          <div className="col-md-6">
            <p> Providing Services In -
              {/* {item.category} */}
              <div className="row">
                {getArray(item.category).map((item, index) => (
                  <p className="col-12 col-md-12 m-2" style={{border:'1px solid',borderRadius:'20px',display:'flex',justifyContent:'center'}}>{item}</p>
                ))}
              </div>
            </p>
            <div className="row">
              <div className="flex-grow-1">

                <p className="mb-2 pb-1 justify-content-start" style={{ color: '#2b2a2a' }}>
                  Occupation-{item.occupation ? item.occupation.length > 50 ? (
                    item.occupation.slice(0, 50) + "...."
                  ) : (item.occupation) : ''}
                </p>
                <div
                  className="d-flex justify-content-start rounded-3"
                >
                  Experience-{item.experience ? item.experience : 'N/A'}
                </div>
                <div className="d-flex justify-content-start rounded-3 mt-2"
                  style={{ backgroundColor: '#efefef' }}
                >
                  {/* Age-{age(item.matrimonial_profile_dob)} Years */}
                </div>
                <div className="d-flex justify-content-start rounded-3 mt-2"
                >
                  <p>Service At - {item.city}</p>
                  <p>
                    {item.state
                      ? `(${item.state})`
                      : ""}
                  </p>
                </div>
                <p>({item.location})</p>
               
                <div
                  className=" contact-container"
                >
                  <p className="mb-0 contact-number">
                    Contact Numbers:
                    <a href={`tel:${item.mobile1}`}>{item.mobile1}</a>
                    {item.mobile2 && (
                      <>
                        <a href={`tel:${item.mobile2}`}>{item.mobile2}</a>
                      </>
                    )}
                    {checkMobileVisibility(item.masked_mobile) && (
                      <>
                        <a href={`tel:${item.masked_mobile}`}>{item.masked_mobile}</a>
                      </>
                    )}
                  </p>
                </div>

              </div>


              <div className="d-flex justify-content-start rounded-3 mt-2"
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

            </div>
          </div>
        </div>


      </div>
    );
  };



  return (
    <>
      {isChat ? (
        <ServiceChat changeChatFlag={changeChatFlag} selectedUser={selectedUser} />
      ) : (
        <div id="searchPeoples-section" className="content-wrapper pt-4 mb-4">
          <div id="" className="container">
            <div className="card shadow card-search">
              <div className="card-header bg-darkskyblue">

                <div className="service-section-registered-users">
                  <div className="">{title}</div>
                  {
                    !isAndroidUsed && (
                      <div className="position-relative">
                        <div className="input-group">
                          <input
                            type="text"
                            placeholder="Search..."
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
                    )
                  }
                  <div>
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
                {
                  isAndroidUsed && (
                    <div className="position-relative mt-2">
                      <div className="input-group">
                        <input
                          type="text"
                          placeholder="Search..."
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
                  )
                }
              </div>
              <div className="card-body">

                <div className="row">
                  <div className="mb-3 col-lg-3 col-sm-12 col-xs-12 service-section-interested-field" style={{ border: '1px solid', backgroundColor: '#828E93', height: '400px', overflow: 'scroll' }}>
                    <div className="text-light mt-2" style={{ width: '100%', border: '1px solid', padding: '4px', borderRadius: '10px', backgroundColor: '#66BB6A', alignContent: 'center' }}>Search By Your Choice</div>
                    <div className="mt-2">
                      {
                        cList && cList.length > 0 && cList.map((item, index) => (
                          <a className="hover-pointer text-decoration-none text-light">
                            <p onClick={() => setSearchText(item.trim())}>{item}</p>
                          </a>
                        ))
                      }
                    </div>

                  </div>
                  <div className="mb-3 col-lg-9 col-sm-12 col-xs-12">
                    <div className="service-container">

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
                      <button className="clear-button"
                        type="button" disabled={!searchText && !selectedCity && !selectedState}
                        onClick={handleClearButton}
                      >Clear</button>
                    </div>
                    <p style={{ fontSize: '12px' }}>(you can search by service title, category name, state, city, area, provider name etc.)</p>
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
                        {items.map((item, innerIndex) => (
                         <div className="mt-2">
                           {isFeedbackClicked && innerIndex === index ? (
                                  <Comment handleFeedbackFlag={handleFeedbackFlag} data={data} />
                                ) : (
                                  <CardData
                                    item={item}
                                    isAndroidUsed={isAndroidUsed}
                                    handleChatclick={handleChatclick}
                                    handleFeedbackFlag={handleFeedbackFlag}
                                    innerIndex={innerIndex}
                                  />

                                )}
                         </div>
                        ))}
                      </InfiniteScroll>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default SearchUsersWithService;
