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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div id="auth-wrapper" className="pt-5 pb-5">
        <div id="event-info" className="container">
          <div className="card shadow">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12 ">
                  <div className="card-title">
                    <h3 className="mb-3 fw-bold">Event Info</h3>
                  </div>
                  <form className="p-3">
                    <div className="row">
                      <div className="mb-3 col-md-6  col-sm-12 col-xs-12">
                        <div className="row">
                          <div className="col-md-4">
                            <label className="fw-bold">Event Title :</label>
                          </div>
                          <div className="col-md-8">
                            <label className="">{data.title}</label>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3 col-md-6 col-sm-12 col-xs-12">
                        <div className="row">
                          <div className="col-md-4">
                            <label className="fw-bold">Country :</label>
                          </div>
                          <div className="col-md-8">
                            <label className="">{selectedCountry}</label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="mb-3 col-md-6 col-sm-12 col-xs-12">
                        <div className="row">
                          <div className="col-md-4">
                            <label className="fw-bold">State :</label>
                          </div>
                          <div className="col-md-8">
                            <label className="">{selectedState}</label>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3 col-md-6 col-sm-12 col-xs-12">
                        <div className="row">
                          <div className="col-md-4">
                            <label className="fw-bold">City :</label>
                          </div>
                          <div className="col-md-8">
                            <label className="">{selectedCity}</label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="mb-3 col-md-6 col-sm-12 col-xs-12">
                        <div className="row">
                          <div className="col-md-4">
                            <label className="fw-bold">
                              Start Date / Time :
                            </label>
                          </div>
                          <div className="col-md-8">
                            <label className="">{formatDate(data.start_datetime)}</label>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3 col-md-6 col-sm-12 col-xs-12">
                        <div className="row">
                          <div className="col-md-4">
                            <label className="fw-bold">End Date / Time :</label>
                          </div>
                          <div className="col-md-8">
                            <label className="">{formatDate(data.end_datetime)}</label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="mb-3 col-md-6 col-sm-12 col-xs-12">
                        <div className="row">
                          <div className="col-md-4">
                            <label className="fw-bold">Venue :</label>
                          </div>
                          <div className="col-md-8">
                            <label className="">{data.venue}</label>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <div className="row">
                          <div className="col-md-4">
                            <label htmlFor="status" className="fw-bold">
                              Banner Image
                            </label>
                          </div>
                          <div className="col-md-8">
                            <img
                              src={data.banner_image}
                              className="mb-1"
                              height={70}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <div className="row">
                          <div className="col-md-4">
                            <label htmlFor="status" className="fw-bold">
                              Thumb Image
                            </label>
                          </div>
                          <div className="col-md-8">
                            <img
                              src={data.thumb_image}
                              className="mb-1"
                              height={70}
                            />
                          </div>
                        </div>
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
