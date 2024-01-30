import React, { useEffect, useState } from "react";
import { enquiry, fetchAllSiteSettings } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoader } from "../../actions/loaderAction";
import { Button, Modal } from "antd";

function Contact() {
  // State variables to store form input values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [userQuery, setUserQuery] = useState("");

  const [settings, setSettings] = useState({});

  const [errors, setErrors] = useState("");
  const [message, setMessage] = useState("");
  const [alertClass, setAlertClass] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //fetch site setting 
  const fetchSettings = async () => {
    dispatch(setLoader(true));
    try {
      const response = await fetchAllSiteSettings();
      setSettings(response.data.data);
      dispatch(setLoader(false));
    } catch (error) {
      dispatch(setLoader(false));
      //Unauthorized
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
      //Internal Server Error
      else if (error.response && error.response.status === 500) {
      }
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoader(true));
    const data = {
      name,
      email,
      mobile,
      message: userQuery,
    };

    try {
      const response = await enquiry(data);
      if (response && response.status === 200) {
        setErrors("");
        setMessage(response.data.message);
        setAlertClass("alert-success");
        setName('');
        setEmail('');
        setMobile('');
        setUserQuery('');
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
    } finally {
      dispatch(setLoader(false));
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    console.log("Hello")
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <div>
      {/* Address Banner */}
      <div id="contact-banner">
        <div className="container-fluid">
          {/* Replace the iframe with your Google Maps integration */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.564711619239!2d75.73843147233465!3d26.885567509702245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396dc9787b6e8159%3A0x7162ee3f35dc8f5a!2sNetparam%20Technologies%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin "
            width="100%"
            height="300"
            className="mt-2"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Contact */}
      <div id="user-auth-section">
        <div className="container">
          <div className="user-auth-panel">
            <div className="row mt-5 mb-5">
              {/* Contact information */}
              <div className="col-md-6">
                <div className="card shadow mb-3">
                  <div className="card-body">
                    <div className="row wow animate__animated animate__fadeInLeft">
                      <div className=" mb-3  user-auth-panel-info  col-md-6 col-sm-12">
                        <div className="card shadow">
                          <div className="card-body">
                            <div className="d-inline-flex">

                              <i className="fa-solid fa-location-dot fs-2 text-primary"></i>
                              <h4 className="ms-3 ">Address</h4>
                            </div>
                            <div>
                              <span className="text-muted">
                                {settings && settings.address}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3 user-auth-panel-info col-md-6 col-sm-12">
                        <div className="card shadow ">
                          <div className="card-body">
                            <div className="d-inline-flex">


                              <Button type="" onClick={showModal}>
                                <i className="fa-solid fa-phone-volume fs-2 text-primary"></i>
                              </Button>
                              <h4 className="ms-3">Call Us</h4>
                              <Modal title="Select One" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                <div>
                                  <span className="text-muted">
                                    <a className="text-dark text-line-none" href={`tel:${settings && settings.phone1}`}>
                                      +91-{settings && settings.phone1}
                                    </a>
                                    <br />
                                    <a className="text-dark text-line-none" href={`tel:${settings && settings.phone2}`}>
                                      +91-{settings && settings.phone2}
                                    </a>
                                  </span>
                                </div>
                              </Modal>
                            </div>
                            <div>
                              <span className="text-muted hover-pointer" onClick={showModal}>
                                +91-{settings && settings.phone1}
                                <br />
                                +91-{settings && settings.phone2}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3  user-auth-panel-info  col-md-6 col-sm-12">
                        <div className="card shadow">
                          <div className="card-body">
                            <div className="d-inline-flex">
                              <i className="fa-solid fa-envelope fs-2 text-primary"></i>
                              <h4 className="ms-3">Email Us</h4>
                            </div>
                            <div>
                              <span className="text-muted">
                                {" "}
                                <a className="text-dark text-line-none" href={`mailto:${settings && settings.email1}`}>{settings && settings.email1}</a>
                                <br />
                                {settings && settings.email2 && (
                                  <a className="text-dark text-line-none" href={`mailto:${settings.email2}`}>{settings.email2}</a>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3 user-auth-panel-info  col-md-6 col-sm-12">
                        <div className="card shadow">
                          <div className="card-body">
                            <div className="d-inline-flex">

                              <i className="fa-solid fa-clock fs-2 text-primary"></i>
                              <h4 className="ms-3">Open Hours</h4>
                            </div>
                            <div>
                              <span className="text-muted">
                                Monday - Sturday, 9:00 AM - 06:00 PM
                                <br />
                                Sunday - Off
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact form */}
              <div className="col-md-6 user-auth-form-container">
                <div className={`card shadow ${errors ? 'border-danger':''}`}>
                  <div className="card-body p-4">
                    <form
                      className="user-auth-form-contact"
                      onSubmit={handleSubmit}
                    >
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
                      <h4 className="mb-4 ">Send message for enquiry</h4>
                      <div>(All fields are required to fill.)</div>
                      <div className="form-group mb-4">
                        <input
                          type="text"
                          placeholder="Enter Name"
                          className="form-control"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && (
                          <span className="error">{errors.name}</span>
                        )}
                      </div>
                      <div className="form-group mb-4">
                        <input
                          type="email"
                          placeholder="Enter Email"
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && (
                          <span className="error">{errors.email}</span>
                        )}
                      </div>
                      <div className="form-group mb-4">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter Mobile"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                        />
                        {errors.mobile && (
                          <span className="error">{errors.mobile}</span>
                        )}
                      </div>
                      <div className="form-group mb-4 ">
                        <textarea
                          className="form-control"
                          placeholder="Leave a comment here"
                          id="floatingTextarea"
                          value={userQuery}
                          onChange={(e) => setUserQuery(e.target.value)}
                        ></textarea>
                        {errors.message && (
                          <span className="error">{errors.message}</span>
                        )}
                      </div>
                      <div className="form-group">
                        <button
                          className="form-control w-100 btn-primary"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
