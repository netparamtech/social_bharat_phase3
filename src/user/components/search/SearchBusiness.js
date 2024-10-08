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
import { Divider, Image, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { setLoader } from "../../actions/loaderAction";
import BusinessCard from "./BusinessCard";

const SearchBusiness = () => {
  const user = useSelector((state) => state.userAuth);

  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [defaultImage] = useState("/admin/img/download.jpg");
  const [totalRows, setTotalRows] = useState(1);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');

  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countryID, setCountryID] = useState(101);
  const [isAndroidUsed, setIsAndroidUsed] = useState(false);
  const [defaultMap, setDefaultMap] = useState("/user/images/location.png");
  const [isDetails, setIsDetails] = useState(false);
  const [scrollValue, setScrollValue] = useState(1000);

  //to show state and city according to user search

  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  //to show message on top of page

  const [message, setMessage] = useState("");
  const [serverError, setServerError] = useState("");

  const [isFilter, setIsFilter] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const categories = [
    '',
    'Information Technology (IT)',
    'Sports',
    'Sales',
    'Marketing',
    'Manufacturing',
    'Service',
    'Finance',
    'Real Estate',
    'Healthcare',
    'Transportation and Logistics',
    'Hospitality',
    'Education',
    'Nonprofit Organization',
    'Polity',
    'Other',
  ];
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
      fetchJobs(size, page, state, city, searchText, selectedCategory);
    }
  };

  const handlePromoteBusinessClick = (e) => {
    e.preventDefault();
    navigate("/user/update-business-profile");
  };

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
    setState(selectedOption.label)
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
    setCity(selectedOption.label);
    setSelectedCity(selectedOption); // Update the state with the selected option object
  };

  const handleFilterClicked = () => {
    console.log(isFilter)
    setIsFilter(!isFilter);
  };

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const fetchJobs = async (size, page, state, city, searchText, category) => {
    if (category === undefined) {
      category = '';
    }

    dispatch(setLoader(false));
    try {
      const response = await searchBusinessWithSearchText(size, page, state, city, searchText, category);
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
  const handleClearClick = () => {
    setSearchText('');
    setCity('');
    setState('');
    setSelectedCity('');
    setSelectedState('');
    setSelectedCategory('');
  }


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
    fetchJobs(size, 1, state, city, searchText, selectedCategory);
  }, [searchText, selectedState, selectedCity, selectedCategory]);
  const handleScrollToUp = () => {
    window.scrollTo(0, 0);
  };

  // useEffect(() => {
  //   setState(user && user.user && user.user.native_place_state);
  //   setCity(user && user.user && user.user.native_place_city);
  // }, [user]);

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
      if (window.innerWidth < 1000) {
        setScrollValue(1500);
      }
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
    <div id="service-section" className="content-wrapper pt-4 mb-4">
      <div className="container">
        <div className="card shadow">
          <div className="card-body">

            {serverError && <span className="error">{serverError}</span>}

            <div>
              <h5 className="fw-3 d-none d-sm-block">Search Business</h5>
            </div>

            <div className="d-flex justify-content-between">
              {
                isAndroidUsed && (
                  <a
                    title="Add Business"
                    className="btn btn-primary"
                    onClick={handleFilterClicked}
                  >
                    {
                      isFilter ? 'Hide Filter' : 'Show Filter'
                    }
                  </a>
                )
              }
              {
                isAndroidUsed && (
                  <div className="">
                    <button type="button" className="btn hover-pointer hover-pointer-red" style={{ border: '1px solid' }}
                      onClick={handleClearClick} disabled={!searchText && !state && !city && !selectedCategory}>
                      Clear
                    </button>
                  </div>
                )
              }
            </div>

            <div className="row col-12 col-md-12 mt-2">

              {
                (isAndroidUsed && isFilter) || !isAndroidUsed ? (
                  <>
                    <div className="col-md-3 col-12 side-filter-business position-relative">
                      <div className="bg-success text-light mx-auto p-2" style={{ borderRadius: '10px' }}>You Can Choose Your Interesting Field</div>
                      <div className="business-more-filter-block mt-2" style={{ overflow: 'scroll', height: '400px' }}>
                        {categories.map((category, index) => (
                          <p
                            key={index}
                            className={`hover-pointer ${selectedCategory === category ? 'selected-category' : 'hover-pointer-green'}`}
                            onClick={() => handleCategoryChange(category)}
                          >
                            {category === '' ? 'All' : category}
                          </p>
                        ))}
                      </div>

                    </div>
                    <div className="col-md-3 col-12">

                      <div className="row p-4">

                        <a
                          title="Add Business"
                          className="btn btn-primary mt-2"
                          onClick={handlePromoteBusinessClick}
                        >
                          Promote Your Business{" "}
                        </a>
                        <div className="mt-3">
                          <div>
                            <div className=" mb-3">
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
                            <div className="mb-3">
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

                            <div className="mb-3 position-relative">
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
                            <div>
                              <a className="hover-pointer" onClick={() => navigate(`/profile/${btoa(scrollValue.toString())}`)}><p>Manage Your Business Profile</p></a>
                            </div>
                            {/* <div className="mx-auto text-danger p-4">You Are Searching In
                              {city ? (
                                <p>
                                  {city}
                                  {state && `(${state})`}
                                </p>
                              ) : (
                                <p>{state && `state - ${state}`}</p>
                              )}
                              {
                                category && <p>category -  {category ? category : ''}</p>
                              }
                            </div> */}
                            <button type="button" className="btn hover-pointer hover-pointer-red" style={{ border: '1px solid' }}
                              onClick={handleClearClick} disabled={!searchText && !state && !city && !selectedCategory}>
                              Clear
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>
                  </>
                ) : ''
              }

              <div className="col-md-6 col-12 mx-auto">
                <div className="scrollableDiv" id="scrollableDiv"
                  style={{
                    height: 500,
                    overflow: 'auto'
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

                          <div className={`${isFilter ? 'col-md-9' : 'col-md-12'} col-12 mt-2 mx-auto`} key={idx} >
                            <div className="card" style={{ borderRadius: '15px' }}>
                              <div className="card-body p-4">
                                <h4 className="text-primary">{item.business_name && item.business_name.toUpperCase()}</h4>
                                <p className='text-info'>({item.business_category})</p>
                                <p>
                                  <span className="text-muted" dangerouslySetInnerHTML={{
                                    __html: item && item.description && item.description.length > 400
                                      ? `${item.description.slice(0, 400)}...`
                                      : item.description,
                                  }}></span>
                                </p>
                                <div className={`text-black ${isAndroidUsed ? '' : ''}`}>
                                  {
                                    item.business_photos && <Carousel className="your-custom-carousel-class">
                                      {
                                        checkArray(item.business_photos).map((value, index) => (
                                          <Carousel.Item key={index}>
                                            <div className="">
                                              <Image
                                                src={value}
                                                alt={item.business_name}
                                                className=""
                                                style={{ top: '0', left: '0', width: '100%', height: '200px', justifyContent: 'center', alignItems: 'center', borderRadius: '20px' }}
                                              />
                                            </div>
                                          </Carousel.Item>
                                        ))
                                      }
                                    </Carousel>
                                  }
                                  <div className="flex-grow-1 ms-3 mt-2">

                                    <p>Location : <span className="text-muted">{item.city}{" "}({item.state}){", "}{item.country}</span></p>
                                    <div
                                      className="d-flex justify-content-start rounded-3"

                                    >
                                      <p>Street Address-{item.street_address}</p>
                                    </div>

                                  </div>

                                </div>
                              </div>
                              <div className="card-footer bg-light d-flex justify-content-between rounded-3" style={{ flexDirection: 'row', height: '60px', marginTop: '10px' }}>
                                <BusinessCard item={item} />
                                {
                                  item.google_map_link ? (
                                    <div className="">
                                      <a href={item.google_map_link} target="_blank">
                                        <i class="fs-2 text-success fa-sharp fa-solid fa-location-dot"></i>                                      </a>
                                    </div>
                                  ) :
                                    <i class="fs-2 text-success fa-sharp fa-solid fa-location-dot" disabled style={{opacity:0.5}}></i>
                                    }

                              </div>


                              {/* <a className="btn over-pointer-g-effect mx-auto m-2 btn-toggle" onClick={() => handleIsDetailsClicked(idx)}>{!isDetails[idx] ? "Show More" : "Show Less"}</a> */}
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
        </div>
      </div>

    </div>
  );
};

export default SearchBusiness;
