import React, { useEffect, useState } from "react";
import {
  event,
  fetchAllCitiesByStateID,
  fetchAllStatesByCountryID,
} from "../../services/userService";
import { useNavigate } from "react-router-dom";
import Select from "react-dropdown-select";

const EventForm = () => {
  // State variables to store form input values
  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("India");
  const [venue, setVenue] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [thumbImage, setThumbImage] = useState("");

  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedState, setSelectedState] = useState(""); // Change state to selectedState
  const [selectedCity, setSelectedCity] = useState("");
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
        (state) => state.name === selectedOption[0].value
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
    console.log(selectedState, selectedCity);

    const formattedStartDateTime = formatDateTime(startDateTime);
    const formattedEndDateTime = formatDateTime(endDateTime);
   
    //Date/ Time Format
    function formatDateTime(dateTime) {
      const date = new Date(dateTime);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = "00"; // You can set seconds to '00' if not provided in your input
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    const data = {
      title: title,
      city: selectedCity && selectedCity[0].label,
      state: selectedState && selectedState[0].label, // Update to selectedState
      country,
      venue,
      start_datetime: formattedStartDateTime,
      end_datetime: formattedEndDateTime,
      banner_image: bannerImage,
      thumb_image: thumbImage,
    };

    console.log(data);

    try {
      const response = await event(data);

      if (response && response.status === 200) {
        setErrors();
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
    // Check if selectedCountry is already set
    getAllStates();
  }, []);

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
                          id="startDateTime"
                          className="form-control"
                          defaultValue={startDateTime}
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
                          id="endDateTime"
                          placeholder="Enter Event Date"
                          className="form-control"
                          defaultValue={endDateTime}
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
                          defaultValue={bannerImage}
                          onChange={(e) => setBannerImage(e.target.value)}
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
                          defaultValue={thumbImage}
                          // Add file input handling here
                          onChange={(e) => setThumbImage(e.target.value)}
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
