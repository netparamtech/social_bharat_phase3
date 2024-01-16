import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import EmailForm from './EmailForm';
const EmailModel = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <a className="hover-pointer" onClick={showModal}>
                <img className='mr-2 hover-pointer' src='/user/images/mail.png' width={20} alt="Mail" />
            </a>
            <Modal title="Send Email" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <EmailForm handleOk = {handleOk} />
            </Modal>
        </>
    );
};
export default EmailModel;