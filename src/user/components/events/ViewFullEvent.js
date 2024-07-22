import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { Card, Image } from "antd";
import { fetchEventByID } from "../../services/userService";

const ViewFullEvent = (props) => {
    const { changeEventClickFlag, id } = props;

    const defaultPhoto = "/user/images/default-event.png";

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
    const [serverError, setServerError] = useState("");

    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await fetchEventByID(id);
            if (response && response.status === 200) {
                setData(response.data.data);
                setSelectedCountry(response.data.data.country);
                setSelectedState(response.data.data.state);
                setSelectedCity(response.data.data.city);
                setServerError("");
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate("/login");
            } else if (error.response && error.response.status === 500) {
                let errorMessage = error.response.data.message;
                setServerError("Oops! Something went wrong on our server.");
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

    useEffect(() => {
        fetchData();
        window.scroll(0, 0);
    }, [id]);

    return (
        <>
            <div class="row">
                {serverError && <span className="error">{serverError}</span>}

                <div class="col-lg-4 mx-auto mt-2">
                    <div class="card mb-4">
                        <div class="card-body text-center">
                            <span onClick={() => changeEventClickFlag(false)} class="position-absolute top-0 end-0 mt-2 me-2">
                                {/* <i class="fs-1 fw-bold hover-pointer hover-pointer-red remove-btn-custom fa fa-remove"></i> */}
                                <button className="hover-pointer-red round-button-delete"><i class="fa fa-remove"></i></button>
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
                                <div style={{ height: '100px', width: '100px', borderRadius: '10px', overflow: 'hidden' }}>
                                    <Image
                                        src={data.photo ? data.photo : "/user/images/OIP.jpg"}
                                        title={data.name ? data.name : ""}
                                        style={{
                                            objectFit: 'cover',
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    />
                                </div>
                            </div>
                            <h5 class="">{data.name && data.name}</h5>
                            <p class="text-muted mb-1">{data.occupation && data.occupation}</p>
                            <p class="text-muted mb-4">{data && data.native_place_city}</p>
                            <p class="text-muted mb-4">Email-{data && data.email}</p>

                        </div>
                    </div>
                </div>

                <div id="event-info" className="">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12 col-sm-12 col-xs-12 ">
                                    <div className="card-title">
                                        <h3 className="mb-3 fw-bold fs-5">Event Info</h3>
                                    </div>
                                    <form className="p-3">
                                        <div className="row text-wrap-break-word">
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
                                                <div className="" style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                                                    <div className="">
                                                        <label htmlFor="status" className="fw-bold">
                                                            Thumb Image
                                                        </label>
                                                    </div>
                                                    <div className="" style={{border:'1px solid',borderRadius:'20px'}}>
                                                        <Image
                                                            height={200}
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
                                                <div className="" style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                                                    <div className="">
                                                        <label htmlFor="status" className="fw-bold">
                                                            Banner Image
                                                        </label>
                                                    </div>
                                                    <div className="" style={{border:'1px solid',borderRadius:'20px'}}>
                                                        <Image
                                                            height={200}
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
                        {
                            data && data.DESCRIPTION ? (
                                <div className="card-body">
                                    <div className=""
                                        dangerouslySetInnerHTML={{
                                            __html: data.DESCRIPTION,
                                        }}
                                    />
                                </div>
                            ) : ''
                        }
                    </div>
                </div>
            </div>

            <div id="auth-wrapper" className="mt-0 pb-5">
               
            </div>
        </>
    );
};

export default ViewFullEvent;
