import { Image } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';

const MatrimonialCard = ({ item, index }) => {
    const [show, setShow] = useState(false);
    const [isHindi, setIsHindi] = useState(false);
    const [isAndroidUsed, setIsAndroidUsed] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
    };
    const checkMobileVisibility = (mobileNumber) => {
        const isHidden = /\*/.test(mobileNumber);
        return !isHidden;
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const [month, day, year] = new Date(dateString)
            .toLocaleDateString('en-GB', options)
            .split('/');
        return `${month}-${day}-${year}`;
    };
    useEffect(() => {
        const handleResize = () => {
            setIsAndroidUsed(window.innerWidth < 1000); // Adjust the threshold based on your design considerations
        };

        // Listen for window resize events
        window.addEventListener("resize", handleResize);
        handleResize(); // Call initially to set the correct value

        // Cleanup the event listener when component is unmounted
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <button className="text-dark mt-3 hover-pointer-admin matrimonial-generate-biodata" onClick={handleShow} title='View'
                style={{ border: '1px solid', borderRadius: '20px', padding: '4px', alignContent: 'center', textDecoration: 'none' }} >
                VIEW
            </button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div className='row'>
                            <div className='col-6'>
                                <h4 className="text-danger text-wrap-break-word">{item.matrimonial_profile_name}</h4>
                            </div>
                            <div className='col-6'>
                                <h6 className='fw-bold text-primary hover-pointer' onClick={() => setIsHindi(!isHindi)}>{isHindi ? 'See In English' : 'हिंदी में देखें'}</h6>
                            </div>
                        </div>

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="" key={index}>
                        <div className="mb-2">
                            <div className='row'>
                                <div className='col-6'>
                                    {
                                        !isHindi ? (
                                            <>
                                                <p>Father Name: <span className="text-muted">{(item.father_name) || "N/A"}</span></p>
                                                <p>Mother Name: <span className="text-muted">{(item.mother_name) || "N/A"}</span></p>
                                                <p>Manglic: <span className="text-muted">{item.is_manglik || "N/A"}</span></p>
                                                <p>Height: <span className="text-muted">{item.height_in_feet} ft</span></p>
                                                <p>Package/Salary (Annual): <span className="text-muted">{item.salary_package}</span></p>
                                                <p>Date Of Birth: <span className="text-muted">{formatDate(item.matrimonial_profile_dob) || "N/A"}</span></p>
                                                <p>Education: <span className="text-muted">{(item.education) || "N/A"}</span></p>
                                                <p>Education Details: <span className="text-muted text-wrap-break-word">{item.educational_details ? item.educational_details : ''}</span></p>
                                                <p>Job Type: <span className="text-muted">{item.matrimonial_profile_occupation ? item.matrimonial_profile_occupation : ''}</span></p>
                                                <p>Job Description: <span className="text-muted text-wrap-break-word">{item.job_profile_description ? item.job_profile_description : ''}</span></p>
                                                {
                                                    item.brother_count ? (
                                                        <>
                                                            <p>Brother Count: <span className="text-muted">{item.brother_count || "N/A"}</span></p>
                                                            {item.brothers_details && (
                                                                <p>Brothers Details: <span className="text-muted truncate-text">{item.brothers_details}</span></p>
                                                            )}
                                                        </>
                                                    ) : ''
                                                }

                                                {
                                                    item.sister_count ? (
                                                        <>
                                                            <p>Sister Count: <span className="text-muted">{item.sister_count || "N/A"}</span></p>
                                                            {item.sisters_details && (
                                                                <p>Sisters Details: <span className="text-muted truncate-text">{item.sisters_details}</span></p>
                                                            )}
                                                        </>
                                                    ) : ''
                                                }
                                                <p>Subcast: <span className="text-muted">{(item.subcast) || "N/A"}</span></p>
                                                <p>Gender: <span className="text-muted">{(item.matrimonial_profile_gender) || "N/A"}</span></p>
                                                <p>Paternal Gotra: <span className="text-muted">{(item.paternal_gotra) || "N/A"}</span></p>
                                                <p>Maternal Gotra: <span className="text-muted">{(item.maternal_gotra) || "N/A"}</span></p>
                                                <p>Biodata: <span className="text-muted">{item.biodata && (
                                                    <a href={item.biodata} download="biodata.pdf" target="_blank">
                                                        <i className="fa-regular fa-file-lines"></i> Download Biodata
                                                    </a>
                                                )}</span></p>
                                                {
                                                    item.contact_number ? (
                                                        <a href={`tel:${item.contact_number}`}>
                                                            {item.contact_number}
                                                        </a>
                                                    ) : checkMobileVisibility(item.mobile) ? (
                                                        <p>
                                                            <a href={`tel:${item.mobile}`}>
                                                                {item.mobile}
                                                            </a>
                                                        </p>
                                                    ) : ''
                                                }

                                            </>
                                        ) : (
                                            <>
                                                <p>पिता का नाम: <span className="text-muted">{(item.father_name) || "N/A"}</span></p>
                                                <p>मां का नाम: <span className="text-muted">{(item.mother_name) || "N/A"}</span></p>
                                                <p>मांगलिक: <span className="text-muted">{item.is_manglik || "N/A"}</span></p>
                                                <p>ऊचाई: <span className="text-muted">{item.height_in_feet} ft</span></p>
                                                <p>पैकेज/वेतन (वार्षिक): <span className="text-muted">{item.salary_package}</span></p>
                                                <p>जन्म तिथि: <span className="text-muted">{formatDate(item.matrimonial_profile_dob) || "N/A"}</span></p>
                                                <p>शिक्षा: <span className="text-muted">{(item.education) || "N/A"}</span></p>
                                                <p>नौकरी की प्रोफाइल: <span className="text-muted text-wrap-break-word">{(item.matrimonial_profile_occupation) || "N/A"}</span></p>
                                                {
                                                    item.brother_count ? (
                                                        <>
                                                            <p>भाई की संख्या: <span className="text-muted">{(item.brother_count) || "N/A"}</span></p>
                                                            {item.brothers_details && (
                                                                <p>भाइयों का विवरण: <span className="text-muted truncate-text">{item.brothers_details}</span></p>
                                                            )}
                                                        </>
                                                    ) : ''
                                                }
                                                {
                                                    item.sister_count ? (
                                                        <>
                                                            <p>बहन की संख्या: <span className="text-muted">{(item.sister_count) || "N/A"}</span></p>
                                                            {item.sisters_details && (
                                                                <p>बहनों का विवरण: <span className="text-muted truncate-text">{item.sisters_details}</span></p>
                                                            )}
                                                        </>
                                                    ) : ''
                                                }
                                                <p>उप-जाति: <span className="text-muted">{(item.subcast) || "N/A"}</span></p>
                                                <p>लिंग: <span className="text-muted">{(item.matrimonial_profile_gender) || "N/A"}</span></p>
                                                <p>पिता का गोत्र: <span className="text-muted">{(item.paternal_gotra) || "N/A"}</span></p>
                                                <p>मां का गोत्र: <span className="text-muted">{(item.maternal_gotra) || "N/A"}</span></p>
                                                <p>बायोडाटा: <span className="text-muted">{item.biodata && (
                                                    <a href={item.biodata} download="biodata.pdf" target="_blank">
                                                        <i className="fa-regular fa-file-lines"></i> Download Biodata
                                                    </a>
                                                )}</span></p>
                                                {
                                                    item.contact_number ? (
                                                        <a href={`tel:${item.contact_number}`}>
                                                            {item.contact_number}
                                                        </a>
                                                    ) : checkMobileVisibility(item.mobile) ? (
                                                        <p>
                                                            <a href={`tel:${item.mobile}`}>
                                                                {item.mobile}
                                                            </a>
                                                        </p>
                                                    ) : ''
                                                }
                                            </>
                                        )
                                    }
                                </div>
                                <div className='col-6'>
                                    <Carousel className="your-custom-carousel-class" style={{ objectFit: 'cover', height: '100%', width: '100%' }}>
                                        {item.proposal_photos && Array.isArray(item.proposal_photos) ?
                                            item.proposal_photos.map((value, index) => (
                                                <Carousel.Item key={index} style={{ objectFit: 'cover', height: '100%', width: '100%' }}>
                                                    <img
                                                        src={value}
                                                        alt={`Proposal Photo ${index + 1}`}
                                                        className="d-block w-100 custom-carousel-item"
                                                        height={300}
                                                        style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                                                    //onClick={() => changeEventClickFlag(true, item.id)}
                                                    />

                                                </Carousel.Item>
                                            )) : (
                                                item.proposal_photos ? (<img
                                                    src={item.proposal_photos}
                                                    alt="Proposal Photo"
                                                    className="d-block w-100 custom-carousel-item"
                                                    style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                                                //onClick={() => changeEventClickFlag(true, item.id)}
                                                />) : ''
                                            )}
                                    </Carousel>
                                </div>
                                {
                                    !isHindi ? (
                                        <p>Other Details: <span className="text-muted">{(item.DESCRIPTION) || "N/A"}</span></p>
                                    ) : (
                                        <p>अन्य विवरण: <span className="text-muted">{(item.DESCRIPTION) || "N/A"}</span></p>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </>

    );
};

export default MatrimonialCard;
