import { Image } from 'antd';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const MatrimonialCard = ({ item, index }) => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
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
            <a className="text-dark m-2 hover-pointer-admin" onClick={handleShow} title='View'>
                <i className="fas fa-eye"></i>
            </a>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h4 className="text-danger">{item.matrimonial_profile_name}</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="" key={index}>
                        <div className="mb-2">
                            <div className="">

                                {/* <h5 className="card-header m-2 mb-2">{getProfileHeading(item.profile_created_for, item.matrimonial_profile_name) || "N/A"}</h5> */}
                                <p>Father Name: <span className="text-muted">{(item.father_name) || "N/A"}</span></p>
                                <p>Mother Name: <span className="text-muted">{(item.mother_name) || "N/A"}</span></p>
                                <p>Manglic: <span className="text-muted">{item.is_manglik || "N/A"}</span></p>
                                <p>Height: <span className="text-muted">{item.height_in_feet} ft</span></p>
                                <p>Package/Salary: <span className="text-muted">{(item.salary_package ? (item.salary_package === 'none') ? "N/A" : item.salary_package : "N/A")}</span></p>
                                <p>Date Of Birth: <span className="text-muted">{formatDate(item.matrimonial_profile_dob) || "N/A"}</span></p>
                                <p>Education: <span className="text-muted">{(item.education) || "N/A"}</span></p>
                                <p>Job Profile: <span className="text-muted">{(item.matrimonial_profile_occupation) || "N/A"}</span></p>
                                <p>Brother Count: <span className="text-muted">{(item.brother_count) || "N/A"}</span></p>
                                {item.brothers_details && (
                                    <p>Brothers Details: <span className="text-muted truncate-text">{item.brothers_details}</span></p>
                                )}
                                <p>Sister Count: <span className="text-muted">{(item.sister_count) || "N/A"}</span></p>
                                {item.sisters_details && (
                                    <p>Sisters Details: <span className="text-muted truncate-text">{item.sisters_details}</span></p>
                                )}
                                <p>Subcast: <span className="text-muted">{(item.subcast) || "N/A"}</span></p>
                                <p>Gender: <span className="text-muted">{(item.matrimonial_profile_gender) || "N/A"}</span></p>
                                <p>Paternal Gotra: <span className="text-muted">{(item.paternal_gotra) || "N/A"}</span></p>
                                <p>Maternal Gotra: <span className="text-muted">{(item.maternal_gotra) || "N/A"}</span></p>
                                <p>Biodata: <span className="text-muted">{item.biodata && (
                                    <a href={item.biodata} download="biodata.pdf" target="_blank">
                                        <i className="fa-regular fa-file-lines"></i> Download Biodata
                                    </a>
                                )}</span></p>
                                <p>Proposal Photo: <span className="text-muted">
                                    <Image.PreviewGroup>
                                        {
                                            item.proposal_photos && Array.isArray(item.proposal_photos) ? (
                                                item.proposal_photos.map((photo, idx) => (
                                                    <img className="m-1" src={photo} alt={`Proposal Photo ${idx}`} width={50} />
                                                ))

                                            ) : (
                                                item.proposal_photos ? (
                                                    <img className="m-1" src={item.proposal_photos} alt="proposal photo" width={50} />
                                                ) : ''
                                            )
                                        }
                                    </Image.PreviewGroup>



                                </span></p>
                                <p>Other Details: <span className="text-muted">{(item.DESCRIPTION) || "N/A"}</span></p>

                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <a className='hover-pointer' onClick={() => navigate(`/user/update-matrimonial-profile/${item.id}`)} title="Edit">
                        <Button variant="primary">Update</Button>
                    </a>

                </Modal.Footer>
            </Modal>
        </>

    );
};

export default MatrimonialCard;
