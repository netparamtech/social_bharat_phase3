import React, { useEffect, useState } from "react";
import {
  fetchAllCitiesByStateID,
  fetchAllStatesByCountryID,
  searchPeopleWithSearchText,
  searchWithCityState,
} from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Select from "react-select";
import InfiniteScroll from "react-infinite-scroll-component";

const SearchPeople = () => {
  const user = useSelector((state) => state.userAuth);

  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [defaultImage, setDefaultImage] = useState(
    "/admin/img/de-default-1.jpeg"
  );

  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countryID, setCountryID] = useState(101);

  //to show state and city according to user search

  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const [isFilter, setIsFilter] = useState(false);
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(100);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMoreData = () => {
    if (!isLoading && items.length < totalRows) {
      search(searchText, page + 1, 20,state,city);
      setPage(page + 1);
    }
  };

  useEffect(() => {
    search(searchText, page, 20);
  }, []);


  const handleFilterClicked = () => {
    setIsFilter(!isFilter ? true : false);
  };

  const handleStateChange = (selectedOption) => {
    setPage(1);
    setState(selectedOption.label)
    setSelectedState(selectedOption);
    setCity('');
    setSelectedCity('');

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
    setPage(1);
    setSelectedCity(selectedOption); // Update the state with the selected option object
  };

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const handleGoButtonClick = async () => {
    const queryParams = {
      q: searchText,
      page,
      size: 20,
      state: selectedState ? selectedState.label : "",
      city: selectedCity ? selectedCity.label : "",
      // Add other modal fields to the queryParams
    };

    // Construct the query string from the queryParams object
    const queryString = new URLSearchParams(queryParams).toString();

    // Do something with the query string (e.g., redirect to a new URL)
    try {
      const response = await searchWithCityState(queryString);
      if (response.data.data.length !== 0) {
        setItems(response.data.data);
      } else {
        setItems([]);
      }
      setCity(selectedCity.label ? selectedCity.label : city);
      setState(selectedState.label ? selectedState.label : state);
    } catch (error) {
      //Unauthorized
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
      //Internal Server Error
      else if (error.response && error.response.status === 500) {
        navigate("/login");
      }
    }
  };

  const getAllStates = async () => {
    try {
      const response = await fetchAllStatesByCountryID(countryID);
      if (response && response.status === 200) {
        setStates(response.data.data);
      }
    } catch (error) {
      //Unauthorized
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
      //Internal Server Error
      else if (error.response && error.response.status === 500) {
        navigate("/login");
      }
    }
  };

  const getAllCities = async (stateID) => {
    try {
      const response = await fetchAllCitiesByStateID(stateID);
      if (response && response.status === 200) {
        setCities(response.data.data);
      }
    } catch (error) {
      //Unauthorized
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
      //Internal Server Error
      else if (error.response && error.response.status === 500) {
        navigate("/login");
      }
    }
  };

  const search = async (searchText, page, size) => {
    console.log(state,city)
    setIsLoading(true);
    try {
      const response = await searchPeopleWithSearchText(searchText, page, size,state,city);
      if (response && response.status === 200) {
        if (searchText) {
          if (response.data.data.length !== 0) {
            setItems(response.data.data);
          } else {
            setItems([...items, ...response.data.data]);
          }


        } else {
           const response = await searchPeopleWithSearchText(searchText, page, size,state,city);
          
          if (response.data.data.length !== 0) {
            setItems([...response.data.data]);
          } else {
            setItems([...items, ...response.data.data]);
            
          }
        }

      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      //Unauthorized
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else if (error.response && error.response.status === 500) {
        navigate("/login");
      }
    }
  };

  const age = (dob) => {
    const dobDate = new Date(dob);
    const currentDate = new Date();

    // Calculate the age in years
    const ageInMilliseconds = currentDate - dobDate;
    const ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365));

    return ageInYears;
  }

  useEffect(() => {
    setState(user && user.user && user.user.native_place_state);
    setCity(user && user.user && user.user.native_place_city);
  }, [user]);

  useEffect(() => {
    setPage(1);
    search(searchText, page, 20);
  }, [searchText]);

  useEffect(() => {
    // Check if selectedCountry is already set
    if (selectedCountry) {
      getAllStates();
    }
  }, [selectedCountry]);

  // useEffect(() => {
  //   setState(selectedState.label)
  // }, [city]);

  const groupedItems = [];
  for (let i = 0; i < items.length; i += 2) {
    const pair = items.slice(i, i + 3);
    groupedItems.push(pair);
  }

  return (
    <div id="searchPeople-section" className="content-wrapper pt-4 mb-4">
      <div className="container">
        <div className="card shadow">
          <div className="card-body">
            <div>
              <h5 className="fw-3 mb-3 ">Search People</h5>
            </div>
            <div className="filter-content">
              {
                city ? (
                  <p >
                    {city}
                    {state && `(${state})`}
                  </p>
                ) : (
                  <p >
                    {state && `state - ${state}`}
                  </p>
                )
              }
            </div>
            <div className="filter-icon">
              <a
                href="#"
                title="Filter"
                className="btn btn-primary btn-sm me-2"
                onClick={handleFilterClicked}
              >
                <i className="fas fa-filter me-1"></i>Filter
              </a>
            </div>
            <div className="container-input mb-3">
              <input
                type="text"
                placeholder="Search"
                name="text"
                className="input form-control"
                onChange={handleSearchText}
              />
              <i className="fas fa-search"></i>
            </div>
            <div className={`row ${isFilter ? "" : "d-none"}`}>
              <div className="col-5 mb-3">
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
              <div className="col-5 mb-3">
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
              <div className="col-2 mb-3">
                <a
                  href="#"
                  className="btn btn-set btn-primary"
                  onClick={handleGoButtonClick}
                >
                  Go
                </a>
              </div>
            </div>
            <div className="row">
              {/* User Cards */}

              {/* {data &&
                data.map((item, idx) => (
                  <div className="col-md-4" key={idx}>
                    <div className="card shadow mb-2">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-4">
                            <img
                              src={item.photo ? item.photo : defaultImage}
                              alt={item.name}
                              title={item.name}
                              className="avatar img-fluid img-circle "
                            />
                          </div>
                          <div className="col-8 user-detail">
                            <p>{item.name}</p>
                            <p>{item.native_place_city}</p>
                            <p>
                              {item.native_place_state
                                ? `(${item.native_place_state})`
                                : ""}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))} */}

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
                      <div className="col-md-4" key={innerIndex}>
                        <div className="card shadow mb-2">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-4">
                                <img
                                  src={item.photo ? item.photo : defaultImage}
                                  alt={item.name}
                                  title={item.name}
                                  className="avatar img-fluid img-circle"
                                />
                              </div>
                              <div className="col-8 user-detail">
                                <p>Name-{item.name}</p>
                                <p>Age-{age(item.dob)}{" "}Years</p>
                                <p>City-{item.native_place_city}</p>
                                <p>
                                  {item.native_place_state
                                    ? `(${item.native_place_state})`
                                    : ""}
                                </p>
                              </div>
                            </div>
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
  );
};

export default SearchPeople;
