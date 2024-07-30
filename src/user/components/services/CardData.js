import React, { useState } from 'react';
import { Card, Navbar, Form, FormControl, Button, Container, Row, Col, Dropdown, Modal, Image } from 'react-bootstrap';
import { FaSearch, FaComments, FaStar, FaChevronDown } from 'react-icons/fa';

const CardData = ({ item, isAndroidUsed, handleChatclick, handleFeedbackFlag, innerIndex }) => {
    const [showModal, setShowModal] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [showFullModalDescription, setShowFullModalDescription] = useState(false);
    const [defaultImage, setDefaultImage] = useState(
        "/admin/img/download.jpg"
    );
    const [data, setData] = useState('');

    const toggleDescription = () => setShowFullDescription(!showFullDescription);
    const toggleModalDescription = () => setShowFullModalDescription(!showFullModalDescription);

    const getArray = (value) => {
        const items = value.split(',').map(item => item.trim());
        return items;
    }
    const checkMobileVisibility = (mobileNumber) => {
        const isHidden = /\*/.test(mobileNumber);
        return !isHidden;
    };

    return (
        <div className="">


            <Col md={12}>

                <Card>
                    <Card.Body>
                        <Row>
                            <Col md={4}>
                                <Image src={item.photo ? item.photo : defaultImage} rounded fluid className="mb-3" />
                                <h4>{item.name.toUpperCase()}</h4>
                                <div>
                                    {[...Array(5)].map((star, index) => (
                                        <FaStar
                                            key={index}
                                            color={index < Math.floor(item.avg_rating) ? "#ffc107" : "#e4e5e9"}
                                        />
                                    ))}
                                </div>
                                <p>{item.avg_rating}</p>
                                <p><strong>Rating</strong></p>
                                <p><strong>Total Participants - {item.total_participating}</strong></p>
                                <p><strong>Description:</strong></p>
                                <p>
                                    {showFullDescription
                                        ? item.description
                                        : `${item.description.slice(0, 100)}...`}
                                    <Button variant="link" onClick={toggleDescription}>
                                        {showFullDescription ? 'View Less' : 'View More'}
                                    </Button>
                                </p>
                            </Col>
                            <Col md={8}>
                                <h5>Providing Services In -</h5>
                                {getArray(item.category).map((service, index) => (
                                    <span key={index} className="badge bg-primary rounded-pill m-1 text-wrap-break-word">{service}</span>
                                ))}
                                <p><strong>Occupation - </strong>{item.occupation ? item.occupation.length > 50 ? (
                                    item.occupation.slice(0, 50) + "...."
                                ) : (item.occupation) : ''}</p>
                                <p><strong>Experience - </strong>{item.experience}</p>
                                <p><strong>Service In - </strong>{item.city} {item.state
                                    ? `(${item.state})`
                                    : ""}</p>
                                    <p><strong className='text-wrap-break-word'>Location - </strong>{item.location}</p>
                                <p><strong>Contact Numbers: </strong> <a href={`tel:${item.mobile1}`}>{item.mobile1}</a>
                                    {item.mobile2 && (
                                        <>
                                            <a href={`tel:${item.mobile2}`}>,{" "}{item.mobile2}</a>
                                        </>
                                    )}
                                    {checkMobileVisibility(item.masked_mobile) && (
                                        <>
                                            <a href={`tel:${item.masked_mobile}`}>,{" "}{item.masked_mobile}</a>
                                        </>
                                    )}</p>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col className="d-flex justify-content-between">
                                <Button variant="outline-primary" onClick={() => handleChatclick(item)}><FaComments /> Chat</Button>
                                <Button variant="primary" onClick={() => {
                                    setShowModal(true);
                                    setData(item);
                                }}>View</Button>
                                <Button variant="outline-secondary" onClick={() => handleFeedbackFlag(true, innerIndex, item)}>Feedback</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>


            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{data&&data.name.toUpperCase()}'s Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={4}>
                            <Image src={data.photo ? data.photo : defaultImage} rounded fluid />
                        </Col>
                      {
                        data&&(
                            <Col md={8}>
                            <h4>{data.name.toUpperCase()}</h4>
                            <p><strong>Rating: </strong>{data.avg_rating} ({data.total_participating} participants)</p>
                            <p><strong>Services: </strong>{getArray(data.category).map((service, index) => (
                                <span key={index} className="badge bg-primary rounded-pill m-1 text-wrap-break-word">{service}</span>
                            ))}</p>
                            <p><strong className='text-wrap-break-word'>Occupation: </strong>{data.occupation}</p>
                            <p><strong>Experience: </strong>{data.experience}</p>
                            <p className='text-wrap-break-word'><strong className='text-wrap-break-word'>Service At: </strong>{data.location}</p>
                            <p><strong>Contact: </strong><a href={`tel:${data.mobile1}`}>{data.mobile1}</a>
                                {data.mobile2 && (
                                    <>
                                        <a href={`tel:${data.mobile2}`}>,{" "}{data.mobile2}</a>
                                    </>
                                )}
                                {checkMobileVisibility(data.masked_mobile) && (
                                    <>
                                        <a href={`tel:${data.masked_mobile}`}>,{" "}{data.masked_mobile}</a>
                                    </>
                                )}</p>
                            <p><strong>Description: </strong>
                                {showFullModalDescription
                                    ? data.description
                                    : `${data.description.slice(0, 100)}...`}
                                <Button variant="link" onClick={toggleModalDescription}>
                                    {showFullModalDescription ? 'View Less' : 'View More'}
                                </Button>
                            </p>
                        </Col>
                        )
                      }
                    </Row>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                </Modal.Footer>
                </Modal.Body>
               
            </Modal>
        </div>
    );
};

export default CardData;