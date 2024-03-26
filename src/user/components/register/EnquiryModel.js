import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CommunityEnquiry from './CommunityEnquiry';

function EnquiryModel() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
           <p className='text-light' onClick={handleShow}>
           Request For Specific Community
           </p>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CommunityEnquiry handleClose = {handleClose} />
                </Modal.Body>
               
            </Modal>
        </>
    );
}

export default EnquiryModel;