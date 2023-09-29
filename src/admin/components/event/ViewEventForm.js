import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { fetchEventByID } from "../../services/AdminService";

const ViewEventForm = () => {
  const { id } = useParams();

  const [data, setData] = useState({
    title: "",
    country: "India",
    city: "",
    state: "",
    venue: "",
    start_datetime: "",
    end_datetime: "",
    banner_image: "",
    thumb_image: "",
  });

  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetchEventByID(id);
      console.log(response);
      if (response && response.status === 200) {
        setData(response.data.data);
        setSelectedCountry(response.data.data.country);
        setSelectedState(response.data.data.state);
        setSelectedCity(response.data.data.city);
      }
    } catch (error) {
      // Handle errors
    }
  };

  useEffect(() => {
    fetchData();
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
                  <form className="w-100 w-lg-75">
                    <div className="row">
                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <label className="form-label">Event Title</label>
                        <input
                          type="text"
                          name="eventName"
                          placeholder="NaN"
                          className="form-control"
                          defaultValue={data.title}
                          readOnly
                        />
                      </div>

                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <label className="form-label">Country</label>

                        <input
                          type="text"
                          readOnly
                          placeholder="NaN"
                          className="form-control"
                          defaultValue={selectedCountry}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <label className="form-label">State</label>

                        <input
                          type="text"
                          readOnly
                          placeholder="NaN"
                          className="form-control"
                          defaultValue={selectedState}
                        />
                      </div>

                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <label className="form-label">City</label>
                        <input
                          type="text"
                          readOnly
                          placeholder="NaN"
                          className="form-control"
                          defaultValue={selectedCity}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <label className="form-label">
                          Start Event Date / Time
                        </label>
                        <input
                          type="text"
                          name="dateTime"
                          id="startDateTime"
                          className="form-control"
                          defaultValue={data.start_datetime}
                          placeholder="NaN"
                          readOnly
                        />
                      </div>
                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <label className="form-label">
                          End Event Date / Time
                        </label>
                        <input
                          type="text"
                          readOnly
                          name="dateTime"
                          id="endDateTime"
                          placeholder="NaN"
                          className="form-control"
                          defaultValue={data.end_datetime}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <label className="form-label">Venue</label>
                        <input
                          type="text"
                          readOnly
                          name="venue"
                          id="exampleInput3"
                          placeholder="Enter Venue"
                          className="form-control"
                          defaultValue={data.venue}
                        />
                      </div>

                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <label htmlFor="status">Banner Image</label>
                        <input
                          type="text"
                          readOnly
                          className="form-control"
                          defaultValue={data.banner_image}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <label htmlFor="status">Thumb Image</label>
                        <input
                          type="text"
                          readOnly
                          className="form-control"
                          defaultValue={data.thumb_image}
                        />
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

export default ViewEventForm;
