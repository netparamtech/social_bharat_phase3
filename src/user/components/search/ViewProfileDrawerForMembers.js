import React, { useEffect, useRef, useState } from "react";
import { Drawer, Button, Col, Row, Divider, Image, Collapse } from "antd";
import { useNavigate } from "react-router-dom";
import { fetchSelfCreatedLatestBusiness, fetchSelfMatrimonialById, getSearchedUserFullProfile } from "../../services/userService";
import { useDispatch } from "react-redux";
import { setLoader } from "../../actions/loaderAction";
import { logout } from "../../actions/userAction";
import BusinessCard from "./BusinessCard";

const DescriptionItem = ({ title, content }) => (
    <Row>
        <Col className="col-5">
            <p className="site-description-item-profile-p-label fw-bold p-0 m-0 mb-1">
                {title}
                {" :"}
            </p>
        </Col>
        <Col className="col-7">
            <p className="site-description-item-profile-p-label p-0 m-0">{content}</p>
        </Col>
    </Row>
);
const { Panel } = Collapse;

const ViewProfileDrawerForMembers = ({ id }) => {
    const [visible, setVisible] = useState(false);
    const [user, setUser] = useState({});
    const [profileImage, setProfileImage] = useState("");
    const [proposalPhotos, setProposalPhotos] = useState([]);
    const [contactDetails, setContactDetails] = useState([]);
    const [educationDetails, setEducationDetails] = useState([]);
    const [businessDetails, setBusinessDetails] = useState([]);
    const [businessPhotos, setBusinessPhotos] = useState([]);
    const [matrimonial, setMatrimonial] = useState('');

    const [serverError, setServerError] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const getSelfMatrimonial = async (id) => {
        dispatch(setLoader(true));
        try {
            const response = await fetchSelfMatrimonialById(id);
            if (response && response.status === 200) {
                setMatrimonial(response.data.data);
                setServerError('');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                dispatch(logout());
                navigate("/login");
            } else if (error.response && error.response.status === 500) {
                setServerError("Oops! Something went wrong on our server.");
            } else if (error.response && error.response.status === 404) {
                dispatch(logout());
                navigate('/');
            }
        } finally {
            dispatch(setLoader(false));
        }
    }

    const getUserProfile = async () => {
        dispatch(setLoader(true));
        try {
            const response = await getSearchedUserFullProfile(id);
            if (response && response.status === 200) {
                setUser(response.data.data);
                setServerError('');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                dispatch(logout());
                navigate("/login");
            } else if (error.response && error.response.status === 500) {
                setServerError("Oops! Something went wrong on our server.");
            } else if (error.response && error.response.status === 404) {
                dispatch(logout());
                navigate('/');
            }
        } finally {
            dispatch(setLoader(false));
        }
    };

    //getBusinessDetails
    const getBusinessDetails = async () => {
        dispatch(setLoader(true));
        try {
            const response = await fetchSelfCreatedLatestBusiness(id);
            if (response && response.status === 200) {
                setBusinessDetails(response.data.data);
                setServerError('');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                dispatch(logout());
                navigate("/login");
            } else if (error.response && error.response.status === 500) {
                setServerError("Oops! Something went wrong on our server.");
            } else if (error.response && error.response.status === 404) {
                dispatch(logout());
                navigate('/');
            }
        } finally {
            dispatch(setLoader(false));
        }
    };

    const formatDate = (dateString) => {
        const options = { day: "2-digit", month: "2-digit", year: "numeric" };
        const [month, day, year] = new Date(dateString)
            .toLocaleDateString("en-GB", options)
            .split("/");
        return `${month}-${day}-${year}`;
    };

    const getFileType = (url) => {
        // Extract the file extension from the URL
        const extension = url.split(".").pop().toLowerCase();

        // Define mappings of common file types
        const fileTypeMappings = {
            pdf: "PDF",
            doc: "DOC",
            docx: "DOCX",
            txt: "TXT",
            // Add more file types as needed
        };
        // Use the mapping or show the extension as-is
        return fileTypeMappings[extension] || extension.toUpperCase();
    };

    const checkMobileVisibility = (mobileNumber) => {
        const isHidden = /\*/.test(mobileNumber);
        return !isHidden;
    };

    useEffect(() => {
        if (visible) {
            getUserProfile();
            getSelfMatrimonial(id);
            // getBusinessDetails(id);
        }
    }, [visible]);

    useEffect(() => {
        setProfileImage(
            (user && user.photo && user.photo) || "/user/images/OIP.jpg"
        );
        setContactDetails(user?.contacts);
        setEducationDetails(user?.education);
        setBusinessDetails(user?.businesses);
        setBusinessPhotos(
            user && user.businesses && user.businesses.business_photos
        );
    }, [user]);
    const section1Ref = useRef(null);
    const section2Ref = useRef(null);
    const section3Ref = useRef(null);
    const section4Ref = useRef(null);
    const section5Ref = useRef(null);
    const section6Ref = useRef(null);
    const section7Ref = useRef(null);

    const scrollToSection = (ref) => {
        ref.current.scrollIntoView({ behavior: 'smooth' });
      };

    return (
        <div>
            <a className='nav-link text-success hover-pointer d-inline' onClick={showDrawer}>
                VIEW
            </a>
            <Drawer
                width={640}
                placement="right"
                closable={visible}
                onClose={onClose}
                open={visible}
            >
                <div className="drawer-header mt-5">
                    <p className="">
                        <a onClick={()=>scrollToSection(section1Ref)} className="badge bg-primary rounded-pill m-1 text-wrap-break-word text-decoration-none hover-pointer">
                            Basic
                        </a>
                        <a onClick={()=>scrollToSection(section2Ref)} className="badge bg-primary rounded-pill m-1 text-wrap-break-word text-decoration-none hover-pointer">
                            Matrimonial
                        </a>
                        <a onClick={()=>scrollToSection(section3Ref)} className="badge bg-primary rounded-pill m-1 text-wrap-break-word text-decoration-none hover-pointer">
                            Address
                        </a>
                        <a onClick={()=>scrollToSection(section4Ref)} className="badge bg-primary rounded-pill m-1 text-wrap-break-word text-decoration-none hover-pointer">
                            Job
                        </a>
                        <a onClick={()=>scrollToSection(section5Ref)} className="badge bg-primary rounded-pill m-1 text-wrap-break-word text-decoration-none hover-pointer">
                            Education
                        </a>
                        <a onClick={()=>scrollToSection(section6Ref)} className="badge bg-primary rounded-pill m-1 text-wrap-break-word text-decoration-none hover-pointer">
                            Contacts
                        </a>
                        <a onClick={()=>scrollToSection(section7Ref)} className="badge bg-primary rounded-pill m-1 text-wrap-break-word text-decoration-none hover-pointer">
                            Business
                        </a>
                        {/* <a href="#businesses-section" className="badge bg-primary rounded-pill m-1 text-wrap-break-word text-decoration-none">
                            <img src="/user/images/"
                        </a> */}
                    </p>
                </div>
                {serverError && <span className="error">{serverError}</span>}


                <div id="basic-view" ref={section1Ref} className="mt-2">
                    <p
                        className="site-description-item-profile-p"
                        style={{
                            marginBottom: 24,
                        }}
                    >
                        User Profile
                    </p>
                    <p>
                        <Image
                            className="img-fluid max-width-100"
                            src={profileImage}
                            alt=""
                            title=""
                            width={100}
                        />
                        <span className="m-5">
                            <Image
                                className="img-fluid max-width-100"
                                src={user && user.community && user.community.thumbnail_image}
                                alt=""
                                title=""
                                width={100}
                            />
                        </span>
                    </p>

                    <p className="site-description-item-profile-p fw-bold fs-6">
                        {user.name}
                    </p>
                    <div className="card p-3">
                        <DescriptionItem title="Email" content={user.email} />
                        {
                            user && user.dob !== null ? (
                                <DescriptionItem title="D.O.B" content={formatDate(user.dob)} />
                            ) : (
                                <DescriptionItem title="D.O.B" content="N/A" />
                            )
                        }
                        <DescriptionItem
                            title="Marital Status"
                            content={user.marital_status}
                        />
                        <DescriptionItem title="Gender" content={user.gender} />
                        <DescriptionItem
                            title="Community"
                            content={user.community && user.community.name}
                        />
                        <DescriptionItem title="City" content={user.native_place_city} />
                        <DescriptionItem title="State" content={user.native_place_state} />
                        <DescriptionItem
                            title="Occupation"
                            content={user && user.occupation ? user.occupation : "N/A"}
                        />
                    </div>
                    <Divider />
                </div>

                <div id="auth-wrapper" ref={section2Ref} className="pt-2 pb-3 mt-2">
                    <div id="event-info" className="">
                        <div className="card">
                            <div className="row">
                                <div className="col-md-12 col-sm-12 col-xs-12 ">
                                    <div className="card-title bg-success bg-gradient text-white pt-2 ps-2">
                                        <label className="mb-2 fw-bold fs-6 ">Matrimonial Info</label>
                                    </div>
                                    <div className="card-body">
                                        {matrimonial ? (
                                            <form className="mb-2 ">
                                                <div className="row">
                                                    <div className="mb-2 col-md-6  col-sm-12 col-xs-12 ">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <label className="fw-bold">Father Name:</label>
                                                            </div>
                                                            <div className="col-6">
                                                                <label className="">
                                                                    {matrimonial.father_name}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="mb-2 col-md-6 col-sm-12 col-xs-12">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <label className="fw-bold">Mother Name:</label>
                                                            </div>
                                                            <div className="col-6">
                                                                <label className="">
                                                                    {matrimonial.mother_name}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="mb-3 col-md-6 col-sm-12 col-xs-12">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <label className="fw-bold">Matrimonial Created For :</label>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <label className="">
                                                                    {matrimonial.profile_created_for || "N/A"}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mb-2 col-md-6 col-sm-12 col-xs-12">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <label className="fw-bold">Height :</label>
                                                            </div>
                                                            <div className="col-6">
                                                                <label className="">
                                                                    {matrimonial.height_in_feet}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="mb-2 col-lg-6 col-sm-12 col-xs-12">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <label htmlFor="status" className="fw-bold">
                                                                    Manglik :
                                                                </label>
                                                            </div>
                                                            <div className="col-6">
                                                                <label className="">
                                                                    {matrimonial.is_manglik === 1
                                                                        ? "YES"
                                                                        : "NO"}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="mb-2 col-lg-6 col-sm-12 col-xs-12">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <label htmlFor="status" className="fw-bold">
                                                                    Paternal Gotra :
                                                                </label>
                                                            </div>
                                                            <div className="col-6">
                                                                <label className="">
                                                                    {matrimonial.paternal_gotra}{" "}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="mb-2 col-lg-6 col-sm-12 col-xs-12">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <label htmlFor="status" className="fw-bold">
                                                                    Maternal Gotra :
                                                                </label>
                                                            </div>
                                                            <div className="col-6">
                                                                <label className="">
                                                                    {matrimonial.maternal_gotra}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="mb-2 col-lg-6 col-sm-12 col-xs-12">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <label htmlFor="status" className="fw-bold">
                                                                    Biodata :
                                                                </label>
                                                            </div>
                                                            <div className="col-6">
                                                                <label className="">
                                                                    {matrimonial.biodata && (
                                                                        <span>
                                                                            <a
                                                                                href={matrimonial.biodata}
                                                                                download="biodata.pdf"
                                                                            >
                                                                                <i className="fa-regular fa-file-lines"></i>{" "}
                                                                                Download Biodata
                                                                            </a>
                                                                            &nbsp;(
                                                                            {getFileType(matrimonial.biodata)}
                                                                            )
                                                                        </span>
                                                                    )}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="mb-2 col-lg-6 col-sm-12 col-xs-12">
                                                            <div className="row">
                                                                <div className="col-6">
                                                                    <label htmlFor="status" className="fw-bold">
                                                                        Proposal Photos :
                                                                    </label>
                                                                </div>
                                                                <div className="col-6">
                                                                    <label className="proposal-Photo">
                                                                        {matrimonial && matrimonial.proposal_photos &&
                                                                            Array.isArray(matrimonial.proposal_photos) ? (
                                                                            matrimonial.proposal_photos.map((item, idx) => (
                                                                                <a href={item} target="_blank">
                                                                                    <img className="m-1" src={item} />{" "}
                                                                                </a>
                                                                            ))
                                                                        ) : (
                                                                            <a href={matrimonial.proposal_photos} target="_blank">
                                                                                <img src={matrimonial.proposal_photos} />
                                                                            </a>
                                                                        )}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mb-2 col-lg-6 col-sm-12 col-xs-12">
                                                            <div className="row">
                                                                <div className="col-6">
                                                                    <label htmlFor="status" className="m-2 fw-bold">
                                                                        Other Details :
                                                                    </label>
                                                                </div>
                                                                <div className="col-6">
                                                                    <label className="textShape">
                                                                        {matrimonial.DESCRIPTION}{" "}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        ) : (
                                            <div className="col-md-12">
                                                <p className="mb-3 fw fs-5">
                                                    No Matrimonial Details available.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div id="contact-section" ref={section3Ref} className="content-wrapper pt-2">
                    <div className="">
                        <div className="card">
                            <div className="card-title bg-success bg-gradient text-white pt-2 ps-2">
                                <label className="mb-2 fw-bold fs-6 ">Address Info</label>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    {contactDetails && contactDetails.length > 0 ? (
                                        contactDetails.map((item, idx) => (
                                            <div className="col-md-6">
                                                <div className="card mb-1">
                                                    <div className="card-body">
                                                        <div className="w-100 w-lg-75">
                                                            <div className="mb-2 row">
                                                                <label className="mb-1 fw-bold">
                                                                    {item.address_type}
                                                                </label>
                                                                <label className="text-muted">
                                                                    {item.address_line},{item.city}, {item.state},{" "}
                                                                    {item.country}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-md-12">
                                            <p className="mb-3 fw fs-5">
                                                No contact details available.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div id="auth-wrapper-job" ref={section4Ref} className="pt-2  mt-2">
                    <div id="event-info" className="">
                        <div className="card">
                            <div className="card-title bg-success bg-gradient text-white pt-2 ps-2">
                                <label className="mb-2 fw-bold fs-6 ">Jobs Info</label>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12 col-sm-12 col-xs-12 ">
                                        {user && user.jobs && user.jobs.length > 0 ? (
                                            user &&
                                            user.jobs &&
                                            user.jobs.map((item, index) => (
                                                <div className="col-md-12" key={index}>
                                                    <div className="card mb-2">
                                                        <table className="table table-striped">
                                                            <tbody>
                                                                <tr>
                                                                    <td>Company Name</td>
                                                                    <td className="text-muted fw-bold text-wrap-break-word">
                                                                        {item.company_name || "NA"}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Designation</td>
                                                                    <td className="text-muted text-wrap-break-word">
                                                                        {item.designation || "NA"}
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <td>Job Type</td>
                                                                    <td className="text-muted">
                                                                        {item.job_type === "PART_TIME"
                                                                            ? "PART TIME"
                                                                            : item.job_type === "FULL_TIME"
                                                                                ? "FULL TIME"
                                                                                : ""}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Experience</td>
                                                                    <td className="text-muted text-wrap-break-word">
                                                                        {item.experience || "NA"}
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="col-md-12">
                                                <p className="mb-3 fw fs-5">No job details available.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div id="education-section" ref={section5Ref} className="content-wrapper pt-2">
                    <div className="">
                        <div className="card">
                            <div className="card-title bg-success bg-gradient text-white pt-2 ps-2">
                                <label className="mb-2 fw-bold fs-6 ">Education Info</label>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    {educationDetails && educationDetails.length > 0 ? (
                                        educationDetails.map((item, idx) => (
                                            <div className="col-md-12">
                                                <div className="card mt-2">
                                                    <div className="card-body">
                                                        <div className="w-100 w-lg-75">
                                                            <div className="mb-2 row">
                                                                <div className="col-sm-3 fw-bold">
                                                                    <label htmlFor="">Degree:</label>
                                                                </div>
                                                                <div className="col-sm-8">
                                                                    <span className="text-muted">
                                                                        {item.degree_title}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="mb-2 row">
                                                                <label className="col-sm-3 fw-bold">
                                                                    Study Field:
                                                                </label>
                                                                <div className="col-sm-8">
                                                                    <span className="text-muted">
                                                                        {item.field_of_study}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="mb-2 row">
                                                                <label className="col-sm-3 fw-bold">
                                                                    University
                                                                </label>
                                                                <div className="col-sm-8">
                                                                    <span className="text-muted">
                                                                        {item.institution_name}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="mb-2 row">
                                                                <label className="col-sm-3 fw-bold">Score</label>
                                                                <div className="col-sm-8">
                                                                    <span className="text-muted">{item.score}</span>
                                                                </div>
                                                            </div>
                                                            <div className="mb-2 row">
                                                                <label className="col-sm-3 fw-bold">
                                                                    Score Type
                                                                </label>
                                                                <div className="col-sm-8">
                                                                    <span className="text-muted">
                                                                        {item.score_type}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="mb-2 row">
                                                                <label className="col-sm-3 fw-bold">
                                                                    Passing Year
                                                                </label>
                                                                <div className="col-sm-8">
                                                                    <span className="text-muted">
                                                                        {item.passing_year}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-md-12">
                                            <p className="mb-3 fw fs-5">
                                                No education details available.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div id="businesses-section" ref={section6Ref} className="content-wrapper pt-2">
                    <div className="">
                        <div className="card">
                            <div className="card-title bg-success bg-gradient text-white pt-2 ps-2">
                                <label className="mb-2 fw-bold fs-6 ">Business Info</label>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12 ">
                                        {businessDetails && businessDetails.length > 0 ? (
                                            <Collapse accordion>
                                                {businessDetails.map((item, value) => (
                                                    // <Panel
                                                    //     header={
                                                    //         <span className="mb-3  fs-6">{`Business-${value+1}`}</span>
                                                    //     }
                                                    //     key={value}
                                                    //     className=""
                                                    // >
                                                    //     <table className="table table-striped ">
                                                    //         <tbody>
                                                    //             <tr>
                                                    //                 <td className="fw-bold">City</td>
                                                    //                 <td className="text-muted">{item.city}</td>
                                                    //             </tr>
                                                    //             <tr>
                                                    //                 <td className="fw-bold">State</td>
                                                    //                 <td className="text-muted">{item.state}</td>
                                                    //             </tr>
                                                    //             <tr>
                                                    //                 <td className="fw-bold">Country</td>
                                                    //                 <td className="text-muted">{item.country}</td>
                                                    //             </tr>
                                                    //             <tr>
                                                    //                 <td className="fw-bold">Contact 1</td>
                                                    //                 <td className="text-muted">{item.contact1}</td>
                                                    //             </tr>

                                                    //             {item.contact2 && (
                                                    //                 <tr>
                                                    //                     <td className="fw-bold">Contact 2</td>
                                                    //                     <td className="text-muted">
                                                    //                         {item.contact2}
                                                    //                     </td>
                                                    //                 </tr>
                                                    //             )}

                                                    //             {item.contact3 && (
                                                    //                 <tr>
                                                    //                     <td className="fw-bold">Contact 3</td>
                                                    //                     <td className="text-muted">
                                                    //                         {item.contact3}
                                                    //                     </td>
                                                    //                 </tr>
                                                    //             )}

                                                    //             {item.business_email && (
                                                    //                 <tr>
                                                    //                     <td className="fw-bold">Website Email</td>
                                                    //                     <td
                                                    //                         className="text-muted"
                                                    //                         style={{
                                                    //                             maxWidth: "300px",
                                                    //                             wordWrap: "break-word",
                                                    //                         }}
                                                    //                     >
                                                    //                         {item.business_email}
                                                    //                     </td>
                                                    //                 </tr>
                                                    //             )}

                                                    //             {item.business_website && (
                                                    //                 <tr>
                                                    //                     <td className="fw-bold">Website Link</td>
                                                    //                     <td className="text-muted">
                                                    //                         {item.business_website}
                                                    //                     </td>
                                                    //                 </tr>
                                                    //             )}

                                                    //             {businessPhotos && (
                                                    //                 <tr>
                                                    //                     <td className="fw-bold">Business Photos</td>
                                                    //                     <td className="proposal-Photo">
                                                    //                         {businessPhotos &&
                                                    //                             Array.isArray(businessPhotos) ? (
                                                    //                             businessPhotos.map((item, idx) => (
                                                    //                                 <a href={item} target="_blank">
                                                    //                                     <img className="m-1" src={item} />
                                                    //                                 </a>
                                                    //                             ))
                                                    //                         ) : (
                                                    //                             <a href={businessPhotos} target="_blank">
                                                    //                                 <img src={businessPhotos} />
                                                    //                             </a>
                                                    //                         )}
                                                    //                     </td>
                                                    //                 </tr>
                                                    //             )}

                                                    //             <tr>
                                                    //                 <td className="fw-bold">Status</td>
                                                    //                 <td className="text-muted">{item.status}</td>
                                                    //             </tr>
                                                    //         </tbody>
                                                    //     </table>
                                                    // </Panel>
                                                    <BusinessCard item={item} name="Business" />
                                                ))}
                                            </Collapse>
                                        ) : (
                                            <div className="col-md-12">
                                                <p className="mb-3 fw fs-5">
                                                    No business details available.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div id="contacts" ref={section7Ref} className="mb-3">
                    <div className="card">
                        <div className="card-title bg-success bg-gradient text-white pt-2 ps-2">
                            <label className="mb-2 fw-bold fs-6 ">Contacts Info</label>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12">
                                    <div className="row mb-2">
                                        <div className="col-3">
                                            <label className="fw-bold">Email:</label>
                                        </div>
                                        <div className="col-9">{user && user.email}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-3">
                                            <label className="fw-bold">Phone No:</label>
                                        </div>
                                        <div className="col-9">
                                            {
                                                checkMobileVisibility(user && user.mobile) ? (
                                                    <p className="mb-0">
                                                        <a href={`tel:${user && user.mobile}`}>
                                                            {user && user.mobile}
                                                        </a>
                                                    </p>
                                                ) : 'Not Show'
                                            }
                                        </div>
                                    </div>

                                    <div className="row mb-2">
                                        <div className="col-3">
                                            <label className="fw-bold">Website:</label>
                                        </div>
                                        <div className="col-9">N/A</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
    );
};

export default ViewProfileDrawerForMembers;
