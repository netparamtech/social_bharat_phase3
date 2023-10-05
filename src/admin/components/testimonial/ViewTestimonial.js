import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { fetchTestimonialByID } from "../../services/AdminService";
import { Card, Image } from "antd";

const ViewTestimonial = () => {
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
      const response = await fetchTestimonialByID(id);
      if (response && response.status === 200) {
        setData(response.data.data);
        setSelectedCountry(response.data.data.country);
        setSelectedState(response.data.data.state);
        setSelectedCity(response.data.data.city);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/admin");
      } else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate('/server/error', { state: { errorMessage } });
      }
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

  const generateRatingStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <span key={i} className="fas fa-star text-warning me-2"></span>
      );
    }
    return stars;
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

            <Card className="col-md-9 w-100 w-lg-75 mt-2">
              <div className="row w-50 mt-5">
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
                  <label>{data.email && data.email}</label>
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
                    <h3 className="mb-3 fw-bold fs-5">Testimonial</h3>
                  </div>
                  <form className="p-3">
                    <div className="row">
                      <div className="mb-3 col-md-6  col-sm-12 col-xs-12">
                        <div className="row">
                          <div className="col-md-4">
                            <label className="fw-bold">Message :</label>
                          </div>
                          <div className="col-md-8">
                            <label className="">{data.message}</label>
                          </div>
                        </div>
                      </div>

                    </div>

                    <div className="row">
                      <div className="mb-3 col-md-6 col-sm-12 col-xs-12">
                        <div className="row">
                          <div className="col-md-4">
                            <label className="fw-bold">
                              Created Date :
                            </label>
                          </div>
                          <div className="col-md-8">
                            <label className="">
                              {formatDate(data.created_at)}
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3 col-md-6 col-sm-12 col-xs-12">
                        <div className="row">
                          <div className="col-md-4">
                            <label className="fw-bold">Active/Inactive Date:</label>
                          </div>
                          <div className="col-md-8">
                          <label className="">
                              {formatDate(data.updated_at)}
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
                             Rating :
                            </label>
                          </div>
                          <div className="col-md-8">
                          <label className="">
                              {generateRatingStars(data.rating)}
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <div className="row">
                          <div className="col-md-4">
                            <label htmlFor="status" className="fw-bold">
                              Status :
                            </label>
                          </div>
                          <div className="col-md-8">
                          <label className="">
                              {data.status}
                            </label>
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

export default ViewTestimonial;
