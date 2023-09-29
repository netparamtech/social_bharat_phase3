import React, { useEffect, useState } from "react";
import {
  event,
  fetchAllCitiesByStateID,
  fetchAllStatesByCountryID,
} from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Select from "react-dropdown-select";

const EventForm = () => {
  const user = useSelector((state) => state.userAuth);
  const isAuthenticUser = user && user.isAuthenticated;

  // State variables to store form input values
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("India");
  const [venue, setVenue] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [thumbImage, setThumbImage] = useState("");

  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedState, setSelectedState] = useState("[]"); // Change state to selectedState
  const [selectedCity, setSelectedCity] = useState("[]");
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countryID, setCountryID] = useState(101);

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [alertClass, setAlertClass] = useState("");

  const navigate = useNavigate();

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

    // Update selected city to null when state changes
    setSelectedCity(null);
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
  };

  const getAllStates = async () => {
    try {
      const response = await fetchAllStatesByCountryID(101);
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

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title,
      city,
      state: selectedState, // Update to selectedState
      country,
      venue,
      start_datetime: startDateTime,
      end_datetime: endDateTime,
    };

    try {
      const response = await event(data);

      if (response && response.status === 200) {
        setErrors({});
        setMessage(response.data.message);
        setAlertClass("alert-success");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage("");
        setErrors(error.response.data.errors);
        setAlertClass("alert-danger");
      } else if (error.response && error.response.status === 401) {
        setMessage(error.response.data.message);
        setAlertClass("alert-danger");
      } else if (error.response && error.response.status === 500) {
        setMessage(error.response.data.message);
        setAlertClass("alert-danger");
      }
    }
  };

  useEffect(() => {
    setCountryID(101);
    setSelectedState({
      value: user.user.state,
      label: user.user.state,
    }); // Set the selected state as an object
    setSelectedCity({
      value: user.user.city,
      label: user.user.city,
    }); // Set the selected city as an object
  }, [user]);

  useEffect(() => {
    // Check if selectedCountry is already set
    getAllStates();
  }, []);

  useEffect(() => {
    if (states && user) {
      const selectedStateObject = states.find(
        (state) => state.name === user.user.state
      );
      if (selectedStateObject) {
        getAllCities(selectedStateObject.id);
      }
    }
  }, [states]);

  return (
    <>
      <div id="auth-wrapper" className="pt-5 pb-5">
        <div className="container">
          <div className="card shadow">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12 p-4">
                  <div className="card-title">
                    <h3 className="mb-3">Event Info</h3>
                  </div>
                  <form className="w-100 w-lg-75" onSubmit={handleSubmit}>
                    {message && (
                      <div className={`alert ${alertClass}`}>
                        {alertClass === "alert-success" ? (
                          <i className="fas fa-check-circle"></i>
                        ) : (
                          <i className="fas fa-exclamation-triangle"></i>
                        )}
                        {" " + message}
                      </div>
                    )}
                    <div className="row">
                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <label className="form-label">*Event Title</label>
                        <input
                          type="text"
                          name="eventName"
                          id="businessName"
                          placeholder="Enter Event Name"
                          className="form-control"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                        {errors.title && (
                          <span className="error">{errors.title}</span>
                        )}
                      </div>
                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <label className="form-label">Country</label>
                        <select
                          id="country"
                          className="form-control"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                        >
                          <option value="India">India</option>
                        </select>
                        {errors.country && (
                          <span className="error">{errors.country}</span>
                        )}
                      </div>
                    </div>

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
                          placeholder="---Select State---"
                        />
                        {errors.state && (
                          <span className="error">{errors.state}</span>
                        )}
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
                          placeholder="---Select City---"
                        />
                        {errors.city && (
                          <span className="error">{errors.city}</span>
                        )}
                      </div>
                    </div>

                    <div className="row">
                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <label className="form-label">
                          Start Event Date/Time
                        </label>
                        <input
                          type="datetime-local"
                          name="dateTime"
                          id="exampleInput3"
                          className="form-control"
                          value={startDateTime}
                          onChange={(e) => setStartDateTime(e.target.value)}
                        />
                        {errors.start_datetime && (
                          <span className="error">{errors.start_datetime}</span>
                        )}
                      </div>
                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <label className="form-label">
                          End Event Date/Time
                        </label>
                        <input
                          type="datetime-local"
                          name="dateTime"
                          id="exampleInput3"
                          placeholder="Enter Event Date"
                          className="form-control"
                          value={endDateTime}
                          onChange={(e) => setEndDateTime(e.target.value)}
                        />
                        {errors.end_datetime && (
                          <span className="error">{errors.end_datetime}</span>
                        )}
                      </div>
                    </div>

                    <div className="row">
                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <label className="form-label">Venue</label>
                        <input
                          type="text"
                          name="venue"
                          id="exampleInput3"
                          placeholder="Enter Venue"
                          className="form-control"
                          value={venue}
                          onChange={(e) => setVenue(e.target.value)}
                        />
                        {errors.venue && (
                          <span className="error">{errors.venue}</span>
                        )}
                      </div>
                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <label htmlFor="status">Banner Image</label>
                        <input
                          type="file"
                          className="form-control"
                          // Add file input handling here
                        />
                        {errors.bannerImage && (
                          <span className="error">{errors.bannerImage}</span>
                        )}
                      </div>
                    </div>

                    <div className="row">
                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <label htmlFor="status">Thumb Image</label>
                        <input
                          type="file"
                          className="form-control"
                          // Add file input handling here
                        />
                        {errors.thumbImage && (
                          <span className="error">{errors.thumbImage}</span>
                        )}
                      </div>
                    </div>
                    <div className="fw-light fs-6">
                      <input type="checkbox" /> Ticket charges if any
                    </div>

                    <div className="row mt-4">
                      <div className="col-lg-6 col-sm-12 col-xs-12">
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventForm;
