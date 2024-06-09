import { Image } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';

const BusinessCard = ({ item, index }) => {
    const [show, setShow] = useState(false);
    const [defaultMap, setDefaultMap] = useState("/user/images/location.png");
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

    return (
        <>
            <a className="btn over-pointer-g-effect mx-auto btn-toggle" onClick={handleShow} title='View'>Show More</a>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h4 className="text-danger">{item.business_name}</h4>
                        <p className='text-info'>({item.business_category})</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="" key={index}>
                        <div className="mb-2">
                            <div className='row'>
                                <div className='col-7'>
                                    <>
                                        <p>Posted By : <span className="text-muted">{(item.name) || "N/A"}</span></p>
                                        <p>Location : <span className="text-muted">{item.city}{" "}({item.state}){", "}{item.country}</span></p>
                                        <p>Business Email : <span className="text-muted">{item.business_email || "N/A"}</span></p>
                                        <p>Our Website : <span className="text-muted">{item.business_website} ft</span></p>

                                        <p>
                                            Contact Numbers :
                                            <a href={`tel:${item.contact1}`}>
                                                {" "}{item.contact1}
                                            </a>
                                            {item.contact2 ? (
                                                <>
                                                    ,{" "}
                                                    <a href={`tel:${item.contact2}`}>
                                                        {item.contact2}
                                                    </a>
                                                </>
                                            ) : (
                                                ""
                                            )}
                                            {item.contact3 ? (
                                                <>
                                                    ,{" "}
                                                    <a href={`tel:${item.contact3}`}>
                                                        {item.contact3}
                                                    </a>
                                                </>
                                            ) : (
                                                ""
                                            )}

                                        </p>{" "}
                                    </>

                                </div>
                                <div className='col-5'>
                                    <Carousel className="your-custom-carousel-class" style={{ objectFit: 'cover', height: '100%', width: '100%' }}>
                                        {item.business_photos && Array.isArray(item.business_photos) ?
                                            item.business_photos.map((value, index) => (
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
                                                item.business_photos ? (<img
                                                    src={item.business_photos}
                                                    alt="Proposal Photo"
                                                    className="d-block w-100 custom-carousel-item"
                                                    style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                                                />) : ''
                                            )}
                                        {
                                            item.google_map_link ? (
                                                <div className="col-2">
                                                    <a href={item.google_map_link} target="_blank">
                                                        <img className="rounded" src={defaultMap} alt="Google Map" width={50} />
                                                    </a>
                                                </div>
                                            ) : ''
                                        }
                                    </Carousel>

                                </div>
                                <p>
                                  <span className="text-muted" dangerouslySetInnerHTML={{
                                    __html: item.description}}></span>
                                </p>

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

export default BusinessCard;
