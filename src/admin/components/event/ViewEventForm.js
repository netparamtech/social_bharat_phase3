import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { fetchEventByID } from "../../services/AdminService";
import { Card, Image } from "antd";

const ViewEventForm = () => {
  const { id } = useParams();

  const defaultPhoto = "/user/images/user.png";

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
      <div id="basic-profile-section" className="content-wrapper pt-4">
        <div className="container">
          <div className="row">
            <div className="col-md-3 mb-sm-3 ">
              <div className="card shadow">
                <div className="container-profilepic mx-auto card card-block-md overflow-hidden ">
                  <Image
                    src={data.photo ? data.photo : "/user/images/OIP.jpg"}
                    title={data.name && data.name}
                  />
                </div>
                <div className="card-body ">
                  <p className="card-text text-center mb-0">
                    {data.name && data.name}
                  </p>
                  <p className="card-text text-center text-muted"></p>
                </div>
              </div>
            </div>

            <Card className="col-md-9 w-100 w-lg-75">
            <div className="row w-50">
              <div className="col-md-6">
              <label className="fw-bold">Name - </label>
              </div>
              <div className="col-md-6">
              <label>{data.name && data.name}</label>
              </div>
              <div className="col-md-6">
              <label className="fw-bold">Email - </label>
              </div>
              <div className="col-md-6">
              <label>{data.name && data.email}</label>
              </div>
              <div className="col-md-6">
              <label className="fw-bold">Gender - </label>
              </div>
              <div className="col-md-6">
              <label>{data.name && data.gender}</label>
              </div>
              <div className="col-md-6">
              <label className="fw-bold">Mobile - </label>
              </div>
              <div className="col-md-6">
              <label>{data.name && data.mobile}</label>
              </div>
              <div className="col-md-6 container-profilepic mx-auto card-block-md overflow-hidden ">
               
              <label className="fw-bold">Community - {data.community && data.community}</label>
            </div>
            <div className="col-md-6">
            <Image
            width={100}
            height={50}
            src={data.thumb_image ? data.thumb_image : defaultPhoto}
            title={data.community && data.community}
          />
            </div>
            </div>
              

             
            </Card>
          </div>
        </div>
      </div>
      <div id="auth-wrapper" className="pt-5 pb-5">
        <div id="event-info" className="container">
          <div className="card shadow">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12 ">
                  <div className="card-title">
                    <h3 className="mb-3 fw-bold fs-5">Event Info</h3>
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
                            <label className="fw-bold">Venue :</label>
                          </div>
                          <div className="col-md-8">
                            <label className="">
                              {data.venue},{selectedCity}({selectedState})
                            </label>
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
                            <label className="">
                              {formatDate(data.start_datetime)}
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3 col-md-6 col-sm-12 col-xs-12">
                        <div className="row">
                          <div className="col-md-4">
                            <label className="fw-bold">End Date / Time :</label>
                          </div>
                          <div className="col-md-8">
                            <label className="">
                              {formatDate(data.end_datetime)}
                            </label>
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
                            <Image
                              height={70}
                              src={
                                data.thumb_image
                                  ? data.thumb_image
                                  : defaultPhoto
                              }
                              title={data.community && data.community}
                            />
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
                            <Image
                              height={70}
                              src={
                                data.banner_image
                                  ? data.banner_image
                                  : defaultPhoto
                              }
                              title={data.community && data.community}
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
