import React, { useEffect, useState } from "react";
import {
  fetchAllActiveCommunities,
  fetchAllCitiesByStateID,
  fetchAllStatesByCountryID,
  searchPartner,
  searchPartnerWithSearchText,
} from "../../services/userService";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useSelector } from "react-redux";

const SearchPartner = () => {
  const handlePartnerClick = (e) => {
    e.preventDefault();
    navigate("/user/update-matrimonial-profile");
  };

  const user = useSelector((state) => state.userAuth);

  const [loggedUserID, setLoggedUserID] = useState("");
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [communities, setCommunities] = useState([]);
  const [defaultImage, setDefaultImage] = useState(
    "/admin/img/de-default-1.jpeg"
  );

  const [isSaveClicked, setIsSaveClicked] = useState(false);

  const [gender, setGender] = useState("");
  const [gotra, setGotra] = useState("");
  const [community_id, setCommunity_id] = useState("");
  const [communityName, setCommunityName] = useState("");
  const [skinTone, setSkinTone] = useState("");
  const [cast, setCast] = useState("");

  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countryID, setCountryID] = useState(101);

  const navigate = useNavigate();

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleGotraChange = (e) => {
    setGotra(e.target.value);
  };

  const handleSkinToneChange = (e) => {
    setSkinTone(e.target.value);
  };

  const handleCastChange = (e) => {
    setCast(e.target.value);
  };

  const handleSelectChange = (selectedOption) => {
    setCommunity_id(selectedOption.value);
    setCommunityName(selectedOption.label);
  };

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);

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

  const search = async (id) => {
    try {
      const response = await searchPartner(id);
      if (response && response.status === 200) {
        setData(response.data.data);
      }
    } catch (error) {
      //Unauthorized
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else if (error.response && error.response.status === 500) {
        navigate("/login");
      }
    }
  };

  //fetch all active communities

  const fetchCommunities = async () => {
    const response = await fetchAllActiveCommunities();
    if (response && response.status === 200) {
      setCommunities(response.data.data);
    }
  };

  const handleSaveClick = async () => {
    setIsSaveClicked(true);
    const queryParams = {
      community_id: community_id,
      skintone: skinTone,
      gender: gender,
      gotra: gotra,
      cast: cast,
      state: selectedState ? selectedState.label : "",
      city: selectedCity ? selectedCity.label : "",
      // Add other modal fields to the queryParams
    };

    // Construct the query string from the queryParams object
    const queryString = new URLSearchParams(queryParams).toString();

    // Do something with the query string (e.g., redirect to a new URL)
    try {
      const response = await searchPartnerWithSearchText(queryString);
      setData(response.data.data);
    } catch (error) {}
  };

  const handleCancelClick = () => {
    setCommunity_id("");
    setCast("");
    setGender("");
    setSelectedState("");
    setSelectedCity("");
    setGotra("");
    setSkinTone("");
    setSearchText("");
    setCommunityName("");
  };

  useEffect(() => {
    // Check if selectedCountry is already set
    if (selectedCountry) {
      getAllStates();
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (states) {
      const selectedStateObject = states.find(
        (state) => state.name === selectedState.label
      );
      if (selectedStateObject) {
        getAllCities(selectedStateObject.id);
      }
    }
  }, [states]);

  useEffect(() => {
    setLoggedUserID(user && user.user && user.user.community_id);
  }, [user]);

  useEffect(() => {
    search(loggedUserID);
  }, [loggedUserID]);

  useEffect(() => {
    fetchCommunities();
  }, []);
  return (
    <div id="searchPeople-section" className="content-wrapper pt-4 mb-4">
      <div className="container">
        <div className="card shadow">
          <div className="card-body">
            <div className="row">
              <div className="col-md-7">
                <h5 className="fw-3 mb-3 ">Search Partner</h5>
              </div>
              <div className=" col-md-5">
                <a
                  href=""
                  title="Filter"
                  className="btn btn-primary btn-sm me-1  mb-2"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <i className="fas fa-filter me-1 "></i>Preference
                </a>
                <a
                title="Add Business"
                className="btn btn-primary btn-sm  mb-2"
                onClick={handlePartnerClick}
              >
                Submit Your Matrimonial Profile
              </a>
              </div>
             
            </div>

            <div className="filter-content pt-3 d-md-block ">
              {isSaveClicked && (
                <p>
                  {isSaveClicked && "Searching for "}
                  {gender && `Gender-${gender}, `}
                  {communityName && `Community-${communityName}, `}
                  {gotra && `Gotra-${gotra}, `}
                  {cast && `Cast-${cast}, `}{" "}
                  {(selectedCity && "in") || (selectedState && "in")}
                  {selectedCity.label && ` ${selectedCity.label}`}
                  {selectedState.label && ` (${selectedState.label})`}
                </p>
              )}
            </div>

            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" id="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      Preference
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body" id="modal-body">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Interested In</label>
                            <select
                              className="form-select form-control"
                              aria-label="Default select example"
                              value={gender}
                              onChange={handleGenderChange}
                            >
                              <option value="">---Select Gender---</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Gotra</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={gotra}
                              onChange={handleGotraChange}
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">State</label>
                            <Select
                              className="form-select"
                              aria-label="Default select example"
                              options={states.map((state) => ({
                                value: state.name,
                                label: state.name,
                              }))}
                              value={selectedState}
                              onChange={handleStateChange}
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Skin Tone</label>
                            <select
                              className="form-select form-control"
                              aria-label="Default select example"
                              value={skinTone}
                              onChange={handleSkinToneChange}
                            >
                              <option value="">---Select Skin---</option>
                              <option value="FAIR">FAIR</option>
                              <option value="DARK">DARK</option>
                              <option value="WHEATISH">WHEATISH</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Community</label>
                            <Select
                              id="community_id"
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue={community_id} // Provide a selected option state
                              onChange={handleSelectChange} // Your change handler function
                              options={
                                communities &&
                                communities.map((data) => ({
                                  value: data.id,
                                  label: data.name,
                                }))
                              }
                              placeholder="---Select---"
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Cast</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={cast}
                              onChange={handleCastChange}
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">City</label>
                            <Select
                              className="form-select"
                              aria-label="Default select example"
                              options={cities.map((city) => ({
                                value: city.name,
                                label: city.name,
                              }))}
                              value={selectedCity}
                              onChange={handleCityChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={handleCancelClick}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleSaveClick}
                      data-bs-dismiss="modal"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="container-input mb-3 mt-3">
              <input
                type="text"
                placeholder="Search"
                name="text"
                className="input form-control"
                onChange={handleSearchText}
              />
              <i className="fas fa-search"></i>
            </div>

            <div className="row">
              {/* User Cards */}

              {data &&
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
                            <p className="text-muted">{item.father_name}</p>
                            <p className="text-muted">
                              {item.native_place_city}
                            </p>
                            <p className="text-muted">
                              {item.native_place_state}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              {/* Repeat the user card structure as needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPartner;
