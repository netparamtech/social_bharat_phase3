import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import EmailForm from './EmailForm';
const EmailModel = (props) => {
    const {record} = props;
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
            <Modal title="Send Email" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[]}>
                <EmailForm handleOk = {handleOk} record = {record} />
            </Modal>
        </>
    );
};
export default EmailModel;